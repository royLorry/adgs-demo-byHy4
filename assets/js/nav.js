/* ========================================================================
   nav.js — 顶部导航 + 侧栏注入
   由各页面在 window 上提供：
     - window.BASE : 共享资源根路径（如 '../../assets/'）
     - window.SYS  : 's1' 或 's8'
     - window.PAGE : 当前页面 id（用于侧栏高亮）
     - window.SIDEBAR : { section: '核心功能' | '资产运营' | ..., items: [{id,label,icon,badge?,href}] }
   ======================================================================== */
(function () {
  if (window.__nav_mounted) return;
  window.__nav_mounted = true;

  const BASE = window.BASE || './assets/';
  const SYS  = window.SYS  || 's1';
  const PAGE = window.PAGE || '';

  /* ---------- 系统元数据 ---------- */
  const SYS_META = {
    s1: { id: 's1', label: 'S1 元数据与资产中心', short: 'S1', accent: 'assets', logoMark: 'M' },
    s2: { id: 's2', label: 'S2 埋点与事件治理平台', short: 'S2', accent: 'track',  logoMark: 'T' },
    s8: { id: 's8', label: 'S8 数据质量治理中心', short: 'S8', accent: 'quality', logoMark: 'Q' }
  };

  /* ---------- 系统首页映射 ---------- */
  const SYS_HOME = {
    s1: 'pages/s1/catalog.html',
    s2: 'pages/s2/event-dict.html',
    s8: 'pages/s8/quality-dash.html'
  };

  /* ---------- 顶部导航：ADGS / S1 / S2 / S8 多段切换 ---------- */
  const sysTabs = ['s1', 's2', 's8'].map(id => {
    const m = SYS_META[id];
    const active = id === SYS ? ' active' : '';
    const homeHref = `${BASE.replace('/assets/', '/')}${SYS_HOME[id]}`;
    return `<a href="${homeHref}" class="${active}">${m.short} ${m.label.replace(m.short + ' ', '')}</a>`;
  }).join('');

  /* ---------- 顶部导航 HTML ---------- */
  const topbarHtml = `
    <div class="topbar">
      <a class="topbar-logo" href="${BASE.replace('/assets/', '/')}index.html">
        <span class="logo-mark">AD</span>
        <span>ADGS<span class="muted" style="font-weight:400">&nbsp;治理平台</span></span>
        <small>Demo</small>
      </a>
      <nav class="topbar-nav">${sysTabs}</nav>
      <div class="topbar-search">
        <input type="text" placeholder="${SYS === 's1' ? '搜索资产 / 字段 / 数据标准' : '搜索规则 / 异常 / 主题域'}"/>
      </div>
      <div class="topbar-right">
        <span class="topbar-tenant">${SYS === 's1' ? 'demo 租户' : 'demo 租户'}</span>
        <span class="topbar-user">
          <span class="topbar-avatar">U0</span>
          <span>演示用户</span>
        </span>
      </div>
    </div>`;

  /* ---------- 侧栏 ---------- */
  function buildSidebar() {
    const data = window.SIDEBAR || { section: '导航', items: [] };
    const itemsHtml = (data.items || []).map(it => {
      const active = it.id === PAGE ? ' active' : '';
      const badge = it.badge ? `<span class="badge err">${it.badge}</span>` : '';
      const icon = it.icon ? `<span aria-hidden="true">${it.icon}</span>` : '';
      const href = it.href || '#';
      return `<a href="${href}" class="${active}">${icon}<span>${it.label}</span>${badge}</a>`;
    }).join('');
    const section = data.section ? `<h4>${data.section}</h4>` : '';
    const sysTag = SYS === 's8' ? `<h4 style="color:var(--primary);margin-top:24px">${SYS_META[SYS].short} · ${SYS_META[SYS].label.replace(SYS_META[SYS].short + ' ', '')}</h4>` : '';
    return `
      <aside class="sidebar">
        ${section}
        <nav>${itemsHtml}</nav>
        ${sysTag}
      </aside>`;
  }

  /* ---------- 渲染 ---------- */
  document.body.insertAdjacentHTML('afterbegin', topbarHtml + buildSidebar());

  /* ---------- 子系统主题切换 ---------- */
  if (SYS === 's8') document.body.classList.add('theme-s8');
  else if (SYS === 's2') document.body.classList.add('theme-s2');
  else if (SYS === 's1') document.body.classList.add('theme-s1');
})();