ItemEvents.entityInteracted(event => {
    const { player, target, item } = event

    if (!player || !target) return
    if (player.persistentData.getByte(PD_KEY_DIFFICULTY) !== 5) return
    
    if (item.id !== 'minecraft:flint_and_steel') return
    if (target.type != 'minecraft:creeper') return

    event.cancel()
})
