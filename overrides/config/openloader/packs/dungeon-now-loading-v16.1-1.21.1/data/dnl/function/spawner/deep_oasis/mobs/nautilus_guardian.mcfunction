summon elder_guardian ~ ~ ~ {Health:90f,DeathLootTable:"dnl:structures/deep_oasis/mobs/evolved_puffish",PersistenceRequired:1b,Tags:['nautilus_guardian'],CustomName:'{"text":"Nautilus Guardian","color":"red","bold":true,"italic":false}',Attributes:[{id:"minecraft:generic.max_health",base:90}]}
data merge entity @e[type=elder_guardian,tag=nautilus_guardian,limit=1,sort=nearest] {Health:90f}

kill @s