EntityEvents.death(event => {
    const { entity, server } = event
    if (LIST_BOSSES.includes(entity.type || isBossByTag(entity))) {
        server.tell(Text.translate('msg.chat.boss.death', entity.displayName).color('dark_purple'))
    }
})
