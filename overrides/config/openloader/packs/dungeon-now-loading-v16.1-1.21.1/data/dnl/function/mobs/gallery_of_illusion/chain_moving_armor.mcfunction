particle minecraft:cloud ~ ~ ~ 0.5 1 0.5 0.0000001 30
summon zombie ~ ~ ~ {Health:30f,Silent:1b,PersistenceRequired:1b,Tags:['illusioned_gallery'],ArmorItems:[{id:"minecraft:chainmail_boots",count:1},{id:"minecraft:chainmail_leggings",count:1},{id:"minecraft:chainmail_chestplate",count:1},{id:"minecraft:chainmail_helmet",count:1}],active_effects:[],Attributes:[{id:"minecraft:generic.max_health",base:30},{id:"minecraft:generic.knockback_resistance",base:1},{id:"minecraft:generic.movement_speed",base:0.2},{id:"minecraft:generic.attack_damage",base:10.0}]}
data merge entity @e[type=zombie,tag=illusioned_gallery,limit=1,sort=nearest] {Health:30f}
kill @s
