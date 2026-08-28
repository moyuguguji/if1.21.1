execute at @s[tag=pillager_jokey] run summon spider ~ ~ ~ {Health:31f,PersistenceRequired:1b,Tags:["illusioned_gallery"],Passengers:[{id:"minecraft:pillager",PersistenceRequired:1b,Tags:["noai","illusioned_gallery"],HandItems:[{id:"minecraft:crossbow",count:1,components:{"minecraft:enchantments":{"minecraft:quick_charge":1}}},{}],Attributes:[{id:"minecraft:generic.max_health",base:31}]}],Attributes:[{id:"minecraft:generic.max_health",base:20}]}
data merge entity @e[type=spider,tag=illusioned_gallery,limit=1,sort=nearest] {Health:31f}
kill @s[tag=pillager_jokey]

execute at @s[tag=evoker_ravager] run summon ravager ~ ~ ~ {Health:30f,PersistenceRequired:1b,Tags:["illusioned_gallery"],Passengers:[{id:"minecraft:evoker",PersistenceRequired:1b,Tags:["noai","illusioned_gallery"],Attributes:[{id:"minecraft:generic.max_health",base:30}]}],Attributes:[{id:"minecraft:generic.max_health",base:120}]}
data merge entity @e[type=ravager,tag=illusioned_gallery,limit=1,sort=nearest] {Health:30f}
kill @s[tag=evoker_ravager]

execute at @s[tag=jukebox] if block ~ ~-1 ~ minecraft:jukebox{RecordItem:{id:"minecraft:music_disc_cat",count:1,components:{"minecraft:custom_name":'{"italic":false,"color":"gold","text":"Illusioner"s Disc"}'}}} run scoreboard players add @s dnl.variable 1
execute at @s[tag=jukebox] unless block ~ ~-1 ~ minecraft:jukebox{RecordItem:{id:"minecraft:music_disc_cat",count:1,components:{"minecraft:custom_name":'{"italic":false,"color":"gold","text":"Illusioner"s Disc"}'}}} run scoreboard players reset @s dnl.variable
execute if entity @s[tag=jukebox,scores={dnl.variable=45}] run title @a title {"text":".","color":"blue"}
execute if entity @s[tag=jukebox,scores={dnl.variable=85}] run title @a title {"text":". .","color":"blue"}
execute if entity @s[tag=jukebox,scores={dnl.variable=125}] run title @a title {"text":". . .","color":"blue"}
execute if entity @s[tag=jukebox,scores={dnl.variable=175}] run title @a title {"text":".","color":"blue"}
execute if entity @s[tag=jukebox,scores={dnl.variable=215}] run title @a title {"text":". .","color":"blue"}
execute if entity @s[tag=jukebox,scores={dnl.variable=255}] run title @a title {"text":". . .","color":"blue"}
execute if entity @s[tag=jukebox,scores={dnl.variable=305}] run title @a title {"text":".","color":"blue"}
execute if entity @s[tag=jukebox,scores={dnl.variable=345}] run title @a title {"text":". .","color":"blue"}
execute if entity @s[tag=jukebox,scores={dnl.variable=385}] run title @a title {"text":". . .","color":"blue"}
execute if entity @s[tag=jukebox,scores={dnl.variable=435}] run title @a title {"text":".","color":"blue"}
execute if entity @s[tag=jukebox,scores={dnl.variable=475}] run title @a title {"text":". .","color":"blue"}
execute if entity @s[tag=jukebox,scores={dnl.variable=515}] run title @a title {"text":". . .","color":"blue"}
execute if entity @s[tag=jukebox,scores={dnl.variable=610}] run title @a title {"text":"Dungeon Now Loading","color":"gold"}
execute if entity @s[tag=jukebox,scores={dnl.variable=610}] run title @a subtitle {"text":"Minecraft Datapack","color":"blue"}
execute if entity @s[tag=jukebox,scores={dnl.variable=750}] run title @a title {"text":"Hex","color":"gold"}
execute if entity @s[tag=jukebox,scores={dnl.variable=750}] run title @a subtitle {"text":"Creator","color":"blue"}
execute if entity @s[tag=jukebox,scores={dnl.variable=910}] run title @a title {"text":"Thank you!!","color":"gold"}
execute if entity @s[tag=jukebox,scores={dnl.variable=910}] run title @a subtitle {"text":"for Playing","color":"blue"}
execute at @s[tag=jukebox,scores={dnl.variable=1000}] run particle minecraft:cloud ~ ~ ~ 0.5 1 0.5 0.0000001 30
execute at @s[tag=jukebox,scores={dnl.variable=1000}] run summon cat ~ ~ ~ {Health:100f,PersistenceRequired:1b,CatType:10,CollarColor:1b,Tags:["pet","lantern"],Passengers:[{id:"minecraft:bat",PersistenceRequired:1b,Tags:["pet","jack"],CustomName:'{"text":"Jack","color":"gold","italic":false}',Attributes:[{id:"minecraft:generic.max_health",base:100}]}],CustomName:'{"text":"Lantern","color":"gold","italic":false}',Attributes:[{id:"minecraft:generic.max_health",base:100}]}
data merge entity @e[type=cat,tag=lantern,limit=1,sort=nearest] {Health:100f}
kill @s[tag=jukebox,scores={dnl.variable=1000..}]
