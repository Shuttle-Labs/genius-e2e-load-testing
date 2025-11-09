export interface PhantomApi {
  connectToDapp?: () => Promise<void>;
  connect?: () => Promise<void>;
  disconnect?: () => Promise<void>;
}
