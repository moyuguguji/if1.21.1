PlayerEvents.loggedIn(event => {
	if (!event.player.stages.has('difficulty_normal') && !event.player.stages.has('difficulty_easy') && !event.player.stages.has('difficulty_hard') && !event.player.stages.has('difficulty_impossible') && !event.player.stages.has('difficulty_impossibleplus') && !event.player.stages.has('difficulty_yonghen')) {
		event.player.stages.add('difficulty_easy')
	}
})

EntityEvents.beforeHurt(event => {
	/**
 * 造成伤害
 * @param {Internal.LivingHurtEvent} event
 * @param {EntityHurtCustomModel} data
 * @returns
 */
	let target = event.getEntity()
	let source1 = event.getSource()
	let source = event.getSource().getActual()
	let damage = event.getDamage()
	let entity = event.getSource().getImmediate()
  	//event.server.runCommand(`say ${target}`)
	if (target.player) {
		let offItem = target.getHeldItem("off_hand").id
		//let t=Object.keys(offItem)
		//event.server.runCommand(`say ${offItem.nbt.Damage}`)
		//offItem.nbt.Damage
		//let da = offItem.nbt.Damage
		let shield = ['mythicmetals:stormyx_shield','twilightforest:knightmetal_shield','gateofbabylon:netherite_shield','gateofbabylon:diamond_shield','gateofbabylon:golden_shield','minecraft:shield','bygonenether:gilded_netherite_shield','gateofbabylon:stone_shield','gateofbabylon:iron_shield','mcdw:shield_vanguard','mcdw:shield_tower_guard','mcdw:shield_royal_guard']
		let damage_new
		let armor_result = event.server.runCommandSilent(`attribute ${target.id} minecraft:generic.armor get`)
		let armor_toughness_result = event.server.runCommandSilent(`attribute ${target.id} minecraft:generic.armor_toughness get`)
		if (target.stages.has('difficulty_easy')) {
			if (source != null) {
				if (entity != null && !entity.living) {
					entity.kill()
				}
			}
		} else if (target.stages.has('difficulty_normal')) {
			if (source != null) {
				//玩家受到的生物伤害额外增加10%
				//event.setDamage(0)
				//target.attack(damage*1.1)
				if (entity != null && !entity.living) {

					//event.setDamage(0)
					entity.kill()
				}
				event.setDamage(damage * 1.1)
			}
		} else if (target.stages.has('difficulty_hard')) {
			if (source != null) {
				//玩家受到的生物伤害额外增加15%
				//event.setDamage(0)
				//target.attack(damage*1.2)
				if (entity != null && !entity.living) {

					//event.setDamage(0)
					entity.kill()
				}
				event.setDamage(damage * 1.2)
			}
		} else if (target.stages.has('difficulty_impossible')) {
			if (source != null) {
				//玩家受到的生物伤害额外增加50%
				if (entity != null && !entity.living) {
					//event.setDamage(0)
					entity.kill()
				}
				event.setDamage(damage * 1.5)
			}
		} else if (target.stages.has('difficulty_impossibleplus')) {
			if (source != null) {
				//玩家受到的生物伤害额外增加150%
				if (entity != null && !entity.living) {
					//event.setDamage(0)
					entity.kill()
				}
				event.setDamage(damage * 2.0)
			}
		} else if (target.stages.has('difficulty_yonghen')) {
			if (source != null) {
				//玩家受到的生物伤害额外增加150%
				if (entity != null && !entity.living) {
					//event.setDamage(0)
					entity.kill()
				}
				event.setDamage(damage * 1.5)
				if (source.monster) {
				let skeleton = [
					'minecraft:skeleton',
					'minecraft:stray'
				]
				if (entity.type == 'minecraft:arrow') {
					let random = randomNum(1, 2)
					if (random == 1) {
						let random1 = randomNum(1, 8)
						switch (random1) {
							case 1:
								target.potionEffects.add('minecraft:poison', 100, 0)
								break;
							case 2:
								target.potionEffects.add('minecraft:slowness', 100, 0)
								break;
							case 3:
								target.potionEffects.add('minecraft:weakness', 100, 0)
								break;
							case 4:
								target.potionEffects.add('extraalchemy:combustion', 100, 1)
								break;
							case 5:
								target.potionEffects.add('minecraft:levitation', 40, 0)
								break;
							case 6:
								target.potionEffects.add('minecraft:instant_damage', 0, 0)
								break;
							case 7:
								target.potionEffects.add('minecraft:mining_fatigue', 100, 0)
								break;
							case 8:
								target.potionEffects.add('minecraft:blindness', 100, 0)
								break;
							default:
								break;
						}
					}
				}
				if (target.health > 2 && source.type == 'minecraft:wither') {
					target.attack(1)
				}
				if (entity.type == 'minecraft:enderman') {
					if (!target.potionEffects.isActive('minecraft:blindness')) {
						target.potionEffects.add('minecraft:blindness', 100, 1)
					}

				}
				if (entity.type == 'minecraft:phantom') {
					if (!target.potionEffects.isActive('minecraft.levitation')) {
						target.potionEffects.add('minecraft.levitation', 100, 1)
					}
					if (!target.potionEffects.isActive('minecraft:weakness')) {
						target.potionEffects.add('minecraft:weakness', 60, 0)
					}
				}

				if (entity.type == 'minecraft:area_effect_cloud') {
					target.attack(target.maxHealth * 0.02)
					//target.tell(1)
				}
			}
		}
	}
	}
})
//减伤
EntityEvents.beforeHurt(event => {
	let target = event.getEntity()
	let source1 = event.getSource()
	let play = event.getSource().getPlayer()
	let damage = event.getDamage()
	
       if (play != null) {
		//if (play.getHeldItem('botania:terra_sword') && damage <= 7) return
		if (play.stages.has('difficulty_normal')) {
			//生物在未满血的状态下受到的玩家伤害减少10%
			//target.heal(damage * 0.1)
			event.setDamage(damage * 0.9)
		} else if (play.stages.has('difficulty_hard')) {
			//生物在未满血的状态下受到的玩家伤害减少20%
			event.setDamage(damage * 0.8)
		} else if (play.stages.has('difficulty_impossible')) {
			//生物在未满血的状态下受到的玩家伤害减少40%
			event.setDamage(damage * 0.6)
		} else if (play.stages.has('difficulty_impossibleplus')) {
			//生物在未满血的状态下受到的玩家伤害减少60%
			event.setDamage(damage * 0.4)
		} else if (play.stages.has('difficulty_yonghen')) {
			let random2 = randomNum(1, 100)
			if (random2 <= 10) {
				event.setDamage(0)
			} else (event.setDamage(damage * 0.6))
		}
		//event.server.runCommandSilent(`say ${damage}`)
	}
})

ServerEvents.recipes(event => {
	event.shapeless('kubejs:difficulty_changer', ['minecraft:clock'])
})
let targetTypes = [
		"minecraft:wither",
		"minecraft:ender_dragon"
	]
	let zombie = [
		'minecraft:zombie',
		'minecraft:zombie_villager',
		'minecraft:husk',
		'minecraft:drowned'
	]
//生物受击
EntityEvents.beforeHurt(event => {
	let target = event.getEntity()
	let source1 = event.getSource()
	let player = event.getSource().getPlayer()
	let source = event.getSource().getActual()
	let damage = event.getDamage()
	if (player != null) {
		if (target.monster) {
			//event.server.runCommand(`say ${result}`)
			let result = event.server.runCommandSilent(`attribute ${target.id} minecraft:generic.armor get`)
			let result1 = event.server.runCommandSilent(`attribute ${target.id} minecraft:generic.armor base get`)
			if (player.stages.has('difficulty_easy')) {
				if (targetTypes.includes(target.type) && !target.tags.contains('easy') && !target.tags.contains('attacked') && target.type != "terrarianslimes:king_slime") {
					let att = event.server.runCommandSilent(`attribute ${target.id} minecraft:generic.attack_damage get`)
					let att1 = event.server.runCommandSilent(`attribute ${target.id} minecraft:generic.attack_damage base get`)
					target.tags.add('easy')
					target.setMaxHealth(target.maxHealth * 0.5)
					event.server.runCommandSilent(`attribute ${target.id} minecraft:generic.attack_damage base set ${(att - att1) % 2 - att1}`)
				}
			}
			if (player.stages.has('difficulty_impossible')) {
				if (!target.tags.contains('attacked')) {
					event.setDamage(0)
					target.tags.add('attacked')
					target.tags.remove('easy')
					target.setMaxHealth(target.maxHealth * (1.5))
					target.heal(target.maxHealth * 0.9)
					target.attack(target.maxHealth * 0.1)
				} else if (!target.tags.contains('attacked')) {
					event.setDamage(0)
					target.tags.add('attacked')
					target.tags.remove('easy')
					target.setMaxHealth(target.maxHealth * (0.5))
					target.heal(target.maxHealth * 0.9)
					target.attack(target.maxHealth * 0.1)
				}
				if (!target.tags.contains('banxue')) {
					let r2 = randomNum(1, 100)
					if (r2 <= 5) {
						if (target.health <= target.maxHealth / 2 && !targetTypes.includes(target.type)) {
							target.tags.add('banxue')
							target.potionEffects.add('minecraft:resistance', 20, 4, false, false)
						}
					}
				}
			} else if (player.stages.has('difficulty_impossibleplus')) {
				if (!target.tags.contains('attacked') && !targetTypes.includes(target.type)) {
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
				} else if (!target.tags.contains('attacked') && targetTypes.includes(target.type)) {
					event.setDamage(0)
					target.tags.add('attacked')
					target.tags.remove('easy')
					target.setMaxHealth(target.maxHealth * (3.5))
					target.heal(target.maxHealth * 0.9)
					target.attack(target.maxHealth * 0.1)
				}
				if (!target.tags.contains('banxue')) {
					let r1 = randomNum(1, 100)
					if (r1 <= 10) {
						if (target.health <= target.maxHealth / 2 && !targetTypes.includes(target.type)) {
							target.tags.add('banxue')
							target.potionEffects.add('minecraft:resistance', 60, 4, false, false)

						}
					}
				}

			} else if (player.stages.has('difficulty_yonghen')) {
				if (!target.tags.contains('attacked') && !targetTypes.includes(target.type)) {
						event.setDamage(0)
						target.tags.add('attacked')
						target.tags.remove('easy')
						target.setMaxHealth(target.maxHealth * (1.5))
						target.heal(target.maxHealth * 0.9)
						target.attack(target.maxHealth * 0.1)
						if (result > 15 && !targetTypes.includes(target.type)) {
							event.server.runCommandSilent(`attribute ${target.id} minecraft:generic.armor base set ${15 - result}`)
						} else if (result < 5) {
							event.server.runCommandSilent(`attribute ${target.id} minecraft:generic.armor base set ${5 - result + result1}`)
						}
					} 
			       else if (!target.tags.contains('attacked') && targetTypes.includes(target.type)) {
						event.setDamage(0)
						target.tags.add('attacked')
						target.tags.remove('easy')
						target.setMaxHealth(target.maxHealth * (3.5))
						target.heal(target.maxHealth * 0.9)
						target.attack(target.maxHealth * 0.1)
						if (result < 15 && targetTypes.includes(target.type)) {
							event.server.runCommandSilent(`attribute ${target.id} minecraft:generic.armor base set ${15 - result + result1}`)
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
					let random3 = randomNum(1, 100)
					if (random3 <= 20) {
						if (target.health <= target.maxHealth / 2 && !targetTypes.includes(target.type)) {
							target.tags.add('banxue')
							target.potionEffects.add('minecraft:resistance', 100, 4, false, false)
						}
					}
				}
				if (target.type == 'minecraft:enderman') {
					if (!target.potionEffects.isActive('minecraft:invisibility')) {
						target.potionEffects.add('minecraft:invisibility', 100, 1, false, false)
					}
					let random = randomNum(1, 4)
					if (random == 1) {
						let randoms = randomNum(-2, 2)
						let x = target.getX()
						let y = target.getY()
						let z = target.getZ()
						event.server.runCommandSilent(`execute at ${player.profile.name} run tp ${player.profile.name} ${x + randoms} ${y} ${z + randoms}`)
					}
				}
			}
		}
	}
}
)