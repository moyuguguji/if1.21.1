# 无限：重生 v1.4 更新日志

> 游戏版本：Minecraft 1.21.1 · NeoForge 21.1.233
> 模组数量：216 → 230

---

## ✨ 新增模组（15）

| 模组 | 说明 |
| --- | --- |
| Cataclysm Dimensions | 灾厄维度（由 P1nero 制作） |
| Enhanced Celestials 2（Core / Default Lunar Events / Shader Support） | 增强天象：月相事件与光影支持 |
| Mystic's Biomes / Swaying Garden / TerraBlender | 更多生物群系及地形生成支持 |
| Exposure: Expanded | 相机玩法拓展 |
| MobSpawnController | 刷怪规则控制 |
| Data Anchor / CorgiLib / Lyra | 数据锚点 / Corgi 系列前置库 |
| Kaleidoscope Compat | 万花筒兼容 |
| Ender Trigon Unofficial | 末影三角（非官方版） |
| Straw Golem Updated | 稻草傀儡 |

另于 `overrides/mods` 本地新增：**QEDMod**、**hookshot（钩索）**、**randomoptimization**、**combatevolved（本地测试版）**、**emi_loot_fix**（EMI 战利品显示修复），并在 `fml.toml` 中加入对应依赖覆盖强制加载。

## ❌ 移除模组（1）

- **FTB Quest Enhance**（任务界面增强）

## 🔄 更新模组（42，节选）

L_Ender's Cataclysm、Spectrum、FTB Quests / FTB Teams / FTB Library / FTB XMod Compat、Iris Shaders、Artifacts、Jade、Waystones、Stealth and Alert、GeckoLib、Modonomicon、Nether Depths Upgrade、Chat Heads、Extreme Evasion、Field Guide、Bye?Pregen!、DynamicLantern、Collector's Album、Sophisticated Storage / Core、Epiphany、Revelationary、Optimized Block Entities、Item Get!、Better Tab Info、Just Enough Characters、Envelope、Icarus、Kaleidoscope（Nether / Twilight / KubeJS）、LDLib、Dungeon Now Loading（Tricky Trials 移植）、Ponderer、Immersive Overlays、Servantry、Spectrum 等。

---

## 🆕 定制武器与饰品（KubeJS）

- **进化之剑**：每击杀过一个 BOSS 攻击伤害 +5（击杀记录与顿悟体系打通，Shift 可查看已击杀 BOSS 列表）。
- **幸运7**（饰品）：第 7 次攻击有 7% 概率造成 77%～777% 浮动伤害，每满 7 点幸运额外 +7% 触发概率。
- **不完善的预知眼**（饰品）：预知眼充能闪避体系 —— 受击自动消耗充能闪避、攻击获得「瞬间的预知」、过热冷却机制。
- **黄昏之钟**：用于开启暮色森林传送门，新增 Spectrum 七彩基座（CMY）专属配方。
- **清理扫帚**：清理类道具。
- **哔哔机**（腰部饰品）：计时提醒功能。
- **难度切换器**：游戏内切换难度（旅程 / 经典 / 专家 / 大师 / 死亡 / 永恒）。

## 🗺️ 神器图纸系统

- 新增 **七星剑、上善若水（若水剑）、野草** 三把一代整合包传奇武器（移植自 Infinity Reborn v3.4，修复旧版 buff 常驻等 bug）。
- 新增**图纸 + 碎片**获取链：击杀怪物掉落碎片，集齐合成图纸，右键图纸解锁对应进度获得神器。
- 新增 4 个专属进度（图纸系列），并接入怪物掉落/战利品表。

## ⚔️ 战斗与生存机制

- **极限闪避（Dodge Roll）**：客户端 + 服务端双重实现，配合预知眼充能消耗。
- **难度战利品掉落（LootJS）**：按玩家难度档位控制怪物/宝箱掉落，高难度掉落更稀有物品。
- **Combat Evolved** 配置：副手攻击、随机暴击、横扫范围、虚弱左臂等新战斗规则。
- **Moves Like Mafuyu**：滑铲、翻滚、空中翻滚（含无敌帧）等动作。

## 🧠 顿悟（Epiphany）成长体系

- 新增**首次击杀 BOSS 获得心得点**联动，所有击杀方式（近战/弓箭/仆从）统一追溯。
- 新增完整**天赋数据包（71 个文件）**：攻击 / 防御 / 探索 / 挖掘 / 学习 / 召唤 / 幸存者 / 千逆 / 献祭 等模块，每个模块含多个 Insight 洞察（如攻击伤害 I~V、挖掘速度、召唤栏位等）。
- 新增**资质（Aptitude）系统**：进入生物群系 / 维度 / 结构、升级、击杀、挖掘均可获得顿悟。
- 新增飞升、血价、借命、死拒、背水一战等特殊洞察，以及进化之剑专属顿悟。

## 📜 任务系统（FTB Quests）

- 新增 **10 个章节**：商店（蓝图兑换 Spectrum 祭坛等）、顿悟与阅历、魂石（Fargo's Souls 系列）、Boss 图鉴（新增 boss 章节）等，并新增**章节分组**功能。
- 新增 **10 个奖励表**（含经验、路标等）。
- 语言文件大幅扩充：`en_us` +2936 行、`zh_cn` +2552 行。
- 新增任务预设样式（goal / info / normal 形状）。

## 🏗️ 世界生成与数据包

- **Dungeon Now Loading** 数据包大量更新：平原城堡等结构调整、新增合成表（远古武器、傀儡之心套装、蜂巢宝箱、蜂蜜锭、蜂蜜药水等）、新增战利品（蜜蜂唱片、Meirah 唱片、平原城堡钥匙）。
- **建筑蓝图**：新增 7 种房屋蓝图（building_blueprint）。
- **Cataclysm Dimensions** 配置：维度传送、随机散布、缓降等。

## ⚙️ 配置与体验优化

- **EZ Actions** 菜单新增快捷键：打开无限合成终端、打开顿悟菜单、新建路径点等。
- **EMI Loot 配置**：启用各类型战利品解析展示。
- **Item Get!**：新增死亡卷轴教程提示（"啊哈，你似了"）。
- **imblocker**：输入法白名单/恢复屏幕列表更新（Field Guide、Jade、Cloth 配置等）。
- **MobSpawnController**：新增刷怪规则（如 distantfriends 生成限制）。
- **Exposure / Exposure: Expanded** 配置调优。
- **fml.toml**：依赖覆盖，强制加载 randomoptimization / emi_loot_fix / netherdepthsupgrade。

## 🌏 汉化更新

- 新增 **96 个模组的简体中文汉化**（Infinity-Language-CN 资源包）：Artifacts、Spectrum、Sophisticated Storage、Modonomicon、Twilight Forest、Cataclysm、EMI、Jade、Waystones、Field Guide 等。
- KubeJS 自带中文语言文件大规模整理与重构（+2627 行变更），补齐全部新物品/进度/消息文案。

---

*本日志依据 1.4 提交（`8acbd5d`）整理，适用于 v1.3 → v1.4 升级。*
