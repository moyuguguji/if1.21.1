# 展示框合成器 - honey_potion(craftpoint=7)
# 合成器内物品必须是【治疗药水】(决定产物为蜂蜜药水 I)
#   想合成蜂蜜药水 II: 把合成器里的药水换成【强力治疗药水】(strong_healing)
# 放置此展示框后, 在其上方 ~1.5 格范围内放置材料框(见 give/crafting/materials/honey_potion)
give @s item_frame[minecraft:custom_name='{"text":"honey_potion crafter","color":"gold","italic":false}',minecraft:entity_data={id:"minecraft:item_frame",Tags:['dnl.crafter','dnl.honey_potion'],Item:{id:"minecraft:potion",components:{"minecraft:potion_contents":{potion:"minecraft:healing"}},count:1},Invulnerable:1b}] 1
