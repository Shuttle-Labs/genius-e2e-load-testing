import { test as base, expect } from "@playwright/test";
import { Header } from "../components/Header";

type Fixtures = {
  header: Header;
};

export const test = base.extend<Fixtures>({
  header: async ({ page }, use) => {
    await use(new Header(page));
  },
});

export { expect };
