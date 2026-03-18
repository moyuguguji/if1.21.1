ServerEvents.recipes(event => {//永恒
    event.shapeless('kubejs:yong_hen_star', ['kubejs:difficulty_changer'])
})

ItemEvents.entityInteracted(event=>{
    let player = event.getPlayer()
    let entity = event.target
    if (player != null) {
        if (entity != null) {
            if (player.stages.has('difficulty_yonghen')) {
                if ((event.player.getHeldItem("main_hand") == 'minecraft:flint_and_steel' || event.player.getHeldItem("off_hand") == 'minecraft:flint_and_steel') && entity.type =='minecraft:creeper') {
                    event.cancel()
                }
            }
        }
    }
})
