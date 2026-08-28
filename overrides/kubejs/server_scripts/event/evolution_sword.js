// 进化之剑 - 服务端逻辑
// 手持时按已击杀 BOSS 数给玩家攻击伤害属性加动态 modifier(面板可见): 每击杀一个 BOSS +5。
// 击杀记录**完全来自玩家 persistentData 的 epiphany:boss_killed_* 键(由 epiphany.js 统一写入,
// 近战/弓箭/仆从等任何方式击杀都会追溯记录), 本脚本不自行判定 boss、不监听死亡事件。
// tooltip 数据改为 sendData 发包给客户端(物品组件同步在手持/背包场景不可靠, 已弃用):
//   每 20 tick(1 秒)检查一次, 玩家身上有剑时发送 'evo_sword_info' 通道的 boss 击杀列表。
// ⚠️ Rhino 坑: AttributeInstance.removeModifier 有重载歧义不可用;
//    改无条件 addOrReplacePermanentModifier(单参无歧义), 非手持时值为 0 即无加成
// Java 类引用见 util/import.js($AttributeModifier/$ResLoc)

let SWORD_ID = 'kubejs:evolution_sword'
let BOSS_PD_PREFIX = 'epiphany:boss_killed_'
let BONUS_PER_BOSS = 5
let BONUS_MODIFIER_ID = 'kubejs:evolution_sword_bonus'
let SWORD_CHANNEL = 'evo_sword_info'

// Boss 中文名映射(仅已安装模组; 灾变取自 MC百科) - 与客户端历史版本一致, 服务端直接按 id 查好名字发包
let BOSS_NAME_MAP = {
    "cataclysm:ancient_remnant": "远古遗魂",
    "cataclysm:ender_golem": "末影傀儡",
    "cataclysm:ender_guardian": "末影守卫",
    "cataclysm:ignis": "焰魔",
    "cataclysm:maledictus": "咒翼灵骸",
    "cataclysm:netherite_monstrosity": "下界合金巨兽",
    "cataclysm:scylla": "斯库拉",
    "cataclysm:the_harbinger": "先驱者",
    "cataclysm:the_leviathan": "利维坦",
    "cataclysm:the_watcher": "观测者",
    "dungeonnowloading:chaos_spawner": "混沌刷怪笼",
    "dungeonnowloading:fairkeeper_boros": "公正衔环 波罗斯",
    "dungeonnowloading:fairkeeper_ouros": "公正衔环 乌洛斯",
    "graveyard:lich": "Corrupted Champion",
    "kaleidoscope_twilight:umbral_sunflower": "向日葵",
    "minecraft:ender_dragon": "末影龙",
    "minecraft:wither": "凋灵",
    "mowziesmobs:ferrous_wroughtnaut": "钢铁守护者",
    "mowziesmobs:frostmaw": "霜冻巨兽",
    "mowziesmobs:sculptor": "雕刻家·通臂大师",
    "mowziesmobs:umvuthi": "太阳鸟·乌姆武提",
    "spectrum:monstrosity": "§kMonstrosity",
    "twilightforest:alpha_yeti": "雪怪首领",
    "twilightforest:hydra": "九头蛇",
    "twilightforest:knight_phantom": "幻影骑士",
    "twilightforest:lich": "巫妖",
    "twilightforest:minoshroom": "米诺菇",
    "twilightforest:naga": "娜迦",
    "twilightforest:snow_queen": "冰雪女王",
    "twilightforest:ur_ghast": "暮初恶魂",
}

/** 统计玩家 persistentData 中已击杀的 boss 数量(epiphany:boss_killed_* 键) */
function countBossKills(player) {
    let keys = player.persistentData.getAllKeys().toArray()
    let count = 0
    for (let i = 0; i < keys.length; i++) {
        if (String(keys[i]).startsWith(BOSS_PD_PREFIX)) count++
    }
    return count
}

/** 收集玩家 persistentData 中全部已击杀 boss 的中文名(id 查映射, 无映射用原始 id) */
function getBossKillNames(player) {
    let keys = player.persistentData.getAllKeys().toArray()
    let names = []
    for (let i = 0; i < keys.length; i++) {
        let k = String(keys[i])
        if (k.startsWith(BOSS_PD_PREFIX)) {
            let id = k.substring(BOSS_PD_PREFIX.length)
            names.push(BOSS_NAME_MAP[id] ? BOSS_NAME_MAP[id] : id)
        }
    }
    return names
}

/** 玩家主手/副手/背包中是否有进化之剑 */
function hasAnySword(player) {
    let hand = player.getMainHandItem()
    if (hand && !hand.isEmpty() && hand.id === SWORD_ID) return true
    hand = player.getOffHandItem()
    if (hand && !hand.isEmpty() && hand.id === SWORD_ID) return true
    let inv = player.inventory
    for (let i = 0; i < inv.getSlots(); i++) {
        let s = inv.getStackInSlot(i)
        if (s && !s.isEmpty() && s.id === SWORD_ID) return true
    }
    return false
}

/** 刷新手持攻击伤害加成 modifier: 无条件 addOrReplace(同 id 替换), 非手持时值为 0 即无加成 */
function applyDamageBonus(player) {
    let attr = player.getAttribute('minecraft:generic.attack_damage')
    if (!attr) return
    let hand = player.getMainHandItem()
    let count = countBossKills(player)
    let bonus = (hand && !hand.isEmpty() && hand.id === SWORD_ID && count > 0) ? BONUS_PER_BOSS * count : 0
    attr.addOrReplacePermanentModifier(new $AttributeModifier(
        $ResLoc.parse(BONUS_MODIFIER_ID),
        bonus,
        'add_value'
    ))
}

// tick 定期维护(每 20 tick = 1 秒): 属性 modifier + 给持剑玩家发包同步 boss 记录
PlayerEvents.tick(event => {
    const { player } = event
    if (!player || player.level.isClientSide()) return
    if (player.server.tickCount % 20 !== 0) return
    applyDamageBonus(player)
    if (hasAnySword(player)) {
        // 直接发包中文名, 客户端无需再匹配
        player.sendData(SWORD_CHANNEL, { boss_names: getBossKillNames(player) })
    }
})
