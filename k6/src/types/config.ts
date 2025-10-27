export interface TestConfig {
  baseUrl: string;
  chainId: string;
  minMarketCap: string;
  auth: {
    token: string;
    cookieName: string;
    headerName: string;
  };
}

export interface BuyConfig {
  [chain: string]: string;
}

export interface TestStep {
  name: string;
  execute: () => boolean;
}
