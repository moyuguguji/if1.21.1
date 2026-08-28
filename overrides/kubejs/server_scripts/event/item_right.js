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
            if (!player.persistentData.getBoolean(PD_KEY_present)) {
                player.persistentData.putBoolean(PD_KEY_present, true)
                let yonghen = [
				'twilightforest:travellers_goggles[twilightforest:auto_repair_probability=0.001f]',
                'twilightforest:travellers_vest[twilightforest:auto_repair_probability=0.001f]',
                'twilightforest:travellers_wings[twilightforest:auto_repair_probability=0.001f]',
                'twilightforest:travellers_boots[twilightforest:unrestrained={},twilightforest:auto_repair_probability=0.001f]',
                'backpacked:backpack[backpacked:unlockable_slots={maxSlots:45,slots:[I;0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44]},backpacked:unlockable_augment_bays={maxSlots:3,slots:[I;0,1,2]},container=[{item:{components:{"minecraft:block_entity_data":{id:"refinedstorage:controller",stored:1000L}},count:1,id:"refinedstorage:creative_controller"},slot:0},{item:{count:1,id:"refinedstorage:crafting_grid"},slot:1},{item:{count:1,id:"refinedstorage:disk_drive"},slot:2},{item:{components:{"refinedstorage:storage_reference":[I;925337299,-1234745608,-1175986604,1375652889]},count:1,id:"refinedstorage:256b_fluid_storage_disk"},slot:3},{item:{components:{"refinedstorage:storage_reference":[I;-1396880537,294013663,-1435254198,1684291267]},count:1,id:"refinedstorage:4k_storage_disk"},slot:4},{item:{count:1,id:"exposure:camera"},slot:5},{item:{count:16,id:"exposure:color_film"},slot:6},{item:{count:1,id:"waystones:warp_stone"},slot:7},{item:{count:4,id:"waystones:waystone"},slot:8},{item:{count:16,id:"kaleidoscope_cookery:baozi"},slot:9},{item:{count:1,id:"hookshot:white_hookshot"},slot:10},{item:{count:1,id:"bew76:wrench"},slot:11},{item:{count:1,id:"naturescompass:naturescompass"},slot:12},{item:{count:1,id:"minecraft:spyglass"},slot:13},{item:{count:1,id:"minecraft:lantern"},slot:14},{item:{count:1,id:"collectorsalbum:album"},slot:15}]]',
                'fargo_soul:wood_soul'
			]
			for (let index = 0; index < yonghen.length; index++) {
				player.give(yonghen[index])
			}
            }
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
