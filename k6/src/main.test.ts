import { homePageTest } from "./tests/home.test";
import { loginTest } from "./tests/auth.test";
import { launchpadsTest } from "./tests/launchpads.test";
import { trendingTokensTest } from "./tests/trending.test";
import { setupAuth } from "./utils/auth-helper";
import { TestStep } from "./types/config";
import { sleep } from "k6";
import { timeStep } from "./metrics/custom-metrics";
export { options } from "./config/test-config";

export default function (): void {
  setupAuth();

  const testFlow: TestStep[] = [
    { name: "Home Page", execute: homePageTest },
    { name: "Login", execute: loginTest },
    { name: "Launchpads", execute: launchpadsTest },
    {
      name: "Trending Tokens",
      execute: () => {
        const token = trendingTokensTest();
        if (__VU === 1 && __ITER < 2) console.log("Selected token:", token);
        return !!token;
      },
    },
  ];

  for (const step of testFlow) {
    const ok = timeStep<boolean>(step.name, () => step.execute());
    if (!ok && __VU === 1 && __ITER < 2) {
      console.log(`Test "${step.name}" failed, continuing with next steps`);
    }
  }
  sleep(1);
}
