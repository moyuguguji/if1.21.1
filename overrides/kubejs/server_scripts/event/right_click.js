ItemEvents.rightClicked(event => {
	let player = event.player
	if (!player) return
	let item = player.getHeldItem("main_hand").id
	if (item && item in rightClickEventMainHand) {
		rightClickEventMainHand[item](event)
		return
	}
	item = event.item.id
})

const rightClickEventMainHand = {
	"kubejs:moon_clock": function(event) {
		switch (event.level.getMoonPhase()) {
			case 0:
				event.server.runCommandSilent(`time add 4d`)
				event.player.mainHandItem.count -= 1
				break;
			case 1:
				event.server.runCommandSilent(`time add 3d`)
				event.player.mainHandItem.count -= 1
				break;
			case 2:
				event.server.runCommandSilent(`time add 2d`)
				event.player.mainHandItem.count -= 1
				break;
			case 3:
				event.server.runCommandSilent(`time add 1d`)
				event.player.mainHandItem.count -= 1
				break;
			case 4:
				break;
			case 5:
				event.server.runCommandSilent(`time add 7d`)
				event.player.mainHandItem.count -= 1
				break;
			case 6:
				event.server.runCommandSilent(`time add 6d`)
				event.player.mainHandItem.count -= 1
				break;
			case 7:
				event.server.runCommandSilent(`time add 5d`)
				event.player.mainHandItem.count -= 1
				break;
			}
		},
	"spectrum:crescent_clock": function(event) {
		let player = event.player
		switch (event.level.getMoonPhase()) {
			case 0:
				event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"今天的月相是满月","color":"aqua","bold":true}`)
				//event.server.tell(`今天的月相是满月`)
				break;
			case 1:
				event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"今天的月相是亏凸月","color":"aqua","bold":true}`)
				break;
			case 2:
				event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"今天的月相是下弦月","color":"aqua","bold":true}`)
				//event.server.tell(`今天的月相是下弦月`)
				break;
			case 3:
				event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"今天的月相是残月","color":"aqua","bold":true}`)
				//event.server.tell(`今天的月相是残月`)
				break;
			case 4:
				event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"今天的月相是新月","color":"aqua","bold":true}`)
				//event.server.tell(`今天的月相是新月`)
				break;
			case 5:
				event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"今天的月相是蛾眉月","color":"aqua","bold":true}`)
				//event.server.tell(`今天的月相是蛾眉月`)
				break;
			case 6:
				event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"今天的月相是上弦月","color":"aqua","bold":true}`)
				//event.server.tell(`今天的月相是上弦月`)
				break;
			case 7:
				event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"今天的月相是盈凸月","color":"aqua","bold":true}`)
				//event.server.tell(`今天的月相是盈凸月`)
				break;
		}
	},
	"kubejs:yong_hen_star": function(event) {
		let player = event.player
		if (player.getHeldItem("off_hand") != null) {
			event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"你无法在副手持有物品时使用该物品","color":"red","bold":true}`)
		} else if (player.stages.has("difficulty_yonghen")) {
			player.stages.remove("difficulty_easy")
			player.stages.remove("difficulty_normal")
			player.stages.remove("difficulty_hard")
			player.stages.remove("difficulty_impossible")
			player.stages.remove("difficulty_impossibleplus")
			player.stages.remove("difficulty_yonghen")
			player.stages.add("difficulty_easy")
			player.playSound("minecraft:entity.ender_dragon.ambient")
			event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"当前难度：旅途","color":"green","bold":true}`)
		} else if (!player.stages.has("lb")) {
			player.stages.remove("difficulty_easy")
			player.stages.remove("difficulty_normal")
			player.stages.remove("difficulty_hard")
			player.stages.remove("difficulty_impossible")
			player.stages.remove("difficulty_impossibleplus")
			player.stages.remove("difficulty_yonghen")
			player.stages.add("difficulty_yonghen")
			player.playSound("minecraft:entity.ender_dragon.growl")
			event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"当前难度：永恒","color":"aqua","bold":true}`)
		} else {
			player.stages.remove("difficulty_easy")
			player.stages.remove("difficulty_normal")
			player.stages.remove("difficulty_hard")
			player.stages.remove("difficulty_impossible")
			player.stages.remove("difficulty_impossibleplus")
			player.stages.remove("difficulty_yonghen")
			player.stages.add("difficulty_yonghen")
			player.playSound("minecraft:entity.ender_dragon.growl")
			event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"当前难度：永恒","color":"aqua","bold":true}`)
		}
	},
	"kubejs:difficulty_changer": function(event) {
		let player = event.player
		if (player.getHeldItem("off_hand") != null) {
			event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"你无法在副手持有物品时使用该物品","color":"red","bold":true}`)
		} else {
			if (player.stages.has("difficulty_easy")) {
				player.stages.remove("difficulty_easy")
				player.stages.remove("difficulty_normal")
				player.stages.remove("difficulty_hard")
				player.stages.remove("difficulty_impossible")
				player.stages.remove("difficulty_yonghen")
				player.stages.add("difficulty_normal")
				player.playSound
				event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"当前难度：经典","color":"yellow","bold":true}`)
			} else if (player.stages.has("difficulty_normal")) {
				player.stages.remove("difficulty_easy")
				player.stages.remove("difficulty_normal")
				player.stages.remove("difficulty_hard")
				player.stages.remove("difficulty_impossible")
				player.stages.remove("difficulty_yonghen")
				player.stages.add("difficulty_hard")
				player.playSound("minecraft:entity.arrow.hit_player")
				event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"当前难度：专家","color":"red","bold":true}`)
			} else if (player.stages.has("difficulty_hard")) {
				player.stages.remove("difficulty_easy")
				player.stages.remove("difficulty_normal")
				player.stages.remove("difficulty_hard")
				player.stages.remove("difficulty_impossible")
				player.stages.remove("difficulty_yonghen")
				player.stages.add("difficulty_impossible")
				player.playSound("minecraft:entity.arrow.hit_player")
				event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"当前难度：大师","color":"dark_red","bold":true}`)
			} else if (player.stages.has("difficulty_impossible")) {
				player.stages.remove("difficulty_easy")
				player.stages.remove("difficulty_normal")
				player.stages.remove("difficulty_hard")
				player.stages.remove("difficulty_impossible")
				player.stages.remove("difficulty_impossibleplus")
				player.stages.remove("difficulty_yonghen")
				player.stages.add("difficulty_impossibleplus")
				player.playSound("minecraft:entity.arrow.hit_player")
				event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"当前难度：死亡","color":"dark_red","bold":true}`)
			} else if (player.stages.has("difficulty_yonghen")) {
				player.stages.remove("difficulty_easy")
				player.stages.remove("difficulty_normal")
				player.stages.remove("difficulty_hard")
				player.stages.remove("difficulty_impossible")
				player.stages.remove("difficulty_impossibleplus")
				player.stages.remove("difficulty_yonghen")
				player.stages.add("difficulty_easy")
				player.playSound("minecraft:entity.arrow.hit_player")
				event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"当前难度：旅途","color":"green","bold":true}`)
			} else {
				player.stages.remove("difficulty_easy")
				player.stages.remove("difficulty_normal")
				player.stages.remove("difficulty_hard")
				player.stages.remove("difficulty_impossible")
				player.stages.remove("difficulty_impossibleplus")
				player.stages.remove("difficulty_yonghen")
				player.stages.add("difficulty_easy")
				player.playSound("minecraft:entity.arrow.hit_player")
				event.server.runCommandSilent(`title ${player.profile.name} actionbar {"text":"当前难度：旅途","color":"green","bold":true}`)
			}
		}
	}
}