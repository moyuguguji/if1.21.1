// priority: 100
// 哔哔机 - 自定义音效注册

StartupEvents.registry('sound_event', event => {
    event.create('beeper_send')
    event.create('beeper_complete')
})
