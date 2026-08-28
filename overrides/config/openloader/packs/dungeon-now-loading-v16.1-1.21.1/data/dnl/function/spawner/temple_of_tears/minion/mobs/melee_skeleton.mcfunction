summon skeleton ~ ~ ~ {Health:40f,PersistenceRequired:1b,HandItems:[{id:"minecraft:iron_sword",count:1,components:{"minecraft:enchantments":{"minecraft:sharpness":5,"minecraft:vanishing_curse":1}}},{}],ArmorItems:[{},{},{id:"minecraft:iron_chestplate",count:1,components:{"minecraft:enchantments":{"minecraft:protection":5,"minecraft:vanishing_curse":1}}},{}],Attributes:[{id:"minecraft:generic.max_health",base:40}]}
data merge entity @e[type=skeleton,limit=1,sort=nearest] {Health:40f}

kill @s
