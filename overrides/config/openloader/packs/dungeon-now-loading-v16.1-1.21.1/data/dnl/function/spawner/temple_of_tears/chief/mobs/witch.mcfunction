summon witch ~ ~ ~ {Health:78f,PersistenceRequired:1b,Attributes:[{id:"minecraft:generic.max_health",base:78}]}
data merge entity @e[type=witch,limit=1,sort=nearest] {Health:78f}

### Minion Mobs ###
tag @e[type=minecraft:area_effect_cloud,distance=..10,tag=dnl.temple_of_tears,tag=dnl.minion,tag=!dnl.used] add dnl.poison
tag @e[type=minecraft:area_effect_cloud,distance=..10,tag=dnl.temple_of_tears,tag=dnl.minion,tag=!dnl.used] add dnl.spawner

kill @s
