// server_scripts 统一 Java.loadClass 引用
// 各脚本在**事件回调/函数内**直接使用以下全局变量, 不要再各自重复 Java.loadClass
// ⚠️ 加载顺序不可靠(priority 注释无效, 按字母序加载), 因此:
//   - 本文件只放"运行时(回调内)使用"的类 —— 所有脚本加载完才触发事件, 顺序无碍
//   - 顶层 NativeEvents.onEvent 注册所需的类($LivingShieldBlockEvent/
//     $LivingIncomingDamageEvent/$ProjectileImpactEvent/$PlayerChangedDimensionEvent)
//     保留在各自文件顶层声明(顶层注册是硬需求, 不能依赖加载顺序)

const $ServerPlayer = Java.loadClass('net.minecraft.server.level.ServerPlayer')
const $Component = Java.loadClass('net.minecraft.network.chat.Component')
const $ResLoc = Java.loadClass('net.minecraft.resources.ResourceLocation')
const $TagKey = Java.loadClass('net.minecraft.tags.TagKey')
const $Registries = Java.loadClass('net.minecraft.core.registries.Registries')
const $BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const $AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier')
const $SoundEvent = Java.loadClass('net.minecraft.sounds.SoundEvent')
