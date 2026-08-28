// 神器图纸合成: 同神器 4 碎片(各一个, 无序)→ 对应神器图纸
// 生效: /kubejs reload server_scripts
ServerEvents.recipes(event => {
    event.shapeless('kubejs:blueprint_qixing_sword', [
        'kubejs:qixing_shard_1', 'kubejs:qixing_shard_2', 'kubejs:qixing_shard_3', 'kubejs:qixing_shard_4'
    ])
    event.shapeless('kubejs:blueprint_ruoshui_sword', [
        'kubejs:ruoshui_shard_1', 'kubejs:ruoshui_shard_2', 'kubejs:ruoshui_shard_3', 'kubejs:ruoshui_shard_4'
    ])
    event.shapeless('kubejs:blueprint_yecao_sword', [
        'kubejs:yecao_shard_1', 'kubejs:yecao_shard_2', 'kubejs:yecao_shard_3', 'kubejs:yecao_shard_4'
    ])
})
