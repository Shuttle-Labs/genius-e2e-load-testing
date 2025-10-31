import { CleanupService } from "../../services/cleanup.service";

export default async function globalTeardown(): Promise<void> {
  const cleanupService = new CleanupService();
  await cleanupService.cleanup();
}
