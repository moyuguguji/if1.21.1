EntityEvents.spawned(event => {
    const { entity, server } = event
    if (LIST_BOSSES.includes(entity.type)) {
        entity.potionEffects.add('minecraft:glowing', -1, 0)
        server.tell(Text.translate('msg.chat.boss.spawn', entity.displayName).color('dark_purple'))
    }
})
