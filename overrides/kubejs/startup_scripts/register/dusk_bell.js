// priority: 100
// 黄昏之钟 - 物品注册
// 名字与金色配色见 lang: item.kubejs.dusk_bell = §6黄昏之钟
// 纹理暂用原版时钟, 可替换为 kubejs:item/dusk_bell

StartupEvents.registry('item', event => {
    event.create('dusk_bell')
        .maxStackSize(1)
        .rarity('rare')
})
