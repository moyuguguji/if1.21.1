EntityEvents.spawned(event => {
    const { entity, server } = event
    if (LIST_BOSSES.includes(entity.type) || isBossByTag(entity)) {
        if(entity.tags.contains('spawned')) return
        entity.potionEffects.add('minecraft:glowing', -1, 0)
        entity.tags.add('spawned')
        server.tell(Text.translate('msg.chat.boss.spawn', entity.displayName).color('dark_purple'))
    }
})
