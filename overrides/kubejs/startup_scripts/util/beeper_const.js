// priority: 200
// 哔哔机 - 共享常量（startup_scripts 端）

// --- persistentData 键 ---
let PDK_NEXT           = 'kubejs:beeper_next'
let PDK_GARBLED_END    = 'kubejs:beeper_garbled_end'
let PDK_TASK           = 'kubejs:beeper_task'
let PDK_DEADLINE       = 'kubejs:beeper_deadline'
let PDK_PROGRESS       = 'kubejs:beeper_progress'
let PDK_RESULT_TYPE    = 'kubejs:beeper_result_type'
let PDK_COMPLETED_MASK = 'kubejs:beeper_completed_mask'
let PDK_CP             = 'kubejs:command_protection'
let PDK_KARMA          = 'kubejs:karma'

// --- 效果 ID ---
let EFFECT_CP   = 'kubejs:command_protection'
let EFFECT_KARMA = 'kubejs:karma'

// --- 结果类型 ---
let RESULT_NONE    = 0
let RESULT_SUCCESS = 1
let RESULT_FAILURE = 2

// --- 参数 ---
let CP_MAX          = 9
let TICKS_MIN       = 3600
let TICKS_5MIN      = 6000
let TICKS_1SEC      = 20
let TICKS_REAPPLY   = 20

let TICKS_RESULT    = TICKS_1SEC * 2

let BEEPER_TASKS = [
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
let TASK_COUNT = BEEPER_TASKS.length
let RESET_THRESHOLD = TASK_COUNT / 2