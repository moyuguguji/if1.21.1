ItemEvents.rightClicked(event => {
    const { player, item } = event
    if (!player || !item) return
    let handler = itemRightHandlers[item.id]
    if (!handler) return
    handler(event)
    if (event.getHand() == "MAIN_HAND") {
        player.swing()
    }
})


/** @type {Record<string, (event: import("dev.latvian.mods.kubejs.item.ItemClickedKubeEvent").$ItemClickedKubeEvent) => void>} */
let itemRightHandlers = {
    // 新月怀表
    "kubejs:moon_clock": event => {
        const { level, item, server } = event
        let phase = level.getMoonPhase()
        if (phase === 4) return
        let daysToAdd = (4 - phase + 8) % 8
        level.setDayTime(level.getDayTime() + daysToAdd * 24000)
        item.shrink(1)
    },
    // 月相怀表
    "spectrum:crescent_clock": event => {
        const { level, player } = event
        player.setStatusMessage(Text.translate('msg.action.phase', Text.translate(`msg.action.phase.${level.getMoonPhase()}`)))
    },
    // 永恒之星
    "kubejs:yong_hen_star": event => {
        const { player } = event
		let difficulty = player.persistentData.getByte(PD_KEY_DIFFICULTY)
		let sound
		
		if (difficulty === 5) {
			difficulty = 0
			sound = 'minecraft:entity.ender_dragon.ambient'
		} else {
			difficulty = 5
			sound = 'minecraft:entity.ender_dragon.growl'
		}

		player.persistentData.putByte(PD_KEY_DIFFICULTY, difficulty)

		player.playSound(sound)
		player.setStatusMessage(Text.translate(
			'msg.action.difficulty.current',
			Text.translate(`msg.action.difficulty.name.${LIST_DIFFICULTIES[difficulty].name}`)
		).color(LIST_DIFFICULTIES[difficulty].color).bold(true))
    },
    // 难度切换器
    "kubejs:difficulty_changer": event => {
        const { player } = event
        let difficulty = player.persistentData.getByte(PD_KEY_DIFFICULTY)

		difficulty = (difficulty >= 4) ? 0 : ++difficulty
		player.persistentData.putByte(PD_KEY_DIFFICULTY, difficulty)
		
		player.playSound('minecraft:entity.arrow.hit_player')
		player.setStatusMessage(Text.translate(
			'msg.action.difficulty.current',
			Text.translate(`msg.action.difficulty.name.${LIST_DIFFICULTIES[difficulty].name}`)
		).color(LIST_DIFFICULTIES[difficulty].color).bold(true))
    }
}