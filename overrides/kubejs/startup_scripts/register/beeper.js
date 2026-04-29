// priority: 100
// 哔哔机 - 腰部饰品
// 常量见 ../util/beeper_const.js

// ============================================================
// 辅助函数
// ============================================================

/** 位掩码读取：检查第 i 位是否为 1 */
function bitSet(mask, i) { return ((mask >> i) & 1) === 1 }

/**
 * 加权随机选取任务索引
 * 未完成的任务权重=2，已完成=1，降低重复概率
 * @param {Internal.LivingEntity} player
 * @returns {number} 任务索引 [0, TASK_COUNT)
 */
function pickTask(player) {
    let mask = player.persistentData.getInt(PDK_COMPLETED_MASK)
    let total = 0
    for (let i = 0; i < TASK_COUNT; i++) total += bitSet(mask, i) ? 1 : 2
    let r = player.random.nextInt(total)
    let acc = 0
    for (let i = 0; i < TASK_COUNT - 1; i++) {
        acc += bitSet(mask, i) ? 1 : 2
        if (r < acc) return i
    }
    return TASK_COUNT - 1
}

/**
 * 重施加指令加护/业效果，防止被牛奶或指令清除
 * 每 TICKS_REAPPLY 帧由 curioTick 调用
 * @param {Internal.LivingEntity} player
 */
function reapplyEffects(player) {
    let cp = player.persistentData.getInt(PDK_CP)
    let karma = player.persistentData.getInt(PDK_KARMA)
    if (cp > 0) player.potionEffects.add(EFFECT_CP, -1, cp - 1, true, false)
    if (karma > 0) player.potionEffects.add(EFFECT_KARMA, -1, karma - 1, true, false)
}

/**
 * 生成随机等待延迟 [TICKS_MIN, TICKS_5MIN)
 * @param {Internal.LivingEntity} player
 * @returns {number} 延迟值 (ticks)
 */
function randomDelay(player) {
    return TICKS_MIN + player.random.nextInt(TICKS_5MIN - TICKS_MIN)
}

/**
 * 乱码相位结束后调用 — 随机选取任务并写入 persistentData
 * @param {Internal.LivingEntity} player
 * @param {number} now 当前服务端 tick
 */
function showTask(player, now) {
    let idx = pickTask(player)
    player.setStatusMessage(Text.translate('msg.beeper.task', Text.translate(BEEPER_TASKS[idx])).color(0x55C0FF))
    player.persistentData.putInt(PDK_NEXT, now + TICKS_5MIN)
    player.persistentData.putInt(PDK_TASK, idx)
    player.persistentData.putInt(PDK_DEADLINE, now + TICKS_5MIN)
    player.persistentData.putInt(PDK_PROGRESS, 0)
}

/**
 * 乱码相位结束后调用 — 显示任务结果并设置下次刷新时间
 * 成功 → 重置随机延迟；失败 → 固定 TICKS_RESULT 后刷新
 * @param {Internal.LivingEntity} player
 * @param {number} now 当前服务端 tick
 * @param {number} type RESULT_SUCCESS / RESULT_FAILURE
 */
function showResult(player, now, type) {
    if (type === RESULT_SUCCESS) {
        player.setStatusMessage(Text.translate('msg.beeper.complete').color(0x55FFFF))
        player.persistentData.putInt(PDK_NEXT, now + randomDelay(player))
    } else {
        player.setStatusMessage(Text.translate('msg.beeper.failed').color(0xFF5555))
        player.persistentData.putInt(PDK_NEXT, now + TICKS_RESULT)
    }
}

/**
 * 任务超时处理：业值 +5（指令加护 < CP_MAX 时生效），标记 RESULT_FAILURE
 * @param {Internal.LivingEntity} player
 */
function failTask(player) {
    let cp = player.persistentData.getInt(PDK_CP)
    if (cp < CP_MAX) {
        let karma = player.persistentData.getInt(PDK_KARMA) + 5
        player.persistentData.putInt(PDK_KARMA, karma)
        player.potionEffects.add(EFFECT_KARMA, -1, karma - 1, true, false)
    }
    player.persistentData.putInt(PDK_RESULT_TYPE, RESULT_FAILURE)
}

/**
 * 装备时初始化哔哔机状态：设置随机延迟、清空任务残留、施加效果
 * @param {Internal.LivingEntity} player
 * @param {number} now 当前服务端 tick
 */
function initState(player, now) {
    player.persistentData.putInt(PDK_NEXT, now + randomDelay(player))
    player.persistentData.putInt(PDK_GARBLED_END, 0)
    player.persistentData.putInt(PDK_TASK, -1)
    player.persistentData.putInt(PDK_PROGRESS, 0)
    reapplyEffects(player)
}

// ============================================================
// 注册
// ============================================================

StartupEvents.registry("item", event => {
    event.create('beeper')
        .displayName('哔哔机')
        .maxStackSize(1)
        .rarity('uncommon')
        .tag('curios:belt')
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .curioTick((slotContext, stack) => {
                    const player = slotContext.entity()
                    if (!player || !player.isPlayer() || player.level.isClientSide()) return
                    const now = player.server.tickCount

                    if (now % TICKS_REAPPLY === 0) reapplyEffects(player)

                    const garbledEnd = player.persistentData.getInt(PDK_GARBLED_END)
                    if (garbledEnd > 0) {
                        if (now < garbledEnd) {
                            player.setStatusMessage(Text.translate('msg.beeper.signal'))
                            return
                        }
                        const t = player.persistentData.getInt(PDK_RESULT_TYPE)
                        if (t === RESULT_NONE) showTask(player, now)
                        else                      showResult(player, now, t)
                        player.persistentData.putInt(PDK_GARBLED_END, 0)
                        player.persistentData.putInt(PDK_RESULT_TYPE, RESULT_NONE)
                        return
                    }

                    const nextCmd = player.persistentData.getInt(PDK_NEXT)
                    if (nextCmd <= 0 || nextCmd > now + TICKS_5MIN * 2) {
                        player.persistentData.putInt(PDK_NEXT, now + randomDelay(player))
                        return
                    }
                    if (now >= nextCmd) {
                        const prev = player.persistentData.getInt(PDK_TASK)
                        if (prev >= 0) failTask(player)
                        player.persistentData.putInt(PDK_TASK, -1)
                        player.persistentData.putInt(PDK_PROGRESS, 0)
                        player.persistentData.putInt(PDK_GARBLED_END, now + TICKS_1SEC)
                    }
                })
                .onEquip((slotContext, oldStack, newStack) => {
                    const player = slotContext.entity()
                    if (!player || !player.isPlayer() || player.level.isClientSide()) return
                    initState(player, player.server.tickCount)
                })
                .canEquip((slotContext, stack) => true)
                .canUnequip((slotContext, stack) => {
                    const player = slotContext.entity()
                    if (player && player.isPlayer() && !player.level.isClientSide()) {
                        const s = player.server
                        s.runCommandSilent(`effect clear ${player.gameProfile.name} kubejs:command_protection`)
                        s.runCommandSilent(`effect clear ${player.gameProfile.name} kubejs:karma`)
                        player.persistentData.putInt(PDK_TASK, -1)
                        player.persistentData.putInt(PDK_PROGRESS, 0)
                        player.persistentData.putInt(PDK_GARBLED_END, 0)
                    }
                    return true
                })
        )
})
