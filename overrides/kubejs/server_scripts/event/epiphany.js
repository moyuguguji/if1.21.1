// ============================================================
// Epiphany(顿悟) 联动统一脚本 —— 唯一入口
// 后续新增顿悟相关功能请写在本文件内, 按功能分区追加
// 通过 KubeJS 官方全局 API Epiphany.*（见 KubeJS Compat 文档）
// ============================================================

// ============================================================
// 分区 1: 首次击杀 Boss → 心得点 +1
// boss 列表见 util/constdef.js 的 LIST_BOSSES
// Java 类引用见 util/import.js($ServerPlayer/$Component/$ResLoc/$TagKey/$Registries/$BuiltInRegistries)
// ============================================================

const EPI_PD_BOSS_PREFIX = 'epiphany:boss_killed_'

// boss 标签（.probe 获取）：c:bosses、twilightforest:bosses、dungeonnowloading:bosses、fieldguide:bosses
const BOSS_TAGS = ['c:bosses', 'twilightforest:bosses', 'dungeonnowloading:bosses', 'fieldguide:bosses']

function isBossByTag(entity) {
    // entity.getType() 在 KubeJS wrapper 上返回 ID 字符串，需经 BuiltInRegistries 取 Java EntityType
    const type = $BuiltInRegistries.ENTITY_TYPE.get($ResLoc.parse(entity.type))
    if (!type) return false
    for (const tag of BOSS_TAGS) {
        const parts = tag.split(':')
        const tagKey = $TagKey.create($Registries.ENTITY_TYPE, $ResLoc.fromNamespaceAndPath(parts[0], parts[1]))
        if (type.is(tagKey)) return true
    }
    return false
}

// 首次击杀 Boss → 心得点 +1（KubeJS 自带死亡事件）
EntityEvents.death(event => {
    const { entity } = event
    if (!LIST_BOSSES.includes(entity.type) && !isBossByTag(entity)) return
    const source = event.getSource()
    // 直接来源（仆从/箭/玩家近战），servantry/spectrum mixin 后 Rhino 中方法名为 getActual
    let killer = null
    killer = source.getActual()
    // 直接来源非玩家时，追溯其主人（servantry 仆从 getOwner()、箭 Projectile.getOwner()）
    if (killer && !(killer instanceof $ServerPlayer)) {
        try {
            const owner = killer.getOwner()
            if (owner instanceof $ServerPlayer) killer = owner
        } catch (e) {
            console.info(`[epiphany] 击杀来源无 getOwner: ${killer}`)
        }
    }
    if (!(killer instanceof $ServerPlayer)) return
    const pd = killer.getPersistentData()
    const bossKey = EPI_PD_BOSS_PREFIX + entity.type
    if (pd.getBoolean(bossKey)) return
    pd.putBoolean(bossKey, true)
    Epiphany.addInsightPoints(killer, 1)
    killer.sendSystemMessage($Component.translatable('msg.chat.epiphany.boss_first'))
})

// ============================================================
// 分区 2: 首次进入新维度 → 心得点 +1
// 维度 ID（.probe 获取）：minecraft:overworld / the_nether / the_end、
//   twilightforest:twilight_forest、cataclysm_dimension:cataclysm_abyssal_depths /
//   bastion_lost / eternal_frosthold / forge_of_aeons / infernos_maw /
//   pharaohs_bane / sanctum_fallen / souls_anvil
// 顶层 NativeEvents 注册所需类本地声明(不依赖加载顺序)
// ============================================================

const $PlayerChangedDimensionEvent = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerEvent$PlayerChangedDimensionEvent')

const EPI_PD_DIM_PREFIX = 'epiphany:dim_visited_'

NativeEvents.onEvent($PlayerChangedDimensionEvent, event => {
    const player = event.entity
    if (!player) return
    const dimId = event.to.location().toString()
    const key = EPI_PD_DIM_PREFIX + dimId
    const pd = player.getPersistentData()
    if (pd.getBoolean(key)) return
    pd.putBoolean(key, true)
    Epiphany.addInsightPoints(player, 1)
    player.sendSystemMessage($Component.translatable('msg.chat.epiphany.dimension_first'))
})

// ============================================================
// 分区 3: 集卡册 - 首次获得卡牌 → 阅历
// 每张卡牌仅首次获得时发放; 稀有度越高阅历越多:
//   普通+1 / 罕见+2 / 稀有+3 / 史诗+4 / 传说+5 / 神话+6
// 首次判定: 按卡牌 ID 记录到玩家 persistentData (kubejs:card_claimed_<id>)
// 双事件保险: pickedUp(掉落物拾取) + inventoryChanged(开包GUI/give/任务奖励等一切进背包途径)
// ============================================================

/**
 * @type {Array<{tag: string, points: number}>}
 */
let CARD_RARITY_POINTS = [
    { tag: 'collectorsalbum:cards/mythical',  points: 6 },
    { tag: 'collectorsalbum:cards/legendary', points: 5 },
    { tag: 'collectorsalbum:cards/epic',      points: 4 },
    { tag: 'collectorsalbum:cards/rare',      points: 3 },
    { tag: 'collectorsalbum:cards/uncommon',  points: 2 },
    { tag: 'collectorsalbum:cards/common',    points: 1 },
]

let PD_CARD_PREFIX = 'kubejs:card_claimed_'

/** 快速过滤: 所有卡牌 ID 形如 collectorsalbum:xxx_card, 非卡牌直接跳过, 避免无谓的 tag 查询 */
function isCardId(id) {
    return id.startsWith('collectorsalbum:') && id.endsWith('_card')
}

/** 按稀有度返回卡牌阅历点数, 非卡牌返回 0 (数组已按高→低排序, 天然优先匹配高稀有度) */
function getCardPoints(item) {
    for (let i = 0; i < CARD_RARITY_POINTS.length; i++) {
        if (item.hasTag(CARD_RARITY_POINTS[i].tag)) return CARD_RARITY_POINTS[i].points
    }
    return 0
}

/** 尝试领取首获奖励: 首次获得标记 + 发放阅历 (双事件共用, 标记保证只发一次) */
function tryClaimCard(player, item) {
    if (!player || !item || item.isEmpty()) return
    if (player.level.isClientSide()) return

    let id = item.id
    if (!isCardId(id)) return

    let points = getCardPoints(item)
    if (points <= 0) return

    let key = PD_CARD_PREFIX + id
    if (player.persistentData.getBoolean(key)) return

    player.persistentData.putBoolean(key, true)
    try {
        Epiphany.addAptitudeWithMultiplier(player, points)
        console.info(`[collectorsalbum] ${player.gameProfile.name} 首次获得 ${id}, 阅历+${points}`)
    } catch (e) {
        console.error(`[collectorsalbum] Epiphany.addAptitudeWithMultiplier 失败: ${e}`)
    }
}

PlayerEvents.inventoryChanged(event => {
    const { player, item } = event
    tryClaimCard(player, item)
})

// ============================================================
// 分区 4: 食物首吃 → 阅历
// 每吃一种食物(不重复)按物品标签发放阅历:
//   金食物 +3, 成品菜肴/熟肉 +3, 水果/浆果 +2, 生食原材料(生肉/农作物/蔬菜) +1
// 首次判定: 按食物 ID 记录到玩家 persistentData (kubejs:food_eaten_<id>)
// ⚠️ kaleidoscope_cookery:meals 标签误含生食材(生羊排/辣椒/番茄等),
//    故原材料档必须排在成品档之前, 否则生食材会误判为成品 +3
// ============================================================

/**
 * 食物分级表: 从上到下按优先级判定, 命中即返回该档点数
 * (ids 按物品 ID 精确匹配, tags 按标签匹配; 调档/加档只需改这张表)
 * @type {Array<{points: number, ids?: string[], tags?: string[]}>}
 */
let FOOD_TIERS = [
    { points: 3, ids: ['minecraft:golden_apple', 'minecraft:enchanted_golden_apple', 'minecraft:golden_carrot'] },  // 金食物
    { points: 1, tags: ['c:raw_meats', 'c:crops', 'c:vegetables'] },          // 生食原材料(最低档, 优先于成品)
    { points: 3, tags: ['kaleidoscope_cookery:meals', 'c:cooked_meats'] },    // 成品菜肴/熟肉
    { points: 2, tags: ['c:fruits', 'c:berries'] },                           // 水果/浆果
]

let PD_FOOD_PREFIX = 'kubejs:food_eaten_'

/** 按 FOOD_TIERS 优先级返回阅历点数, 非食物返回 0 */
function getFoodPoints(item) {
    for (const tier of FOOD_TIERS) {
        if (tier.ids) {
            for (let j = 0; j < tier.ids.length; j++) {
                if (tier.ids[j] === item.id) return tier.points
            }
        }
        if (tier.tags) {
            for (let k = 0; k < tier.tags.length; k++) {
                if (item.hasTag(tier.tags[k])) return tier.points
            }
        }
    }
    return 0
}

ItemEvents.foodEaten(event => {
    const { player, item } = event
    if (!player || !item || item.isEmpty()) return
    if (player.level.isClientSide()) return

    let id = item.id
    // 每种食物仅首次食用发放
    let key = PD_FOOD_PREFIX + id
    if (player.persistentData.getBoolean(key)) return

    let points = getFoodPoints(item)
    if (points <= 0) return

    player.persistentData.putBoolean(key, true)
    try {
        Epiphany.addAptitudeWithMultiplier(player, points)
        console.info(`[food] ${player.gameProfile.name} 首次食用 ${id}, 阅历+${points}`)
    } catch (e) {
        console.error(`[food] Epiphany.addAptitudeWithMultiplier 失败: ${e}`)
    }
})

// ============================================================
// 分区 5: 解锁新图鉴 → 阅历 +2
// Field Guide 模组的 KubeJS 事件(com.evandev.fieldguide.compat.kubejs):
//   FieldGuideEvents.entryUnlocked → $EntryUnlockedKubeEvent
//   isNewUnlock() = 该图鉴首次解锁, 重复解锁(variant 变化等)不计
// ============================================================

FieldGuideEvents.entryUnlocked(event => {
    const { player } = event
    if (!player || player.level.isClientSide()) return
    if (!event.newUnlock) return   // 仅首次解锁该图鉴

    try {
        Epiphany.addAptitudeWithMultiplier(player, 2)
        console.info(`[fieldguide] ${player.gameProfile.name} 解锁新图鉴 ${event.entryIdString}, 阅历+2`)
    } catch (e) {
        console.error(`[fieldguide] Epiphany.addAptitudeWithMultiplier 失败: ${e}`)
    }
})

// ============================================================
// 分区 6(示例): 已解锁图鉴总数达到 10 → 攻击伤害 +1
// 图鉴解锁只增不减, 达到 10 后永久加成(permanent modifier 加一次, persistentData 标记防重)
// Java 类引用见 util/import.js($AttributeModifier/$ResLoc)
// ============================================================
/*
let FG_BONUS_ID = 'kubejs:fieldguide_10_bonus'
let FG_BONUS_DONE = 'kubejs:fieldguide_10_done'
let FG_TARGET_COUNT = 10

FieldGuideEvents.entryUnlocked(event => {
    const { player } = event
    if (!player || player.level.isClientSide()) return
    // 已解锁图鉴总数(不记 variant)达到目标
    if (event.unlockedCount < FG_TARGET_COUNT) return
    if (player.persistentData.getBoolean(FG_BONUS_DONE)) return  // 只加一次

    let attr = player.getAttribute('minecraft:generic.attack_damage')
    if (!attr) return
    attr.addOrReplacePermanentModifier(new $AttributeModifier($ResLoc.parse(FG_BONUS_ID), 1, 'add_value'))
    player.persistentData.putBoolean(FG_BONUS_DONE, true)
    console.info(`[fieldguide] ${player.gameProfile.name} 图鉴总数达 ${event.unlockedCount}, 攻击伤害+1`)
})*/
