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

function gaTilTiltakinstansOversikt() {
    cy.visit('/')
    cy.get('[data-testid=tiltaksinstans-oversikt-page]')
}

function navigerTilTiltakinstansdetaljer() {
    cy.get('[data-testid=tiltaksinstans-oversikt-page]').within(() => {
        cy.get('a')
            .should('have.class', 'lenkepanel')
            .first()
            .click()
    })

    cy.get('[data-testid=tiltaksinstans-detaljer-page]')
}

function navigerTilBrukerDetaljer() {
    cy.get('[data-testid=tiltaksinstans-detaljer-page]').within(() => {
        cy.get('td > a')
            .first()
            .click()
    })

    cy.get('[data-testid=bruker-detaljer-page]')
}

describe('Cypress+Axe accessibility tests', () => {
    it('"Tiltakinstans oversikt" skal oppfylle UU-krav', () => {
        gaTilTiltakinstansOversikt()

        sjekkUU()
    })

    it('Tiltaksinstans detaljer skal oppfylle UU-krav', () => {
        gaTilTiltakinstansOversikt()
        navigerTilTiltakinstansdetaljer()

        sjekkUU()
    })

    it('Bruker detaljer skal oppfylle UU-krav', () => {
        gaTilTiltakinstansOversikt()
        navigerTilTiltakinstansdetaljer()
        navigerTilBrukerDetaljer()

         sjekkUU()
    })
})