from __future__ import annotations

import socket
import subprocess
import sys
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
import json
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
INDEX_FILE = ROOT / "index.html"
SAVE_DIR = ROOT / "saves"
APP_PORT = 8765
WINDOW_TITLE = "Hohlen"
WINDOW_SIZE = (1366, 820)
WINDOW_MIN_SIZE = (1024, 640)
SAVE_FILES = {
    "hohlen-save-v1": "progress.json",
    "hohlen-weapon-dev-config-v1": "weapon-dev-config.json",
    "hohlen-upgrade-balance-config-v1": "upgrade-balance-config.json",
    "hohlen-gameplay-balance-config-v1": "gameplay-balance-config.json",
    "hohlen-hitbox-dev-config-v1": "hitbox-dev-config.json",
}
MAX_SAVE_BYTES = 2 * 1024 * 1024


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

    def storage_key_from_path(self) -> str | None:
        parsed = urllib.parse.urlparse(self.path)
        prefix = "/api/storage/"
        if not parsed.path.startswith(prefix):
            return None
        return urllib.parse.unquote(parsed.path[len(prefix):])

    def storage_path_for_key(self, key: str) -> Path | None:
        file_name = SAVE_FILES.get(key)
        if not file_name:
            return None
        return SAVE_DIR / file_name

    def send_json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        key = self.storage_key_from_path()
        if key is None:
            super().do_GET()
            return

        path = self.storage_path_for_key(key)
        if path is None:
            self.send_json(404, {"ok": False, "error": "chave de save desconhecida"})
            return
        if not path.exists():
            self.send_json(200, {"ok": True, "found": False, "data": None})
            return

        try:
            with path.open("r", encoding="utf-8") as file:
                data = json.load(file)
            self.send_json(200, {"ok": True, "found": True, "data": data})
        except (OSError, json.JSONDecodeError) as error:
            self.send_json(500, {"ok": False, "error": str(error)})

    def do_POST(self) -> None:
        key = self.storage_key_from_path()
        if key is None:
            self.send_json(404, {"ok": False, "error": "rota nao encontrada"})
            return

        path = self.storage_path_for_key(key)
        if path is None:
            self.send_json(404, {"ok": False, "error": "chave de save desconhecida"})
            return

        content_length = int(self.headers.get("Content-Length", "0") or 0)
        if content_length <= 0 or content_length > MAX_SAVE_BYTES:
            self.send_json(413, {"ok": False, "error": "save vazio ou grande demais"})
            return

        try:
            payload = json.loads(self.rfile.read(content_length).decode("utf-8"))
            data = payload["data"] if isinstance(payload, dict) and "data" in payload else payload
            SAVE_DIR.mkdir(parents=True, exist_ok=True)
            temp_path = path.with_suffix(path.suffix + ".tmp")
            with temp_path.open("w", encoding="utf-8") as file:
                json.dump(data, file, ensure_ascii=False, indent=2)
                file.write("\n")
            temp_path.replace(path)
            self.send_json(200, {"ok": True})
        except (OSError, json.JSONDecodeError, KeyError, TypeError) as error:
            self.send_json(500, {"ok": False, "error": str(error)})


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


def start_static_server(port: int | None = None) -> tuple[ThreadingHTTPServer, threading.Thread, str]:
    handler = partial(StaticFileHandler, directory=str(ROOT))
    preferred_port = APP_PORT if port is None else port
    try:
        server = ThreadingHTTPServer(("127.0.0.1", preferred_port), handler)
        bound_port = preferred_port
    except OSError:
        bound_port = pick_free_port()
        server = ThreadingHTTPServer(("127.0.0.1", bound_port), handler)
    thread = threading.Thread(target=server.serve_forever, name="hohlen-http", daemon=True)
    thread.start()
    return server, thread, f"http://127.0.0.1:{bound_port}/index.html"


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
        server, _, url = start_static_server(port=pick_free_port())
        wait_for_server(url)
        base_url = url.rsplit("/", 1)[0]
        for path in ("index.html", "style.css", "script.js"):
            with urllib.request.urlopen(f"{base_url}/{path}", timeout=5) as response:
                if response.status != 200:
                    raise RuntimeError(f"Falha ao carregar {path}: HTTP {response.status}")
        for key in SAVE_FILES:
            with urllib.request.urlopen(f"{base_url}/api/storage/{urllib.parse.quote(key)}", timeout=5) as response:
                if response.status != 200:
                    raise RuntimeError(f"Falha ao validar rota de save {key}: HTTP {response.status}")
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
