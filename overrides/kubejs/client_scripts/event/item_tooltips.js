ItemEvents.modifyTooltips(event => {
    event.modifyAll(tooltip => {
        tooltip.dynamic('auto_tooltip')
    })
})

ItemEvents.dynamicTooltips('auto_tooltip', event => {
    const { item, lines, shift, ctrl, alt } = event
    
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

    let base = `item.${item.id.replace(':', '.')}.tooltip`
    let keysToAppend = []

    handleModifier(base, keysToAppend, shift, 'shift')
    handleModifier(base, keysToAppend, ctrl, 'ctrl')
    handleModifier(base, keysToAppend, alt, 'alt')
    tryCollect(base, keysToAppend)

    if (keysToAppend.length <= 0) return
        
    keysToAppend.forEach((k, index) => {
        lines.add(insertIndex + index, Text.translate(k))
    })
})


function tryCollect(prefix, keysToAppend) {
	for (let i = 1; i <= 32; i++) {
        let k = `${prefix}.${i}`
        if (!$I18n.exists(k)) break
        keysToAppend.push(k)
    }
}

function handleModifier(prefix, keysToAppend, modActive, modName) {
	let firstLineKey = `${prefix}.${modName}.1`
    
    if (!$I18n.exists(firstLineKey)) return

    let hintKey = `${prefix}.${modName}_hint`
    let defHintKey = `item.default.tooltip.${modName}_hint`
    
    if ($I18n.exists(hintKey)) {
        keysToAppend.push(hintKey)
    } else {
        keysToAppend.push(defHintKey)
    }

    if (modActive) {
        tryCollect(`${prefix}.${modName}`, keysToAppend)
    }
}