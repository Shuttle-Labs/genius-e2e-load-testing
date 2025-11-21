import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import 'dotenv/config';

const projectRoot = resolve(process.cwd());
const playwrightDir = resolve(projectRoot, 'playwright');

console.log('📌 Running Synpress cache builder in:', playwrightDir);

const child = spawn(
  'npx',
  [
    'synpress',
    'test/wallet-setup',
  ],
  {
    cwd: playwrightDir,
    env: process.env,
    stdio: 'inherit'
  }
);

child.on('exit', (code) => {
  console.log(`Synpress cache builder exited with code ${code}`);
  process.exit(code ?? 1);
});
