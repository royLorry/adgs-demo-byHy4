/* ========================================================================
   render.js — 通用 SVG 渲染辅助（sparkline、donut、ring、radar）
   ======================================================================== */
(function () {
  /* ---------- 健康分环 ---------- */
  window.ring = function (score, opts) {
    opts = opts || {};
    const r = (opts.r || 40);
    const c = 2 * Math.PI * r;
    const off = c * (1 - score / 100);
    const color = score >= 90 ? 'var(--ok)' : score >= 75 ? 'var(--primary)' : score >= 60 ? 'var(--warn)' : 'var(--err)';
    return `
      <div class="score-ring" style="${opts.size ? 'width:'+opts.size+'px;height:'+opts.size+'px' : ''}">
        <svg viewBox="0 0 ${(r+10)*2} ${(r+10)*2}" preserveAspectRatio="xMidYMid meet">
          <circle cx="${r+10}" cy="${r+10}" r="${r}" fill="none" stroke="var(--line-2)" stroke-width="6"/>
          <circle cx="${r+10}" cy="${r+10}" r="${r}" fill="none" stroke="${color}" stroke-width="6"
                  stroke-dasharray="${c}" stroke-dashoffset="${off}" stroke-linecap="round"/>
        </svg>
        <div class="num">${score}<small>/100</small></div>
      </div>`;
  };

  /* ---------- sparkline ---------- */
  window.sparkline = function (data, opts) {
    opts = opts || {};
    const w = opts.w || 120, h = opts.h || 32;
    if (!data || !data.length) return '';
    const min = Math.min.apply(null, data), max = Math.max.apply(null, data);
    const range = max - min || 1;
    const pts = data.map((v, i) => {
      const x = i / (data.length - 1) * w;
      const y = h - (v - min) / range * h;
      return [x, y];
    });
    const d = 'M ' + pts.map(p => p.join(',')).join(' L ');
    const area = d + ` L ${w},${h} L 0,${h} Z`;
    const color = opts.color || 'var(--primary)';
    return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <path d="${area}" fill="${color}" opacity=".10"/>
      <path d="${d}" fill="none" stroke="${color}" stroke-width="1.5"/>
    </svg>`;
  };

  /* ---------- donut（用于质量分布） ---------- */
  window.donut = function (slices, opts) {
    opts = opts || {};
    const size = opts.size || 140;
    let acc = 0;
    const stops = slices.map(s => {
      const a = acc; acc += s.pct;
      return `${s.color} ${a}% ${acc}%`;
    }).join(', ');
    return `
      <div class="donut" style="width:${size}px;height:${size}px;background:conic-gradient(${stops})">
        <div class="center">
          <div>
            <div class="num">${opts.center || slices[0].pct + '%'}</div>
            <div class="lab">${opts.label || ''}</div>
          </div>
        </div>
      </div>`;
  };

  /* ---------- 雷达图（6 维） ---------- */
  window.radar = function (dims, values, opts) {
    opts = opts || {};
    const cx = 180, cy = 180, R = 130, INNER = 30;
    const n = dims.length;
    const angle = i => -Math.PI / 2 + i * 2 * Math.PI / n;
    const pt = (i, v) => [cx + Math.cos(angle(i)) * (INNER + (R - INNER) * v / 100), cy + Math.sin(angle(i)) * (INNER + (R - INNER) * v / 100)];
    // 网格（4 层）
    let grid = '';
    for (let k = 1; k <= 4; k++) {
      const r = INNER + (R - INNER) * k / 4;
      const pts = [];
      for (let i = 0; i < n; i++) pts.push([cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r].join(','));
      grid += `<polygon points="${pts.join(' ')}" fill="none" stroke="var(--line-2)" stroke-width="1"/>`;
    }
    // 轴
    let axis = '';
    for (let i = 0; i < n; i++) {
      axis += `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(angle(i)) * R}" y2="${cy + Math.sin(angle(i)) * R}" stroke="var(--line)" stroke-width="1"/>`;
    }
    // 标签
    let labels = '';
    for (let i = 0; i < n; i++) {
      const [x, y] = pt(i, 110);
      labels += `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-size="13" fill="var(--ink-2)">${dims[i]}</text>`;
    }
    // 数据区
    const dataPts = values.map((v, i) => pt(i, v).join(',')).join(' ');
    const color = opts.color || 'var(--primary)';
    return `
      <div class="radar">
        <svg viewBox="0 0 360 360">
          ${grid}
          ${axis}
          <polygon points="${dataPts}" fill="${color}" fill-opacity=".18" stroke="${color}" stroke-width="2"/>
          ${values.map((v, i) => {
            const [x, y] = pt(i, v);
            return `<circle cx="${x}" cy="${y}" r="4" fill="${color}"/>`;
          }).join('')}
          ${labels}
        </svg>
      </div>`;
  };

  /* ---------- KPI 数字色（健康分/异常数） ---------- */
  window.kpiDelta = (n) => n > 0 ? `<span class="kpi-delta up">▲ ${n}</span>` : n < 0 ? `<span class="kpi-delta down">▼ ${Math.abs(n)}</span>` : '<span class="kpi-delta">—</span>';
})();