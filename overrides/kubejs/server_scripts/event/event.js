EntityEvents.spawned(event => {
	let bossName = bossList[event.getEntity().type]
	if (!bossName) return
    event.entity.potionEffects.add('minecraft:glowing', 999999999, 0)
	event.server.tell(`\u00A75${bossName}已经苏醒!`)
})
