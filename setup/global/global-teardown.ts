import { FullConfig } from '@playwright/test';
import { CleanupService } from '../../services/cleanup.service';

export default async function globalTeardown(config: FullConfig) {
  const cleanup = new CleanupService();
  await cleanup.cleanup();
}
