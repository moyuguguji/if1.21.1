#built using mc-build (https://github.com/mc-build/mc-build)

execute unless data entity @s {Item:{count:1}} run data modify entity @s Invulnerable set value 1
execute if data entity @s {Item:{count:1}} if entity @s[tag=!dnl.checked] run function dnl.plains_castle:monolith/__generated__/execute/115
execute if entity @s[tag=dnl.checked] unless data entity @s {Item:{count:1}} run tag @s remove dnl.checked