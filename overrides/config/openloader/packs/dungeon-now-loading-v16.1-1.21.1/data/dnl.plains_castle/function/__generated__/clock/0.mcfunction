#built using mc-build (https://github.com/mc-build/mc-build)

schedule function dnl.plains_castle:__generated__/clock/0 1s
execute as @a at @s run if entity @s[nbt={SelectedItem:{components:{"minecraft:custom_data":{"dnl.knightly_sword":1b}}},Inventory:[{Slot:-106,id:"minecraft:shield"}]}] run function dnl.plains_castle:items/knightly_sword/effect