import http from "k6/http";
import { check } from "k6";
import { CONFIG } from "../config/test-config";
import { tPage, stepOk } from "../metrics/custom-metrics";

export function makeHeaders(contentType: boolean = true): Record<string, string> {
  const headers: Record<string, string> = {};

  if (contentType) headers["Content-Type"] = "application/json";
  headers["Accept"] = "application/json, text/plain, */*";

  if (CONFIG.auth.token && CONFIG.auth.headerName) {
    headers[CONFIG.auth.headerName] = CONFIG.auth.token;
  }

  return headers;
}

function respUrl(r: http.Response): string {
  return (r as any).request && (r as any).request.url ? (r as any).request.url : "<unknown-url>";
}

export function makeRequest(
  method: "GET" | "POST",
  path: string,
  data?: any,
  tag: string = "request"
): http.Response {
  const t0 = Date.now();
  const params = {
    headers: makeHeaders(data !== undefined),
    tags: { step: tag },
  };

  let response: http.Response;
  const url = `${CONFIG.baseUrl}${path}`;

  switch (method) {
    case "GET":
      response = http.get(url, params);
      break;
    case "POST":
      response = http.post(url, JSON.stringify(data), params);
      break;
    default:
      throw new Error(`Unsupported method: ${method}`);
  }

  tPage.add(Date.now() - t0);
  return response;
}

export function validateResponse(
  response: http.Response,
  expectedStatus: number = 200,
  stepName: string = ""
): boolean {
  const success = check(response, {
    [`${stepName} ${expectedStatus}`]: (r) => r.status === expectedStatus,
  });

  if (!success && __VU === 1 && __ITER < 2) {
    console.log(`${stepName} status=`, response.status);
    console.log("url=", respUrl(response));
    console.log("body sample=", (response.body || "").slice(0, 200));
  }

  if (success) {
    stepOk.add(1);
  }

  return success;
}

export function goto(path: string, tag: string): http.Response {
  const t0 = Date.now();
  const response = http.get(`${CONFIG.baseUrl}${path}`, {
    headers: { Accept: "text/html,application/xhtml+xml" },
    tags: { step: tag },
  });

  tPage.add(Date.now() - t0);
  const ok = validateResponse(response, 200, tag);

  if (!ok && __VU === 1 && __ITER < 2) {
    console.log(`${tag} status=`, response.status, "url=", response.url);
  }

  return response;
}
