// ============================================================
// 物品 Tag 管理(增 / 删 / 改)
// 位置: server_scripts/tag/js/  —— 所有物品 tag 修改集中于此
// 事件: ServerEvents.tags('item', ...)  → /kubejs reload server_scripts 生效
// ⚠️ tag 字符串格式: '命名空间:路径'(对应 data/<ns>/tags/items/<路径>.json)
// ============================================================

ServerEvents.tags('item', event => {

    // ============ 增: 给物品添加 tag ============
    // 例: 幸运7 饰品 → artifacts:artifacts(Artifacts 模组的饰品集合标签)
    //     使其被 Artifacts 的饰品相关机制识别(如神器槽位/掉落/升级)
    event.add('artifacts:artifacts', 'kubejs:lucky_seven')
    event.removeAll('twilightforest:portal/activator')
	event.add('twilightforest:portal/activator', ['kubejs:dusk_bell'])
    // 多个物品同时加 tag: event.add(tag, [物品1, 物品2, ...])
    // event.add('curios:charm', ['kubejs:lucky_seven', 'kubejs:beeper'])

    // 按已有 tag 引用(给某 tag 的所有物品再加一个 tag)
    // event.add('artifacts:artifacts', '#curios:charm')

    // ============ 删: 从 tag 移除物品 ============
    // event.remove('artifacts:artifacts', 'kubejs:xxx')

    // ============ 改: 移除物品上的 tag ============
    // 移除某物品的全部 tag:
    // event.removeAllTagsFrom('kubejs:xxx')
    // 清空整个 tag(不加物品):
    // event.removeAll('minecraft:some_tag')

})
