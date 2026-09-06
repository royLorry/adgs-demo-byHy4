# ADGS Demo · 智能体数据治理系统

> **基于 S1 元数据与资产中心 + S8 数据质量治理中心 原型设计的可静态部署演示**

一个**纯静态**、**零构建**、**零外部依赖**的 Demo 站点，完整呈现 S1 与 S8 两个核心子系统的可视化界面。

![demo-thumb](https://placehold.co/1200x600/1d4ed8/ffffff?text=ADGS+Demo&font=source-sans-pro)

---

## 📦 包含的页面（13 个）

### 首页
| # | 文件 | 内容 |
|---|---|---|
| 00 | `index.html` | 系统入口 · 双子系统卡片 · 总体架构概览 |

### S1 元数据与资产中心（6 个）
| # | 文件 | 内容 |
|---|---|---|
| 01 | `pages/s1/catalog.html` | 资产目录首页 · 主题域卡片 · 热门资产 · 待办 |
| 02 | `pages/s1/dataset-detail.html` | 数据集详情 · 6 维健康分 · 字段 Tab · 血缘/质量/标准 |
| 03 | `pages/s1/domain.html` | 主题域浏览 · 左树右列 |
| 04 | `pages/s1/standards.html` | 数据标准库 · 6 大类标准卡片 |
| 05 | `pages/s1/standard-detail.html` | 标准详情 · 枚举值 · 引用字段 |
| 06 | `pages/s1/change-impact.html` | 变更影响分析 · diff · 影响面 · 流程 |

### S8 数据质量治理中心（6 个）
| # | 文件 | 内容 |
|---|---|---|
| 07 | `pages/s8/quality-dash.html` | 质量大盘 · 6 KPI · 主题域 · 30d 趋势 · TOP 5 失败规则 |
| 08 | `pages/s8/rule-market.html` | 规则市场 · 9 张规则卡 · 分类导航 |
| 09 | `pages/s8/rule-detail.html` | 规则详情 · 7-Tab · DSL 定义 · 模拟执行 |
| 10 | `pages/s8/anomaly.html` | 异常中心 · 7 条聚合异常 · 5 类降噪徽标 |
| 11 | `pages/s8/anomaly-workbench.html` | 异常处置工作台 · 5-Tab · 5 层血缘 · 回溯 DAG |
| 12 | `pages/s8/domain-focus.html` | 主题域质量聚焦 · 6 维雷达 · 健康分布 · 子主题 |

---

## 🛠️ 本地预览

无需任何构建工具。任选一种：

### Python（自带，推荐）
```bash
cd adgs-demo
python -m http.server 8765
# 访问 http://127.0.0.1:8765
```

### Node.js
```bash
cd adgs-demo
npx serve .            # 或 npx http-server -p 8765
```

### 直接打开
也可以直接双击 `adgs-demo/index.html` 在浏览器中打开。但**部分浏览器**对 `file://` 协议下相对路径的解析有限制，**建议用 HTTP 服务器**。

---

## 📁 目录结构

```
adgs-demo/
├── index.html                       # 首页（系统入口）
├── README.md                        # 本文件
├── .nojekyll                        # GitHub Pages 配置
├── assets/
│   ├── css/
│   │   ├── tokens.css               # 设计变量（颜色/字体/间距/阴影）· 含 s1/s2/s8 三主题
│   │   ├── app.css                  # 基础 + 顶部导航 + 侧栏 + 通用组件
│   │   ├── pages-s1.css             # S1 页面特定（靛蓝/翠绿主题）
│   │   ├── pages-s2.css             # S2 页面特定（青色/翠绿主题）
│   │   └── pages-s8.css             # S8 页面特定（紫色/橙红主题）
│   └── js/
│       ├── nav.js                   # 顶部导航 + 侧栏注入（支持 s1/s2/s8 多子系统）
│       ├── mock.js                  # 全部 mock 数据（含 s2.events/plans/acceptance/live）
│       ├── render.js                # SVG 渲染辅助（sparkline/donut/ring/radar）
│       └── tabs.js                  # Tab 切换通用脚本
└── pages/
    ├── s1/                          # 6 页
    ├── s2/                          # 9 页 · 埋点与事件治理（含 Diff / 报告导出 / 智能体钻取）
    │   ├── event-dict.html          # 事件字典首页
    │   ├── event-detail.html        # 事件详情（8-Tab）
    │   ├── plan-list.html           # 方案列表
    │   ├── plan-designer.html       # 方案设计器
    │   ├── plan-diff.html           # 方案 Diff 比对
    │   ├── live-tap.html            # 实时观测
    │   ├── acceptance.html          # 验收工作台
    │   ├── acceptance-report.html   # 验收报告导出
    │   └── agent-trace.html         # 智能体步骤级钻取
    └── s8/                          # 6 页
```

总大小 **~370 KB**，包含 31 个文件、约 7,800 行代码。

---

## 🎨 设计要点

- **配色方案三套**：
  - S1（靛蓝 #2563eb + 翠绿 #10b981）：偏稳重
  - **S2（青色 #0891b2 + 翠绿 #14b8a6）：强调实时与可观测**
  - S8（紫色 #6d4cff + 橙红 #f43f5e）：偏活力
- **设计变量全部在 `tokens.css`**，通过 `body.theme-s1/s2/s8` 切换主题
- **字体系统**：纯 system font stack，**不依赖 Google Fonts / 网络字体**，离线和墙内部署都 OK
- **图表全部 SVG 内联**（无 Chart.js / ECharts 依赖）：
  - 健康分环 (`ring`)
  - 趋势线 (`sparkline` / `trend`)
  - 健康分布 (`donut`)
  - 六维雷达 (`radar`)
  - 实时流量双线 (`live-chart`)
  - JSON Schema 高亮 (`s2-schema`)
- **交互零外部库**：tab 切换、侧栏激活、面包屑、三栏设计器、TOC 滚动联动、火焰图全部原生 JS 实现（~350 行）
- **图标用 Emoji**：跨平台一致、零加载
- **三大增强交互**（S2 专属）：
  - **方案 Diff 比对** · 左右双栏 + 4 类影响面摘要 + 兼容性矩阵 + 风险评估
  - **验收报告导出** · TOC 联动滚动 + 三格式切换（HTML/Markdown/JSON）+ 复制/下载/邮件
  - **智能体步骤级钻取** · 7 步骤时间线 + 火焰图 + IO 双栏 + 工具调用清单 + 全链路溯源

---

## 🌐 兼容性

| 浏览器 | 支持 |
|---|---|
| Chrome / Edge ≥ 90 | ✅ |
| Firefox ≥ 88 | ✅ |
| Safari ≥ 14 | ✅ |
| 移动端浏览器 | ✅（响应式布局） |
| IE 11 | ❌（使用了 `clip-path` / `aspect-ratio` 等较新特性） |

---

## 📋 验收清单（部署后请确认）

- [ ] 首页（`/`）能看到 ADGS Hero + 三子系统卡片（S1 / S2 / S8）
- [ ] 顶部导航切换 S1 / S2 / S8，主题色随之变化（靛蓝 / 青色 / 紫色）
- [ ] S1 资产目录的 8 个主题域卡片正确渲染
- [ ] S1 数据集详情的 6 维健康分环 + 字段表正确显示
- [ ] S1 变更影响分析的 diff 高亮正确
- [ ] S2 事件字典的分类 Tabs + 事件表 + 构成 donut 正确显示
- [ ] S2 方案设计器三栏拖拽 / 公共属性组勾选 / SDK 代码生成正常
- [ ] **S2 方案 Diff 比对左右双栏与影响面摘要渲染**
- [ ] **S2 验收报告导出页 TOC 联动 + Markdown/JSON 切换正常**
- [ ] **S2 智能体步骤级钻取的 7 步骤条点击切换 + 火焰图渲染**
- [ ] S2 实时观测的 60s 流量双线 + 实时事件流滚动
- [ ] S2 验收工作台 4 类自动验收进度条 + 智能体步骤时间线显示
- [ ] S8 质量大盘的 30 天趋势线渲染（不是空白）
- [ ] S8 主题域聚焦的雷达图 6 维数据可见
- [ ] 所有页面的 Tab 切换可点击
- [ ] 浏览器控制台 **零 error**（F12 → Console 验证）

> 验证脚本：用 `playwright-core` + 系统 Chrome 自动跑过 **22 个页面** + 截图（见 `.__shot_all.js`），全部 ✅ clean、零运行时错误。

---

## 📐 关联文档

- `智能体数据治理系统-分析与设计文档.md` — 总体分析与设计文档（含 3.1 架构图、3.3 依赖图）
- `S1-元数据与资产中心/` — S1 子系统的 SRS / SDD 文档与深化设计
- `S8-数据质量治理中心/` — S8 子系统的 SRS / SDD 文档与深化设计
- `S2-埋点与事件治理平台/` — S2 子系统的 SRS / SDD / 深化设计 + 软件原型
- `S1-元数据与资产中心/原型-数据资产目录与数据标准.html` — S1 单文件原型（SPA）
- `S8-数据质量治理中心/原型-异常中心与质量闭环.html` — S8 单文件原型（SPA）
- `S2-埋点与事件治理平台/原型-事件字典与埋点观测.html` — S2 单文件原型（SPA）

---

## 📝 注意事项

1. **数据全部为模拟数据**（mock），仅用于演示界面形态与交互
2. **不要在生产环境直接引用本 Demo 的样式/脚本**——它是 demo，不是组件库
3. **路径全部相对路径**，可同时支持：
   - 项目 Pages 子路径（`/adgs-demo/`）
   - 用户 Pages 根路径（`/`）
   - 本地 `http://127.0.0.1:8765/`
4. **不要使用 Jekyll 处理**（`.nojekyll` 已就位）
5. **如启用自定义域名**，在仓库根添加 `CNAME` 文件即可，不影响 demo 结构

---

## License

Internal demo · 仅供 ADGS 项目评审使用。