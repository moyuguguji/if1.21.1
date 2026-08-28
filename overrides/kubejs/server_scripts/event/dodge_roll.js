/**
 * 极限闪避 — 服务端
 * 顶层 NativeEvents 注册所需类本地声明(不依赖加载顺序)
 */

let $LivingIncomingDamageEvent = Java.loadClass('net.neoforged.neoforge.event.entity.living.LivingIncomingDamageEvent')
let $ProjectileImpactEvent      = Java.loadClass('net.neoforged.neoforge.event.entity.ProjectileImpactEvent')

// 预知眼持久化键（与 startup_scripts 保持一致）
let PDK_PRECOG_CHARGES = 'kubejs:precog_charges'
let PDK_IS_OVERHEAT    = 'kubejs:is_overheat'
let DODGE_COST          = 5
let MAX_CHARGES         = 30

const BYPASS_LIST = [
    'minecraft:out_of_world', 'minecraft:generic_kill', 'minecraft:starve',
    'minecraft:in_wall', 'minecraft:cramming', 'minecraft:outside_border',
    'minecraft:on_fire', 'minecraft:in_fire', 'minecraft:lava',
    'minecraft:hot_floor', 'minecraft:campfire', 'minecraft:drown',
    'minecraft:dry_out', 'minecraft:wither', 'minecraft:magic',
    'minecraft:indirect_magic',
]

// ==================== 闪避条件检查 ====================

function canDodge(player) {
    if (player.persistentData.getBoolean(PDK_IS_OVERHEAT)) return false
    return Math.min(player.persistentData.getInt(PDK_PRECOG_CHARGES), MAX_CHARGES) >= DODGE_COST
}

function consumeDodgeCharges(player) {
    let charges = Math.min(player.persistentData.getInt(PDK_PRECOG_CHARGES), MAX_CHARGES)
    charges -= DODGE_COST
    player.persistentData.putInt(PDK_PRECOG_CHARGES, charges)

    let name = player.gameProfile.name
    if (charges <= 0) {
        // 进入过热
        player.persistentData.putBoolean(PDK_IS_OVERHEAT, true)
        player.persistentData.putLong('kubejs:overheat_end_time', player.server.tickCount + 1200)
        player.server.runCommandSilent(`effect clear ${name} kubejs:precognition_eye`)
        player.potionEffects.add('kubejs:overheat', 1200, 29, true, false)
    } else {
        // 先清除再重施加（原版 addEffect 只在 amplifier 更高时才更新）
        player.server.runCommandSilent(`effect clear ${name} kubejs:precognition_eye`)
        player.potionEffects.add('kubejs:precognition_eye', -1, charges - 1, true, false)
    }
}

// ==================== 路径 1: 弹射物 ====================

NativeEvents.onEvent($ProjectileImpactEvent, event => {
    let target = event.rayTraceResult ? event.rayTraceResult.entity : null
    const { entity, source, damage } = event
    if (!source) return
    //console.log(`${source}`)
    if (!target || !target.isPlayer()) return
    if (!source.getImmediate() && !source.getActual()) return
    let player = target
    if (!player.isAlive() || player.isPassenger() || player.isSleeping()) return
    if (!canDodge(player)) return

    consumeDodgeCharges(player)
    event.setCanceled(true)
    player.sendData('dodge_roll', {})
})
// ==================== 路径 2: 通用伤害 ====================

NativeEvents.onEvent($LivingIncomingDamageEvent, event => {
    const { entity, source, damage } = event
    //let entity = event.entity
    if (!entity || !entity.isPlayer()) return
    if (!source) return
    console.log(`${source}`)
    console.log(`${source.getImmediate()}`)
    console.log(`${source.getActual()}`)
    /** @type {Internal.LivingEntity} */
    let player = entity
    if (!player.isAlive() || player.isPassenger() || player.isSleeping()) return
    if (isUndodgeableSource(event.source)) return
    // 仅闪避来自实体的伤害（仙人掌、陷阱、环境等跳过）
    if (!source.getImmediate() && !source.getActual()) return
    if (!canDodge(player)) return

    consumeDodgeCharges(player)
    event.setCanceled(true)
    player.sendData('dodge_roll', {})
})

// ==================== 辅助 ====================

function isUndodgeableSource(source) {
    let type = source.getType()
    for (let bypass of BYPASS_LIST) {
        if (type === bypass) return true
    }
    return false
}
