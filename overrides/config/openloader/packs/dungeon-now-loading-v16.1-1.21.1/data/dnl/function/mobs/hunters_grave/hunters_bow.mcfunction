execute unless entity @s[nbt={HandItems:[{count:1}]}] run tag @s add dnl.summon_ghost

scoreboard players add @s[tag=dnl.summon_ghost] dnl.variable 1
execute at @s[tag=dnl.summon_ghost] run particle minecraft:ash ~ ~2.5 ~ 0.5 0.5 0.5 16 10
execute at @s[tag=dnl.summon_ghost,scores={dnl.variable=100}] run particle minecraft:flash ~ ~2.5 ~ 0.5 0.5 0.5 16 10
execute at @s[tag=dnl.summon_ghost,scores={dnl.variable=100}] run playsound entity.enderman.teleport ambient @a[distance=..16] ~ ~ ~ 1.0 2 1
execute at @s[tag=dnl.summon_ghost,scores={dnl.variable=100}] run summon skeleton ~ ~1 ~ {Health:200f,Silent:1b,Glowing:1b,DeathLootTable:"dnl:structures/hunters_grave/mobs/hunters_ghost",PersistenceRequired:1b,Rotation:[-90F,30F],Tags:["dnl.hunters_ghost","dnl.hunters"],Passengers:[{id:"minecraft:area_effect_cloud",CustomNameVisible:1b,Duration:2147483647,Tags:["dnl.hunter_name"],CustomName:'{"text":"Hunter\\"s Ghost","color":"red","bold":true,"italic":false}'}],HandItems:[{id:"minecraft:stone_sword",count:1,components:{"minecraft:custom_name":'{"text":"Hunter\\"s Knife","color":"gold","italic":false}',"minecraft:enchantments":{"minecraft:sharpness":3,"minecraft:knockback":2}}},{}],HandDropChances:[0.000F,0.085F],ArmorItems:[{},{id:"minecraft:leather_leggings",count:1,components:{"minecraft:unbreakable":{},"minecraft:enchantments":{"levels":{}}}},{},{id:"minecraft:leather_helmet",count:1,components:{"minecraft:unbreakable":{},"minecraft:enchantments":{"levels":{}}}}],ArmorDropChances:[0.085F,0.000F,0.085F,0.000F],active_effects:[{id:"minecraft:blindness",amplifier:0,duration:32766}],Attributes:[{id:"minecraft:generic.max_health",base:200},{id:"minecraft:generic.follow_range",base:64}]}
execute as @e[type=skeleton,tag=dnl.hunters,limit=1,sort=nearest] run attribute @s minecraft:generic.max_health base set 200
data merge entity @e[type=skeleton,tag=dnl.hunters,limit=1,sort=nearest] {Health:200f}
kill @s[tag=dnl.summon_ghost,scores={dnl.variable=100}]
