from __future__ import annotations

import socket
import subprocess
import sys
import threading
import time
import urllib.error
import urllib.request
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
INDEX_FILE = ROOT / "index.html"
APP_PORT = 8765
WINDOW_TITLE = "Hohlen"
WINDOW_SIZE = (1366, 820)
WINDOW_MIN_SIZE = (1024, 640)


class StaticFileHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".css": "text/css; charset=utf-8",
        ".html": "text/html; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
    }

    def __init__(self, *args, directory: str, **kwargs):
        super().__init__(*args, directory=directory, **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store, max-age=0")
        self.send_header("Pragma", "no-cache")
        super().end_headers()

    def log_message(self, format: str, *args) -> None:
        return


def show_error(title: str, message: str) -> None:
    try:
        import tkinter as tk
        from tkinter import messagebox

        root = tk.Tk()
        root.withdraw()
        messagebox.showerror(title, message)
        root.destroy()
    except Exception:
        print(f"{title}: {message}", file=sys.stderr)


def ensure_webview():
    try:
        import webview

        return webview
    except ImportError:
        result = subprocess.run(
            [sys.executable, "-m", "pip", "install", "pywebview"],
            capture_output=True,
            text=True,
            check=False,
        )
        if result.returncode != 0:
            details = (result.stderr or result.stdout or "").strip()
            snippet = details.splitlines()[-1] if details else "instalacao do pywebview falhou."
            raise RuntimeError(snippet) from None

        import webview

        return webview


def pick_free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


def start_static_server() -> tuple[ThreadingHTTPServer, threading.Thread, str]:
    port = APP_PORT
    handler = partial(StaticFileHandler, directory=str(ROOT))
    server = ThreadingHTTPServer(("127.0.0.1", port), handler)
    thread = threading.Thread(target=server.serve_forever, name="hohlen-http", daemon=True)
    thread.start()
    return server, thread, f"http://127.0.0.1:{port}/index.html"


def wait_for_server(url: str, timeout: float = 5.0) -> None:
    deadline = time.time() + timeout
    last_error = None
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=1) as response:
                if response.status == 200:
                    return
        except urllib.error.URLError as error:
            last_error = error
            time.sleep(0.1)

    raise RuntimeError(f"Servidor local nao respondeu a tempo: {last_error}")


def validate_local_files() -> None:
    required = [INDEX_FILE, ROOT / "script.js", ROOT / "style.css"]
    missing = [path.name for path in required if not path.exists()]
    if missing:
        raise FileNotFoundError(f"Arquivos ausentes: {', '.join(missing)}")


def run_checks() -> int:
    validate_local_files()
    server = None
    try:
        server, _, url = start_static_server()
        wait_for_server(url)
        for path in ("index.html", "style.css", "script.js"):
            with urllib.request.urlopen(f"{url.rsplit('/', 1)[0]}/{path}", timeout=5) as response:
                if response.status != 200:
                    raise RuntimeError(f"Falha ao carregar {path}: HTTP {response.status}")
        print("Launcher OK")
        return 0
    finally:
        if server is not None:
            server.shutdown()
            server.server_close()


def run_app() -> int:
    validate_local_files()

    try:
        webview = ensure_webview()
    except Exception as error:
        show_error("Hohlen", f"Nao foi possivel iniciar o launcher.\n\n{error}")
        return 1

    server = None
    try:
        server, _, url = start_static_server()
        wait_for_server(url)
        webview.create_window(
            WINDOW_TITLE,
            url,
            width=WINDOW_SIZE[0],
            height=WINDOW_SIZE[1],
            min_size=WINDOW_MIN_SIZE,
            background_color="#08090b",
        )
        webview.start(debug=False)
        return 0
    finally:
        if server is not None:
            server.shutdown()
            server.server_close()


def main() -> int:
    if "--check" in sys.argv:
        try:
            return run_checks()
        except (OSError, RuntimeError, urllib.error.URLError) as error:
            print(f"Check falhou: {error}", file=sys.stderr)
            return 1

    try:
        return run_app()
    except OSError as error:
        show_error("Hohlen", f"Erro ao iniciar o jogo.\n\n{error}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
