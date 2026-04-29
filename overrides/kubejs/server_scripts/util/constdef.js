let PD_KEY_FIRST_LOGIN = 'first_login'
let PD_KEY_DIFFICULTY = 'difficulty'

/** 
 * @type {Record<number, {name: string, color: number, attackMul: number, hurtMul: number}>} 
 */
let LIST_DIFFICULTIES = [
    { name: 'journey', color: 0x55FF55, attackMul: 1, hurtMul: 1 },
    { name: 'classic', color: 0xFFFFFF, attackMul: 0.9, hurtMul: 1.1 },
    { name: 'expert', color: 0xAC59FF, attackMul: 0.8, hurtMul: 1.2 },
    { name: 'master', color: 0xFF4040, attackMul: 0.6, hurtMul: 1.5 },
    { name: 'death', color: 0x990000, attackMul: 0.4, hurtMul: 2 },
    { name: 'eternity', color: 0x00BFFF, attackMul: 0.6, hurtMul: 1.5 },
]

/**
 * @type {string[]}
 */
let LIST_BOSSES = [
    'minecraft:ender_dragon',
    'minecraft:wither',
]

/**
 * @type {string[]}
 */
let LIST_ZOMBIES = [
    'minecraft:zombie',
    'minecraft:zombie_villager',
    'minecraft:husk',
    'minecraft:drowned'
]

// ========== 哔哔机 ==========
let PD_KEY_BEEPER_NEXT = 'kubejs:beeper_next'
let PD_KEY_BEEPER_GARBLED_END = 'kubejs:beeper_garbled_end'
let PD_KEY_BEEPER_TASK = 'kubejs:beeper_task'
let PD_KEY_BEEPER_DEADLINE = 'kubejs:beeper_deadline'
let PD_KEY_BEEPER_PROGRESS = 'kubejs:beeper_progress'
let PD_KEY_BEEPER_RESULT_TYPE = 'kubejs:beeper_result_type'
let PD_KEY_BEEPER_COMPLETED_MASK = 'kubejs:beeper_completed_mask'
let PD_KEY_COMMAND_PROTECTION = 'kubejs:command_protection'
let PD_KEY_KARMA = 'kubejs:karma'
const CP_MAX = 9
const TICKS_1MIN = 1200  // 1 分钟

/** @type {string[]} */
const BEEPER_TASKS = [
    'msg.beeper.task.destroy_grass',
    'msg.beeper.task.kill_zombie',
    'msg.beeper.task.collect_flower',
    'msg.beeper.task.eat_bread',
    'msg.beeper.task.chop_tree',
    'msg.beeper.task.catch_fish',
    'msg.beeper.task.dig_gravel',
    'msg.beeper.task.craft_table',
    'msg.beeper.task.shear_sheep',
    'msg.beeper.task.kill_skeleton',
    'msg.beeper.task.mine_coal',
    'msg.beeper.task.plant_sapling',
    'msg.beeper.task.drink_water',
    'msg.beeper.task.trade_villager',
    'msg.beeper.task.kill_creeper',
    'msg.beeper.task.collect_mushroom',
    'msg.beeper.task.build_path',
    'msg.beeper.task.milk_cow',
    'msg.beeper.task.craft_chest',
    'msg.beeper.task.dig_hole',
]