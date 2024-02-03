import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    viewportWidth: 480,
    viewportHeight: 720,
    baseUrl: 'http://localhost:3654',
    setupNodeEvents(/* on, config */) {
      // implement node event listeners here
    },
  },
});
