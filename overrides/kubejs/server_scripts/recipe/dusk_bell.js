// ============================================================
// 黄昏之钟 - 七彩基座(CMY)配方
// 有型 3x3: [ABA, BCB, ABA]  A=黄色颜料 B=橙色颜料 C=钟
// 所需颜料: 品红 x10(紫水晶色), 黄 x20(黄水晶色) —— colors 键用 16 色颜色 ID
// 前置: spectrum:collect_all_basic_pigments_besides_brown
// ============================================================

ServerEvents.recipes(event => {
    event.custom({
        "type": "spectrum:pedestal",
        "tier": "simple",
        "colors": {
            "spectrum:magenta": 10,
            "spectrum:yellow": 20
        },
        "time": 400,
        "experience": 2.0,
        "pattern": ["ABA", "BCB", "ABA"],
        "key": {
            "A": { "item": "spectrum:yellow_pigment" },
            "B": { "item": "spectrum:orange_pigment" },
            "C": { "item": "minecraft:clock" }
        },
        "result": { "id": "kubejs:dusk_bell", "count": 1 },
        "required_advancement": "spectrum:collect_all_basic_pigments_besides_brown"
    })
})
