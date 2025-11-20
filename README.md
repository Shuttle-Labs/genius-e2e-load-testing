# Genius E2E Testing

End-to-end testing project for TradeGenius:

- **Playwright + Synpress (MetaMask)** — UI tests with wallet authentication

- `playwright/` – UI/e2e tests

---

## 1. Prerequisites

- Node.js **>= 20**
- npm **>= 9**
- Git
- Linux/macOS/WSL2 (project is run inside WSL2 on Windows)

---

## 2. Project Structure

All tests that require wallet login use wallet.fixtures.ts.
There we:

open staging app,
connect MetaMask via Synpress,
confirm signature(s),
return an already-logged-in dapp page for tests.

Page Objects / Components live under playwright/test/pages and playwright/test/components.

## 3. Environment Variables

Create .env in the project root (next to package.json) using .env.example as a reference:

BASE_URL=staging.here

# MetaMask test wallet used by Synpress
SEED_PHRASE="your seed phrase words..."
METAMASK_PASSWORD="YourStrongPassword123"

## 4. Install Dependencies

From the repo root:

npm ci

Then install Playwright browsers (one time):

cd playwright
npx playwright install --with-deps

## 5. Build Synpress MetaMask Cache

Synpress downloads MetaMask and builds a cache for wallet setup.
Run this once (or whenever demo.setup.js / SEED_PHRASE changes):

cd playwright
npx synpress test/wallet-setup
# or, if you prefer npm script from root:
# npm run pw:syn:cache

This will:

download MetaMask extension,
run wallet-setup/demo.setup.js,
import wallet using SEED_PHRASE and METAMASK_PASSWORD,
store the result in .cache-synpress/.

## 6. Running Playwright + Synpress tests

All Playwright work happens inside playwright/ directory.

"scripts": {

  // Playwright
  "pw:install": "playwright install --with-deps",
  "pw:test": "playwright test",
  "pw:test:ui": "playwright test --ui",
  "pw:syn:cache": "synpress test/wallet-setup",

}

## 9. Troubleshooting

MetaMask cache error (Cache for XXXXX does not exist)

Run cd playwright && npx synpress test/wallet-setup again.

Make sure .cache-synpress/ is not ignored/removed between runs if you rely on it.
