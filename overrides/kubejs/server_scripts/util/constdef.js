const PD_KEY_FIRST_LOGIN = 'first_login'
const PD_KEY_DIFFICULTY = 'difficulty'

/** 
 * @type {Record<number, {name: string, color: number, attackMul: number, hurtMul: number}>} 
 */
const LIST_DIFFICULTIES = [
    { name: 'journey', color: 0xAAAAAA, attackMul: 1, hurtMul: 1 },
    { name: 'classic', color: 0xFFFFFF, attackMul: 0.9, hurtMul: 1.1 },
    { name: 'expert', color: 0xAC59FF, attackMul: 0.8, hurtMul: 1.2 },
    { name: 'master', color: 0xFF4040, attackMul: 0.6, hurtMul: 1.5 },
    { name: 'death', color: 0x990000, attackMul: 0.4, hurtMul: 2 },
    { name: 'eternity', color: 0x00BFFF, attackMul: 0.6, hurtMul: 1.5 },
]

/**
 * @type {string[]}
 */
const LIST_BOSSES = [
    'minecraft:ender_dragon',
    'minecraft:wither',
]

/**
 * @type {string[]}
 */
const LIST_ZOMBIES = [
    'minecraft:zombie',
    'minecraft:zombie_villager',
    'minecraft:husk',
    'minecraft:drowned'
]