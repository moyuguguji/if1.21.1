summon cave_spider ~ ~ ~ {Health:180f,PersistenceRequired:1b,DeathLootTable:"dnl:structures/crawlers_lair/mobs/poison_eyes",Tags:['dnl.crawlers_lair','dnl.poison_eyes'],CustomName:'{"text":"Poison Eyes","color":"red","bold":true,"italic":false}',Attributes:[{id:"minecraft:generic.max_health",base:180},{id:"minecraft:generic.movement_speed",base:0.45},{id:"minecraft:generic.attack_damage",base:5.0}]}
data merge entity @e[type=cave_spider,tag=dnl.poison_eyes,limit=1,sort=nearest] {Health:180f}

kill @s