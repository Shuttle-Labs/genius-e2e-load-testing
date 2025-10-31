import * as path from "path";
import { IExtensionCreator } from "../../interfaces/extension/extension-creator.interface";
import { IFileSystem } from "../../interfaces/file-system.interface";
import { PhantomConfig } from "../../config/phantom/phantom-config";

export class MockExtensionCreator implements IExtensionCreator {
  constructor(private readonly fileSystem: IFileSystem) {}

  async createMockExtension(): Promise<void> {
    this.ensurePhantomDirExists();

    const manifest = this.createManifest();
    const contentScript = this.createContentScript();

    this.fileSystem.writeFileSync(
      path.join(PhantomConfig.PHANTOM_DIR, "manifest.json"),
      JSON.stringify(manifest, null, 2)
    );

    this.fileSystem.writeFileSync(
      path.join(PhantomConfig.PHANTOM_DIR, "content.js"),
      contentScript
    );

    this.fileSystem.writeFileSync(
      path.join(PhantomConfig.PHANTOM_DIR, "inject.js"),
      "// Empty inject script for Phantom mock"
    );
  }

  private ensurePhantomDirExists(): void {
    if (!this.fileSystem.existsSync(PhantomConfig.PHANTOM_DIR)) {
      this.fileSystem.mkdirSync(PhantomConfig.PHANTOM_DIR, { recursive: true });
    }
  }

  private createManifest(): any {
    return {
      manifest_version: 3,
      name: "Phantom Mock (Testing)",
      version: "1.0.0",
      permissions: ["storage", "activeTab"],
      content_scripts: [
        {
          matches: ["<all_urls>"],
          js: ["content.js"],
          run_at: "document_start",
        },
      ],
      web_accessible_resources: [
        {
          resources: ["inject.js"],
          matches: ["<all_urls>"],
        },
      ],
    };
  }

  private createContentScript(): string {
    return `
// Phantom Mock Wallet for testing
console.log('🔐 Injecting Phantom Mock Wallet...');

class MockPhantom {
  constructor() {
    this.isPhantom = true;
    this.isConnected = false;
    this.publicKey = null;
    this.autoApprove = true;
  }

  async connect() {
    console.log('🔗 Mock Phantom: connect() called');

    const walletData = localStorage.getItem('phantom_test_wallet');
    let publicKey;

    if (walletData) {
      publicKey = JSON.parse(walletData).publicKey;
    } else {
      publicKey = 'Mock' + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
      localStorage.setItem('phantom_test_wallet', JSON.stringify({ publicKey }));
    }

    this.publicKey = { toBase58: () => publicKey };
    this.isConnected = true;

    await new Promise(resolve => setTimeout(resolve, 200));
    window.dispatchEvent(new Event('phantom:connected'));
    return { publicKey: this.publicKey };
  }

  async disconnect() {
    console.log('🔒 Mock Phantom: disconnect() called');
    this.isConnected = false;
    this.publicKey = null;
    await new Promise(resolve => setTimeout(resolve, 100));
    window.dispatchEvent(new Event('phantom:disconnected'));
  }

  async signMessage(message) {
    console.log('✍️ Mock Phantom: signMessage() called');
    const signature = new Uint8Array(64);
    crypto.getRandomValues(signature);
    return { signature, publicKey: this.publicKey };
  }

  on(event, callback) {
    console.log(\`🎯 Mock Phantom: on(\${event}) registered\`);
    if (event === 'connect' && this.isConnected) {
      setTimeout(callback, 50);
    }
  }

  off(event, callback) {
    console.log(\`🎯 Mock Phantom: off(\${event}) called\`);
  }
}

if (!window.solana) {
  window.solana = new MockPhantom();
  console.log('✅ Phantom Mock Wallet injected successfully');
}
`;
  }
}
