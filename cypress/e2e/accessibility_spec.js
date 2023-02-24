import { logViolations } from '../log-utils'

function visit(path) {
	cy.intercept('GET', 'https://dekoratoren.ekstern.dev.nav.no/**/*', {statusCode: 0})
	return cy.visit(path)
}

function sjekkUU() {
	cy.injectAxe()
	// Vi får SVGer fra @navikt/ds-icons som mangler "title", dette er ikke et problem siden ikonene ikke trenger er viktige for innholdet
	cy.checkA11y(null, { 
		rules: { 'svg-img-alt': { enabled: false } } 
	}, logViolations)
}

function gaTilTiltakGjennomforingOversikt() {
	visit('/')
	cy.screenshot()
	cy.get('[data-testid=gjennomforing-oversikt-page]', { timeout: 30_000 })
	cy.screenshot()

}

function navigerTilTiltakGjennomforingDetaljer() {
	cy.get('[data-testid=gjennomforing-oversikt-page]').within(() => {
		cy.get('a')
			.should('have.class', 'navds-link-panel')
			.first()
			.click()
	})

	cy.get('[data-testid=gjennomforing-detaljer-page]')
}

function navigerTilDeltakerDetaljer() {
	cy.get('[data-testid=gjennomforing-detaljer-page]').within(() => {
		cy.get('tbody').within(() => {
			cy.get('a')
				.first()
				.click()
		})
	})

	cy.get('[data-testid=bruker-detaljer-page]')
}

describe('Cypress+Axe accessibility tests', () => {
	it('"Tiltaksgjennomføring oversikt" skal oppfylle UU-krav', () => {
		gaTilTiltakGjennomforingOversikt()

		sjekkUU()
	})

	it('Deltaker liste skal oppfylle UU-krav', () => {
		gaTilTiltakGjennomforingOversikt()
		navigerTilTiltakGjennomforingDetaljer()

		sjekkUU()
	})

	it('Deltaker detaljer skal oppfylle UU-krav', () => {
		gaTilTiltakGjennomforingOversikt()
		navigerTilTiltakGjennomforingDetaljer()
		navigerTilDeltakerDetaljer()

		sjekkUU()
	})

	it('Informasjon side skal oppfylle UU-krav', () => {
		visit('/informasjon')
		cy.get('[data-testid=informasjon-page]')

		sjekkUU()
	})

	it('Legg til liste side skal oppfylle UU-krav', () => {
		visit('/legg-til-deltakerliste')
		cy.get('[data-testid=legg-til-liste-page]')

		sjekkUU()
	})
	it('Personopplysning side skal oppfylle UU-krav', () => {
		visit('/personopplysninger')
		cy.get('[data-testid=personopplysning-page]')
		sjekkUU()
	})
})

