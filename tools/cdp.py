# -*- coding: utf-8 -*-
"""Najmanjsi mozni odjemalec za Chrome DevTools Protocol.

Zakaj sploh: ukazna vrstica brskalnika (--print-to-pdf) ne zna dodati
stevilk strani ne lastne glave. Protokol to zna, dostopen pa je samo
prek WebSocket povezave - in te Python nima v standardni knjiznici.

Zato je tu ~120 vrstic: rokovanje, posiljanje maskiranih okvirjev in
branje odgovorov. Nic vec, kot je potrebno za Page.printToPDF.
"""

import base64
import json
import os
import socket
import struct
import time
import urllib.request


# ─────────────────────────── WebSocket ───────────────────────────

class WS(object):
    def __init__(self, url, timeout=180):
        # ws://127.0.0.1:9222/devtools/page/ABC
        rest = url.split("://", 1)[1]
        hostport, path = rest.split("/", 1)
        host, port = hostport.split(":")
        self.sock = socket.create_connection((host, int(port)), timeout=30)
        self.sock.settimeout(timeout)
        self.buf = b""

        key = base64.b64encode(os.urandom(16)).decode()
        req = (
            "GET /%s HTTP/1.1\r\n"
            "Host: %s\r\n"
            "Upgrade: websocket\r\n"
            "Connection: Upgrade\r\n"
            "Sec-WebSocket-Key: %s\r\n"
            "Sec-WebSocket-Version: 13\r\n\r\n"
        ) % (path, hostport, key)
        self.sock.sendall(req.encode())

        head = b""
        while b"\r\n\r\n" not in head:
            chunk = self.sock.recv(4096)
            if not chunk:
                raise IOError("povezava prekinjena med rokovanjem")
            head += chunk
        if b"101" not in head.split(b"\r\n", 1)[0]:
            raise IOError("brskalnik ni sprejel WebSocket povezave")
        self.buf = head.split(b"\r\n\r\n", 1)[1]

    def _read(self, n):
        while len(self.buf) < n:
            chunk = self.sock.recv(65536)
            if not chunk:
                raise IOError("povezava prekinjena")
            self.buf += chunk
        out, self.buf = self.buf[:n], self.buf[n:]
        return out

    def send(self, text):
        payload = text.encode("utf-8")
        n = len(payload)
        head = bytearray([0x81])                 # FIN + opcode 1 (besedilo)
        if n < 126:
            head.append(0x80 | n)
        elif n < 65536:
            head.append(0x80 | 126)
            head += struct.pack(">H", n)
        else:
            head.append(0x80 | 127)
            head += struct.pack(">Q", n)
        mask = os.urandom(4)
        head += mask
        masked = bytes(b ^ mask[i % 4] for i, b in enumerate(payload))
        self.sock.sendall(bytes(head) + masked)

    def recv(self):
        """Vrne eno celo sporocilo (zlozi tudi razdrobljene okvirje)."""
        parts = []
        while True:
            b0, b1 = self._read(2)
            fin = b0 & 0x80
            opcode = b0 & 0x0F
            length = b1 & 0x7F
            if length == 126:
                length = struct.unpack(">H", self._read(2))[0]
            elif length == 127:
                length = struct.unpack(">Q", self._read(8))[0]
            data = self._read(length) if length else b""

            if opcode == 0x9:                     # ping -> pong
                self.sock.sendall(b"\x8a\x80" + os.urandom(4))
                continue
            if opcode == 0x8:
                raise IOError("brskalnik je zaprl povezavo")
            parts.append(data)
            if fin:
                return b"".join(parts).decode("utf-8", "replace")

    def close(self):
        try:
            self.sock.close()
        except Exception:
            pass


# ─────────────────────────── CDP ───────────────────────────

class Browser(object):
    def __init__(self, port):
        self.port = port
        self.ws = None
        self.next_id = 0

    def wait_for_target(self, timeout=40):
        """Pocaka, da se brskalnik odzove, in se poveze na prvi zavihek."""
        deadline = time.time() + timeout
        last = None
        while time.time() < deadline:
            try:
                raw = urllib.request.urlopen(
                    "http://127.0.0.1:%d/json/list" % self.port, timeout=3).read()
                for t in json.loads(raw.decode("utf-8")):
                    if t.get("type") == "page" and t.get("webSocketDebuggerUrl"):
                        self.ws = WS(t["webSocketDebuggerUrl"])
                        return True
            except Exception as exc:
                last = exc
            time.sleep(0.4)
        raise IOError("brskalnik se ni odzval na vratih %d (%s)" % (self.port, last))

    def call(self, method, params=None):
        self.next_id += 1
        mid = self.next_id
        self.ws.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
        while True:
            msg = json.loads(self.ws.recv())
            if msg.get("id") != mid:
                continue                          # dogodek, ki nas ne zanima
            if "error" in msg:
                raise IOError("%s: %s" % (method, msg["error"].get("message")))
            return msg.get("result", {})

    def goto(self, url, ready_js, timeout=90):
        """Odpre naslov in caka, da izraz ready_js vrne true."""
        self.call("Page.navigate", {"url": url})
        deadline = time.time() + timeout
        while time.time() < deadline:
            res = self.call("Runtime.evaluate",
                            {"expression": ready_js, "returnByValue": True})
            if res.get("result", {}).get("value") is True:
                time.sleep(0.6)                   # se zadnji izris
                return True
            time.sleep(0.5)
        raise IOError("stran se ni pripravila v %d sekundah" % timeout)

    def screenshot_png(self, clip):
        res = self.call("Page.captureScreenshot",
                        {"format": "png", "clip": clip, "captureBeyondViewport": True})
        return base64.b64decode(res["data"])

    def pdf(self, **params):
        res = self.call("Page.printToPDF", params)
        return base64.b64decode(res["data"])

    def close(self):
        if self.ws:
            self.ws.close()


def free_port():
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    port = s.getsockname()[1]
    s.close()
    return port
