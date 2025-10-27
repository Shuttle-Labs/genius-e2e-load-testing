import { makeRequest } from "../utils/request-helper.js";
import { CONFIG } from "../config/test-config.js";
import { check } from "k6";

export function loginTest(): boolean {
  try {
    const response = makeRequest(
      "POST",
      "/api/auth/turnkey-session-update",
      { chainId: CONFIG.chainId },
      "login"
    );

    const success = check(response, {
      "login status 200": (r) => r.status === 200,
      "login returns user data": (r) => {
        try {
          const data = JSON.parse(r.body as string);
          return !!data.user || !!data.userId || !!data.walletAddress;
        } catch {
          return false;
        }
      },
      "login returns valid session": (r) => {
        try {
          const data = JSON.parse(r.body as string);
          return !!data.session || !!data.token;
        } catch {
          return false;
        }
      },
    });

    if (__VU === 1 && __ITER < 2) {
      console.log("Login response body:", response.body!.slice(0, 500));
    }

    return success;
  } catch (error) {
    if (__VU === 1 && __ITER < 2) {
      console.log("Login error:", error);
    }
    return false;
  }
}
