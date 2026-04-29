
// 1. 在 LivingShieldBlockEvent 中设置标记
const $LivingShieldBlockEvent = Java.loadClass('net.neoforged.neoforge.event.entity.living.LivingShieldBlockEvent')

NativeEvents.onEvent($LivingShieldBlockEvent, event => {
    const { entity, source, damage} = event
    if (entity.isPlayer()) {
        // 为玩家附加一个持久化标记
        if (event.blocked == false) return
        //console.log(`触发事件`);
        entity.persistentData.putBoolean('kubejs:shield_blocked', true);
        

    }
});

// 2. 在 beforeHurt 事件中读取并清除标记
EntityEvents.beforeHurt(event => {
    const { entity, source, damage } = event
    if (!source || !entity) return
    let player = entity.player
    if (!player) return
    if (entity.persistentData.getBoolean('kubejs:shield_blocked')) {
        entity.persistentData.remove('kubejs:shield_blocked')
        //console.log(`清除`);
        return
    }
    let difficulty = entity.persistentData.getByte(PD_KEY_DIFFICULTY)
    //console.log(`难度为 ${difficulty}`);


    event.setDamage(damage * LIST_DIFFICULTIES[difficulty].hurtMul)

    // 指令加护: 每层 -2% 受到伤害
    let cpEffect = entity.getEffect('kubejs:command_protection')
    if (cpEffect) {
        event.setDamage(event.damage * (1 - 0.02 * (cpEffect.amplifier + 1)))
    }

    // 业: 每 10 层 +5% 受到伤害
    let karmaEffect = entity.getEffect('kubejs:karma')
    if (karmaEffect) {
        event.setDamage(event.damage * (1 + 0.005 * (karmaEffect.amplifier + 1)))
    }

    let handler = difficultyHurtHandlers[difficulty]
    if (handler) handler(event)
})

/** @type {Record<number, (event: import("dev.latvian.mods.kubejs.entity.BeforeLivingEntityHurtKubeEvent").$BeforeLivingEntityHurtKubeEvent) => void>} */
let difficultyHurtHandlers = {
    5: event => {
        const { entity, source } = event
        let immediate = source.getImmediate()
        let actual = source.getActual()
        let player = entity
        if (!actual && immediate.type == 'minecraft:arrow'){
        if (player.random.nextFloat() > 0.5) return
       // console.log(`测试`);
        let randomEffectList = [
            { effect: 'minecraft:blindness', duration: 100, amplifier: 0 },
            { effect: 'minecraft:poison', duration: 100, amplifier: 0 },
            { effect: 'minecraft:slowness', duration: 100, amplifier: 0 },
            { effect: 'minecraft:weakness', duration: 100, amplifier: 0 },
            { effect: 'minecraft:levitation', duration: 40, amplifier: 0 },
            { effect: 'minecraft:instant_damage', duration: 0, amplifier: 0 },
            { effect: 'minecraft:mining_fatigue', duration: 100, amplifier: 0 }
        ]
        let selectedEffect = randomEffectList[player.random.nextInt(randomEffectList.length)]
        player.potionEffects.add(selectedEffect.effect, selectedEffect.duration, selectedEffect.amplifier)
        }
        if (actual.type == 'minecraft:wither') {
            //console.log(`凋零`);
            if (player.health > 2) player.attack(1)
        } else if (immediate.type == 'minecraft:ender_dragon') {
            if (!player.potionEffects.isActive('minecraft:blindness')) {
                player.potionEffects.add('minecraft:blindness', 100, 1)
            }
        } else if (immediate.type == 'minecraft:phantom') {
            if (!target.potionEffects.isActive('minecraft.levitation')) {
                target.potionEffects.add('minecraft.levitation', 100, 1)
            }
            if (!target.potionEffects.isActive('minecraft:weakness')) {
                target.potionEffects.add('minecraft:weakness', 60, 0)
            }
        } else if (immediate.type == 'minecraft:area_effect_cloud') {
            target.attack(target.maxHealth * 0.02)
        }
    }
}

//减伤
EntityEvents.beforeHurt(event => {
    const { source, damage } = event
    if (!source) return
    let player = source.player
    if (!player) return
    let difficulty = player.persistentData.getByte(PD_KEY_DIFFICULTY)
    event.setDamage(damage * LIST_DIFFICULTIES[difficulty].attackMul)
    let handler = difficultyAttackHandlers[difficulty]
    if (handler) handler(event)
})

/** @type {Record<number, (event: import("dev.latvian.mods.kubejs.entity.BeforeLivingEntityHurtKubeEvent").$BeforeLivingEntityHurtKubeEvent) => void>} */
let difficultyAttackHandlers = {
    5: event => {
        
        if (event.source.player.random.nextFloat() > 0.1) return
        event.setDamage(0)
    }
}


//生物受击
EntityEvents.beforeHurt(event => {
    const { entity, source, damage } = event
    if (!source || !entity) return
    let player = source.player
    if (!player || !entity.living || !entity.monster) return

    /** @type {import("net.minecraft.world.entity.LivingEntity").$LivingEntity} */
    let target = entity
    let difficulty = player.persistentData.getByte(PD_KEY_DIFFICULTY)

    // 指令加护: 每层 -2% 受到伤害
    let cpEffect = target.getEffect('kubejs:command_protection')
    if (cpEffect) {
        event.setDamage(event.damage * (1 - 0.02 * (cpEffect.amplifier + 1)))
    }
    // 业: 每 10 层 +5% 受到伤害
    let karmaEffect = target.getEffect('kubejs:karma')
    if (karmaEffect) {
        event.setDamage(event.damage * (1 + 0.005 * (karmaEffect.amplifier + 1)))
    }

    switch (difficulty) {
        case 0: {
            if (LIST_BOSSES.includes(target.type)
                && !target.tags.contains('easy')
                && !target.tags.contains('attacked')
            ) {
                let targetAttack = target.getAttribute('minecraft:generic.attack_damage')
                target.tags.add('easy')
                target.setMaxHealth(target.maxHealth * 0.5)
                targetAttack.setBaseValue((targetAttack.value - targetAttack.baseValue) * 0.5 - targetAttack.baseValue)
            }
            break
        }
        case 3: {
            if (!target.tags.contains('attacked')) {
                event.setDamage(0)
                target.tags.add('attacked')
                target.tags.remove('easy')
                target.setMaxHealth(target.maxHealth * (1.5))
                target.heal(target.maxHealth * 0.9)
                target.attack(target.maxHealth * 0.1)
            }
            if (!target.tags.contains('banxue')) {
                if (player.random.nextFloat() <= 0.05) {
                    if (target.health <= target.maxHealth / 2 && !LIST_BOSSES.includes(target.type)) {
                        target.tags.add('banxue')
                        target.potionEffects.add('minecraft:resistance', 20, 4, false, false)
                    }
                }
            }
            break
        }
        case 4: {
            if (!target.tags.contains('attacked') && !LIST_BOSSES.includes(target.type)) {
                event.setDamage(0)
                target.tags.add('attacked')
                target.tags.remove('easy')
                target.setMaxHealth(target.maxHealth * (2.5))
                target.heal(target.maxHealth * 0.9)
                target.attack(target.maxHealth * 0.1)
            } else if (!target.tags.contains('attacked')) {
                event.setDamage(0)
                target.tags.add('attacked')
                target.tags.remove('easy')
                target.setMaxHealth(target.maxHealth * (1.5))
                target.heal(target.maxHealth * 0.9)
                target.attack(target.maxHealth * 0.1)
            } else if (!target.tags.contains('attacked') && LIST_BOSSES.includes(target.type)) {
                event.setDamage(0)
                target.tags.add('attacked')
                target.tags.remove('easy')
                target.setMaxHealth(target.maxHealth * (3.5))
                target.heal(target.maxHealth * 0.9)
                target.attack(target.maxHealth * 0.1)
            }
            if (!target.tags.contains('banxue')) {
                if (player.random.nextFloat() <= 0.1) {
                    if (target.health <= target.maxHealth / 2 && !LIST_BOSSES.includes(target.type)) {
                        target.tags.add('banxue')
                        target.potionEffects.add('minecraft:resistance', 60, 4, false, false)
                    }
                }
            }
            break
        }
        case 5: {
            let targetArmor = target.getAttribute('minecraft:generic.armor')
            if (!target.tags.contains('attacked') && !LIST_BOSSES.includes(target.type)) {
                event.setDamage(0)
                target.tags.add('attacked')
                target.tags.remove('easy')
                target.setMaxHealth(target.maxHealth * (1.5))
                target.heal(target.maxHealth * 0.9)
                target.attack(target.maxHealth * 0.1)
                if (targetArmor.value > 15 && !LIST_BOSSES.includes(target.type)) {
                    targetArmor.setBaseValue(15 - targetArmor.value)
                } else if (targetArmor.value < 5) {
                    targetArmor.setBaseValue(5 - targetArmor.value + targetArmor.baseValue)
                }
            } else if (!target.tags.contains('attacked') && LIST_BOSSES.includes(target.type)) {
                event.setDamage(0)
                target.tags.add('attacked')
                target.tags.remove('easy')
                target.setMaxHealth(target.maxHealth * (3.5))
                target.heal(target.maxHealth * 0.9)
                target.attack(target.maxHealth * 0.1)
                if (targetArmor.value < 15 && LIST_BOSSES.includes(target.type)) {
                    targetArmor.setBaseValue(15 - targetArmor.value + targetArmor.baseValue)
                }
            } else if (!target.tags.contains('attacked')) {
                event.setDamage(0)
                target.tags.add('attacked')
                target.tags.remove('easy')
                target.setMaxHealth(target.maxHealth * (2))
                target.heal(target.maxHealth * 0.9)
                target.attack(target.maxHealth * 0.1)
            }
            //event.server.runCommand(`say ${riding}`)
            if (!target.tags.contains('banxue')) {
                if (player.random.nextFloat() <= 0.2) {
                    if (target.health <= target.maxHealth / 2 && !LIST_BOSSES.includes(target.type)) {
                        target.tags.add('banxue')
                        target.potionEffects.add('minecraft:resistance', 100, 4, false, false)
                    }
                }
            }
            if (target.type == 'minecraft:enderman') {
                if (!target.potionEffects.isActive('minecraft:invisibility')) {
                    target.potionEffects.add('minecraft:invisibility', 100, 1, false, false)
                }
                if (player.random.nextFloat() <= 0.25) {
                    let randomNum = player.random.nextInt(5) - 2
                    let x = target.getX()
                    let y = target.getY()
                    let z = target.getZ()
                    player.teleportTo(x + randomNum, y, z + randomNum)
                }
            }
            break
        }
    }
})