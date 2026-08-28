// ============================================================
// 难度战利品掉落(LootJS 3.7)
// 从参考包移植: 按玩家难度(persistentData 'difficulty' 0-5)控制掉落
//   本包难度: 0=journey 1=classic 2=expert 3=master 4=death 5=eternity
//   对应参考包 stage: normal=1 hard=2 impossible=3 impossibleplus=4 yonghen=5
// 方案: 用 matchPlayerCustom 读开箱者/击杀者的 persistentData(不引入 KubeJS stage)
// 生效: /kubejs reload server_scripts
// ============================================================

let DIFF_KEY = 'difficulty'
let DEATH_TOME = 'twilightforest:death_tome'

/** 难度 >= min(玩家 persistentData) */
function diffAtLeast(player, min) {
    return player != null && player.persistentData.getByte(DIFF_KEY) >= min
}
/** 难度在 [min, max] */
function diffBetween(player, min, max) {
    if (!player) return false
    let d = player.persistentData.getByte(DIFF_KEY)
    return d >= min && d <= max
}
/** 怪物(排除死亡之书) */
function isLootMonster(entity) {
    return entity != null && entity.isMonster() && entity.type !== DEATH_TOME
}

LootJS.modifiers(event => {

    // 1. 凋灵骷髅: 必掉骷髅头(难度≥3 master/impossibleplus/yonghen)
    event.addEntityModifier("minecraft:wither_skeleton")
        .randomChance(1.0)
        .matchPlayerCustom(p => diffAtLeast(p, 3))
        .addLoot("minecraft:wither_skeleton_skull")

    // 2. 箱子: 附魔书 5-30 级(难度 1-2 classic/expert)
    event.addTableModifier(LootType.CHEST)
        .randomChance(0.35)
        .matchPlayerCustom(p => diffBetween(p, 1, 2))
        .pool(pool => {
            pool.addEntry(LootEntry.of("minecraft:book").enchantWithLevels([5, 30]))
        })

    // 3. 箱子: 附魔书 15-45 级(难度≥3)
    event.addTableModifier(LootType.CHEST)
        .randomChance(0.35)
        .matchPlayerCustom(p => diffAtLeast(p, 3))
        .pool(pool => {
            pool.addEntry(LootEntry.of("minecraft:book").enchantWithLevels([15, 45]))
        })

    // 4. 怪物: 稀有附魔书 10-40 级(难度≥4), 每只限 1 本
    event.addTableModifier(LootType.ENTITY)
        .randomChance(0.025)
        .matchPlayerCustom(p => diffAtLeast(p, 4))
        .matchEntityCustom(e => isLootMonster(e))
        .pool(pool => {
            pool.addEntry(LootEntry.of("minecraft:book").enchantWithLevels([10, 40]).limitCount(1, 1))
        })
    // 5. 怪物: 矿物掉落(难度≥1), 20% 概率触发, 池 roll 1 次按权重抽一种
    //    ⚠ addLoot 会把所有条目都加入掉落(全掉), 权重抽选必须用 pool
    event.addTableModifier(LootType.ENTITY)
        .randomChance(0.2)
        .matchPlayerCustom(p => diffAtLeast(p, 1))
        .matchEntityCustom(e => isLootMonster(e))
        .pool(pool => {
            pool.addEntry(LootEntry.of("minecraft:diamond").withWeight(20))
            pool.addEntry(LootEntry.of("minecraft:iron_ingot").withWeight(60))
            pool.addEntry(LootEntry.of("minecraft:emerald").withWeight(10))
            pool.addEntry(LootEntry.of("minecraft:gold_ingot").withWeight(25))
        })
})
