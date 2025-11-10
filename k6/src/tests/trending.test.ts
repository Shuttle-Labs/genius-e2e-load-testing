import { makeRequest, validateResponse } from "../utils/request-helper";
import { CONFIG } from "../config/test-config";
import { pickAnyToken } from "../helpers";

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
