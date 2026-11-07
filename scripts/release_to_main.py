#!/usr/bin/env python3
"""
Release Automation Script: Merge Beta to Main with Production Environment Configuration
Ensures:
- main branch has isBeta: false, defaultSandboxMode: false (live Google Sheets sync)
- index.html on main has clean production labels (Finanze - Movimenti / Dati Sincronizzati)
- app.bundle.js is compiled and validated with JavaScriptCore
- beta remains intact with isBeta: true, defaultSandboxMode: true
"""

import subprocess
import sys
import os

def run_cmd(cmd):
    print(f"▶ {cmd}")
    res = subprocess.run(cmd, shell=True, text=True, capture_output=True)
    if res.returncode != 0:
        print(f"❌ Error: {res.stderr.strip()}", file=sys.stderr)
        sys.exit(res.returncode)
    return res.stdout.strip()

def main():
    print("🚀 Preparing Official Release to Main...")
    
    # 1. Check clean status
    status = run_cmd("git status --porcelain")
    if status:
        print("❌ Working tree has uncommitted changes. Commit or stash them first.")
        sys.exit(1)

    # 2. Checkout main and merge beta
    run_cmd("git checkout main")
    run_cmd("git merge beta -m 'chore(release): merge beta into main'")

    # 3. Configure environment.js for production
    env_content = '''/**
 * Configurazione Ambiente Applicazione
 * Branch: main (Produzione / Stabile)
 * 
 * Regola Costituzionale:
 * - In main (produzione): Sincronizzazione reale attiva di default con Google Sheets.
 * - In beta: Sandbox attiva di default per proteggere il database reale da qualsiasi scrittura.
 */

export const APP_ENV = {
  branch: 'main',
  isBeta: false,
  defaultSandboxMode: false,
  appName: 'Finanze - Movimenti',
  statusDesc: 'Dati Sincronizzati',
  mobileText: 'Finanze'
};
'''
    with open('js/config/environment.js', 'w', encoding='utf-8') as f:
        f.write(env_content)
    print("✅ Configured js/config/environment.js for production (isBeta: false)")

    # 4. Configure index.html for production
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Replace sidebar status
    html = html.replace(
        '<span class="sheet-status-name">Finanze (Beta Sandbox)</span>',
        '<span class="sheet-status-name">Finanze - Movimenti</span>'
    )
    html = html.replace(
        '<span class="sheet-status-desc">🛡️ Database Protetto</span>',
        '<span class="sheet-status-desc">Dati Sincronizzati</span>'
    )
    html = html.replace(
        '<div class="sheet-status-indicator" title="Beta Sandbox Protetto"></div>',
        '<div class="sheet-status-indicator" title="Stato Connessione"></div>'
    )
    
    # Replace mobile status
    html = html.replace(
        '<div class="mobile-sheet-pill" title="Beta Sandbox Protetto">',
        '<div class="mobile-sheet-pill" title="Stato Database">'
    )
    html = html.replace(
        '<span>🛡️ Sandbox</span>',
        '<span>Finanze</span>'
    )

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("✅ Configured index.html for production labels")

    # 5. Build bundle and validate
    run_cmd("python3 scripts/build_bundle.py")

    # 6. Commit release configuration on main if changes exist
    run_cmd("git add js/config/environment.js index.html js/app.bundle.js scripts/")
    staged = run_cmd("git status --porcelain")
    if staged:
        run_cmd("git commit -m 'chore(release): configure production environment for main (live Google Sheets sync)'")
        print("✅ Successfully committed production release on main!")
    else:
        print("✅ Production files are already up-to-date on main.")

    # 7. Switch back to beta
    run_cmd("git checkout beta")
    print("🌿 Returned to branch beta (Laboratorio R&D)")

if __name__ == '__main__':
    main()
