// priority: 100
// 自定义效果注册

/**
 * @type {import("dev.latvian.mods.kubejs.mob_effect.MobEffectBuilder").$MobEffectBuilder}
 * @type {import("net.minecraft.world.effect.MobEffectCategory").$MobEffectCategory}
 */

StartupEvents.registry("mob_effect", event => {
    // 指令加护 - 正面buff
    // 每层: +0.5 攻击力(属性), -2% 受到伤害(在 before_hurt 中处理)
    event.create('command_protection')
        .beneficial()
        .color(0xFFD700)
        .modifyAttribute('minecraft:generic.attack_damage', 'kubejs:command_protection_damage', 0.5, 'add_value')

    // 业 - 中性buff
    // 每3层: -1 护甲值, -0.5 护甲韧性
    event.create('karma')
        .category('neutral')
        .color(0x8B0000)
        .modifyAttribute('minecraft:generic.armor', 'kubejs:karma_armor', -1 / 3, 'add_value')
        .modifyAttribute('minecraft:generic.armor_toughness', 'kubejs:karma_toughness', -1 / 6, 'add_value')
})
