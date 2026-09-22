# -*- coding: utf-8 -*-
"""Preprost staticni streznik za gradivo "Programiranje za neprogramerje".

Brez zunanjih knjiznic - uporablja samo Python standardno knjiznico.
Zazene se z: python tools\\server.py [--port 8080]
"""

import argparse
import http.server
import os
import socket
import socketserver
import sys
import threading
import webbrowser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _utf8_console():
    """Windows konzola privzeto ni UTF-8; poskusi jo prepricati."""
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except Exception:
            pass


class Handler(http.server.SimpleHTTPRequestHandler):
    """Statika iz korena projekta, brez predpomnjenja."""

    extensions_map = dict(http.server.SimpleHTTPRequestHandler.extensions_map)
    extensions_map.update({
        ".svg": "image/svg+xml",
        ".js": "text/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".html": "text/html; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".md": "text/markdown; charset=utf-8",
    })

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        # Uporabnik ureja content-*.js in osvezuje stran - predpomnilnik je sovraznik.
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        super().end_headers()

    def log_message(self, fmt, *args):
        # Tiho: zanimajo nas samo napake.
        status = args[1] if len(args) > 1 else ""
        if str(status).startswith(("4", "5")):
            sys.stderr.write("  ! %s\n" % (fmt % args))


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


def lan_ip():
    """Naslov tega racunalnika v lokalnem omrezju (brez posiljanja podatkov)."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))  # ne poslje nicesar, samo izbere vmesnik
        return s.getsockname()[0]
    except Exception:
        return None
    finally:
        s.close()


def start(port=8080, tries=10):
    """Zazene streznik na prvih prostih vratih. Vrne (server, port)."""
    last = None
    for p in range(port, port + tries):
        try:
            srv = Server(("0.0.0.0", p), Handler)
            return srv, p
        except OSError as exc:
            last = exc
    raise SystemExit("Vsa vrata %d-%d so zasedena (%s)" % (port, port + tries - 1, last))


def banner(port, public_url=None):
    line = "=" * 64
    out = ["", line, "  PROGRAMIRANJE ZA NEPROGRAMERJE  -  streznik tece", line, ""]
    out.append("  Na tem racunalniku:   http://localhost:%d" % port)
    ip = lan_ip()
    if ip:
        out.append("  V lokalnem omrezju:   http://%s:%d" % (ip, port))
    else:
        out.append("  V lokalnem omrezju:   (ni omreznega naslova)")
    if public_url:
        out += ["", "  JAVNI NASLOV (deluje, dokler tece to okno):", "", "      " + public_url, ""]
    out += ["", "  Ustavi z:  Ctrl + C", line, ""]
    return "\n".join(out)


def main():
    _utf8_console()
    ap = argparse.ArgumentParser()
    ap.add_argument("--port", type=int, default=8080)
    ap.add_argument("--no-browser", action="store_true")
    args = ap.parse_args()

    srv, port = start(args.port)
    print(banner(port))
    if not args.no_browser:
        threading.Timer(0.8, webbrowser.open, ["http://localhost:%d/" % port]).start()
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print("\nUstavljeno.")
    finally:
        srv.server_close()


if __name__ == "__main__":
    main()
