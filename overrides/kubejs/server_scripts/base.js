ServerEvents.recipes(event => {
	let post = PostBuilder.create()
    let contextual = ContextualBuilder.create()
	 
	function armorBurning(output,input) {
		event.recipes.lychee.item_burning(
        SizedIngredientWrapper.of(input),
        [
            post.dropItem(output)
        ]
    )
	}
  function primordial(item,input,inputb,id) {
		event.shaped(item, [
		' B ',
		'BAB',
		' B '
	], {
		A: input,
		B: inputb
	}).id(id)
	}

armorBurning("minecraft:iron_ingot","minecraft:iron_helmet")
armorBurning('2x minecraft:iron_ingot', 'minecraft:iron_chestplate')
armorBurning('2x minecraft:iron_ingot', 'minecraft:iron_leggings')
armorBurning('minecraft:iron_ingot', 'minecraft:bucket')
armorBurning('minecraft:iron_nugget', 'minecraft:iron_bars')
armorBurning('4x minecraft:iron_ingot', 'minecraft:anvil')
armorBurning('3x minecraft:iron_ingot', 'minecraft:chipped_anvil')
armorBurning('2x minecraft:iron_ingot', 'minecraft:damaged_anvil')
armorBurning('minecraft:iron_ingot', 'minecraft:iron_door')
armorBurning('minecraft:iron_ingot', 'minecraft:iron_trapdoor')
armorBurning('minecraft:iron_ingot', 'minecraft:iron_sword')
armorBurning('4x minecraft:iron_nugget', 'minecraft:iron_shovel')
armorBurning('minecraft:iron_ingot', 'minecraft:iron_pickaxe')
armorBurning('minecraft:iron_ingot', 'minecraft:iron_axe')
armorBurning('minecraft:iron_ingot', 'minecraft:iron_hoe')
armorBurning('minecraft:iron_ingot', 'minecraft:iron_horse_armor')

armorBurning('minecraft:gold_ingot', 'minecraft:golden_helmet')
armorBurning('2x minecraft:gold_ingot', 'minecraft:golden_chestplate')
armorBurning('2x minecraft:gold_ingot', 'minecraft:golden_leggings')
armorBurning('minecraft:gold_ingot', 'minecraft:golden_boots')
armorBurning('minecraft:gold_ingot', 'minecraft:golden_sword')
armorBurning('4x minecraft:gold_nugget', 'minecraft:golden_shovel')
armorBurning('minecraft:gold_ingot', 'minecraft:golden_pickaxe')
armorBurning('minecraft:gold_ingot', 'minecraft:golden_axe')
armorBurning('minecraft:gold_ingot', 'minecraft:golden_hoe')
armorBurning('minecraft:gold_ingot', 'minecraft:golden_horse_armor')
armorBurning('minecraft:gold_ingot', 'minecraft:golden_apple')
armorBurning('minecraft:gold_block', 'minecraft:enchanted_golden_apple')

armorBurning('minecraft:diamond', 'minecraft:diamond_helmet')
armorBurning('2x minecraft:diamond', 'minecraft:diamond_chestplate')
armorBurning('2x minecraft:diamond', 'minecraft:diamond_leggings')
armorBurning('minecraft:diamond', 'minecraft:diamond_boots')
armorBurning('minecraft:diamond', 'minecraft:diamond_sword')
armorBurning('minecraft:diamond', 'minecraft:diamond_pickaxe')
armorBurning('minecraft:diamond', 'minecraft:diamond_axe')
armorBurning('minecraft:diamond', 'minecraft:diamond_hoe')
armorBurning('minecraft:diamond', 'minecraft:diamond_horse_armor')

armorBurning('minecraft:leather', 'minecraft:leather_helmet')
armorBurning('2x minecraft:leather', 'minecraft:leather_chestplate')
armorBurning('2x minecraft:leather', 'minecraft:leather_leggings')
armorBurning('minecraft:leather', 'minecraft:leather_boots')

armorBurning('minecraft:iron_ingot', 'minecraft:chainmail_helmet')
armorBurning('2x minecraft:iron_ingot', 'minecraft:chainmail_chestplate')
armorBurning('2x minecraft:iron_ingot', 'minecraft:chainmail_leggings')
armorBurning('minecraft:iron_ingot', 'minecraft:chainmail_boots')

armorBurning('minecraft:leather', 'minecraft:rotten_flesh')

primordial('refinedstorage:basic_processor','minecraft:iron_ingot','minecraft:cobblestone','refinedstorage:basic_processor')
primordial('refinedstorage:improved_processor','minecraft:gold_ingot','minecraft:iron_ingot','refinedstorage:improved_processor')
primordial('refinedstorage:advanced_processor','minecraft:diamond','minecraft:iron_ingot','refinedstorage:advanced_processor')

event.smithing('refinedstorage:construction_core','minecraft:iron_ingot','refinedstorage:basic_processor','spectrum:topaz_shard').id('refinedstorage:construction_core')
event.smithing('refinedstorage:destruction_core','minecraft:iron_ingot','refinedstorage:basic_processor','minecraft:redstone').id('refinedstorage:destruction_core')

event.shaped('refinedstorage:creative_portable_grid', [
		'ABA',
		'ACA',
		'ABA'
	], {
		A: 'minecraft:iron_ingot',
		B: '#refinedstorage:grids',
    C: '#refinedstorage:creative_controllers'
	}).id('refinedstorage:portable_grid')
event.custom(
  {
  "type": "spectrum:pedestal",
  "time": 400,
  "tier": "simple",
  "colors": {
    "spectrum:cyan": 32
  },
  "experience": 2.0,
  "pattern": [
    "BAB",
    "ACA",
    "BAB"
  ],
  "key": {
     "A": {
        "item": 'spectrum:topaz_shard'
      },
      "B": {
        "item": 'minecraft:iron_ingot'
      },
      "C": {
        "item": 'minecraft:redstone_block'
      }
  },
  "result": {
    "item": 'refinedstorage:creative_controller',
    "count": 1
  }
}
)
event.custom({
  "type": "spectrum:anvil_crushing",
  "ingredient": {
    "item": "spectrum:topaz_block"
  },
  "crushedItemsPerPointOfDamage": 0.4,
  "experience": 0.0,
  "result" : {
    "item": "spectrum:topaz_shard",
    "count": 1
  },
  "particleEffectIdentifier": "explosion",
  "soundEventIdentifier": "spectrum:block.topaz_cluster.break"
}).id('spectrum:anvil_crushing/gemstone_powder/topaz_powder_from_topaz_block')

event.custom({
  "type": "spectrum:anvil_crushing",
  "ingredient": {
    "item": 'minecraft:amethyst_block'
  },
  "crushedItemsPerPointOfDamage": 0.4,
  "experience": 0.0,
  "result" : {
    "item": "minecraft:amethyst_shard",
    "count": 1
  },
  "particleEffectIdentifier": "explosion",
  "soundEventIdentifier": "block.amethyst_cluster.break"
}).id('spectrum:anvil_crushing/gemstone_powder/amethyst_powder_from_amethyst_block')

event.custom({
  "type": "spectrum:anvil_crushing",
  "ingredient": {
    "item": "spectrum:citrine_block"
  },
  "crushedItemsPerPointOfDamage": 0.4,
  "experience": 0.0,
  "result" : {
    "item": "spectrum:topaz_shard",
    "count": 1
  },
  "particleEffectIdentifier": "explosion",
  "soundEventIdentifier": "spectrum:block.citrine_cluster.break"
}).id('spectrum:anvil_crushing/gemstone_powder/citrine_powder_from_citrine_block')
})