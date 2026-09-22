# -*- coding: utf-8 -*-
"""Zazene lokalni streznik IN javni tunel prek Cloudflare (trycloudflare).

Naslov je nov ob vsakem zagonu in deluje samo, dokler tece to okno.
Zazene se z: python tools\\tunnel.py
"""

import os
import re
import subprocess
import sys
import threading
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import server as srvmod  # noqa: E402

ROOT = srvmod.ROOT
CLOUDFLARED = os.path.join(ROOT, "assets", "bin", "cloudflared.exe")
URL_RE = re.compile(r"https://[a-z0-9][a-z0-9-]*\.trycloudflare\.com")


def to_clipboard(text):
    try:
        p = subprocess.Popen("clip", stdin=subprocess.PIPE, shell=True)
        p.communicate(text.encode("utf-16-le"))
        return p.returncode == 0
    except Exception:
        return False


def big_box(url):
    inner = "  " + url + "  "
    top = "+" + "-" * len(inner) + "+"
    return "\n".join(["", top, "|" + inner + "|", top, ""])


def main():
    srvmod._utf8_console()

    if not os.path.exists(CLOUDFLARED):
        print("\n  ! Ni datoteke assets\\bin\\cloudflared.exe")
        print("    Najprej pozeni  namesti.bat  (potrebuje internet).")
        print("    Za samo lokalni prikaz uporabi  zazeni-lokalno.bat\n")
        return 1

    srv, port = srvmod.start(8080)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    print(srvmod.banner(port))
    print("  Odpiram javni tunel ... (nekaj sekund)\n")

    proc = subprocess.Popen(
        [CLOUDFLARED, "tunnel", "--url", "http://localhost:%d" % port, "--no-autoupdate"],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding="utf-8",
        errors="replace",
        bufsize=1,
    )

    url = None
    deadline = time.time() + 45
    try:
        for line in proc.stdout:
            if url is None:
                m = URL_RE.search(line)
                if m:
                    url = m.group(0)
                    print(big_box(url))
                    if to_clipboard(url):
                        print("  (naslov je kopiran v odlozisce - prilepi ga s Ctrl+V)")
                    print("  Naslov deluje, dokler tece to okno. Ustavi s Ctrl + C.\n")
            elif "ERR" in line or "error" in line.lower():
                sys.stderr.write("  ! " + line)
            if url is None and time.time() > deadline:
                print("  ! Tunela ni uspelo odpreti v 45 sekundah.")
                print("    Preveri internetno povezavo ali uporabi zazeni-lokalno.bat\n")
                break
    except KeyboardInterrupt:
        pass
    finally:
        try:
            proc.terminate()
        except Exception:
            pass
        srv.shutdown()
        srv.server_close()
        print("\nUstavljeno. Javni naslov ne deluje vec.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
