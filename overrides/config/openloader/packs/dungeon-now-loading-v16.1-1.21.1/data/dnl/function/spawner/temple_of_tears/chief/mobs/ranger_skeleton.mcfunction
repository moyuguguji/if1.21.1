### Summon Mob ###
summon skeleton ~ ~ ~ {Health:60f,PersistenceRequired:1b,HandItems:[{id:"minecraft:bow",count:1,components:{"minecraft:enchantments":{"minecraft:power":7,"minecraft:vanishing_curse":1}}},{}],ArmorItems:[{id:"minecraft:iron_boots",count:1,components:{"minecraft:enchantments":{"projectile_minecraft:protection":4,"minecraft:vanishing_curse":1}}},{id:"minecraft:iron_leggings",count:1,components:{"minecraft:enchantments":{"projectile_minecraft:protection":4,"minecraft:vanishing_curse":1}}},{id:"minecraft:iron_chestplate",count:1,components:{"minecraft:enchantments":{"projectile_minecraft:protection":4,"minecraft:vanishing_curse":1}}},{id:"minecraft:iron_helmet",count:1,components:{"minecraft:enchantments":{"projectile_minecraft:protection":4,"minecraft:vanishing_curse":1}}}],Attributes:[{id:"minecraft:generic.max_health",base:60},{id:"minecraft:generic.follow_range",base:100}]}
data merge entity @e[type=skeleton,limit=1,sort=nearest] {Health:60f}

### Minion Mobs ###
tag @e[type=minecraft:area_effect_cloud,distance=..10,tag=dnl.temple_of_tears,tag=dnl.minion,tag=!dnl.used] add dnl.normal
tag @e[type=minecraft:area_effect_cloud,distance=..10,tag=dnl.temple_of_tears,tag=dnl.minion,tag=!dnl.used] add dnl.spawner

kill @s
