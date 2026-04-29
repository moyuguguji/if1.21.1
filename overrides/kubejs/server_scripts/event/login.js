PlayerEvents.loggedIn(event => {
    const { server, player } = event
     // 哔哔机：重置任务状态，如果上次任务时间已过或未设置则 1 分钟后刷新，否则保留
        player.persistentData.putInt(PD_KEY_BEEPER_TASK, -1)
        player.persistentData.putInt(PD_KEY_BEEPER_PROGRESS, 0)
        player.persistentData.putInt(PD_KEY_BEEPER_GARBLED_END, 0)
        player.persistentData.putInt(PD_KEY_BEEPER_COMPLETED_MASK, 0)
        let nextCmd = player.persistentData.getInt(PD_KEY_BEEPER_NEXT)
        if (nextCmd <= 0 || nextCmd < server.tickCount) {
            player.persistentData.putInt(PD_KEY_BEEPER_NEXT, server.tickCount + TICKS_1MIN)
        }
    server.scheduleInTicks(20, schedule => {
        player.tell(Text.translate('msg.chat.welcome'))
        player.tell(Text.translate('msg.chat.welcome1'))
        if (player.persistentData.getBoolean(PD_KEY_FIRST_LOGIN)) return

        player.persistentData.putBoolean(PD_KEY_FIRST_LOGIN, true)
        player.persistentData.putByte(PD_KEY_DIFFICULTY, 1)

        player.give('kubejs:difficulty_changer')
        player.give('minecraft:amethyst_shard')
        player.give('spectrum:citrine_shard')
        player.give('spectrum:topaz_shard')
    })
})