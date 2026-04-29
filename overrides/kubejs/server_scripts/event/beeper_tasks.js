// priority: 100
// 哔哔机 - 任务完成检测

// ============================================================
// 辅助函数
// ============================================================

function bitSet(mask, i) { return ((mask >> i) & 1) === 1 }

function getActiveTask(player) {
    const idx = player.persistentData.getInt(PD_KEY_BEEPER_TASK)
    if (idx < 0 || idx >= BEEPER_TASKS.length) return -1
    const deadline = player.persistentData.getInt(PD_KEY_BEEPER_DEADLINE)
    if (player.server.tickCount > deadline) return -1
    return idx
}

/** 将任务标记为完成，累计 10 种不同任务时重置掩码 */
function markCompleted(player, taskIdx) {
    if (taskIdx < 0 || taskIdx >= BEEPER_TASKS.length) return
    let mask = player.persistentData.getInt(PD_KEY_BEEPER_COMPLETED_MASK) | (1 << taskIdx)
    let count = 0
    for (let i = 0; i < BEEPER_TASKS.length; i++) if (bitSet(mask, i)) count++
    if (count >= BEEPER_TASKS.length / 2) mask = 0
    player.persistentData.putInt(PD_KEY_BEEPER_COMPLETED_MASK, mask)
}

function completeTask(player) {
    let cp = player.persistentData.getInt(PD_KEY_COMMAND_PROTECTION)
    if (cp < CP_MAX) {
        cp += 1
        player.persistentData.putInt(PD_KEY_COMMAND_PROTECTION, cp)
        player.potionEffects.add('kubejs:command_protection', -1, cp - 1, true, false)
    }
    markCompleted(player, player.persistentData.getInt(PD_KEY_BEEPER_TASK))
    player.persistentData.putInt(PD_KEY_BEEPER_TASK, -1)
    player.persistentData.putInt(PD_KEY_BEEPER_PROGRESS, 0)
    player.persistentData.putInt(PD_KEY_BEEPER_RESULT_TYPE, 1)
    player.persistentData.putInt(PD_KEY_BEEPER_GARBLED_END, player.server.tickCount + 20)
}

// ============================================================
// 任务事件检测
// ============================================================

// 0: destroy_grass — 破坏任意草/蕨/灌木/海草
BlockEvents.broken(event => {
    const { block, player } = event
    if (!player || getActiveTask(player) !== 0) return
    const targets = ['minecraft:short_grass', 'minecraft:tall_grass', 'minecraft:fern', 'minecraft:large_fern', 'minecraft:dead_bush', 'minecraft:seagrass', 'minecraft:tall_seagrass']
    if (targets.includes(block.id)) completeTask(player)
})

// 1: kill_zombie — 击杀僵尸/僵尸村民/尸壳/溺尸/僵尸猪灵
EntityEvents.death(event => {
    const { entity, source } = event
    const killer = source.player
    if (!killer || getActiveTask(killer) !== 1) return
    const targets = ['minecraft:zombie', 'minecraft:zombie_villager', 'minecraft:husk', 'minecraft:drowned', 'minecraft:zombified_piglin']
    if (targets.includes(entity.type)) completeTask(killer)
})

// 2: collect_flower — 拾取小花或高花
PlayerEvents.inventoryChanged(event => {
    const { player, item } = event
    if (!item || item.isEmpty() || getActiveTask(player) !== 2) return
    if (item.hasTag('minecraft:small_flowers') || item.hasTag('minecraft:tall_flowers')) completeTask(player)
})

// 3: eat_bread — 吃掉一个面包
ItemEvents.foodEaten(event => {
    const { player, item } = event
    if (getActiveTask(player) !== 3) return
    if (item.id === 'minecraft:bread') completeTask(player)
})

// 4: chop_tree — 破坏任意原木
BlockEvents.broken(event => {
    const { block, player } = event
    if (!player || getActiveTask(player) !== 4) return
    if (block.hasTag('minecraft:logs')) completeTask(player)
})

// 5: catch_fish — 拾取鳕鱼/鲑鱼/河豚/热带鱼
PlayerEvents.inventoryChanged(event => {
    const { player, item } = event
    if (!item || item.isEmpty() || getActiveTask(player) !== 5) return
    const targets = ['minecraft:cod', 'minecraft:salmon', 'minecraft:pufferfish', 'minecraft:tropical_fish']
    if (targets.includes(item.id)) completeTask(player)
})

// 6: dig_gravel — 挖掘3个沙砾（累计）
BlockEvents.broken(event => {
    const { block, player } = event
    if (!player || getActiveTask(player) !== 6 || block.id !== 'minecraft:gravel') return
    const p = player.persistentData.getInt(PD_KEY_BEEPER_PROGRESS) + 1
    if (p >= 3) { completeTask(player) }
    else {
        player.persistentData.putInt(PD_KEY_BEEPER_PROGRESS, p)
        player.setStatusMessage(Text.translate('msg.beeper.progress', p, 3).color(0xFFFF55))
    }
})

// 7: craft_table — 制作一个工作台
ItemEvents.crafted(event => {
    const { player, item } = event
    if (getActiveTask(player) !== 7) return
    if (item.id === 'minecraft:crafting_table') completeTask(player)
})

// 8: shear_sheep — 用剪刀右键羊
ItemEvents.entityInteracted(event => {
    const { player, target, item } = event
    if (!player || getActiveTask(player) !== 8) return
    if (item.id === 'minecraft:shears' && target.type === 'minecraft:sheep') completeTask(player)
})

// 9: kill_skeleton — 击杀骷髅/流浪者/凋零骷髅/沼骸
EntityEvents.death(event => {
    const { entity, source } = event
    const killer = source.player
    if (!killer || getActiveTask(killer) !== 9) return
    const targets = ['minecraft:skeleton', 'minecraft:stray', 'minecraft:wither_skeleton', 'minecraft:bogged']
    if (targets.includes(entity.type)) completeTask(killer)
})

// 10: mine_coal — 挖掘煤矿石或深层煤矿石
BlockEvents.broken(event => {
    const { block, player } = event
    if (!player || getActiveTask(player) !== 10) return
    if (block.id === 'minecraft:coal_ore' || block.id === 'minecraft:deepslate_coal_ore') completeTask(player)
})

// 11: plant_sapling — 手持树苗右键泥土类方块
BlockEvents.rightClicked(event => {
    const { player, block, item } = event
    if (!player || getActiveTask(player) !== 11) return
    if (item && item.hasTag('minecraft:saplings') && block.hasTag('minecraft:dirt')) completeTask(player)
})

// 12: drink_water — 喝下任意药水（含水瓶）
ItemEvents.foodEaten(event => {
    const { player, item } = event
    if (getActiveTask(player) !== 12) return
    if (item.id === 'minecraft:potion') completeTask(player)
})

// 13: trade_villager — 右键村民/流浪商人打开交易界面
ItemEvents.entityInteracted(event => {
    const { player, target } = event
    if (!player || getActiveTask(player) !== 13) return
    if (target.type === 'minecraft:villager' || target.type === 'minecraft:wandering_trader') completeTask(player)
})

// 14: kill_creeper — 击杀苦力怕
EntityEvents.death(event => {
    const { entity, source } = event
    const killer = source.player
    if (!killer || getActiveTask(killer) !== 14) return
    if (entity.type === 'minecraft:creeper') completeTask(killer)
})

// 15: collect_mushroom — 破坏蘑菇或蘑菇方块
BlockEvents.broken(event => {
    const { block, player } = event
    if (!player || getActiveTask(player) !== 15) return
    const targets = ['minecraft:brown_mushroom', 'minecraft:red_mushroom', 'minecraft:brown_mushroom_block', 'minecraft:red_mushroom_block', 'minecraft:mushroom_stem']
    if (targets.includes(block.id)) completeTask(player)
})

// 16: build_path — 手持锹右键草方块/泥土等使之变为土径
BlockEvents.rightClicked(event => {
    const { player, block, item } = event
    if (!player || getActiveTask(player) !== 16) return
    const targets = ['minecraft:grass_block', 'minecraft:dirt', 'minecraft:podzol', 'minecraft:mycelium', 'minecraft:rooted_dirt', 'minecraft:coarse_dirt']
    if (item && item.hasTag('minecraft:shovels') && targets.includes(block.id)) completeTask(player)
})

// 17: milk_cow — 手持桶右键牛/哞菇
ItemEvents.entityInteracted(event => {
    const { player, target, item } = event
    if (!player || getActiveTask(player) !== 17) return
    if (item.id === 'minecraft:bucket' && (target.type === 'minecraft:cow' || target.type === 'minecraft:mooshroom')) completeTask(player)
})

// 18: craft_chest — 制作一个箱子
ItemEvents.crafted(event => {
    const { player, item } = event
    if (getActiveTask(player) !== 18) return
    if (item.id === 'minecraft:chest') completeTask(player)
})

// 19: dig_hole — 向脚下方向挖掘3格（累计）
BlockEvents.broken(event => {
    const { block, player } = event
    if (!player || getActiveTask(player) !== 19) return
    if (block.y >= player.y) return
    const targets = ['minecraft:dirt', 'minecraft:grass_block', 'minecraft:stone', 'minecraft:cobblestone', 'minecraft:gravel', 'minecraft:sand', 'minecraft:sandstone', 'minecraft:andesite', 'minecraft:diorite', 'minecraft:granite', 'minecraft:deepslate', 'minecraft:tuff', 'minecraft:netherrack', 'minecraft:end_stone']
    if (!targets.includes(block.id)) return
    const p = player.persistentData.getInt(PD_KEY_BEEPER_PROGRESS) + 1
    if (p >= 3) { completeTask(player) }
    else {
        player.persistentData.putInt(PD_KEY_BEEPER_PROGRESS, p)
        player.setStatusMessage(Text.translate('msg.beeper.progress', p, 3).color(0xFFFF55))
    }
})
