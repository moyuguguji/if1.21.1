#built using mc-build (https://github.com/mc-build/mc-build)

execute if entity @s[nbt={Item:{components:{"minecraft:custom_data":{"dnl.boss_death":1b}}}}] run function dnl.lib:boss_death
execute if entity @s[nbt={Item:{components:{"minecraft:custom_data":{"dnl.unconvertable":1b}}}}] run tag @s add dnl.unconvertable