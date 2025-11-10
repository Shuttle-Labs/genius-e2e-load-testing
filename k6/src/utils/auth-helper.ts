import http from "k6/http";
import { CONFIG } from "../config/test-config";

export function setupAuth(): void {
  if (CONFIG.auth.token && CONFIG.auth.cookieName && !CONFIG.auth.headerName) {
    const jar = http.cookieJar();
    jar.set(CONFIG.baseUrl, CONFIG.auth.cookieName, CONFIG.auth.token);
  }
}
