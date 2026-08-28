// yigd 墓碑硬度改为与基岩相同(destroySpeed = -1 → 不可破坏)
// ⚠ STARTUP 事件: 改动后必须【完全重启游戏】
// 验证日志: "[grave] destroyTime readback = -1.0" 表示写入成功
BlockEvents.modification(event => {
    event.modify('yigd:grave', block => {
        block.destroySpeed = -1
        console.log('[grave] yigd:grave destroySpeed set to -1')
        // 反射读回实际字段, 验证 KubeJS 写入是否生效
        try {
            let Behaviour = Java.loadClass('net.minecraft.world.level.block.state.BlockBehaviour')
            let f = Behaviour.getDeclaredField('destroyTime')
            f.setAccessible(true)
            console.log('[grave] destroyTime readback =', f.get(block))
        } catch (e) {
            console.log('[grave] readback failed:', String(e))
        }
    })
})
