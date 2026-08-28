// 神器图纸碎片: 所有箱子 1% 概率随机出一个(每神器 4 个, 共 12 个, 由统一 tag 展开)
// 静态表修改(LootJS.lootTables) → EMI 可见, 配合 emi_loot_fix
// 生效: /kubejs reload server_scripts
LootJS.lootTables(event => {
    event.modifyLootTables(LootType.CHEST)
        .createPool(pool => {
            pool.when(conditions => conditions.randomChance(0.01))
            // LootEntry.tag: tag 条目 roll 时从 kubejs:artifact_blueprint_shards 随机一个碎片
            pool.addEntry(LootEntry.tag('kubejs:artifact_blueprint_shards'))
        })
})
