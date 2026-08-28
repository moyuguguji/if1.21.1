/**
 * 不完善的预知眼 — 服务端事件（攻击时施加瞬间的预知）
 * 顶层 NativeEvents 注册所需类本地声明(不依赖加载顺序)
 */

let $LivingIncomingDamageEvent = Java.loadClass('net.neoforged.neoforge.event.entity.living.LivingIncomingDamageEvent')

NativeEvents.onEvent($LivingIncomingDamageEvent, event => {
    let source = event.source
    if (!source) return

    // 仅处理玩家造成的伤害
    let attacker = source.player
    if (!attacker || !attacker.isPlayer() || attacker === event.entity) return

    // 装备了预知眼
    if (!attacker.potionEffects.isActive('kubejs:precognition_eye')) return
    if (attacker.persistentData.getBoolean(PD_KEY_IS_OVERHEAT)) return

    let currentStacks = 0
    let active = attacker.potionEffects.getActive('kubejs:momentary_precognition')
    if (active) currentStacks = active.amplifier + 1

    if (currentStacks >= 2) {
        attacker.potionEffects.add('kubejs:momentary_precognition', 100, 1, true, false)
    } else {
        attacker.potionEffects.add('kubejs:momentary_precognition', 100, currentStacks, true, false)
    }
})
