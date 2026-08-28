summon slime ~ ~ ~ {PersistenceRequired:1b,NoAI:1b,Health:100.0f,DeathLootTable:"dnl:structures/sinkhole/mobs/slimecore/healthdown",Size:9,Tags:['dnl.mob','dnl.sinkhole','dnl.slimecore','dnl.boss','dnl.size10'],Attributes:[{id:"minecraft:generic.max_health",base:100.0},{id:"minecraft:generic.knockback_resistance",base:1},{id:"minecraft:generic.movement_speed",base:0}]}
execute as @e[type=slime,tag=dnl.size10,limit=1,sort=nearest] run attribute @s minecraft:generic.max_health base set 100
execute as @e[type=slime,tag=dnl.size10,limit=1,sort=nearest] run data merge entity @s {Health:100.0f}

### Erase Spawner ###
setblock ~ ~ ~ minecraft:air

### To Mob AEC ###
tag @s add dnl.mob
tag @s add dnl.core

tag @s remove dnl.spawner
