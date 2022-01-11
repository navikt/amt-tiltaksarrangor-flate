const table = require('table').table;

const tableConfig = {
    columns: {
        0: {
            width: 90
        }
    }
};

function toViolationTableStr(violations) {
    const violationData = violations.map(violation => {
            const { id, impact, description, nodes, help, helpUrl  } = violation;

            const targetsStr = `${nodes.map(n => `\n    Location: ${n.target}\n    Source: ${n.html}`).join('\n    ==========\n')}`;

            let descriptionStr = '';
            descriptionStr += `Id: ${id}\n\n`;
            descriptionStr += `Impact: ${impact}\n\n`;
            descriptionStr += `Description: ${description}\n\n`;
            descriptionStr += `Targets: ${targetsStr}\n\n`;
            descriptionStr += `Help: ${help}\n`;
            descriptionStr += `${helpUrl}`;

            return [descriptionStr];
        }
    )

    const violationsWithHeader = [
        ['ACCESSIBILITY VIOLATIONS'],
        ...violationData
    ]

    return table(violationsWithHeader, tableConfig);
}

function logViolations(violations) {
    cy.task('log', `\n${toViolationTableStr(violations)}\n`)
}

function sjekkUU() {
    cy.injectAxe()
    cy.checkA11y(null, null, logViolations)
}

function gaTilTiltakGjennomforingOversikt() {
    cy.visit('/')
    cy.get('[data-testid=gjennomforing-oversikt-page]')
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

describe('Cypress+Axe accessibility tests', () => {
    it('"Tiltaksgjennomføring oversikt" skal oppfylle UU-krav', () => {
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