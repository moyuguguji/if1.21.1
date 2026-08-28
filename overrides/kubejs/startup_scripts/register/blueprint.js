// priority: 100
// 神器图纸碎片(每神器 4 个) + 神器图纸(七星剑/上善若水/野草)
// 碎片统一标签 kubejs:artifact_blueprint_shards(注册时 .tag 生成)
// 同神器 4 碎片合成对应图纸见 server_scripts/recipe/blueprint.js
// 图纸右键解锁对应进度(消耗图纸, 已解锁不触发)见 server_scripts/event/blueprint.js
// tooltip 统一走 client_scripts/event/item_tooltips.js 的 lang 机制(item.kubejs.xxx.tooltip.N)

StartupEvents.registry('item', event => {
    // ============ 神器图纸碎片(每神器 4 个) ============
    let shardGroups = {
        qixing: { label: '七星剑' },
        ruoshui: { label: '上善若水' },
        yecao: { label: '野草' }
    }
    Object.keys(shardGroups).forEach(sword => {
        for (let i = 1; i <= 4; i++) {
            event.create(`${sword}_shard_${i}`)
                .tag('kubejs:artifact_blueprint_shards')
                .rarity('uncommon')
                .maxStackSize(16)
        }
    })

    // ============ 神器图纸 ============
    event.create('blueprint_qixing_sword')
        .rarity('epic')
        .maxStackSize(1)
    event.create('blueprint_ruoshui_sword')
        .rarity('epic')
        .maxStackSize(1)
    event.create('blueprint_yecao_sword')
        .rarity('epic')
        .maxStackSize(1)
})
