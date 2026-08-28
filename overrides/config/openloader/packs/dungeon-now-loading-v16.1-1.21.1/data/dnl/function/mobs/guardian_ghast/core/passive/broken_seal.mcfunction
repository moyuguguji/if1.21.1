### Particle ###
particle minecraft:enchant ~ ~2.3 ~ 0.1 0 0.1 100 20 force

### Sound ###
playsound minecraft:ambient.cave ambient @a ~ ~ ~ 16 0.1
playsound minecraft:block.glass.break ambient @a ~ ~ ~ 16 0.1
playsound minecraft:block.enchantment_table.use ambient @a ~ ~ ~ 16 0.5

### Weather Effect ###
weather thunder 1000000

### Scoreboard ###
scoreboard players set @s dnl.phase 1
scoreboard players set @e[type=minecraft:ghast,tag=dnl.guardian_ghast,tag=dnl.main,distance=..80] dnl.phase 1

### List of Seals ###
tag @e[type=minecraft:ghast,tag=dnl.guardian_ghast,tag=dnl.main,distance=..80] add dnl.transition.awoken


### Force Awaken All Ghasts ###
execute as @e[type=minecraft:ghast,tag=dnl.guardian_ghast,tag=dnl.main] run data merge entity @s {NoAI:0b,Silent:0b}
execute as @e[type=minecraft:ghast,tag=dnl.guardian_ghast,tag=dnl.main] run tag @s remove dnl.sleeping
execute as @e[type=minecraft:ghast,tag=dnl.guardian_ghast,tag=dnl.main] run tag @s remove dnl.transition.awoken
execute as @e[type=minecraft:ghast,tag=dnl.guardian_ghast,tag=dnl.main] run tag @s add dnl.awoken
tag @s add dnl.broken_seal

### Bossbar (旧版: 开战即显示 Sisters of Sorrow 血条) ###
execute as @s[tag=!dnl.init.core] run function dnl:mobs/guardian_ghast/core/init
bossbar set dnl:guardian_ghast visible true
