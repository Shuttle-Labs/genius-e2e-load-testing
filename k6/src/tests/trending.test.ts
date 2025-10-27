import { makeRequest, validateResponse } from "../utils/request-helper.js";
import { CONFIG } from "../config/test-config.js";
import { pickAnyToken } from "../helpers.js";

export function trendingTokensTest(): string | null {
  const response = makeRequest(
    "GET",
    `/api/tokens/trending?chainId=${CONFIG.chainId}&minMC=${CONFIG.minMarketCap}`,
    undefined,
    "trending"
  );

  const success = validateResponse(response, 200, "trending");

  if (success) {
    return pickAnyToken(response);
  }

  return null;
}
