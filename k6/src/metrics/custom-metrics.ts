import { Trend, Rate } from "k6/metrics";

export const tPage = new Trend("page_load_ms");
export const stepOk = new Rate("step_ok");
export const stepDuration = new Trend("step_duration", true);

export function timeStep<T>(name: string, fn: () => T): T {
  const t0 = Date.now();
  try {
    return fn();
  } finally {
    stepDuration.add(Date.now() - t0, { step: name });
  }
}
