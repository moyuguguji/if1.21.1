# 原版机制: dnl.wolf_spawned 一次性标记, 只生成一次 Broken Bow 盔甲架(不重生)
execute as @s at @s unless entity @s[tag=dnl.wolf_spawned] run summon armor_stand ~ ~ ~ {Rotation:[90.0f,0.0f],Tags:["dnl.hunters_bow"],Invulnerable:0b,Invisible:1b,Pose:{RightArm:[90f,90f,0f]},HandItems:[{id:"minecraft:bow",count:1,components:{"minecraft:custom_name":'{"text":"Broken Bow","color":"gold","italic":false}',"minecraft:lore":['{"text":"Lingering Regret","color":"blue","italic":false}'],"minecraft:damage":377,"minecraft:custom_data":{"dnl.broken_bow":1b}}},{}]}
tag @s add dnl.wolf_spawned
