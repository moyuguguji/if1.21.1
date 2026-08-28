/**
 * 极限闪避 — 客户端
 *
 * 双重触发机制，确保在伤害出来前完成闪避：
 *
 * === 路径 1: 服务端网络包（可靠后备）===
 * 服务端: event.setCanceled(true) + player.sendData('dodge_roll', {})
 * 客户端: NetworkEvents.dataReceived → RollEvent.startRoll()
 *
 * === 路径 2: 客户端挥动检测（提前触发）===
 * 检测附近敌对生物的 swingTime 上升沿（0→>0），
 * 在生物开始挥动武器的同一 tick 触发翻滚。
 *
 * 配合 Strike After Swing 模组的伤害延迟，挥动检测在伤害到达前
 * 就已经完成翻滚启动，让 ExtremeEvasion 和无敌帧有充足时间生效。
 *
 * @see server_scripts/event/dodge_roll.js
 */

const RollEvent = Java.loadClass('com.mafuyu404.moveslikemafuyu.event.RollEvent')

// ==================== 路径 1: 服务端网络包 ====================

NetworkEvents.dataReceived('dodge_roll', event => {
    let player = event.player
    if (!player || !player.isAlive()) return
    if (player.isCreative() || player.isSpectator()) return
    if (RollEvent.isRolling(player)) return

    RollEvent.startRoll(player)
})
