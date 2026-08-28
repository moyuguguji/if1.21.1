summon minecraft:drowned ~ ~ ~ {Health:100f,DeathLootTable:"dnl:structures/deep_oasis/mobs/posaidon",PersistenceRequired:1b,NoAI:0b,Tags:['posaidon'],CustomName:'{"text":"Posaidon","color":"red","bold":true,"italic":false}',HandItems:[{id:"minecraft:trident",count:1},{id:"minecraft:shield",count:1}],Attributes:[{id:"minecraft:generic.max_health",base:100}]}
data merge entity @e[type=drowned,tag=posaidon,limit=1,sort=nearest] {Health:100f}

kill @s