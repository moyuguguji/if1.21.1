#built using mc-build (https://github.com/mc-build/mc-build)


execute if entity @s[nbt={Item:{id:"minecraft:turtle_scute",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.scute":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_scute

execute if entity @s[nbt={Item:{id:"minecraft:coal",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.coal":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_coal

execute if entity @s[nbt={Item:{id:"minecraft:charcoal",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.charcoal":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_charcoal

execute if entity @s[nbt={Item:{id:"minecraft:diamond",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.diamond":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_diamond

execute if entity @s[nbt={Item:{id:"minecraft:emerald",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.emerald":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_emerald

execute if entity @s[nbt={Item:{id:"minecraft:lapis_lazuli",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.lapis_lazuli":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_lapis_lazuli

execute if entity @s[nbt={Item:{id:"minecraft:quartz",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.quartz":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_quartz

execute if entity @s[nbt={Item:{id:"minecraft:amethyst_shard",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.amethyst_shard":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_amethyst_shard

execute if entity @s[nbt={Item:{id:"minecraft:raw_iron",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.raw_iron":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_raw_iron

execute if entity @s[nbt={Item:{id:"minecraft:iron_ingot",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.iron_ingot":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_iron_ingot

execute if entity @s[nbt={Item:{id:"minecraft:raw_copper",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.raw_copper":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_raw_copper

execute if entity @s[nbt={Item:{id:"minecraft:copper_ingot",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.copper_ingot":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_copper_ingot

execute if entity @s[nbt={Item:{id:"minecraft:raw_gold",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.raw_gold":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_raw_gold

execute if entity @s[nbt={Item:{id:"minecraft:gold_ingot",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.gold_ingot":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_gold_ingot

execute if entity @s[nbt={Item:{id:"minecraft:netherite_ingot",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.netherite_ingot":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_netherite_ingot

execute if entity @s[nbt={Item:{id:"minecraft:netherite_scrap",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.netherite_scrap":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_netherite_scrap

execute if entity @s[nbt={Item:{id:"minecraft:stick",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.stick":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_stick

execute if entity @s[nbt={Item:{id:"minecraft:string",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.string":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_string

execute if entity @s[nbt={Item:{id:"minecraft:feather",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.feather":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_feather

execute if entity @s[nbt={Item:{id:"minecraft:gunpowder",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.gunpowder":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_gunpowder

execute if entity @s[nbt={Item:{id:"minecraft:flint",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.flint":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_flint

execute if entity @s[nbt={Item:{id:"minecraft:leather",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.leather":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_leather

execute if entity @s[nbt={Item:{id:"minecraft:brick",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.brick":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_brick

execute if entity @s[nbt={Item:{id:"minecraft:clay_ball",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.clay_ball":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_clay_ball

execute if entity @s[nbt={Item:{id:"minecraft:paper",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.paper":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_paper

execute if entity @s[nbt={Item:{id:"minecraft:book",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.book":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_book

execute if entity @s[nbt={Item:{id:"minecraft:slime_ball",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.slime_ball":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_slime_ball

execute if entity @s[nbt={Item:{id:"minecraft:glowstone_dust",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.glowstone_dust":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_glowstone_dust

execute if entity @s[nbt={Item:{id:"minecraft:ink_sac",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.inc_sac":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_inc_sac

execute if entity @s[nbt={Item:{id:"minecraft:glow_ink_sac",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.glow_ink_sac":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_glow_ink_sac

execute if entity @s[nbt={Item:{id:"minecraft:bone",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.bone":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_bone

execute if entity @s[nbt={Item:{id:"minecraft:ender_pearl",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.ender_pearl":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_ender_pearl

execute if entity @s[nbt={Item:{id:"minecraft:blaze_rod",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.blaze_rod":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_blaze_rod

execute if entity @s[nbt={Item:{id:"minecraft:prismarine_shard",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.prismarine_shard":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_prismarine_shard

execute if entity @s[nbt={Item:{id:"minecraft:prismarine_crystals",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.prismarine_crystals":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_prismarine_crystals

execute if entity @s[nbt={Item:{id:"minecraft:rabbit_hide",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.rabbit_hide":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_rabbit_hide

execute if entity @s[nbt={Item:{id:"minecraft:iron_nugget",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.iron_nugget":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_iron_nugget

execute if entity @s[nbt={Item:{id:"minecraft:nautilus_shell",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.nautilus_shell":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_nautilus_shell

execute if entity @s[nbt={Item:{id:"minecraft:heart_of_the_sea",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.heart_of_the_sea":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_heart_of_the_sea

execute if entity @s[nbt={Item:{id:"minecraft:honeycomb",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.honeycomb":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_honeycomb

execute if entity @s[nbt={Item:{id:"minecraft:oak_sapling",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.oak_sapling":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_oak_sapling

execute if entity @s[nbt={Item:{id:"minecraft:spruce_sapling",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.spruce_sapling":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_spruce_sapling

execute if entity @s[nbt={Item:{id:"minecraft:birch_sapling",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.birch_sapling":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_birch_sapling

execute if entity @s[nbt={Item:{id:"minecraft:jungle_sapling",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.jungle_sapling":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_jungle_sapling

execute if entity @s[nbt={Item:{id:"minecraft:acacia_sapling",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.acacia_sapling":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_acacia_sapling

execute if entity @s[nbt={Item:{id:"minecraft:dark_oak_sapling",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.dark_oak_sapling":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_dark_oak_sapling

execute if entity @s[nbt={Item:{id:"minecraft:wooden_sword",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.wooden_sword":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_wooden_sword

execute if entity @s[nbt={Item:{id:"minecraft:stone_sword",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.stone_sword":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_stone_sword

execute if entity @s[nbt={Item:{id:"minecraft:golden_sword",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.golden_sword":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_golden_sword

execute if entity @s[nbt={Item:{id:"minecraft:iron_sword",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.iron_sword":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_iron_sword

execute if entity @s[nbt={Item:{id:"minecraft:diamond_sword",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.diamond_sword":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_diamond_sword

execute if entity @s[nbt={Item:{id:"minecraft:netherite_sword",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.netherite_sword":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_netherite_sword

execute if entity @s[nbt={Item:{id:"minecraft:bow",count:1}}] align xyz positioned ~-1 ~ ~-1 as @e[type=minecraft:item_frame,tag=!dnl.used,dx=2,dy=2,dz=2,nbt={Item:{components:{"minecraft:custom_data":{"dnl.material":1b,"dnl.bow":1b}}}},sort=random,limit=1] at @s run function dnl.lib:monolith/used

function dnl.lib:monolith/give/material_bow