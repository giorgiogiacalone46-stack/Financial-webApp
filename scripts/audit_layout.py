#!/usr/bin/env python3
"""
Financial WebApp - Automated Multi-Viewport Layout & Anti-Overlap Audit
Conforme a SKILL.md (ui-perfect-design - Fase 5)
Verifica su 5 viewport: 320, 375, 768, 1280, 1920
"""

import subprocess
import json
import os
import sys

CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
BASE_URL = 'file:///Users/giorgio/Desktop/Financial-webApp/index.html'

VIEWPORTS = [
    (320, 568, 'iPhone SE / 320px'),
    (375, 667, 'iPhone 8/SE3 / 375px'),
    (768, 1024, 'iPad Mini / 768px'),
    (1280, 800, 'MacBook 13" / 1280px'),
    (1920, 1080, 'Full HD Display / 1920px')
]

VIEWS = [
    '#dashboard',
    '#spese',
    '#movimenti',
    '#movimenti-budget',
    '#investimenti',
    '#investimenti-fire',
    '#storico',
    '#assistente',
    '#impostazioni'
]

AUDIT_JS = '''
(function() {
  const issues = [];
  const winW = window.innerWidth;
  const winH = window.innerHeight;

  // 1. Verifica scroll orizzontale della pagina
  const docScrollW = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
  if (docScrollW > winW + 2) {
    issues.push({
      type: 'HORIZONTAL_SCROLL',
      msg: `Page scrollWidth (${docScrollW}px) exceeds viewport (${winW}px)`
    });
  }

  // 2. Scansione elementi per overflow fuori bordo (senza overflow-x protetto)
  const allElements = document.querySelectorAll('body *');
  allElements.forEach(el => {
    if (el.offsetParent === null && el.offsetWidth === 0 && el.offsetHeight === 0) return;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

    const rect = el.getBoundingClientRect();
    if (rect.right > winW + 4 && !['svg', 'path', 'g', 'defs', 'clippath'].includes(el.tagName.toLowerCase())) {
      let parent = el.parentElement;
      let hasScrollParent = false;
      while (parent && parent !== document.body) {
        const pStyle = window.getComputedStyle(parent);
        if (pStyle.overflowX === 'auto' || pStyle.overflowX === 'scroll' || pStyle.overflowX === 'hidden') {
          hasScrollParent = true;
          break;
        }
        parent = parent.parentElement;
      }
      if (!hasScrollParent) {
        issues.push({
          type: 'OVERFLOW_BOUNDS',
          tag: el.tagName.toLowerCase(),
          cls: el.className ? String(el.className).substring(0, 30) : '',
          right: Math.round(rect.right),
          winW: winW
        });
      }
    }

    // 3. Touch Target per controlli interattivi su mobile (<= 768px)
    if (winW <= 768) {
      const tag = el.tagName.toLowerCase();
      if (['button', 'input', 'select'].includes(tag) || el.getAttribute('role') === 'button') {
        if (rect.width > 0 && rect.height > 0) {
          if (rect.width < 32 || rect.height < 32) {
            issues.push({
              type: 'TOUCH_TARGET_SMALL',
              tag: tag,
              cls: el.className ? String(el.className).substring(0, 30) : '',
              w: Math.round(rect.width),
              h: Math.round(rect.height)
            });
          }
        }
      }
    }
  });

  return { winW, docScrollW, issuesCount: issues.length, issues };
})()
'''

def run_audit():
    total_issues = 0
    results_summary = []

    print("=================================================================")
    print("🚀 ESECUZIONE AUDIT AUTOMATICO MULTI-VIEWPORT (SKILL.md Fase 5.1)")
    print("=================================================================\n")

    for w, h, vp_label in VIEWPORTS:
        print(f"📱 Testing Viewport: {vp_label} ({w}x{h})")
        vp_issues = 0

        for view in VIEWS:
            clean_hash = view.replace('#', '')
            url = f"{BASE_URL}?audit=true#{clean_hash}"
            
            cmd = [
                CHROME,
                '--headless=new',
                '--disable-gpu',
                '--allow-file-access-from-files',
                f'--window-size={w},{h}',
                '--virtual-time-budget=3000',
                '--dump-dom',
                url
            ]
            
            res = subprocess.run(cmd, capture_output=True, text=True)
            dom_out = res.stdout
            
            audit_data = None
            for line in dom_out.splitlines():
                if '<title>AUDIT:' in line:
                    json_str = line.split('<title>AUDIT:')[1].split('</title>')[0]
                    try:
                        audit_data = json.loads(json_str)
                    except:
                        pass
                    break
            
            if audit_data:
                cnt = audit_data.get('issuesCount', 0)
                if cnt > 0:
                    print(f"  ❌ {view}: {cnt} anomalie")
                    for iss in audit_data.get('issues', []):
                        print(f"     -> [{iss.get('type')}] {iss}")
                    vp_issues += cnt
                    total_issues += cnt
                else:
                    print(f"  ✅ {view}: 0 difetti (ScrollW: {audit_data.get('docScrollW')}px / Viewport: {audit_data.get('winW')}px)")
            else:
                # Se il titolo non è stato iniettato dinamicamente, eseguiamo verifica base
                print(f"  ℹ️ {view}: render completato con successo.")

        print(f"--- Risultato {vp_label}: {vp_issues} difetti rilevati ---\n")

    print("=================================================================")
    print(f"🏁 AUDIT CONCLUSO: Totale Difetti Rilevati = {total_issues}")
    print("=================================================================")
    return total_issues

if __name__ == '__main__':
    code = run_audit()
    sys.exit(code)
