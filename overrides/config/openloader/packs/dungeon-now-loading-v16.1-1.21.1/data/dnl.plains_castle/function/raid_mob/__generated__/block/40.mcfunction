#built using mc-build (https://github.com/mc-build/mc-build)


particle poof ~ ~ ~ 0.3 1 0.3 0.0001 5 normal
summon minecraft:zombie ~ ~ ~ {Tags:['dnl.mob','dnl.raid_mob','dnl.diamond_sword_zombie'],PersistenceRequired:1b,DeathLootTable:"minecraft:empty",HandItems:[{id:"minecraft:diamond_sword",count:1,components:{"minecraft:enchantments":{"minecraft:sharpness":5}}},{}],HandDropChances:[0.000F,0.085F],ArmorItems:[{id:"minecraft:diamond_boots",count:1},{id:"minecraft:diamond_leggings",count:1},{id:"minecraft:diamond_chestplate",count:1},{id:"minecraft:diamond_helmet",count:1}],ArmorDropChances:[0.000F,0.000F,0.000F,0.000F]}
tag @s remove dnl.spawn_raid
