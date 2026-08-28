// 进化之剑 - 客户端 tooltip(Shift 动态部分)
// 静态说明行由 item_tooltips.js 的 auto_tooltip 机制 + 语言文件处理:
//   item.kubejs.evolution_sword.tooltip.{1..N}(自动收集)
//   item.kubejs.evolution_sword.tooltip.shift.{1..N} + shift_hint(Shift 时显示)
// 动态数据(已击杀 boss 的中文名列表)由服务端 sendData('evo_sword_info') 直接推送,
// 服务端已按 BOSS_NAME_MAP 查好名字, 客户端不做任何匹配, 直接显示。

let EVO_BOSS_NAMES = []

NetworkEvents.dataReceived('evo_sword_info', event => {
    let list = []
    try {
        let d = event.data
        if (!d) return
        if (Array.isArray(d['boss_names'])) {
            list = d['boss_names']
        } else if (d.getList) {
            let lt = d.getList('boss_names', 8)
            for (let i = 0; i < lt.size(); i++) list.push(lt.getString(i))
        }
    } catch (e) { }
    EVO_BOSS_NAMES = list
})

ItemEvents.modifyTooltips(event => {
    event.modifyAll(tooltip => {
        tooltip.dynamic('evo_sword_info')
    })
})

ItemEvents.dynamicTooltips('evo_sword_info', event => {
    const { item, lines, shift } = event
    if (item.id !== 'kubejs:evolution_sword') return
    if (!shift) return  // 静态行由 item_tooltips.js 的 auto_tooltip 处理

    // ==== 插入位置计算(与 item_tooltips.js 完全一致) ====
    let insertIndex = lines.size()
    for (let i = 0; i < lines.size(); i++) {
        let line = lines.get(i)
        if (!line) continue
        let contents = line.getContents()
        if (contents.key && (contents.key.startsWith('item.modifiers.') || contents.key.startsWith('attribute.modifier.'))) {
            insertIndex = i
            break
        }
        if (contents.text && contents.text() === item.id) {
            insertIndex = i
            break
        }
    }

    // ==== Shift 动态行: 服务端推送的 boss 名称列表 + 加成数值 ====
    let bossNames = EVO_BOSS_NAMES

    let rows = []
    rows.push(Text.translate('item.kubejs.evolution_sword.tooltip.boss_list'))
    if (bossNames.length === 0) {
        rows.push(Text.translate('item.kubejs.evolution_sword.tooltip.none'))
    } else {
        // 直接显示服务端查好的名字(Java String 需 String() 转 JS string), 金色显示
        for (let i = 0; i < bossNames.length; i++) {
            rows.push(Text.literal(String(bossNames[i])).color(0xFFAA00))
        }
    }
    rows.push(Text.translate('item.kubejs.evolution_sword.tooltip.bonus', bossNames.length * 5))

    rows.forEach((comp, index) => {
        lines.add(insertIndex + index, comp)
    })
})
