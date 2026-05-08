# save station chief's health to scoreboard #
execute as @s store result score @s dnl.health run data get entity @s Health 1

# Health #
# 100% - 76% #
data merge entity @s[scores={dnl.health=271..360},tag=!phase_change] {HandItems:[{id:"minecraft:crossbow",count:1,components:{"minecraft:enchantments":{"minecraft:quick_charge":2},"minecraft:charged_projectiles":[{id:"minecraft:arrow",count:1},{id:"minecraft:arrow",count:1},{id:"minecraft:arrow",count:1}]}},{}],HandDropChances:[0.000F,0.085F]}

# 75% - 51% #
data merge entity @s[scores={dnl.health=181..270},tag=!phase_change] {HandItems:[{id:"minecraft:crossbow",count:1,components:{"minecraft:enchantments":{"minecraft:quick_charge":3},"minecraft:charged_projectiles":[{id:"minecraft:tipped_arrow",count:1,components:{"minecraft:potion_contents":{custom_effects:[{id:"minecraft:hunger",amplifier:2,duration:300}],custom_color:5797459}}},{id:"minecraft:tipped_arrow",count:1,components:{"minecraft:potion_contents":{custom_effects:[{id:"minecraft:hunger",amplifier:2,duration:300}],custom_color:5797459}}},{id:"minecraft:tipped_arrow",count:1,components:{"minecraft:potion_contents":{custom_effects:[{id:"minecraft:hunger",amplifier:2,duration:300}],custom_color:5797459}}}]}},{}],HandDropChances:[0.000F,0.085F]}

# 50% #
data merge entity @s[scores={dnl.health=..180},tag=!phase_change] {HandItems:[{id:"minecraft:crossbow",count:1,components:{"minecraft:enchantments":{"minecraft:quick_charge":3},"minecraft:charged_projectiles":[{id:"minecraft:tipped_arrow",count:1,components:{"minecraft:potion_contents":{custom_effects:[{id:"minecraft:hunger",amplifier:2,duration:300}],custom_color:5797459}}},{id:"minecraft:tipped_arrow",count:1,components:{"minecraft:potion_contents":{custom_effects:[{id:"minecraft:hunger",amplifier:2,duration:300}],custom_color:5797459}}},{id:"minecraft:tipped_arrow",count:1,components:{"minecraft:potion_contents":{custom_effects:[{id:"minecraft:hunger",amplifier:2,duration:300}],custom_color:5797459}}}]}},{id:"minecraft:ravager_spawn_egg",count:1}],HandDropChances:[0.000F,0.085F]}

scoreboard players add @s[scores={dnl.health=..180},tag=!phase_change] dnl.variable 1

execute if entity @s[scores={dnl.variable=20},tag=!phase_change] at @s run playsound event.raid.horn ambient @a[distance=..16] ~ ~ ~ 100.0 1 1

execute at @s[scores={dnl.variable=59},tag=!phase_change] run particle minecraft:cloud ~ ~2 ~ 1 1 1 0.0000001 50

execute at @s[scores={dnl.variable=60},tag=!phase_change] run summon ravager ~ ~ ~ {Invulnerable:1b,DeathLootTable:"dnl:structures/railway_outpost/mobs/ravager",PersistenceRequired:1b,Tags:["station_chief_ravager"],Passengers:[{id:"minecraft:pillager",Glowing:1b,DeathLootTable:"dnl:structures/railway_outpost/mobs/station_chief",PersistenceRequired:1b,Health:180f,Tags:["phase_change","station_chief","pillager_persistence_true","railway_boss"],CustomName:'{"text":"Station Chief","color":"red","bold":true,"italic":false}',HandItems:[{id:"minecraft:crossbow",count:1,tag:{ChargedProjectiles:[{id:"minecraft:tipped_arrow",count:1,tag:{CustomPotionEffects:[{Id:19b,Amplifier:3b,Duration:60}],CustomPotionColor:5149489}},{id:"minecraft:tipped_arrow",count:1,tag:{CustomPotionEffects:[{Id:19b,Amplifier:3b,Duration:60}],CustomPotionColor:5149489}},{id:"minecraft:tipped_arrow",count:1,tag:{CustomPotionEffects:[{Id:19b,Amplifier:3b,Duration:60}],CustomPotionColor:5149489}}],Charged:1b}},{}],HandDropChances:[0.000F,0.085F],Attributes:[{id:"minecraft:max_health",base:360}]}]}

tp @s[scores={dnl.variable=60},tag=!phase_change] ~ -1000 ~
kill @s[scores={dnl.variable=60},tag=!phase_change]

# 50% - 25% #
data merge entity @s[scores={dnl.health=91..180},tag=phase_change] {HandItems:[{id:"minecraft:crossbow",count:1,components:{"minecraft:enchantments":{"minecraft:quick_charge":3},"minecraft:charged_projectiles":[{id:"minecraft:tipped_arrow",count:1,components:{"minecraft:potion_contents":{custom_effects:[{id:"minecraft:hunger",amplifier:2,duration:300},{id:"minecraft:poison",amplifier:3,duration:60}],custom_color:5149489}}},{id:"minecraft:tipped_arrow",count:1,components:{"minecraft:potion_contents":{custom_effects:[{id:"minecraft:hunger",amplifier:2,duration:300},{id:"minecraft:poison",amplifier:3,duration:60}],custom_color:5149489}}},{id:"minecraft:tipped_arrow",count:1,components:{"minecraft:potion_contents":{custom_effects:[{id:"minecraft:hunger",amplifier:2,duration:300},{id:"minecraft:poison",amplifier:3,duration:60}],custom_color:5149489}}}]}},{}]}

# 25% - 0% #
data merge entity @s[scores={dnl.health=0..90},tag=phase_change] {HandItems:[{id:"minecraft:crossbow",count:1,components:{"minecraft:enchantments":{"minecraft:quick_charge":4},"minecraft:charged_projectiles":[{id:"minecraft:tipped_arrow",count:1,components:{"minecraft:potion_contents":{custom_effects:[{id:"minecraft:nausea",amplifier:0,duration:200},{id:"minecraft:hunger",amplifier:2,duration:300},{id:"minecraft:poison",amplifier:3,duration:60}],custom_color:5578058}}},{id:"minecraft:tipped_arrow",count:1,components:{"minecraft:potion_contents":{custom_effects:[{id:"minecraft:nausea",amplifier:0,duration:200},{id:"minecraft:hunger",amplifier:2,duration:300},{id:"minecraft:poison",amplifier:3,duration:60}],custom_color:5578058}}},{id:"minecraft:tipped_arrow",count:1,components:{"minecraft:potion_contents":{custom_effects:[{id:"minecraft:nausea",amplifier:0,duration:200},{id:"minecraft:hunger",amplifier:2,duration:300},{id:"minecraft:poison",amplifier:3,duration:60}],custom_color:5578058}}}]}},{}]}
