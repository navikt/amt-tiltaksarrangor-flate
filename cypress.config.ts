import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'r9b3yw',
  fixturesFolder: false,
  viewportHeight: 1300,
  viewportWidth: 1800,
  requestTimeout: 20000,
  pageLoadTimeout: 20000,
  defaultCommandTimeout: 20000,
  screenshotOnRunFailure: true,
  video: true,
  videoUploadOnPasses: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3001/tiltaksarrangor/deltakeroversikt',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
