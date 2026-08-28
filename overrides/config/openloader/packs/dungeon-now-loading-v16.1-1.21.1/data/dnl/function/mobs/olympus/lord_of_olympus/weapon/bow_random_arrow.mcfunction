scoreboard players set in math 1
scoreboard players set in1 math 3
function rng:range_lcg

execute if score out math matches 1 run data merge entity @s {damage:20.0d,Tags:["dnl.olympus_arrow"],Fire:100,PierceLevel:1b,custom_potion_effects:[{id:"minecraft:jump_boost",amplifier:0,duration:1}]}
execute if score out math matches 2..3 run data merge entity @s {damage:20.0d,Tags:["dnl.olympus_arrow"]}
