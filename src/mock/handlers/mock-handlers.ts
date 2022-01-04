import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import { mockGjennomforinger,mockTiltakDeltagere } from '../data'
import { mockInnloggetAnsatt } from '../data/ansatt'
import { tilGjennomforingDTO } from '../dto-mapper'

export const mockHandlers: RequestHandler[] = [
	rest.get('/amt-tiltak/api/arrangor/ansatt/meg', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockInnloggetAnsatt))
	}),
	rest.get('/amt-tiltak/api/gjennomforing/:gjennomforingId', (req, res, ctx) => {
		const gjennomforingId = req.params.gjennomforingId
		const gjennomforing = mockGjennomforinger.find(g => g.id === gjennomforingId)

		return res(ctx.delay(500), ctx.json(gjennomforing))
	}),
	rest.get('/amt-tiltak/api/gjennomforing/:gjennomforingId/deltakere', (req, res, ctx) => {
		const gjennomforingId = req.params.gjennomforingId
		const brukere = mockTiltakDeltagere.filter(deltager => deltager.gjennomforing.id === gjennomforingId)

		return res(ctx.delay(500), ctx.json(brukere))
	}),
	rest.get('/amt-tiltak/api/tiltak-deltaker/:brukerId', (req, res, ctx) => {
		const brukerId = req.params['brukerId']
		const bruker = mockTiltakDeltagere.find((b) => b.id === brukerId)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
		const gjennomforing = mockGjennomforinger.find(g => g.id === bruker.gjennomforing.id)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
		const deltakerMedGjennomforing = { ...bruker, gjennomforing: tilGjennomforingDTO(gjennomforing) }

		return res(ctx.delay(500), ctx.json(deltakerMedGjennomforing))
	}),
	rest.get('/amt-tiltak/api/gjennomforing', (req, res, ctx) => {
		const virksomhetId = req.url.searchParams.get('arrangorId')
		const gjennomforinger = mockGjennomforinger.filter(gjennomforing => gjennomforing.virksomhetId === virksomhetId)

		return res(ctx.delay(500), ctx.json(gjennomforinger.map(tilGjennomforingDTO)))
	}),
]