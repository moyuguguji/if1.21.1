### Seal Check (scheduled loop, independent of tick chain) ###
execute as @e[type=minecraft:area_effect_cloud,tag=dnl.sealed_relic,tag=dnl.core,tag=!dnl.broken_seal] at @s positioned ~ ~2 ~ unless entity @e[type=minecraft:item,nbt={Item:{components:{"minecraft:custom_data":{SealedRelic:1b}}}},distance=..0.1] run function dnl:mobs/guardian_ghast/core/passive/broken_seal

### Loop ###
schedule function dnl:mobs/guardian_ghast/core/passive/check 1s
