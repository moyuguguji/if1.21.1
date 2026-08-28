scoreboard players set in math 1
scoreboard players set in1 math 12
function rng:range_lcg

scoreboard players set #6 dnl.constant 6

execute if score out math matches 1 at @s run summon minecraft:skeleton ~ ~ ~ {Tags:["camp_mob"],HandItems:[{},{}]}
execute if score out math matches 2 at @s run summon minecraft:stray ~ ~ ~ {Tags:["camp_mob"],HandItems:[{},{}]}
execute if score out math matches 3 at @s run summon minecraft:spider ~ ~ ~ {Tags:["camp_mob"]}
execute if score out math matches 4 at @s run summon minecraft:skeleton ~ ~ ~ {Tags:["camp_mob"],HandItems:[{id:"minecraft:golden_hoe",count:1,components:{"minecraft:enchantments":{"minecraft:sharpness":5}}},{}],HandDropChances:[0.000F,0.085F],ArmorItems:[{},{},{},{id:"minecraft:leather_helmet",count:1,components:{"minecraft:dyed_color":{"rgb":15728397},"minecraft:unbreakable":{}}}],ArmorDropChances:[0.085F,0.085F,0.085F,0.000F]}
execute if score out math matches 5 at @s run summon minecraft:skeleton ~ ~ ~ {Tags:["camp_mob"],HandItems:[{id:"minecraft:golden_sword",count:1,components:{"minecraft:enchantments":{"minecraft:sharpness":5}}},{}],HandDropChances:[0.000F,0.085F],ArmorItems:[{},{},{},{id:"minecraft:jack_o_lantern",count:1}],ArmorDropChances:[0.085F,0.085F,0.085F,0.000F]}
execute if score out math matches 6 at @s run summon minecraft:skeleton ~ ~ ~ {Tags:["camp_mob"],HandItems:[{id:"minecraft:iron_pickaxe",count:1,components:{"minecraft:unbreakable":{}}},{}],HandDropChances:[0.000F,0.085F],ArmorItems:[{},{},{},{id:"minecraft:chainmail_helmet",count:1,components:{"minecraft:unbreakable":{}}}],ArmorDropChances:[0.085F,0.085F,0.085F,0.000F]}

execute if score out math <= #6 dnl.constant at @s at @e[sort=nearest,type=!arrow,limit=1] run particle minecraft:cloud ~ ~ ~ 0.5 1 0.5 0.0000001 30

kill @s
