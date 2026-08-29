// 神器图纸碎片: 所有箱子 1% + 考古(可疑方块刷扫)0.5%,随机出一个(每神器 4 个, 共 12 个, 由统一 tag 展开)
// 静态表修改(LootJS.lootTables) → EMI 可见, 配合 emi_loot_fix
// 生效: /kubejs reload server_scripts
// ⚠ tag 条目必须 expand=true:vanilla TagEntry(expand=false) 被 roll 抽中时,
//   createItemStack 会把 tag 内全部 12 个碎片一次产出(实测 bug);
//   expand=true 时展开为每个碎片一个独立条目(权重 1),池 roll 1 次只抽一个 → 每次恰好 1 个碎片
LootJS.lootTables(event => {
    // 所有箱子 1%
    event.modifyLootTables(LootType.CHEST)
        .createPool(pool => {
            pool.when(conditions => conditions.randomChance(0.01))
            pool.addEntry(LootEntry.tag('kubejs:artifact_blueprint_shards', true))
        })

    // 考古 0.5%:全部 archaeology 表(可疑沙/砾等,每次刷扫 roll 一次)
    event.modifyLootTables(LootType.ARCHAEOLOGY)
        .createPool(pool => {
            pool.when(conditions => conditions.randomChance(0.005))
            pool.addEntry(LootEntry.tag('kubejs:artifact_blueprint_shards', true))
        })
})
