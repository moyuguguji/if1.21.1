summon skeleton ~ ~ ~ {Health:40f,PersistenceRequired:1b,HandItems:[{id:"minecraft:bow",count:1,components:{"minecraft:enchantments":{"minecraft:power":5}}},{}],ArmorItems:[{},{},{},{id:"minecraft:iron_helmet",count:1,components:{"minecraft:enchantments":{"projectile_minecraft:protection":4}}}],Attributes:[{id:"minecraft:generic.max_health",base:40},{id:"minecraft:generic.follow_range",base:100}]}
data merge entity @e[type=skeleton,limit=1,sort=nearest] {Health:40f}

kill @s
