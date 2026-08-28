### Tags ###
# - dnl.mob
# - dnl.hivenest
# - dnl.bee_swarm
# - dnl.beenest

# - spawnbee - summons a single bee around.

### Nest Destroyed ###
execute if block ~ ~ ~ minecraft:air run function dnl:mobs/hivenest/bee_swarm/beenest/destroyed

### Summon a Bee ###
execute if entity @s[tag=dnl.spawnbee] run function dnl:mobs/hivenest/bee_swarm/beenest/spawnbee/location

### Set Leaf Barrier ###
execute if entity @s[tag=dnl.leafbarrier] run function dnl:mobs/hivenest/bee_swarm/beenest/leafbarrier

### Summon Bee Rapidly ###
execute if entity @s[tag=dnl.rapidbee] run function dnl:mobs/hivenest/bee_swarm/beenest/rapidbee

### Particle ###
particle minecraft:dust{color:[1.0,0.8,0.251],scale:1.0} ~ ~ ~ 0.4 0.4 0.4 1 10 normal
