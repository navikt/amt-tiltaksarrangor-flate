// eslint-disable-next-line @typescript-eslint/no-var-requires
const table = require('table').table

function toViolationTableStr(violations) {
	const tableConfig = {
		columns: {
			0: {
				width: 90
			}
		}
	}
	const violationData = violations.map(violation => {
		const { id, impact, description, nodes, help, helpUrl } = violation

		const targetsStr = `${nodes.map(n => `\n    Location: ${n.target}\n    Source: ${n.html}`).join('\n    ==========\n')}`

		let descriptionStr = ''
		descriptionStr += `Id: ${id}\n\n`
		descriptionStr += `Impact: ${impact}\n\n`
		descriptionStr += `Description: ${description}\n\n`
		descriptionStr += `Targets: ${targetsStr}\n\n`
		descriptionStr += `Help: ${help}\n`
		descriptionStr += `${helpUrl}`

		return [ descriptionStr ]
	})

	const violationsWithHeader = [
		[ 'ACCESSIBILITY VIOLATIONS' ],
		...violationData
	]

	return table(violationsWithHeader, tableConfig)
}


export function logViolations(violations) {
	cy.task('log', `\n${toViolationTableStr(violations)}\n`)
}