setblock ~ ~ ~ minecraft:brewing_stand

scoreboard players set in math 1
scoreboard players set in1 math 20
function rng:range_lcg

execute store result storage dnl.storage.brewing_stand Fuel byte 1 run scoreboard players get out math
data modify block ~ ~ ~ Fuel set from storage dnl.storage.brewing_stand Fuel

scoreboard players set in math 1
scoreboard players set in1 math 10
function rng:range_lcg

execute if score out math matches 2..3 at @s run data merge block ~ ~ ~ {Items:[{Slot:0,id:"minecraft:potion",count:1,tag:{Potion:"minecraft:healing"}}]}
execute if score out math matches 4..5 at @s run data merge block ~ ~ ~ {Items:[{Slot:1,id:"minecraft:potion",count:1,tag:{Potion:"minecraft:healing"}}]}
execute if score out math matches 6..7 at @s run data merge block ~ ~ ~ {Items:[{Slot:2,id:"minecraft:potion",count:1,tag:{Potion:"minecraft:healing"}}]}
execute if score out math matches 8 at @s run data merge block ~ ~ ~ {Items:[{Slot:0,id:"minecraft:potion",count:1,tag:{Potion:"minecraft:strong_healing"}}]}
execute if score out math matches 9 at @s run data merge block ~ ~ ~ {Items:[{Slot:1,id:"minecraft:potion",count:1,tag:{Potion:"minecraft:strong_healing"}}]}
execute if score out math matches 10 at @s run data merge block ~ ~ ~ {Items:[{Slot:2,id:"minecraft:potion",count:1,tag:{Potion:"minecraft:strong_healing"}}]}

kill @s
