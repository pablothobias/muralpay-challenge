import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.ORIGIN_URL,
  },
});
