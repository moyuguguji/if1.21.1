## rng using loot method
loot replace block 6942069 255 6942069 container.0 loot rng:rng
execute store result score out math run data get block 6942069 255 6942069 Items[0].components."minecraft:attribute_modifiers".modifiers[0].amount