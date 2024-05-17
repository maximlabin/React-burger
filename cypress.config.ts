import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    "viewportWidth": 1280,
    setupNodeEvents(on, config) {
      // Set up base URL for your application
      config.baseUrl = 'http://localhost:3000';
      return config;
    },
  },
});