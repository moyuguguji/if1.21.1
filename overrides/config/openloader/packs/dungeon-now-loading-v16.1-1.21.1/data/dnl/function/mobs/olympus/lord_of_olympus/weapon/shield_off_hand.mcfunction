### Data Change ###
effect clear @s minecraft:speed
data modify entity @s HandItems[1] set from storage dnl:lord_of_olympus.shield
data merge entity @s {Attributes:[{id:"minecraft:generic.knockback_resistance",base:1.0}]}
effect give @s minecraft:resistance 5 4 true
effect give @s minecraft:slowness 5 1 true

### Tag Changes ###
tag @s add dnl.shield
