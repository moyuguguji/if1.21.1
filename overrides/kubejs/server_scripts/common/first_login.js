PlayerEvents.loggedIn(event => {
	// 检测玩家是否有阶段
	if (event.player.stages.has('nether')) return
	// 没有则添加该阶段
	event.player.stages.add('nether')
	//event.player.give(Item.of('emerald_tools:copper_sword', `{Unbreakable:1b,swa3:{}}`))
	//event.player.give(Item.of('treeaxe:copper_treeaxe', `{Unbreakable:1b,swa3:{}}`))
	//event.player.give(Item.of('emerald_tools:copper_pickaxe', `{Unbreakable:1b,swa3:{}}`))
	event.player.give(Item.of('kubejs:difficulty_changer'))
	event.player.give('antiqueatlas:empty_antique_atlas')
	event.player.give('minecraft:amethyst_shard')
	event.player.give('spectrum:citrine_shard')
	event.player.give('spectrum:topaz_shard')
	event.server.scheduleInTicks(100, schedule => {
		event.player.tell(`§e如果游玩过程中发现BUG请加群§c144825716`)

	})
	let playerName = event.player.name

	if (exclItemList[playerName] && playerName != null) {
		exclItemList[playerName].forEach(item => {
			event.player.give(item)
		})
	}
})