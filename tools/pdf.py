# -*- coding: utf-8 -*-
"""Izvoz gradiva v PDF (slovensko in anglesko) ter pakiranje v .zip.

Uporablja brskalnik, ki je na Windowsu ze namescen (Edge ali Chrome), v
nacinu brez okna. Nic za namestiti.

Brskalnik krmilimo prek njegovega protokola (tools/cdp.py), ne prek
ukazne vrstice - samo tako se da dobiti stevilke strani in lastno glavo
z logotipom.

Zazene se z: python tools\\pdf.py
"""

import base64
import os
import shutil
import subprocess
import sys
import tempfile
import time
import zipfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import server as srvmod        # noqa: E402
import cdp                     # noqa: E402

ROOT = srvmod.ROOT

OUTPUTS = [
    ("sl", "osnove-programiranja-SL.pdf", "Programiranje za neprogramerje"),
    ("en", "programming-basics-EN.pdf", "Programming for Non-Programmers"),
]

ZIP_NAME = "programiranje-za-neprogramerje.zip"
COLOPHON = "Klemen Hvala &middot; Fundacija Zlata ovca &middot; 2026 &middot; CC BY-SA 4.0"

CANDIDATES = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
]

# stran je pripravljena, ko je izrisanih vseh 107 pojmov in kazalo
READY = ("document.readyState === 'complete' && "
         "document.querySelectorAll('.concept').length > 100 && "
         "!!document.querySelector('.toc')")


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


def logo_png(browser):
    """Logotip iz SVG pretvori v PNG, da ga lahko damo v glavo PDF.

    Glava PDF je locen dokument in vanj SVG datoteke ni mogoce vkljuciti,
    sliko v obliki data: URI pa sprejme."""
    svg = open(os.path.join(ROOT, "assets", "img", "logo.svg"),
               encoding="utf-8").read()
    html = ("<!doctype html><meta charset='utf-8'>"
            "<body style='margin:0;background:#fff;color:#1a1815;'>"
            "<div style='width:120px;height:104px;'>" + svg + "</div></body>")
    data_url = "data:text/html;charset=utf-8;base64," + \
        base64.b64encode(html.encode("utf-8")).decode()
    browser.goto(data_url, "document.readyState === 'complete'", timeout=30)
    # V glavi je logotip visok 14 px; 0.5 je se vedno ~3x gostota zaslona,
    # vec pa bi po nepotrebnem napihnilo PDF, ker se slika vgradi na vsako stran.
    png = browser.screenshot_png({"x": 0, "y": 0, "width": 120, "height": 104, "scale": 0.5})
    return base64.b64encode(png).decode()


def header_template(title, logo_b64):
    return (
        "<div style=\"width:100%;font-size:7.5px;color:#8a8279;padding:0 14mm;"
        "font-family:'Segoe UI',system-ui,sans-serif;display:flex;"
        "align-items:center;justify-content:space-between;\">"
        "<span style=\"display:flex;align-items:center;gap:5px;\">"
        "<img src=\"data:image/png;base64," + logo_b64 + "\" style=\"height:14px;width:auto;\">"
        "<span style=\"font-weight:600;color:#6d645a;\">" + title + "</span>"
        "</span>"
        "<span>" + COLOPHON + "</span>"
        "</div>")


FOOTER = (
    "<div style=\"width:100%;font-size:7.5px;color:#8a8279;padding:0 14mm;"
    "font-family:'Segoe UI',system-ui,sans-serif;text-align:right;\">"
    "<span class=\"pageNumber\"></span> / <span class=\"totalPages\"></span>"
    "</div>")


def render_all(browser, logo_b64):
    """Za vsak jezik odpre stran in shrani PDF. Vrne seznam (ime, velikost)."""
    made = []
    for lang, name, title in OUTPUTS:
        out_path = os.path.join(ROOT, name)
        print("  Pripravljam %s ..." % name)
        started = time.time()

        browser.goto(file_url(lang), READY)
        data = browser.pdf(
            landscape=False,
            displayHeaderFooter=True,
            printBackground=True,
            paperWidth=8.27,          # A4
            paperHeight=11.69,
            marginTop=0.78,           # prostor za glavo
            marginBottom=0.62,        # prostor za nogo
            marginLeft=0.63,
            marginRight=0.63,
            headerTemplate=header_template(title, logo_b64),
            footerTemplate=FOOTER,
            preferCSSPageSize=False,
        )
        with open(out_path, "wb") as f:
            f.write(data)
        print("    OK - %s (%.1f s)" % (human(len(data)), time.time() - started))
        made.append((name, len(data)))
    return made


SKIP_DIRS = {".git", "__pycache__", "plans", ".claude"}
SKIP_FILES = {ZIP_NAME}


def build_zip():
    zip_path = os.path.join(ROOT, ZIP_NAME)
    if os.path.exists(zip_path):
        os.remove(zip_path)
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
        for base, dirs, files in os.walk(ROOT):
            dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
            rel_base = os.path.relpath(base, ROOT).replace("\\", "/")
            if rel_base.startswith("assets/bin"):
                continue
            for name in files:
                if name in SKIP_FILES or name.endswith(".pyc"):
                    continue
                full = os.path.join(base, name)
                z.write(full, os.path.relpath(full, ROOT))
    return os.path.getsize(zip_path)


def human(n):
    return "%.1f MB" % (n / 1048576.0) if n >= 1048576 else "%.0f KB" % (n / 1024.0)


def main():
    srvmod._utf8_console()
    line = "=" * 64
    print("\n" + line)
    print("  IZVOZ V PDF")
    print(line + "\n")

    exe = find_browser()
    if not exe:
        print("  NAPAKA: ne najdem brskalnika Edge ali Chrome.")
        return 1
    print("  Brskalnik: %s\n" % exe)

    port = cdp.free_port()
    profile = tempfile.mkdtemp(prefix="pzn-pdf-")
    proc = subprocess.Popen(
        [exe, "--headless=new", "--disable-gpu", "--disable-extensions",
         "--no-first-run", "--user-data-dir=" + profile,
         "--remote-debugging-port=%d" % port, "about:blank"],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    browser = cdp.Browser(port)
    ok = True
    try:
        browser.wait_for_target()
        browser.call("Page.enable")
        browser.call("Runtime.enable")
        logo_b64 = logo_png(browser)
        render_all(browser, logo_b64)
    except Exception as exc:
        print("    NAPAKA: %s" % exc)
        ok = False
    finally:
        browser.close()
        try:
            proc.terminate()
            proc.wait(timeout=10)
        except Exception:
            proc.kill()
        shutil.rmtree(profile, ignore_errors=True)

    if ok:
        print("\n  Pakiram v %s ..." % ZIP_NAME)
        print("    OK - %s" % human(build_zip()))

    print("\n" + line)
    if ok:
        print("  KONCANO. Datoteke so v mapi projekta:")
        for _, name, _ in OUTPUTS:
            print("    %s" % name)
        print("    %s" % ZIP_NAME)
    else:
        print("  Koncano z napakami - glej sporocila zgoraj.")
    print(line + "\n")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
