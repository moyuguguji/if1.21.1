data merge entity @s {Invisible:0b}
tag @s add dnl.material.used
execute as @e[type=minecraft:item_frame,tag=dnl.crafter,distance=..5,limit=1,sort=nearest] run function dnl:crafting/success
