// priority: 100
// 幸运7 - charm 饰品：每第 7 次攻击造成 77%~777% 随机伤害
// 伤害判定见 server_scripts/event/lucky_seven.js

// ======================== 常量（与 server_scripts 保持一致） ========================

let PDK_LUCKY_HITS = 'kubejs:lucky_seven_hits'

// ======================== 饰品注册 ========================

StartupEvents.registry('item', event => {
    event.create('lucky_seven')
        .maxStackSize(1)
        .rarity('rare')
        .tag('curios:charm')
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .onEquip((slotContext, oldStack, newStack) => {
                    const player = slotContext.entity()
                    if (!player || !player.isPlayer() || player.level.isClientSide()) return
                    // 戴上即重新计数
                    player.persistentData.putInt(PDK_LUCKY_HITS, 0)
                    player.setStatusMessage(Text.translate('msg.lucky_seven.equip'))
                })
                .onUnequip((slotContext, oldStack, newStack) => {
                    const player = slotContext.entity()
                    if (!player || !player.isPlayer() || player.level.isClientSide()) return
                    player.persistentData.putInt(PDK_LUCKY_HITS, 0)
                })
                .canEquip((slotContext, stack) => true)
                .canUnequip((slotContext, stack) => true)
        )
})
