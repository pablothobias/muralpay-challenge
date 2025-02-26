#!/usr/bin/env node

/**
 * Script to clean various cache directories to resolve build issues
 */

import { rm } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');

const cacheDirs = ['.next', 'node_modules/.cache', '.eslintcache'];

async function cleanCache() {
  console.log('Cleaning cache directories...');

  for (const dir of cacheDirs) {
    const fullPath = join(rootDir, dir);
    try {
      await rm(fullPath, { recursive: true, force: true });
      console.log(`✓ Removed ${dir}`);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`✗ Failed to remove ${dir}:`, error.message);
      } else {
        console.log(`○ Directory ${dir} does not exist, skipping`);
      }
    }
  }

  console.log('Cache cleaning completed!');
}

cleanCache().catch((error) => {
  console.error('Error cleaning cache:', error);
  process.exit(1);
});
