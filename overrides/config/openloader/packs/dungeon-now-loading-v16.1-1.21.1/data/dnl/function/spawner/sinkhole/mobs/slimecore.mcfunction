summon slime ~ ~ ~ {PersistenceRequired:1b,NoAI:1b,Health:1.0f,DeathLootTable:"dnl:structures/sinkhole/mobs/slimecore/healthdown",Size:9,Tags:['dnl.mob','dnl.sinkhole','dnl.slimecore','dnl.boss','dnl.size10'],Attributes:[{id:"minecraft:generic.knockback_resistance",base:1},{id:"minecraft:movement_speed",base:0}]}

### Erase Spawner ###
setblock ~ ~ ~ minecraft:air

### To Mob AEC ###
tag @s add dnl.mob
tag @s add dnl.core

tag @s remove dnl.spawner
