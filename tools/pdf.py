# -*- coding: utf-8 -*-
"""Izvoz gradiva v PDF (slovensko in anglesko) ter pakiranje v .zip.

Uporablja brskalnik, ki je na Windowsu ze namescen (Edge ali Chrome), v
nacinu brez okna. Nic za namestiti.

Zazene se z: python tools\\pdf.py
"""

import os
import shutil
import subprocess
import sys
import tempfile
import time
import zipfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import server as srvmod  # noqa: E402

ROOT = srvmod.ROOT

OUTPUTS = [
    ("sl", "osnove-programiranja-SL.pdf"),
    ("en", "programming-basics-EN.pdf"),
]

ZIP_NAME = "programiranje-za-neprogramerje.zip"

CANDIDATES = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
]


def find_browser():
    for name in ("msedge", "chrome"):
        found = shutil.which(name)
        if found:
            return found
    for path in CANDIDATES:
        if os.path.exists(path):
            return path
    return None


def file_url(lang):
    page = os.path.join(ROOT, "index.html").replace("\\", "/")
    return "file:///" + page + "?lang=" + lang + "&view=print"


def render(browser, lang, out_name):
    out_path = os.path.join(ROOT, out_name)
    if os.path.exists(out_path):
        os.remove(out_path)

    profile = tempfile.mkdtemp(prefix="pzn-pdf-")
    cmd = [
        browser,
        "--headless=new",
        "--disable-gpu",
        "--disable-extensions",
        "--no-first-run",
        "--user-data-dir=" + profile,
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=20000",
        "--no-pdf-header-footer",
        "--print-to-pdf=" + out_path,
        file_url(lang),
    ]
    try:
        proc = subprocess.run(cmd, capture_output=True, text=True,
                              encoding="utf-8", errors="replace", timeout=180)
    except subprocess.TimeoutExpired:
        return None, "brskalnik se ni odzval v 180 sekundah"
    finally:
        shutil.rmtree(profile, ignore_errors=True)

    if not os.path.exists(out_path):
        msg = (proc.stderr or proc.stdout or "").strip().splitlines()
        return None, (msg[-1] if msg else "PDF ni nastal")

    size = os.path.getsize(out_path)
    if size < 20000:
        return None, "PDF je sumljivo majhen (%d bajtov)" % size
    return size, None


SKIP_DIRS = {".git", "__pycache__", "plans"}
SKIP_FILES = {ZIP_NAME}


def build_zip():
    zip_path = os.path.join(ROOT, ZIP_NAME)
    if os.path.exists(zip_path):
        os.remove(zip_path)

    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
        for base, dirs, files in os.walk(ROOT):
            dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
            rel_base = os.path.relpath(base, ROOT)
            # cloudflared.exe je velik in ga uporabnik prenese sam
            if rel_base.replace("\\", "/").startswith("assets/bin"):
                continue
            for name in files:
                if name in SKIP_FILES or name.endswith(".pyc"):
                    continue
                full = os.path.join(base, name)
                rel = os.path.relpath(full, ROOT)
                z.write(full, rel)
    return os.path.getsize(zip_path)


def human(n):
    return "%.1f MB" % (n / 1048576.0) if n >= 1048576 else "%.0f KB" % (n / 1024.0)


def main():
    srvmod._utf8_console()
    line = "=" * 64
    print("\n" + line)
    print("  IZVOZ V PDF")
    print(line + "\n")

    browser = find_browser()
    if not browser:
        print("  NAPAKA: ne najdem brskalnika Edge ali Chrome.")
        print("  Na Windows 10 je Edge obicajno tu:")
        print(r"    C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe")
        return 1
    print("  Brskalnik: %s\n" % browser)

    ok = True
    for lang, name in OUTPUTS:
        print("  Pripravljam %s ..." % name)
        started = time.time()
        size, err = render(browser, lang, name)
        if err:
            print("    NAPAKA: %s" % err)
            ok = False
        else:
            print("    OK - %s (%.1f s)" % (human(size), time.time() - started))

    if ok:
        print("\n  Pakiram v %s ..." % ZIP_NAME)
        print("    OK - %s" % human(build_zip()))

    print("\n" + line)
    if ok:
        print("  KONCANO. Datoteke so v mapi projekta:")
        for _, name in OUTPUTS:
            print("    %s" % name)
        print("    %s" % ZIP_NAME)
    else:
        print("  Koncano z napakami - glej sporocila zgoraj.")
    print(line + "\n")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
