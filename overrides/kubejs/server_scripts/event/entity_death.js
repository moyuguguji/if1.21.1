EntityEvents.death(event => {
	let entity = event.getEntity();
	let bossName = bossList[entity.type]
	if (!bossName) return
	event.server.tell(`\u00A75${bossName}已被打败!`)
})