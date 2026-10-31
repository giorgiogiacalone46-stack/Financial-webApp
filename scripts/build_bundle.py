#!/usr/bin/env python3
"""
Bundle Builder for Financial WebApp
Compiles Vanilla ES6 modules into js/app.bundle.js for file:// execution
"""

import re
import subprocess
import os

FILES = [
    'js/config/environment.js',
    'js/components/icons.js',
    'js/components/uiComponents.js',
    'js/data/realData.js',
    'js/data/mockData.js',
    'js/services/smartCategorizer.js',
    'js/services/googleSheetsService.js',
    'js/services/financialAssistantService.js',
    'js/components/monthlyClosingModal.js',
    'js/components/dashboardView.js',
    'js/components/speseView.js',
    'js/components/movimentiView.js',
    'js/components/investimentiView.js',
    'js/components/storicoView.js',
    'js/components/assistenteView.js',
    'js/components/impostazioniView.js',
    'js/app.js'
]

OUTPUT_FILE = 'js/app.bundle.js'

def clean_module_code(content, filename):
    lines = content.splitlines()
    cleaned = []
    
    in_import = False
    for line in lines:
        stripped = line.strip()
        
        # Skip import statements (single-line or multi-line)
        if stripped.startswith('import ') or stripped.startswith('import{') or in_import:
            if ';' in line or stripped.endswith("from '...'") or "from '" in line or 'from "' in line:
                in_import = False
                continue
            else:
                in_import = True
                continue
        
        # Strip export statements
        if stripped.startswith('export default '):
            line = line.replace('export default ', '')
        elif stripped.startswith('export const '):
            line = line.replace('export const ', 'const ')
        elif stripped.startswith('export let '):
            line = line.replace('export let ', 'let ')
        elif stripped.startswith('export var '):
            line = line.replace('export var ', 'var ')
        elif stripped.startswith('export function '):
            line = line.replace('export function ', 'function ')
        elif stripped.startswith('export async function '):
            line = line.replace('export async function ', 'async function ')
        elif stripped.startswith('export class '):
            line = line.replace('export class ', 'class ')
        elif re.match(r'^export\s*\{[^}]*\}\s*;?', stripped):
            continue
            
        cleaned.append(line)
        
    return f"// === {filename} ===\n" + "\n".join(cleaned) + "\n\n"

def build():
    parts = ['(function() {\n"use strict";\n\n']
    
    for f in FILES:
        if not os.path.exists(f):
            print(f"ERROR: {f} not found!")
            return False
        with open(f, 'r', encoding='utf-8') as fh:
            content = fh.read()
        parts.append(clean_module_code(content, f))
        
    parts.append('\n})();\n')
    
    bundle_code = "".join(parts)
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as fh:
        fh.write(bundle_code)
        
    print(f"Bundle successfully created: {OUTPUT_FILE} ({len(bundle_code)} bytes)")
    
    # Validate with JSC
    jsc = '/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc'
    if os.path.exists(jsc):
        test_script = (
            "var console = { log: () => {}, warn: () => {}, error: () => {}, info: () => {} }; var window = { matchMedia: () => ({ matches: false }), addEventListener: () => {}, location: { hash: '', search: '', protocol: 'file:' } }, "
            "document = { readyState: 'complete', addEventListener: () => {}, querySelectorAll: () => [], getElementById: () => null, querySelector: () => null, body: { classList: { add: () => {}, remove: () => {}, contains: () => false } } }, "
            "localStorage = { getItem: () => null, setItem: () => {} }, navigator = { onLine: true }; "
            f"load('{OUTPUT_FILE}'); print('JSC BUNDLE FULL RUN OK');"
        )
        res = subprocess.run([jsc, '-e', test_script], capture_output=True, text=True)
        if res.returncode == 0 and 'JSC BUNDLE FULL RUN OK' in res.stdout:
            print("✅ JavaScriptCore validation: Syntax & Runtime initialization OK!")
            return True
        else:
            print(f"❌ JavaScriptCore validation error:\n{res.stderr or res.stdout}")
            return False
    return True

if __name__ == '__main__':
    build()
