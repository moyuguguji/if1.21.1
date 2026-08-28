### Required crafting materials ###
execute if entity @s[nbt={Item:{id:"minecraft:gold_ingot"}}] at @s positioned ~ ~1.5 ~ as @e[type=minecraft:item_frame,tag=dnl.material,tag=!dnl.material.used,tag=dnl.gold_ingot,distance=..2.1,sort=random,limit=1] at @s run function dnl:crafting/material_used
execute if entity @s[nbt={Item:{id:"minecraft:honey_bottle"}}] at @s positioned ~ ~1.5 ~ as @e[type=minecraft:item_frame,tag=dnl.material,tag=!dnl.material.used,tag=dnl.honey_bottle,distance=..2.1,sort=random,limit=1] at @s run function dnl:crafting/material_used
execute if entity @s[nbt={Item:{id:"minecraft:honeycomb"}}] at @s positioned ~ ~1.5 ~ as @e[type=minecraft:item_frame,tag=dnl.material,tag=!dnl.material.used,tag=dnl.honeycomb,distance=..2.1,sort=random,limit=1] at @s run function dnl:crafting/material_used


### Reset Crafter ###
execute if score @s dnl.success matches 1.. run function dnl:crafting/success

### Crafted item ###
execute if score @s dnl.craftpoint matches 9.. at @s positioned ~ ~1.5 ~ if entity @e[type=minecraft:item_frame,tag=dnl.material,tag=dnl.gold_ingot,tag=dnl.material.used,distance=..2.1] if entity @e[type=minecraft:item_frame,tag=dnl.material,tag=dnl.honey_bottle,tag=dnl.material.used,distance=..2.1] if entity @e[type=minecraft:item_frame,tag=dnl.material,tag=dnl.honeycomb,tag=dnl.material.used,distance=..2.1] run loot spawn ~ ~ ~ loot dnl:items/honeycomb_ingot

### Crafting Success ###
execute if score @s dnl.craftpoint matches 9.. at @s positioned ~ ~1.5 ~ if entity @e[type=minecraft:item_frame,tag=dnl.material,tag=dnl.gold_ingot,tag=dnl.material.used,distance=..2.1] if entity @e[type=minecraft:item_frame,tag=dnl.material,tag=dnl.honey_bottle,tag=dnl.material.used,distance=..2.1] if entity @e[type=minecraft:item_frame,tag=dnl.material,tag=dnl.honeycomb,tag=dnl.material.used,distance=..2.1] run playsound minecraft:entity.experience_orb.pickup block @a[distance=..6] ~ ~ ~ 1 1 1
execute if score @s dnl.craftpoint matches 9.. at @s positioned ~ ~1.5 ~ if entity @e[type=minecraft:item_frame,tag=dnl.material,tag=dnl.gold_ingot,tag=dnl.material.used,distance=..2.1] if entity @e[type=minecraft:item_frame,tag=dnl.material,tag=dnl.honey_bottle,tag=dnl.material.used,distance=..2.1] if entity @e[type=minecraft:item_frame,tag=dnl.material,tag=dnl.honeycomb,tag=dnl.material.used,distance=..2.1] run function dnl:crafting/reset_result
