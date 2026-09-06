/* ========================================================================
   mock.js — 共享 Mock 数据
   通过 window.M.mock 暴露。所有 ID 与名称均为模拟数据，与真实业务无关。
   ======================================================================== */
(function () {
  /* ========================= 主题域 ========================= */
  const domains = [
    { id: 'd_trade',  name: '交易域',     icon: '💰', count: 312, standards: 86, health: 92, color: '#2563eb' },
    { id: 'd_user',   name: '用户域',     icon: '👥', count: 184, standards: 72, health: 88, color: '#10b981' },
    { id: 'd_goods',  name: '商品域',     icon: '📦', count: 226, standards: 68, health: 76, color: '#f59e0b' },
    { id: 'd_log',    name: '日志域',     icon: '📋', count: 458, standards: 54, health: 64, color: '#8b5cf6' },
    { id: 'd_mkt',    name: '营销域',     icon: '🎯', count: 142, standards: 60, health: 82, color: '#ec4899' },
    { id: 'd_risk',   name: '风控域',     icon: '🛡️', count: 98,  standards: 78, health: 94, color: '#ef4444' },
    { id: 'd_ai',     name: '智能体域',   icon: '🤖', count: 76,  standards: 42, health: 71, color: '#06b6d4' },
    { id: 'd_supply', name: '供应链域',   icon: '🚚', count: 124, standards: 66, health: 80, color: '#84cc16' }
  ];

  /* ========================= 热门资产 ========================= */
  const hotAssets = [
    { id: 'a1', name: 'dwd_trade_order_di',        tier: 'DWD', domain: '交易域',  owner: '张磊',   health: 92, visit: 1248, standards: '✅ 已落标' },
    { id: 'a2', name: 'dws_user_profile_30d_df',   tier: 'DWS', domain: '用户域',  owner: '李婷',   health: 88, visit: 980,  standards: '✅ 已落标' },
    { id: 'a3', name: 'ads_gmv_summary_di',        tier: 'ADS', domain: '交易域',  owner: '王皓',   health: 95, visit: 856,  standards: '✅ 已落标' },
    { id: 'a4', name: 'dwd_log_click_di',          tier: 'DWD', domain: '日志域',  owner: '陈薇',   health: 64, visit: 712,  standards: '⚠️ 部分落标' },
    { id: 'a5', name: 'dim_product_full_df',       tier: 'DIM', domain: '商品域',  owner: '赵明',   health: 78, visit: 632,  standards: '✅ 已落标' }
  ];

  /* ========================= 字段表（数据集详情） ========================= */
  const dsFields = [
    { no: 1, name: 'order_id',         type: 'STRING',  pk: true,  std: 'ST-001 业务主键',  note: '订单业务主键，UUID',         desc: '取值规则：32 位字符串' },
    { no: 2, name: 'user_id',          type: 'STRING',  pk: false, std: 'ST-002 用户主键',  note: '下单用户 ID',                desc: '引用 dim_user.user_id' },
    { no: 3, name: 'sku_id',           type: 'STRING',  pk: false, std: 'ST-003 SKU 主键',   note: '商品 SKU',                   desc: '引用 dim_sku.sku_id' },
    { no: 4, name: 'order_amt',        type: 'DECIMAL(18,2)', pk: false, std: 'ST-101 金额度量', note: '订单金额（元）',          desc: '保留两位小数' },
    { no: 5, name: 'pay_status',       type: 'TINYINT', pk: false, std: 'ST-201 支付状态',   note: '⚠️ 未落标',                  desc: '枚举：1=待支付 2=已支付 3=已退款' },
    { no: 6, name: 'create_time',      type: 'TIMESTAMP', pk: false, std: 'ST-301 时间戳',   note: '订单创建时间',              desc: 'ISO8601' },
    { no: 7, name: 'channel',          type: 'STRING',  pk: false, std: 'ST-401 渠道编码',   note: '渠道',                      desc: '枚举：web/app/h5/miniprogram' },
    { no: 8, name: 'province_code',    type: 'STRING',  pk: false, std: 'ST-402 行政区划',   note: '省编码',                    desc: '引用行政区划码表' }
  ];

  /* ========================= 数据标准 ========================= */
  const standards = [
    { id: 'ST-001', cat: '命名', name: '业务主键命名规范',          version: 'v2.3', apply: 1248, status: 'active',  owner: '张磊' },
    { id: 'ST-002', cat: '命名', name: '用户主键命名规范',          version: 'v2.3', apply: 642,  status: 'active',  owner: '李婷' },
    { id: 'ST-101', cat: '度量', name: '金额度量（DECIMAL）',       version: 'v3.1', apply: 312,  status: 'active',  owner: '张磊' },
    { id: 'ST-201', cat: '值域', name: '订单状态枚举',              version: 'v2.0', apply: 24,   status: 'draft',   owner: '王皓' },
    { id: 'ST-202', cat: '值域', name: '支付状态枚举',              version: 'v1.5', apply: 12,   status: 'active',  owner: '王皓' },
    { id: 'ST-301', cat: '字段', name: '时间戳字段规范',            version: 'v1.0', apply: 488,  status: 'active',  owner: '陈薇' },
    { id: 'ST-401', cat: '编码', name: '渠道编码集',                version: 'v2.1', apply: 86,   status: 'active',  owner: '赵明' },
    { id: 'ST-501', cat: '主数据', name: '行政区划主数据',          version: 'v3.2', apply: 256,  status: 'active',  owner: '赵明' }
  ];

  /* ========================= 详情：枚举值 ========================= */
  const enumValues = [
    { code: 'INIT',   label: '待支付',     pct: 32 },
    { code: 'ACTIVE', label: '已支付',     pct: 56 },
    { code: 'PAUSED', label: '已取消',     pct: 9 },
    { code: 'CLOSED', label: '已退款',     pct: 3 }
  ];

  /* ========================= S8 主题域（质量） ========================= */
  const qDomains = [
    { id: 'qd1', name: '交易域',   icon: '💰', health: 92, anomaly: 3,  alert: 1, delta: +1.2 },
    { id: 'qd2', name: '用户域',   icon: '👥', health: 88, anomaly: 5,  alert: 2, delta: -0.8 },
    { id: 'qd3', name: '商品域',   icon: '📦', health: 76, anomaly: 12, alert: 4, delta: -2.4 },
    { id: 'qd4', name: '日志域',   icon: '📋', health: 64, anomaly: 28, alert: 6, delta: -5.1 },
    { id: 'qd5', name: '营销域',   icon: '🎯', health: 82, anomaly: 7,  alert: 2, delta: +0.6 },
    { id: 'qd6', name: '风控域',   icon: '🛡️', health: 94, anomaly: 1,  alert: 0, delta: +0.3 },
    { id: 'qd7', name: '智能体域', icon: '🤖', health: 71, anomaly: 9,  alert: 3, delta: -3.2 },
    { id: 'qd8', name: '供应链域', icon: '🚚', health: 80, anomaly: 6,  alert: 1, delta: +1.0 }
  ];

  /* ========================= 规则 ========================= */
  const rules = [
    { id: 'R-N01', cat: '完整性', title: '主键非空校验',            desc: '主键字段不允许为空，命中任一空值即视为异常。',          apply: 1248, owners: ['张磊','李婷'], ref: 18, eff: 92, sever: 'P0' },
    { id: 'R-N02', cat: '完整性', title: '外键引用完整性',          desc: '外键字段必须能在对应主表中查得，缺失视为异常。',        apply: 642,  owners: ['李婷'],       ref: 9,  eff: 88, sever: 'P1' },
    { id: 'R-A01', cat: '准确性', title: '金额字段精度校验',        desc: 'DECIMAL 金额字段精度必须为 (18,2)，否则视为异常。',     apply: 312,  owners: ['张磊'],       ref: 6,  eff: 96, sever: 'P1' },
    { id: 'R-A02', cat: '准确性', title: '金额非负校验',            desc: '订单金额不允许为负，命中负值视为异常。',                apply: 312,  owners: ['张磊'],       ref: 4,  eff: 100, sever: 'P0' },
    { id: 'R-V01', cat: '值域',   title: '支付状态枚举校验',         desc: 'pay_status 取值必须在 [INIT,ACTIVE,PAUSED,CLOSED] 内。', apply: 24,   owners: ['王皓'],       ref: 3,  eff: 90, sever: 'P1' },
    { id: 'R-U01', cat: '唯一性', title: '业务主键全局唯一',         desc: 'order_id 在 dwd_trade_order_di 中全局唯一。',           apply: 1,    owners: ['张磊'],       ref: 12, eff: 100, sever: 'P0' },
    { id: 'R-T01', cat: '及时性', title: '任务 SLA 时效校验',       desc: '日增量任务必须在次日 06:00 前完成，否则视为异常。',      apply: 156,  owners: ['陈薇'],       ref: 5,  eff: 84, sever: 'P1' },
    { id: 'R-C01', cat: '一致性', title: '跨层口径一致性',          desc: 'DWS 指标必须与 ADS 上层指标在统计窗口内一致。',          apply: 86,   owners: ['数据治理委员会'], ref: 7,  eff: 78, sever: 'P1' },
    { id: 'R-S01', cat: '安全',   title: '敏感字段脱敏校验',        desc: '身份证/手机号字段输出必须脱敏，否则视为异常。',         apply: 64,   owners: ['安全团队'],   ref: 4,  eff: 95, sever: 'P0' }
  ];

  /* ========================= 异常 ========================= */
  const anomalies = [
    { sev: 'P0', icon: '⚠️', title: 'order_id 主键为空',       ds: 'dwd_trade_order_di', cnt: 1240, agg: 6, since: '2h',  tags: ['聚合','已认领'],  state: '需立即处置' },
    { sev: 'P1', icon: '⏱️', title: '任务执行超时',           ds: 'dws_user_profile_30d_df', cnt: 38,  agg: 1, since: '30m', tags: ['趋势恶化'],       state: '处理中' },
    { sev: 'P1', icon: '📊', title: '金额字段精度漂移',       ds: 'ads_gmv_summary_di',   cnt: 12,    agg: 2, since: '4h',  tags: ['QH 抑制'],       state: '已派单' },
    { sev: 'P2', icon: '🔁', title: '支付状态枚举出现未知值', ds: 'dwd_trade_order_di',   cnt: 86,    agg: 1, since: '1d',  tags: ['聚合'],           state: '待认领' },
    { sev: 'P0', icon: '🔐', title: '身份证字段未脱敏',       ds: 'dwd_user_identity_df', cnt: 3204,  agg: 4, since: '15m', tags: ['安全','升级中'],   state: '紧急处理中' },
    { sev: 'P2', icon: '📉', title: 'GMV 指标环比下跌超阈值', ds: 'ads_gmv_summary_di',   cnt: 1,     agg: 1, since: '6h',  tags: ['趋势恶化'],       state: '待分析' },
    { sev: 'P1', icon: '🧮', title: '跨层口径不一致',         ds: 'dws_user_profile_30d_df', cnt: 8, agg: 1, since: '3h',  tags: ['跨域','QH 抑制'], state: '需复盘' }
  ];

  /* ========================= 回溯 DAG 节点 ========================= */
  const dagNodes = [
    { id: 'n1', label: '异常发现', state: 'done' },
    { id: 'n2', label: '影响面分析', state: 'done' },
    { id: 'n3', label: '工单创建', state: 'done' },
    { id: 'n4', label: '根因定位', state: 'curr' },
    { id: 'n5', label: '回溯执行', state: 'wait' },
    { id: 'n6', label: '复盘归档', state: 'wait' }
  ];

  /* ========================= 雷达六维 ========================= */
  const radarDims = ['完整性','准确性','一致性','及时性','唯一性','安全性'];
  const radarData = [88, 92, 76, 84, 96, 90]; // 当前值 0-100

  /* ========================= 影响面（血缘） ========================= */
  const impactList = [
    { depth: 0, type: '本表',  name: 'dwd_trade_order_di',  role: '源表' },
    { depth: 1, type: 'DWS',   name: 'dws_user_order_30d_df', role: '汇总' },
    { depth: 2, type: 'ADS',   name: 'ads_gmv_summary_di',   role: '指标' },
    { depth: 3, type: '报表',  name: '管理层日报',           role: '展示' },
    { depth: 4, type: '外部',  name: 'BI 看板「交易总览」', role: '消费' }
  ];

  /* ========================= 30d 趋势（用于 sparkline） ========================= */
  const sparkline = [62, 65, 68, 64, 70, 75, 72, 78, 80, 79, 82, 85, 84, 88, 86, 89, 90, 88, 92, 91, 90, 93, 92, 94, 92, 95, 93, 94, 92, 95];

  /* ========================= 暴露 ========================= */
  window.M = {
    domains, hotAssets, dsFields, standards, enumValues,
    qDomains, rules, anomalies, dagNodes, radarDims, radarData,
    impactList, sparkline,
    s2: null  // 由下方 registerS2 注入
  };

  /* ========================================================================
     S2 埋点与事件治理平台 — Mock 数据
     ======================================================================== */
  const s2Events = [
    { id: 'evt_001', code: 'evt_order_pay_success', name: '订单支付成功',         cat: '业务事件', owner: '王皓',  app: 12, daily: '32.4万', health: 96, version: 'v3',  status: 'active',  planId: 'plan_recommend_2026Q3' },
    { id: 'evt_002', code: 'evt_user_register',     name: '用户注册',             cat: '业务事件', owner: '李婷',  app:  8, daily: '4.2千', health: 92, version: 'v2',  status: 'active',  planId: 'plan_user_growth' },
    { id: 'evt_003', code: 'evt_cart_add',          name: '加入购物车',           cat: '业务事件', owner: '王皓',  app: 10, daily: '68.5万', health: 88, version: 'v2',  status: 'active',  planId: 'plan_recommend_2026Q3' },
    { id: 'evt_004', code: 'evt_agent_recall_hit',  name: '智能体-RAG 召回命中',  cat: '智能体事件', owner: 'AI 平台', app: 4, daily: '128.0万', health: 84, version: 'v1', status: 'active',  planId: 'plan_ai_assistant_v2' },
    { id: 'evt_005', code: 'evt_agent_tool_call',   name: '智能体-工具调用',       cat: '智能体事件', owner: 'AI 平台', app: 4, daily: '76.3万', health: 78, version: 'v1', status: 'active',  planId: 'plan_ai_assistant_v2' },
    { id: 'evt_006', code: 'evt_agent_step_fail',   name: '智能体-步骤失败',       cat: '智能体事件', owner: 'AI 平台', app: 4, daily: '3.2万',  health: 64, version: 'v1', status: 'warn',    planId: 'plan_ai_assistant_v2' },
    { id: 'evt_007', code: 'evt_page_view',         name: '页面浏览（PV）',        cat: '系统事件', owner: '陈薇',  app: 14, daily: '1.2亿',  health: 99, version: 'v4',  status: 'active',  planId: 'plan_baseline_web' },
    { id: 'evt_008', code: 'evt_api_error',         name: 'API 调用错误',         cat: '系统事件', owner: '陈薇',  app: 14, daily: '8.4千', health: 80, version: 'v2',  status: 'active',  planId: 'plan_baseline_web' },
    { id: 'evt_009', code: 'evt_login',             name: '用户登录',             cat: '业务事件', owner: '李婷',  app:  9, daily: '12.6万', health: 94, version: 'v3',  status: 'active',  planId: 'plan_user_growth' },
    { id: 'evt_010', code: 'evt_pay_refund',        name: '订单退款',             cat: '业务事件', owner: '王皓',  app:  6, daily: '1.1千', health: 90, version: 'v2',  status: 'active',  planId: 'plan_recommend_2026Q3' },
    { id: 'evt_011', code: 'evt_search_query',      name: '搜索请求',             cat: '业务事件', owner: '张磊',  app:  7, daily: '86.0万', health: 86, version: 'v2',  status: 'active',  planId: 'plan_recommend_2026Q3' },
    { id: 'evt_012', code: 'evt_click_recommend',   name: '推荐位点击',           cat: '业务事件', owner: '张磊',  app:  5, daily: '42.8万', health: 82, version: 'v1',  status: 'draft',   planId: 'plan_recommend_2026Q3' }
  ];

  /* ========================= S2 方案 ========================= */
  const s2Plans = [
    { id: 'plan_recommend_2026Q3', name: '推荐业务 2026Q3 埋点方案', owner: '王皓',  scope: '推荐 / 交易', events: 18, version: 'v3.2', status: 'published', synced: '2 分钟前', apps: 5 },
    { id: 'plan_user_growth',      name: '用户增长埋点方案',         owner: '李婷',  scope: '注册 / 留存',  events: 12, version: 'v2.4', status: 'published', synced: '15 分钟前', apps: 4 },
    { id: 'plan_ai_assistant_v2',  name: 'AI 助手 v2 埋点方案',     owner: 'AI 平台', scope: '智能体域',   events:  9, version: 'v2.0', status: 'gray',     synced: '1 小时前', apps: 2 },
    { id: 'plan_baseline_web',     name: 'Web 基线埋点方案',         owner: '陈薇',  scope: '全端',       events: 24, version: 'v4.1', status: 'published', synced: '6 小时前', apps: 8 },
    { id: 'plan_risk_control_v1',  name: '风控域埋点方案 (草案)',    owner: '赵明',  scope: '风控域',     events: 14, version: 'v0.3', status: 'review',   synced: '1 天前',   apps: 0 },
    { id: 'plan_logistics_2026',   name: '物流域 2026 埋点方案',     owner: '赵明',  scope: '供应链域',   events: 11, version: 'v1.1', status: 'draft',    synced: '3 天前',   apps: 0 }
  ];

  /* ========================= S2 验收任务 ========================= */
  const s2Acceptance = [
    { id: 'acc_2026Q3_001', event: 'evt_order_pay_success', ds: 'ods_track_event_di', type: '覆盖率', rule: '≥ 95%',  expected: 96.8, actual: 97.2, state: 'pass', ts: '2 分钟前' },
    { id: 'acc_2026Q3_002', event: 'evt_order_pay_success', ds: 'ods_track_event_di', type: '完整率', rule: '= 100%', expected: 100,  actual: 99.4, state: 'fail', ts: '2 分钟前' },
    { id: 'acc_2026Q3_003', event: 'evt_user_register',     ds: 'ods_track_event_di', type: '时序',   rule: '≤ 30s',  expected: 30,   actual: 18,   state: 'pass', ts: '15 分钟前' },
    { id: 'acc_2026Q3_004', event: 'evt_user_register',     ds: 'ods_track_event_di', type: '对账',   rule: '差异 < 0.1%', expected: 0.1, actual: 0.04, state: 'pass', ts: '15 分钟前' },
    { id: 'acc_2026Q3_005', event: 'evt_cart_add',          ds: 'ods_track_event_di', type: '覆盖率', rule: '≥ 95%',  expected: 96.0, actual: 92.1, state: 'fail', ts: '2 小时前' },
    { id: 'acc_2026Q3_006', event: 'evt_cart_add',          ds: 'ods_track_event_di', type: '完整率', rule: '= 100%', expected: 100,  actual: 96.4, state: 'fail', ts: '2 小时前' },
    { id: 'acc_2026Q3_007', event: 'evt_agent_recall_hit',  ds: 'ods_agent_event_di', type: '覆盖率', rule: '≥ 90%',  expected: 92,   actual: 88.6, state: 'warn', ts: '30 分钟前' },
    { id: 'acc_2026Q3_008', event: 'evt_agent_tool_call',   ds: 'ods_agent_event_di', type: '时序',   rule: '≤ 30s',  expected: 30,   actual: 42,   state: 'fail', ts: '30 分钟前' },
    { id: 'acc_2026Q3_009', event: 'evt_page_view',         ds: 'ods_track_event_di', type: '覆盖率', rule: '≥ 99%',  expected: 99,   actual: 99.6, state: 'pass', ts: '6 分钟前' },
    { id: 'acc_2026Q3_010', event: 'evt_api_error',         ds: 'ods_track_event_di', type: '覆盖率', rule: '≥ 95%',  expected: 95,   actual: 91.2, state: 'warn', ts: '1 小时前' }
  ];

  /* ========================= S2 实时事件流 ========================= */
  const s2Apps = ['app_recommend_web', 'app_user_center', 'app_trade_h5', 'app_ai_assistant', 'app_miniprogram', 'app_logistics_web'];
  const s2LiveEvents = [
    { ev: 'evt_page_view',         app: 'app_recommend_web',  ip: '上海·浦东', lat: 28, code: 200, status: 'ok',  ts: '12:28:24' },
    { ev: 'evt_search_query',      app: 'app_recommend_web',  ip: '北京·海淀', lat: 42, code: 200, status: 'ok',  ts: '12:28:23' },
    { ev: 'evt_cart_add',          app: 'app_trade_h5',       ip: '广州·天河', lat: 38, code: 200, status: 'ok',  ts: '12:28:22' },
    { ev: 'evt_agent_recall_hit',  app: 'app_ai_assistant',   ip: '杭州·滨江', lat: 86, code: 200, status: 'ok',  ts: '12:28:20' },
    { ev: 'evt_agent_tool_call',   app: 'app_ai_assistant',   ip: '杭州·滨江', lat: 92, code: 200, status: 'ok',  ts: '12:28:18' },
    { ev: 'evt_agent_step_fail',   app: 'app_ai_assistant',   ip: '成都·高新', lat: 124,code: 200, status: 'warn',ts: '12:28:14' },
    { ev: 'evt_api_error',         app: 'app_user_center',    ip: '深圳·南山', lat: 18, code: 500, status: 'fail',ts: '12:28:10' },
    { ev: 'evt_order_pay_success', app: 'app_trade_h5',       ip: '武汉·光谷', lat: 32, code: 200, status: 'ok',  ts: '12:28:08' },
    { ev: 'evt_user_register',     app: 'app_user_center',    ip: '南京·江宁', lat: 64, code: 200, status: 'ok',  ts: '12:28:06' },
    { ev: 'evt_login',             app: 'app_miniprogram',    ip: '西安·雁塔', lat: 28, code: 200, status: 'ok',  ts: '12:28:04' },
    { ev: 'evt_search_query',      app: 'app_recommend_web',  ip: '苏州·园区', lat: 36, code: 200, status: 'ok',  ts: '12:28:02' },
    { ev: 'evt_click_recommend',   app: 'app_recommend_web',  ip: '上海·徐汇', lat: 44, code: 200, status: 'ok',  ts: '12:28:00' },
    { ev: 'evt_page_view',         app: 'app_logistics_web',  ip: '宁波·鄞州', lat: 22, code: 200, status: 'ok',  ts: '12:27:58' },
    { ev: 'evt_cart_add',          app: 'app_trade_h5',       ip: '重庆·渝北', lat: 52, code: 200, status: 'ok',  ts: '12:27:55' },
    { ev: 'evt_api_error',         app: 'app_user_center',    ip: '郑州·金水', lat: 18, code: 503, status: 'fail',ts: '12:27:52' }
  ];

  M.s2 = {
    events: s2Events,
    plans: s2Plans,
    acceptance: s2Acceptance,
    live: s2LiveEvents,
    apps: s2Apps
  };
})();