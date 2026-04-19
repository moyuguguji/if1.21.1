EntityEvents.spawned(event => {
    const { entity, server } = event
    if (LIST_BOSSES.includes(entity.type)) {
        entity.potionEffects.add('minecraft:glowing', 999999999, 0)
        server.tell(Text.translate('msg.chat.boss.spawn', entity.displayName))
    }
})
