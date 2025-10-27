# Playwright + TypeScript + Page Object Starter

Clean starter template with:
- Playwright Test + TS
- Page Object Model (BasePage, LoginPage example)
- Custom fixtures (typed) for page objects
- ESLint + Prettier + EditorConfig
- GitHub Actions CI workflow
- .env example & baseURL support

## Quick Start

```bash
# 1) install deps
npm ci

# 2) install browsers
npx playwright install --with-deps

# 3) run tests
npm test
npm run test:ui

# 4) open report
npm run report
```

## Environment
Create `.env` (see `.env.example`).

```env
BASE_URL=https://example.com
```

## Structure
```
tests/
  fixtures/test.ts        # typed fixtures expose page objects
  pages/BasePage.ts
  pages/LoginPage.ts
  components/Header.ts
  example.spec.ts         # sample using the fixtures
playwright.config.ts
```

## CI
Minimal workflow in `.github/workflows/ci.yml` runs Playwright on push/PR.

## Add k6 later
You already have `k6/` folder; place scripts there and wire a workflow or run locally.
