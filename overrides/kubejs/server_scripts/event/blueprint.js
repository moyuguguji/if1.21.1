// 神器图纸右键 → 完成对应解锁进度(空进度 criteria=impossible, 只能由本脚本授予)
// 规则:
//   - 右键消耗 1 张图纸(item.shrink)
//   - 已解锁的神器不再触发(不消耗, 不提示) — persistentData 标记
// 进度定义见 data/kubejs/advancement/blueprint/, 物品见 startup_scripts/register/blueprint.js
// 生效: /kubejs reload server_scripts

/** 图纸 → 对应解锁进度 */
let BLUEPRINT_ADVANCEMENTS = {
    'kubejs:blueprint_qixing_sword': { advancement: 'kubejs:blueprint/qixing_sword', name: '七星剑' },
    'kubejs:blueprint_ruoshui_sword': { advancement: 'kubejs:blueprint/ruoshui_sword', name: '上善若水' },
    'kubejs:blueprint_yecao_sword': { advancement: 'kubejs:blueprint/yecao_sword', name: '野草' }
}

ItemEvents.rightClicked(event => {
    const { player, server, item } = event
    if (!player || !item) return
    let entry = BLUEPRINT_ADVANCEMENTS[item.id]
    if (!entry) return
    // 已解锁: 不再触发(不消耗)
    let flag = 'kubejs:unlocked_' + item.id.replace('kubejs:', '')
    if (player.persistentData.getBoolean(flag)) return
    player.persistentData.putBoolean(flag, true)
    // 授予进度 + 消耗图纸
    server.runCommandSilent(`advancement grant ${player.username} only ${entry.advancement}`)
    item.shrink(1)
    player.tell(Text.translate('msg.blueprint.unlock', entry.name).color('gold'))
})
