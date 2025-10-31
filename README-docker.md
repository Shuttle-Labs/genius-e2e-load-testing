⚙️ 1. Build the Docker image
docker build -t my-e2e-playwright:latest .

🚀 2. Running tests
✅ Option A — Mock mode (fast & simple)

Runs with the mock Phantom extension and no real Solana RPC.

macOS / Linux
docker run --rm -it --shm-size=1g \
  -e PHANTOM_MODE=mock \
  -v "${PWD}:/work" -w /work \
  my-e2e-playwright:latest \
  bash -lc "npm ci && npm run setup:all && npx playwright test"

Windows PowerShell
docker run --rm -it --shm-size=1g `
  -e PHANTOM_MODE=mock `
  -v ${pwd}:/work -w /work `
  my-e2e-playwright:latest `
  bash -lc "npm ci && npm run setup:all && npx playwright test"


📄 Test report will appear in playwright-report/.
Open it with:

npx playwright show-report

🔗 Option B — Real mode with Devnet

Runs with a real Phantom Wallet connected to Solana Devnet.

docker run --rm -it --shm-size=1g \
  -e PHANTOM_MODE=real \
  -e SOLANA_RPC=https://api.devnet.solana.com \
  -e SOLANA_AIRDROP=1 \
  -v "${PWD}:/work" -w /work \
  my-e2e-playwright:latest \
  bash -lc "npm ci && npm run setup:phantom && npm run generate:wallets && npx playwright test"


⚠️ Devnet airdrops can be throttled; if wallets aren’t funded on the first run, just retry once or twice.

🧩 Option C — Real mode with local validator (docker-compose)

Docker Compose will start:

validator → a local solana-test-validator

e2e → the Playwright test container

Run everything:
docker compose up --build --abort-on-container-exit --exit-code-from e2e

Clean up:
docker compose down

⚙️ 3. Environment variables
Variable	Description
PHANTOM_MODE	mock or real – determines which Phantom extension is used
SOLANA_RPC	Solana RPC endpoint (e.g. http://validator:8899 or https://api.devnet.solana.com)
SOLANA_AIRDROP	1 = enable auto-airdrop for wallets during global setup
BASE_URL	Target app URL (defaults to config in playwright.config.ts)
CLEAN_WALLETS	1 = delete generated wallets/ folder after tests
CLEAN_EXTENSIONS	1 = delete extensions/phantom folder after tests

Example .env file:

BASE_URL=https://example-staging.com
PHANTOM_MODE=mock

🧹 4. Cleaning up after runs

To remove all test artifacts and temporary data:

CLEAN_WALLETS=1 CLEAN_EXTENSIONS=1 npx playwright test --list


The global-teardown.ts script will handle this automatically when those variables are set.

📊 5. Reports

HTML report: playwright-report/

npx playwright show-report


Logs: available under test-results/ and in Docker output.

Quick Start
# 1. Build Docker image
docker build -t my-e2e-playwright:latest .

# 2. Run mock tests
docker run --rm -it --shm-size=1g -e PHANTOM_MODE=mock -v "${PWD}:/work" -w /work my-e2e-playwright:latest bash -lc "npm ci && npm run setup:all && npx playwright test"

# 3. (optional) Run full real-mode tests with a local validator
docker compose up --build --abort-on-container-exit --exit-code-from e2e


💡 Tip:
The package.json already includes handy shortcuts:

npm run docker:test:mock
npm run docker:test:real:local
npm run docker:test:real:devnet
