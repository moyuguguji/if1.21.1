// 幸运7 - 第 7 次攻击时, 7% 概率造成 77%~777% 随机伤害
// 幸运属性加成: 每有 7 点幸运, 触发概率 +7%(不足 7 点不计, 只有满 7 点才提升)
//   概率 = 7% + floor(幸运值 / 7) × 7%
//   幸运 0~6 → 7% | 7~13 → 14% | 14~20 → 21% | ...
// 饰品注册见 startup_scripts/register/lucky_seven.js

// ======================== 常量（与 startup_scripts 保持一致） ========================

let PDK_LUCKY_HITS = 'kubejs:lucky_seven_hits'
let LUCKY_HITS_REQUIRED = 7
let LUCKY_DAMAGE_MIN = 0.77
let LUCKY_DAMAGE_MAX = 7.77
let LUCKY_BASE_CHANCE = 7      // 基础触发概率 %
let LUCKY_LUCK_STEP = 7        // 幸运每满 7 点提升一档
let LUCKY_CHANCE_PER_STEP = 7  // 每档提升的概率 %

/** 计算触发概率: 7% + floor(幸运/7) × 7% */
function luckySevenChance(player) {
    let attr = player.getAttribute('minecraft:generic.luck')
    if (!attr) return LUCKY_BASE_CHANCE
    let luck = attr.getValue()
    return LUCKY_BASE_CHANCE + Math.floor(luck / LUCKY_LUCK_STEP) * LUCKY_CHANCE_PER_STEP
}

// ======================== 攻击计数与触发 ========================
// 佩戴检测使用 KubeJS Curios 附属注入的 isCuriosEquipped()

EntityEvents.beforeHurt(event => {
    const { entity, source, damage } = event
    if (!source || !entity) return
    // 仅统计玩家造成的伤害（近战/弓箭等，source.player 覆盖两者）
    let player = source.player
    if (!player || !player.isPlayer()) return
    if (entity === player) return
    if (!player.isCuriosEquipped('kubejs:lucky_seven')) return

    let hits = player.persistentData.getInt(PDK_LUCKY_HITS) + 1
    if (hits < LUCKY_HITS_REQUIRED) {
        player.persistentData.putInt(PDK_LUCKY_HITS, hits)
        return
    }
    // 第 7 次攻击: 判定概率, 无论是否触发都重新计数
    player.persistentData.putInt(PDK_LUCKY_HITS, 0)

    let chance = luckySevenChance(player)
    if (Math.random() * 100 >= chance) return  // 未触发

    // 触发: 伤害 × [0.77, 7.77) 随机倍率
    let mult = LUCKY_DAMAGE_MIN + Math.random() * (LUCKY_DAMAGE_MAX - LUCKY_DAMAGE_MIN)
    event.setDamage(damage * mult)
    player.setStatusMessage(Text.translate('msg.lucky_seven.trigger', Math.round(mult * 100)))
})
