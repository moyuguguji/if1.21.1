execute at @e[type=item,nbt={Item:{components:{"minecraft:custom_data":{"dnl.alpha":1b}}}}] if block ~ ~-1 ~ minecraft:jukebox run stopsound @a[distance=..16] record minecraft:music.credits
