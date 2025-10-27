import { makeRequest, validateResponse } from "../utils/request-helper.js";
import { CONFIG } from "../config/test-config.js";

export function launchpadsTest(): boolean {
  const response = makeRequest(
    "GET",
    `/api/launchpads?chainId=${CONFIG.chainId}`,
    undefined,
    "launchpads"
  );
  return validateResponse(response, 200, "launchpads");
}
