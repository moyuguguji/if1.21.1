PlayerEvents.loggedIn(event => {
    const { server, player } = event
    server.scheduleInTicks(20, schedule => {
		player.tell(Text.translate('msg.chat.welcome'))
        if (player.persistentData.getBoolean(PD_KEY_FIRST_LOGIN)) return
        
	    player.persistentData.putBoolean(PD_KEY_FIRST_LOGIN, true)
        player.persistentData.putByte(PD_KEY_DIFFICULTY, 1)

        player.give('kubejs:difficulty_changer')
	    player.give('minecraft:amethyst_shard')
	    player.give('spectrum:citrine_shard')
	    player.give('spectrum:topaz_shard')
	})
})