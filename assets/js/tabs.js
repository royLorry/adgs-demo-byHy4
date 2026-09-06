/* ========================================================================
   tabs.js — Tab 切换通用脚本
   用法：
     <div class="tabs" data-tabs="t1">
       <div class="tab" data-target="p1">定义</div>
       <div class="tab active" data-target="p2">适用资产</div>
     </div>
     <div class="tab-panel active" id="p1">...</div>
     <div class="tab-panel" id="p2">...</div>
   ======================================================================== */
(function () {
  function bind(root) {
    const groups = root.querySelectorAll('[data-tabs]');
    groups.forEach(g => {
      const tabs = g.querySelectorAll('.tab');
      tabs.forEach(t => {
        t.addEventListener('click', () => {
          tabs.forEach(x => x.classList.remove('active'));
          t.classList.add('active');
          const target = t.dataset.target;
          if (!target) return;
          // 找出同祖先容器下的所有 tab-panel
          const scope = root;
          scope.querySelectorAll('.tab-panel').forEach(p => {
            p.classList.toggle('active', p.id === target);
          });
        });
      });
    });
  }
  // 立即执行一次（DOM 已就绪时）
  if (document.readyState !== 'loading') bind(document);
  else document.addEventListener('DOMContentLoaded', () => bind(document));
})();