import { mockInnloggetAnsatt } from '../../src/mock/data/ansatt';
import { logViolations } from '../log-utils'

function sjekkUU() {
	cy.injectAxe()
	// Vi får SVGer fra @navikt/ds-icons som mangler "title", dette er ikke et problem siden ikonene ikke trenger er viktige for innholdet
	cy.checkA11y(null, { rules: { 'svg-img-alt': { enabled: false } } }, logViolations)
}

function gaTilTiltakGjennomforingOversikt() {
	cy.visit('/')
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

function navigerTilBrukerDetaljer() {
	cy.get('[data-testid=gjennomforing-detaljer-page]').within(() => {
		cy.get('td > a')
			.first()
			.click()
	})

	cy.get('[data-testid=bruker-detaljer-page]')
}


function initialize() {
	cy.intercept('/tiltaksarrangor/deltakeroversikt/amt-tiltak/api/arrangor/ansatt/meg', mockInnloggetAnsatt).as('getInnloggetAnsatt')
}

describe('Cypress+Axe accessibility tests', () => {
	it('"Tiltaksgjennomføring oversikt" skal oppfylle UU-krav', () => {
		initialize()
		gaTilTiltakGjennomforingOversikt()

		sjekkUU()
	})

	it('Tiltaksgjennomføring detaljer skal oppfylle UU-krav', () => {
		gaTilTiltakGjennomforingOversikt()
		navigerTilTiltakGjennomforingDetaljer()

		sjekkUU()
	})

	it('Bruker detaljer skal oppfylle UU-krav', () => {
		gaTilTiltakGjennomforingOversikt()
		navigerTilTiltakGjennomforingDetaljer()
		navigerTilBrukerDetaljer()

		sjekkUU()
	})
})
