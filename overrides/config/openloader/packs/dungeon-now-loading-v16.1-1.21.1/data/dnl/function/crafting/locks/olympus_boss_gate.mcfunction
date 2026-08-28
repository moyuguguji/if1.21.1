### Required crafting materials ###
execute if entity @s[nbt={Item:{id:"minecraft:clock",components:{"minecraft:custom_data":{"dnl.olympus_key":1b}}}}] at @s positioned ~ ~ ~ if entity @e[type=minecraft:item_frame,tag=dnl.material,tag=!dnl.material.used,tag=dnl.olympus_key,distance=..4.1,sort=random,limit=1] run function dnl:crafting/material_used

### Reset Crafter ###
execute if score @s dnl.success matches 1.. run function dnl:crafting/success

### Crafted item ###
execute if score @s dnl.craftpoint matches 3 run fill ~1 ~1 ~1 ~-1 ~-1 ~-1 minecraft:air
execute if score @s dnl.craftpoint matches 3 run fill ~2 ~2 ~2 ~-2 ~-2 ~-2 minecraft:andesite replace minecraft:bedrock

### Crafting Success ###
execute if score @s dnl.craftpoint matches 3 run playsound minecraft:entity.experience_orb.pickup block @a[distance=..4] ~ ~ ~ 1 1 1
execute if score @s dnl.craftpoint matches 3 run kill @s
