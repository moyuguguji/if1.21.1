### Sleeping State Guardian Ghast ###
summon ghast ~ ~ ~ {Health:1000f,NoAI:1b,Silent:1b,PersistenceRequired:1b,ExplosionPower:3,Tags:['dnl.mob','dnl.guardian_ghast','dnl.main','dnl.blue','dnl.sleeping'],CustomName:'{"text":"Guardian Ghast","color":"white","obfuscated":true}',Attributes:[{id:"minecraft:generic.max_health",base:1000}]}
data merge entity @e[type=ghast,tag=dnl.sleeping,limit=1,sort=nearest] {Health:1000f}
effect give @e[type=minecraft:ghast,tag=dnl.main,tag=dnl.blue,distance=..3,limit=1,sort=nearest] minecraft:resistance infinite 4 true

### Tag Change ###
tag @s add dnl.mob
tag @s add dnl.guardian_ghast
tag @s add dnl.platform

tag @s add dnl.used
