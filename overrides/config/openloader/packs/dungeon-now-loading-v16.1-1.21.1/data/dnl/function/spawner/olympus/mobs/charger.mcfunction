particle minecraft:flame ~ ~0.5 ~ 0.5 0.5 0.5 0.001 2

### Timer ###
scoreboard players add @s dnl.timer 1

execute if score @s dnl.timer matches 1 run setblock ~ ~ ~ spawner{SpawnCount:0,SpawnRange:0,MinSpawnDelay:0,MaxSpawnDelay:0,SpawnData:{id:"minecraft:skeleton",DeathLootTable:"dnl:structures/olympus/mobs/guards",PersistenceRequired:1b,Health:30f,Tags:["dnl.mob","dnl.olympus","dnl.archer"],HandItems:[{id:"minecraft:bow",count:1,tag:{display:{Name:'{"text":"Ancient Bow","color":"gold","italic":false}',Lore:["{"translate\":\"\",\"italic\":false}","{\"text\":\"When Fully Charged:\",\"color\":\"gray\",\"italic\":false}","{\"text\":\"9-16 Damage\",\"color\":\"dark_aqua\",\"italic\":false}"]},CustomModelData:12001,"dnl.item":1b,"dnl.ancient_bow":1b}},{}],HandDropChances:[0.010F,0.085F],ArmorItems:[{id:"minecraft:netherite_boots",count:1},{id:"minecraft:netherite_leggings",count:1},{id:"minecraft:netherite_chestplate",count:1},{id:"minecraft:netherite_helmet",count:1}],Attributes:[{id:"minecraft:max_health",base:30},{id:"minecraft:attack_damage",base:10}]}} replace
execute if score @s dnl.timer matches 200.. run setblock ~ ~ ~ minecraft:air destroy
execute if score @s dnl.timer matches 200.. run function cmd:summon/olympus/charger
execute if score @s dnl.timer matches 200.. run kill @s

execute if score @s dnl.timer matches ..200 unless block ~ ~ ~ minecraft:spawner run kill @s
