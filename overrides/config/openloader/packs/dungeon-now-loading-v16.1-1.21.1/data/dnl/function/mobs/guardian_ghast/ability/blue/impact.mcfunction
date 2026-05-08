summon area_effect_cloud ~ ~ ~ {Particle:'soul_fire_flame',Radius:2f,Duration:100,Effects:[{id:"minecraft:slowness",amplifier:3,duration:100},{id:"minecraft:mining_fatigue",amplifier:3,duration:100},{id:"minecraft:instant_damage",amplifier:0,duration:100},{id:"minecraft:weakness",amplifier:3,duration:100}]}
playsound minecraft:block.glass.break ambient @a ~ ~ ~ 5 1.5
kill @s
