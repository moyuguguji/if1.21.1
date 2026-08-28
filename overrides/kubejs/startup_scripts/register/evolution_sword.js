// priority: 100
// 进化之剑 - 铁 tier 长剑, 每击杀过一个 BOSS 攻击伤害 +5
// 击杀记录: 服务端读取玩家 persistentData 的 epiphany:boss_killed_* 键(见 epiphany.js 的写入)
// Shift 查看已击杀 BOSS 与加成: server/event/evolution_sword.js 同步剑 NBT, client/event/evolution_sword_tooltip.js 显示

StartupEvents.registry('item', event => {
    event.create('evolution_sword', 'sword')
        .tier('iron')
        .maxDamage(1000)
        .rarity('rare')
        .texture('minecraft:item/iron_sword')   // 暂用原版铁剑纹理, 可替换为 kubejs:item/evolution_sword
})
