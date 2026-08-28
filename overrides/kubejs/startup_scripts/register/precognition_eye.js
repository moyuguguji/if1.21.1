// priority: 100
// 不完善的预知眼 — 首饰 (Charm) 饰品
// 参考 beeper.js 模式：plain function + curioTick 直接调用

// ======================== 常量 ========================

let PDK_PRECOG_CHARGES    = 'kubejs:precog_charges'
let PDK_OVERHEAT_END      = 'kubejs:overheat_end_time'
let PDK_IS_OVERHEAT       = 'kubejs:is_overheat'

let EFFECT_PRECOG         = 'kubejs:precognition_eye'
let EFFECT_MOMENTARY      = 'kubejs:momentary_precognition'
let EFFECT_OVERHEAT       = 'kubejs:overheat'

let DEFAULT_CHARGES       = 30
let MAX_CHARGES           = 30
let OVERHEAT_CHARGES      = 30
let OVERHEAT_DURATION     = 1200
let MOMENTARY_DURATION    = 100
let TICKS_REAPPLY         = 35

// ======================== 辅助函数 ========================

function clampCharges(v) {
    return Math.min(Math.max(v, 0), MAX_CHARGES)
}

function clearModEffects(player) {
    let s = player.server
    let name = player.gameProfile.name
    s.runCommandSilent(`effect clear ${name} ${EFFECT_PRECOG}`)
    s.runCommandSilent(`effect clear ${name} ${EFFECT_MOMENTARY}`)
    s.runCommandSilent(`effect clear ${name} ${EFFECT_OVERHEAT}`)
}

function applyPrecognition(player, charges) {
    if (charges <= 0) return
    player.potionEffects.add(EFFECT_PRECOG, -1, charges - 1, true, false)
}

function applyOverheat(player, remainingTicks) {
    player.potionEffects.add(EFFECT_OVERHEAT, remainingTicks, OVERHEAT_CHARGES - 1, true, false)
}

function enterOverheat(player) {
    clearModEffects(player)
    player.persistentData.putBoolean(PDK_IS_OVERHEAT, true)
    player.persistentData.putLong(PDK_OVERHEAT_END, player.server.tickCount + OVERHEAT_DURATION)
    player.persistentData.putInt(PDK_PRECOG_CHARGES, 0)
    applyOverheat(player, OVERHEAT_DURATION)
}

function exitOverheat(player) {
    clearModEffects(player)
    player.persistentData.putBoolean(PDK_IS_OVERHEAT, false)
    player.persistentData.putInt(PDK_PRECOG_CHARGES, DEFAULT_CHARGES)
    player.persistentData.putLong(PDK_OVERHEAT_END, 0)
    applyPrecognition(player, DEFAULT_CHARGES)
}

function onEquip(player) {
    let charges = clampCharges(player.persistentData.getInt(PDK_PRECOG_CHARGES))
    if (charges <= 0 && !player.persistentData.getBoolean(PDK_IS_OVERHEAT)) {
        charges = DEFAULT_CHARGES
        player.persistentData.putInt(PDK_PRECOG_CHARGES, charges)
    }

    let isOverheat = player.persistentData.getBoolean(PDK_IS_OVERHEAT)
    if (isOverheat) {
        let remaining = player.persistentData.getLong(PDK_OVERHEAT_END) - player.server.tickCount
        if (remaining <= 0) {
            exitOverheat(player)
        } else {
            applyOverheat(player, remaining)
        }
    } else {
        applyPrecognition(player, charges)
    }
}

function onUnequip(player) {
    clearModEffects(player)
}

function curioTick(player) {
    let now = player.server.tickCount
    let isOverheat = player.persistentData.getBoolean(PDK_IS_OVERHEAT)

    // 防牛奶清除
    if (player.server.tickCount % TICKS_REAPPLY === 0) {
        if (isOverheat) {
            let endTime = player.persistentData.getLong(PDK_OVERHEAT_END)
            let remaining = Math.max(0, endTime - now)
            if (remaining > 0) applyOverheat(player, remaining)
        } else {
            let charges = clampCharges(player.persistentData.getInt(PDK_PRECOG_CHARGES))
            if (charges > 0) applyPrecognition(player, charges)
        }
    }

    // 过热到期检测
    if (isOverheat) {
        let endTime = player.persistentData.getLong(PDK_OVERHEAT_END)
        if (now >= endTime) exitOverheat(player)
    }
}

// ======================== 效果注册 ========================

StartupEvents.registry('mob_effect', event => {
    event.create('precognition_eye')
        .beneficial()
        .color(0x55CCFF)
        .modifyAttribute('minecraft:generic.attack_speed', 'kubejs:precog_attack_speed', 0.1, 'add_value')
        .modifyAttribute('minecraft:generic.attack_damage', 'kubejs:precog_attack_damage', 0.05, 'add_value')
        .modifyAttribute('minecraft:generic.movement_speed', 'kubejs:precog_movement_speed', 0.01, 'add_value')

    event.create('momentary_precognition')
        .beneficial()
        .color(0xFFDD55)
        .modifyAttribute('minecraft:generic.attack_damage', 'kubejs:momentary_attack_damage', 0.1, 'add_multiplied_total')

    event.create('overheat')
        .beneficial()
        .color(0xFF6644)
        .modifyAttribute('minecraft:generic.attack_damage', 'kubejs:overheat_attack', 0.1, 'add_value')
        .modifyAttribute('minecraft:generic.armor', 'kubejs:overheat_armor', -0.05, 'add_value')
})

// ======================== 饰品注册 ========================

StartupEvents.registry('item', event => {
    event.create('imperfect_precognition_eye')
        .maxStackSize(1)
        .rarity('rare')
        .tag('curios:charm')
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .curioTick((slotContext, stack) => {
                    const player = slotContext.entity()
                    if (!player || !player.isPlayer() || player.level.isClientSide()) return
                    curioTick(player)
                })
                .onEquip((slotContext, oldStack, newStack) => {
                    const player = slotContext.entity()
                    if (!player || !player.isPlayer() || player.level.isClientSide()) return
                    onEquip(player)
                })
                .onUnequip((slotContext, oldStack, newStack) => {
                    const player = slotContext.entity()
                    if (!player || !player.isPlayer() || player.level.isClientSide()) return
                    onUnequip(player)
                })
                .canEquip((slotContext, stack) => true)
                .canUnequip((slotContext, stack) => true)
        )
})
