// 移植自 Infinity Reborn v3.4:
//   - 清理扫帚合成
//   - 三个神器(七星剑/上善若水/野草)融合圣坛配方
//     源配方材料中本包不存在的 mod 物品已删除/替换(见各配方注释), 解锁条件改为蓝图进度
// 生效: /kubejs reload server_scripts
// ⚠ 格式对照 Spectrum 1.11.9 实际配方: fluid 用对象 {"fluid": ...}, result 用 "id",
//   world_conditions 为平铺对象数组(如 {"time_of_day":"midnight","moon_phase":"new_moon"})
ServerEvents.recipes(event => {
    event.shaped('kubejs:sao_di', [
        '  A',
        'BC ',
        'BB '
    ], {
        A: 'minecraft:stick',
        B: 'minecraft:hay_block',
        C: 'minecraft:redstone'
    })

    // ============ 七星剑(融合圣坛) ============
    // 源: 5 种流星(spectrum:shooting_star_* 旧名→gemstone/colorful/glistering/pristine/fiery_shooting_star)
    //     + 下界之星 + 神器锭×8(本包无→下界合金锭×8)
    // 解锁: 进度 kubejs:blueprint/qixing_sword(七星剑图纸右键)
    event.custom({
        type: "spectrum:fusion_shrine",
        "time": 500,
        "experience": 5000.0,
        "fluid": { "fluid": "spectrum:liquid_crystal" },
        "ingredients": [
            "spectrum:gemstone_shooting_star",
            "spectrum:colorful_shooting_star",
            "spectrum:glistering_shooting_star",
            "spectrum:pristine_shooting_star",
            "spectrum:fiery_shooting_star",
            "minecraft:nether_star"
        ],
        "result": { "id": "kubejs:qixing_sword", "count": 1 },
        "required_advancement": "kubejs:blueprint/qixing_sword",
        "world_conditions": [ { "time_of_day": "midnight", "moon_phase": "new_moon" } ],
        "start_crafting_effect": "nothing",
        "during_crafting_effects": [ "visual_explosions_on_shrine" ],
        "finish_crafting_effect": "lightning_on_shrine",
        "description": "§0新月之时,午夜之刻,以星铸刃"
    })

    // ============ 上善若水(融合圣坛) ============
    // 源: 水族珍珠→海洋之心, 强化棒×2→鹦鹉螺壳×2, 霜核×5→浮冰×5, 水族锭×20→海晶砂×20,
    //     潮涌核心×2(保留), 神器锭×5→下界合金锭×5
    // 解锁: 进度 kubejs:blueprint/ruoshui_sword(上善若水图纸右键)
    event.custom({
        type: "spectrum:fusion_shrine",
        "time": 300,
        "experience": 100.0,
        "fluid": { "fluid": "minecraft:water" },
        "ingredients": [
            "minecraft:heart_of_the_sea",
            { "item": "minecraft:nautilus_shell", "count": 2 },
            { "item": "minecraft:blue_ice", "count": 5 },
            { "item": "minecraft:prismarine_crystals", "count": 20 },
            { "item": "minecraft:conduit", "count": 2 }
        ],
        "result": { "id": "kubejs:ruoshui_sword", "count": 1 },
        "required_advancement": "kubejs:blueprint/ruoshui_sword",
        "world_conditions": [],
        "start_crafting_effect": "nothing",
        "during_crafting_effects": [ "visual_explosions_on_shrine" ],
        "finish_crafting_effect": "lightning_on_shrine",
        "description": "§3§l来自海洋的力量"
    })

    // ============ 野草(融合圣坛) ============
    // 源: 无饥饿环→金苹果, 强化棒×2→植被精华×2(spectrum:vegetal), 神圣锭×10→金锭×10,
    //     神器锭×4→下界合金锭×4
    // 解锁: 进度 kubejs:blueprint/yecao_sword(野草图纸右键)
    event.custom({
        type: "spectrum:fusion_shrine",
        "time": 300,
        "experience": 100.0,
        "ingredients": [
            "minecraft:golden_apple",
            { "item": "spectrum:vegetal", "count": 2 },
            { "item": "minecraft:gold_ingot", "count": 10 },
            { "item": 'minecraft:short_grass', "count": 5 }
        ],
        "result": { "id": "kubejs:yecao_sword", "count": 1 },
        "required_advancement": "kubejs:blueprint/yecao_sword",
        "world_conditions": [ { "time_of_day": "day", "weather": "clear_sky" } ],
        "start_crafting_effect": "nothing",
        "during_crafting_effects": [ "visual_explosions_on_shrine" ],
        "finish_crafting_effect": "lightning_on_shrine",
        "description": "§6§l在一个阳光明媚的清晨茁壮生长"
    })
})
