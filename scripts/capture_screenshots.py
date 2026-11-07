#!/usr/bin/env python3
import subprocess
import os

CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
BASE_URL = 'file:///Users/giorgio/Desktop/Financial-webApp/index.html'
OUT_DIR = '/Users/giorgio/.gemini/antigravity/brain/f07a51b8-f056-4407-a3fb-e8e97295665d/screenshots'

os.makedirs(OUT_DIR, exist_ok=True)

SHOTS = [
    ('after_dashboard_desktop.png', 1440, 900, '#dashboard'),
    ('after_dashboard_mobile.png', 500, 844, '#dashboard'),
    ('after_spese_desktop.png', 1440, 900, '#spese'),
    ('after_spese_mobile.png', 500, 844, '#spese'),
    ('after_movimenti_desktop.png', 1440, 900, '#movimenti'),
    ('after_movimenti_mobile.png', 500, 844, '#movimenti'),
    ('after_movimenti_budget_desktop.png', 1440, 900, '#movimenti-budget'),
    ('after_movimenti_budget_mobile.png', 500, 844, '#movimenti-budget'),
    ('after_investimenti_desktop.png', 1440, 900, '#investimenti'),
    ('after_investimenti_mobile.png', 500, 844, '#investimenti'),
    ('after_storico_desktop.png', 1440, 900, '#storico'),
    ('after_storico_mobile.png', 500, 844, '#storico'),
    ('after_assistente_desktop.png', 1440, 900, '#assistente'),
    ('after_assistente_mobile.png', 500, 844, '#assistente'),
    ('after_impostazioni_desktop.png', 1440, 900, '#impostazioni'),
    ('after_impostazioni_mobile.png', 500, 844, '#impostazioni')
]

for filename, w, h, hash_fragment in SHOTS:
    out_path = os.path.join(OUT_DIR, filename)
    url = f"{BASE_URL}{hash_fragment}"
    cmd = [
        CHROME,
        '--headless=new',
        '--disable-gpu',
        '--allow-file-access-from-files',
        f'--window-size={w},{h}',
        '--virtual-time-budget=6000',
        '--run-all-compositor-stages-before-draw',
        f'--screenshot={out_path}',
        url
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(out_path):
        size_kb = os.path.getsize(out_path) / 1024
        print(f"Captured {filename} ({w}x{h}) -> {size_kb:.1f} KB")
    else:
        print(f"Failed to capture {filename}")
