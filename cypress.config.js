const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'cypress-project',
  watchForFileChanges: false,
  defaultCommandTimeout: 8000,
  pageLoadTimeout: 30000,
  requestTimeout: 10000,
  responseTimeout: 15000,
  screenshotOnRunFailure: true,
  video: true,

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportFilename: 'index',
    overwrite: true,
    html: true,
    json: false,
    timestamp: false,
    inlineAssets: true,
    embeddedScreenshots: true,
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    },

    expose: {
      environment: 'staging', // Public configuration value
    },
    baseUrl: 'https://www.saucedemo.com/',
    env: {
      API_URL: 'https://restful-booker.herokuapp.com',
    },

    allowCypressEnv: false,

    specPattern: [
      'cypress/e2e/ui/**/*.cy.js',
      'cypress/e2e/api/**/*.cy.js',
    ],
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',

    viewportWidth: 1280,
    viewportHeight: 720,
  },
})