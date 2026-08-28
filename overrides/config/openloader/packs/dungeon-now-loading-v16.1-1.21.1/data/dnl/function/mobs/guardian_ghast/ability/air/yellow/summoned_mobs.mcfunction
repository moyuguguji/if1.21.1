scoreboard players set in math 1
scoreboard players set in1 math 4
function rng:range_lcg

execute if score out math matches 1 at @s run summon creeper ~ ~ ~ {powered:1b}
execute if score out math matches 2 at @s run summon witch ~ ~ ~
execute if score out math matches 3 at @s run summon skeleton ~ ~ ~ {HandItems:[{id:"minecraft:bow",count:1,components:{"minecraft:enchantments":{"minecraft:power":5,"minecraft:vanishing_curse":1}}},{}],ArmorItems:[{},{},{},{id:"minecraft:iron_helmet",count:1,components:{"minecraft:enchantments":{"minecraft:blast_protection":5,"minecraft:vanishing_curse":1}}}]}
execute if score out math matches 4 at @s run summon skeleton ~ ~ ~ {HandItems:[{id:"minecraft:iron_sword",count:1,components:{"minecraft:enchantments":{"minecraft:sharpness":5,"minecraft:vanishing_curse":1}}},{}],ArmorItems:[{},{},{},{id:"minecraft:iron_helmet",count:1,components:{"minecraft:enchantments":{"minecraft:blast_protection":5,"minecraft:vanishing_curse":1}}}]}
