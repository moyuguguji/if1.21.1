// 移植自 Infinity Reborn v3.4(1.18.2 Fabric + KubeJS 5.5)→ 本包 1.21.1 + KubeJS 7.2
// 第一代 Infinity 整合包武器特效(优化版): 七星剑 / 上善若水 / 野草 / 清理扫帚
// 注册见 startup_scripts/register/legacy_weapons.js
// 生效: /kubejs reload server_scripts
//
// ⚠ 相对初版移植的优化:
//  1. 修复"河之湍急/冰之霜寒"常驻 bug: 战斗状态改用时间戳窗口(5 秒)判断,
//     原 getLastAttackedMob() != null 在攻击过一次后永久成立 → 常驻速度/永久冻结
//  2. buff 时长统一 30t(1.5s)覆盖 20t 刷新间隔, 潜行抗性不再闪烁(原 10t < 20t)
//  3. 右键技能增加冷却检查(冷却中提示)与施放提示(actionbar)

// ======================== 工具 ========================

// 冷却用原版 ItemCooldowns(probe: net/minecraft/world/item $ItemCooldowns)
//   addCooldown(item: $Item_, ticks) / isOnCooldown(item: $Item_) / getCooldownPercent(item, partialTicks)
//   ⚠ $Item_ 支持字符串 id 自动转换, 直接传 'kubejs:xxx' 即可
//   ⚠ 拿原版实体必须用事件对象的 getEntity()(KubePlayerEvent), PlayerJS 本体无 getEntity()

/** 给物品设置使用冷却(原版物品冷却动画) */
function itemCooldown(rawEntity, itemId, ticks) {
    rawEntity.getCooldowns().addCooldown(itemId, ticks)
}

/** 物品是否在冷却中 */
function onCooldown(rawEntity, itemId) {
    return rawEntity.getCooldowns().isOnCooldown(itemId)
}

// 清理扫帚白名单: 清理掉落物时保留的贵重物品(可自行增删)
let CLEAN_WHITELIST = []

/** 清理服务器上所有掉落物实体(白名单除外) */
// ⚠ KubeJS 7 无 server.getEntities(selector) 选择器方法(probe: EntityCollectionKJS 只有无参 getEntities),
//    遍历全部实体后按 type 过滤掉落物
function clearLag(server) {
    let count = 0
    server.getEntities().forEach(e => {
        if (e.type != 'minecraft:item') return
        if (!CLEAN_WHITELIST.includes(e.item.id)) {
            count += e.item.count
            e.kill()
        }
    })
    server.tell(Text.lightPurple('[扫地机器人]').append(Text.of(` 本次共清除 ${count} 个物品`)))
}

// ======================== 手持被动(每 1 秒刷新) ========================

PlayerEvents.tick(event => {
    let player = event.player
    // ⚠ KubeJS 7 EntityJS 无 age 属性(1.18 有), 限频用 server.tickCount(本包标准, 见 evolution_sword.js)
    if (!player || player.server.tickCount % 20 != 0) return
    let id = player.getItemInHand('main_hand').id
    // 七星剑: 速度加成 + 坚韧(抗性)
    if (id == 'kubejs:qixing_sword') {
        player.potionEffects.add('minecraft:speed', 30, 2, false, false)
        player.potionEffects.add('minecraft:resistance', 30, 1, false, false)
        return
    }
    // 野草: 抗火 + 草方块上速度4 + 潜行饱食
    if (id == 'kubejs:yecao_sword') {
        player.potionEffects.add('minecraft:fire_resistance', 30, 0, false, false)
        if (player.block.down.id == 'minecraft:grass_block') {
            player.potionEffects.add('minecraft:speed', 30, 3, false, false)
        }
        if (player.isCrouching()) {
            player.potionEffects.add('minecraft:saturation', 30, 3, false, false)
        }
        return
    }
    // 上善若水(tick 部分): 潜行抗性 + 灭火
    //   战斗效果(冻结攻击者/战斗速度)在 EntityEvents.beforeHurt 事件驱动实现(见下),
    //   ⚠ 不用 tick 轮询原版时间戳(getLastHurt*Timestamp 语义不可靠, 已废弃该写法)
    if (id == 'kubejs:ruoshui_sword') {
        if (player.isCrouching()) {
            player.potionEffects.add('minecraft:resistance', 30, 1, false, false)
        }
        player.clearFire()
    }
})

// ======================== 上善若水战斗效果(事件驱动) ========================
// 冰之霜寒/河之湍急 改为 beforeHurt 事件直接触发:
//   - 手持若水剑攻击命中 → 获得速度(战斗状态, 连续攻击持续刷新)
//   - 手持若水剑被攻击 → 冻结攻击者
// ⚠ 不用 tick 轮询原版 getLastHurt*Timestamp(语义不可靠, 已废弃), 事件触发精确无窗口问题

EntityEvents.beforeHurt(event => {
    const { entity, source } = event
    if (!source || !entity) return
    // 河之湍急: 手持若水剑攻击命中 → 战斗速度
    let attackerPlayer = source.player
    if (attackerPlayer && attackerPlayer.isPlayer() && attackerPlayer.getItemInHand('main_hand').id == 'kubejs:ruoshui_sword') {
        attackerPlayer.potionEffects.add('minecraft:speed', 30, 1, false, false)
    }
    // 冰之霜寒: 玩家手持若水剑被攻击 → 冻结攻击者(3秒 缓慢10)
    if (entity.isPlayer()) {
        let holder = entity.player
        if (holder && holder.getItemInHand('main_hand').id == 'kubejs:ruoshui_sword') {
            let attacker = source.getActual()
            if (attacker != null && attacker.isLiving() && attacker.isAlive()) {
                attacker.potionEffects.add('minecraft:slowness', 60, 9, false, false)
            }
        }
    }
})

// ======================== 七星剑击杀 ========================

EntityEvents.death(event => {
    const { entity, source } = event
    let player = source.player
    if (!player || !player.isPlayer()) return
    if (player.getItemInHand('main_hand').id != 'kubejs:qixing_sword') return

    // 天枢●贪狼: 击杀获得伤害吸收4
    player.potionEffects.add('minecraft:absorption', 200, 3, false, false)

    // 天玑●禄存: 50% 概率斩首
    if (Math.random() < 0.5) {
        let t = entity.type
        let headId = null
        if (t == 'minecraft:creeper') headId = 'minecraft:creeper_head'
        if (t == 'minecraft:zombie') headId = 'minecraft:zombie_head'
        if (t == 'minecraft:skeleton') headId = 'minecraft:skeleton_skull'
        if (t == 'minecraft:wither_skeleton') headId = 'minecraft:wither_skeleton_skull'
        if (t == 'minecraft:ender_dragon') headId = 'minecraft:dragon_head'
        if (headId) {
            player.give(headId)
            return
        }
        if (entity.isPlayer()) {
            // 1.21 玩家头需要 profile 组件
            let head = Item.of('minecraft:player_head').set({ 'minecraft:profile': { name: entity.username } })
            player.give(head)
        }
    }
})

// ======================== 右键技能 ========================

ItemEvents.rightClicked(event => {
    const { player, server, item } = event
    if (!player || !item) return
    let id = item.id

    // 上善若水: 潜行=泉之治愈(半血,15s冷却) / 非潜行=汽之呼吸(水下呼吸15s,20s冷却)
    if (id == 'kubejs:ruoshui_sword') {
        if (player.isCrouching()) {
            let healed = Math.round(player.getMaxHealth() / 2)
            player.heal(player.getMaxHealth() / 2)
            itemCooldown(event.getEntity(), id, 300)
            player.setStatusMessage(Text.translate('msg.lw.ruoshui.heal', healed).color('light_purple'))
        } else {
            player.potionEffects.add('minecraft:water_breathing', 300, 0, false, false)
            itemCooldown(event.getEntity(), id, 400)
            player.setStatusMessage(Text.translate('msg.lw.ruoshui.breath').color('aqua'))
        }
        return
    }
    // 野草: 春风(5秒生命回复5 + 2秒抗性5, 10秒冷却)
    if (id == 'kubejs:yecao_sword') {
        player.potionEffects.add('minecraft:regeneration', 100, 4, false, false)
        player.potionEffects.add('minecraft:resistance', 40, 4, false, false)
        itemCooldown(event.getEntity(), id, 200)
        player.setStatusMessage(Text.translate('msg.lw.yecao.spring').color('green'))
        return
    }
    // 清理扫帚: 清理掉落物(需作弊权限)
    if (id == 'kubejs:sao_di') {
        if (player.hasPermissions(2)) {
            clearLag(server)
            itemCooldown(event.getEntity(), id, 100)
        } else {
            player.tell(Text.lightPurple('[扫地机器人]').append(Text.of(' 你没有权限这样做')))
        }
    }
})
