#!/usr/bin/env python3
"""Local dev server with caching disabled.

Usage:  python3 scripts/dev_server.py [port]   (default 3000)

Identical to `python3 -m http.server`, but every response carries
`Cache-Control: no-store`, so Safari on iPhone always loads the latest CSS/JS
instead of a stale copy keyed on an unchanged `?v=` query string.
"""
import functools
import http.server
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()


if __name__ == "__main__":
    handler = functools.partial(NoCacheHandler, directory=ROOT)
    with http.server.ThreadingHTTPServer(("0.0.0.0", PORT), handler) as server:
        print(f"Serving {ROOT} on http://0.0.0.0:{PORT} (no-store)")
        server.serve_forever()
