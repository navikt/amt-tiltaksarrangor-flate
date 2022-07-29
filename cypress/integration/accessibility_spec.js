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
    // Vi får SVGer fra @navikt/ds-icons som mangler "title", dette er ikke et problem siden ikonene ikke trenger er viktige for innholdet
    cy.checkA11y(null, {rules: {'svg-img-alt': {enabled: false}} }, logViolations)
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

// TODO kommentert ut sommer 2022, må spørre hvordan dette fungerer når andre er tilbake fra ferie
// describe('Cypress+Axe accessibility tests', () => {
//     it('"Tiltaksgjennomføring oversikt" skal oppfylle UU-krav', () => {
//         gaTilTiltakGjennomforingOversikt()
//
//         sjekkUU()
//     })
//
//     it('Tiltaksgjennomføring detaljer skal oppfylle UU-krav', () => {
//         gaTilTiltakGjennomforingOversikt()
//         navigerTilTiltakGjennomforingDetaljer()
//
//         sjekkUU()
//     })
//
//     it('Bruker detaljer skal oppfylle UU-krav', () => {
//         gaTilTiltakGjennomforingOversikt()
//         navigerTilTiltakGjennomforingDetaljer()
//         navigerTilBrukerDetaljer()
//
//          sjekkUU()
//     })
// })
