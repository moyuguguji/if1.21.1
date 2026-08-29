// ============================================================
// 神圣锭(servantry:hallowed_ingot)- 融合圣坛(Spectrum Fusion Shrine)配方
// 材料: 铜锭 x1 + 铁木锭(twilightforest:ironwood_ingot)x1 + 金锭 x1
// 无前置进度 / 无世界条件 / 无液体要求(省略 fluid = 圣坛须为空,wiki 确认)
// 其余字段全部省略: time 默认 200 ticks, experience 默认 0
// ============================================================

ServerEvents.recipes(event => {
    event.custom({
        "type": "spectrum:fusion_shrine",
        "ingredients": [
            "minecraft:copper_ingot",
            "twilightforest:ironwood_ingot",
            "minecraft:gold_ingot"
        ],
        "result": { "id": "servantry:hallowed_ingot", "count": 1 }
    }).id("kubejs:fusion_shrine/hallowed_ingot")
})
