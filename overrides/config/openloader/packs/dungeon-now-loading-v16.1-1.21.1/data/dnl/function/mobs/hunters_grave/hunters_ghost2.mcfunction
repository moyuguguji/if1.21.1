# 猎手传承奖励: 由进度 dnl:items/broken_bow/killed_hunter_ghost 触发
# (击杀 Hunter's Ghost 时手持 Broken Bow, 由击杀进度触发, 不再依赖地上的信标)
# 运行上下文: as @s = 触发进度的玩家
# 奖励: 狼 Gray + 骨×10 + 探险者地图(hunters_grave) + Broken Bow 升级为不破 Hunter's Bow

# 狼 Gray(修复: 补全 summon NBT 缺失的闭合括号)
execute at @s run summon minecraft:wolf ~ ~ ~ {Health:40f,Anger:0,Age:-20000,NoAI:1b,Sitting:1b,Tags:["dnl.grey"],Rotation:[90.0f,-30.0f],PersistenceRequired:1b,CollarColor:8b,Attributes:[{id:"minecraft:generic.max_health",base:40}],CustomName:'{"text":"Gray","color":"gray","bold":true,"italic":false}'}
execute at @s run particle minecraft:cloud ~ ~ ~ 0.5 0.5 0.5 0.01 10
execute at @s run playsound entity.wolf.howl ambient @a[distance=..64] ~ ~ ~ 1.0 1 1

# 进度: 猎手的继承者
advancement grant @s only dnl:story/structures/hunters_grave/heir_of_hunter

# 骨×10
execute at @s run summon item ~ ~ ~ {Item:{id:"minecraft:bone",count:10,components:{"minecraft:custom_name":'{"text":"Bone","color":"gold","italic":false}'}}}

# 地图(修正: 应为 hunters_grave, 而非 forgotten_field)
execute at @s run loot spawn ~ ~ ~ loot dnl:maps/hunters_grave

# 主手/副手的 Broken Bow -> 不破 Hunter's Bow
execute if entity @s[nbt={SelectedItem:{id:"minecraft:bow",components:{"minecraft:custom_data":{"dnl.broken_bow":1b}}}}] run item replace entity @s weapon.mainhand with minecraft:bow[minecraft:custom_name='{"text":"Hunter\\"s Bow","color":"gold","italic":false}',minecraft:unbreakable={},minecraft:enchantments={"levels":{}}]
execute if entity @s[nbt={Inventory:[{Slot:-106,id:"minecraft:bow",components:{"minecraft:custom_data":{"dnl.broken_bow":1b}}}]}] run item replace entity @s weapon.offhand with minecraft:bow[minecraft:custom_name='{"text":"Hunter\\"s Bow","color":"gold","italic":false}',minecraft:unbreakable={},minecraft:enchantments={"levels":{}}]

# 清理猎人 AEC(幽灵名字残留等)
execute at @s run kill @e[type=area_effect_cloud,tag=dnl.hunters_wolf,limit=1,sort=nearest]
execute at @s run kill @e[type=area_effect_cloud,limit=1,sort=nearest,tag=dnl.hunter_name]

# 撤销触发进度(防止反复/残留触发)
advancement revoke @s only dnl:items/broken_bow/killed_hunter_ghost
