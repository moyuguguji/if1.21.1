// priority: 100
// 移植自 Infinity Reborn v3.4(1.18.2 Fabric + KubeJS 5.5)→ 本包 1.21.1 + KubeJS 7.2
// 第一代 Infinity 整合包武器: 七星剑 / 上善若水 / 野草 / 清理扫帚
// 源版本 shenqi tier 由 tiered mod 配套自定义(附魔能力30, 修复=神器碎片#kubejs:shenqi_shard),
// 本包无 tiered mod 与神器碎片 → 用 modifyTier 基于默认 tier 修改: 附魔能力保持 30, 修复材料改用下界合金锭
// tooltip 统一走 client_scripts/event/item_tooltips.js 的 lang 机制(item.kubejs.xxx.tooltip.N)
// 特效逻辑见 server_scripts/event/legacy_weapons.js, 合成见 server_scripts/recipe/legacy_weapons.js

StartupEvents.registry('item', event => {
    // ============ 七星剑 ============
    event.create('qixing_sword', 'sword')
        .modifyTier(t => {
            t.setUses(9999)   // ⚠ 剑耐久由 tier.uses 决定, .maxDamage() 被 TieredItem 覆盖无效
            t.setEnchantmentValue(30)
            t.setRepairIngredient('minecraft:netherite_ingot')
        })
        .attackDamageBonus(32)
        .maxStackSize(1)
        .speedBaseline(-1.1)
        .rarity('uncommon')

    // ============ 上善若水(若水剑) ============
    event.create('ruoshui_sword', 'sword')
        .modifyTier(t => {
            t.setUses(9999)   // ⚠ 剑耐久由 tier.uses 决定, .maxDamage() 被 TieredItem 覆盖无效
            t.setEnchantmentValue(30)
            t.setRepairIngredient('minecraft:netherite_ingot')
        })
        .attackDamageBonus(15)
        .maxStackSize(1)
        .speedBaseline(-1.6)
        .rarity('uncommon')

    // ============ 野草 ============
    event.create('yecao_sword', 'sword')
        .modifyTier(t => {
            t.setUses(9999)   // ⚠ 剑耐久由 tier.uses 决定, .maxDamage() 被 TieredItem 覆盖无效
            t.setEnchantmentValue(30)
            t.setRepairIngredient('minecraft:netherite_ingot')
        })
        .attackDamageBonus(13)
        .maxStackSize(1)
        .speedBaseline(-1.6)
        .rarity('uncommon')

    // ============ 清理扫帚 ============
    event.create('sao_di')
        .rarity('epic')
})
