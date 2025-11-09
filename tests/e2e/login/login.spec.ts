import { expect, test } from "../../fixtures/test.ts";

test.describe("Login page functionality", () => {
  test("Start trading page loads", async ({ page, header }) => {
    await page.goto("");
    await header.expectLogoVisible();
    await expect(page).toHaveTitle(/Genius Pro/i);
  });
});
