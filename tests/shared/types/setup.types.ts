export interface ISetupService {
  setup(): Promise<void>;
}

export interface ICleanupService {
  cleanup(): Promise<void>;
}

export interface IWalletFundingService {
  fundWalletsIfNeeded(): Promise<void>;
}

export interface IExtensionSetupService {
  setupExtension(): Promise<void>;
}
