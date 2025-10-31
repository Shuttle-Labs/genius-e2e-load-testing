export interface IExtensionCreator {
  createMockExtension(): Promise<void>;
}
