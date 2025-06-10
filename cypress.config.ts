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
	e2e: {
		baseUrl: 'http://localhost:3001/deltakeroversikt',
		specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
	},
})
