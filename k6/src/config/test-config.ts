import { TestConfig, BuyConfig } from "../types/config.js";

export const CONFIG: TestConfig = {
  baseUrl: __ENV.BASE_URL as string,
  chainId: (__ENV.CHAIN_ID as string) || "1",
  minMarketCap: (__ENV.MIN_MC as string) || "100000",
  auth: {
    token: __ENV.AUTH_TOKEN || "",
    cookieName: __ENV.AUTH_COOKIE_NAME || "auth_token",
    headerName: __ENV.AUTH_HEADER_NAME || "",
  },
};

export const BUY_CONFIG: BuyConfig = {
  sol: "0.01",
  eth: "0.001",
  bnb: "0.003",
  avax: "0.1",
  hyper: "0.1",
};

export const options = {
  scenarios: {
    poc: {
      executor: "ramping-vus" as const,
      startVUs: 0,
      stages: [
        { duration: "30s", target: 10 },
        { duration: "1m", target: 30 },
        { duration: "30s", target: 0 },
      ],
      gracefulRampDown: "20s",
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.02"],
    http_req_duration: ["p(95)<2000"],
  },
};
