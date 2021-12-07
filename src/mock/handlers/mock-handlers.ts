import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import { mockTiltakDeltagere, mockTiltakInstanser } from '../data'
import { mockInnloggetAnsatt } from '../data/ansatt'
import { tilTiltakInstansDto } from '../dto-mapper'

export const mockHandlers: RequestHandler[] = [
	rest.get('/amt-tiltak/api/arrangor/ansatt/meg', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockInnloggetAnsatt))
	}),
	rest.get('/amt-tiltak/api/tiltak-instans/:tiltakinstansId', (req, res, ctx) => {
		const tiltakinstansId = req.params.tiltakinstansId
		const tiltakinstans = mockTiltakInstanser.find(instans => instans.id === tiltakinstansId)

		return res(ctx.delay(500), ctx.json(tiltakinstans))
	}),
	rest.get('/amt-tiltak/api/tiltak-instans/:tiltakinstansId/deltakere', (req, res, ctx) => {
		const tiltakinstansId = req.params.tiltakinstansId
		const brukere = mockTiltakDeltagere.filter(deltager => deltager.tiltakInstans.id === tiltakinstansId)

		return res(ctx.delay(500), ctx.json(brukere))
	}),
	rest.get('/amt-tiltak/api/tiltak-deltaker/:brukerId', (req, res, ctx) => {
		const brukerId = req.params['brukerId']
		const bruker = mockTiltakDeltagere.find((b) => b.id === brukerId)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
		const tiltakInstans = mockTiltakInstanser.find(instans => instans.id === bruker.tiltakInstans.id)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
		const deltakerMedTiltakInstans = { ...bruker, tiltakInstans: tilTiltakInstansDto(tiltakInstans) }

		return res(ctx.delay(500), ctx.json(deltakerMedTiltakInstans))
	}),
	rest.get('/amt-tiltak/api/tiltak-instans', (req, res, ctx) => {
		const virksomhetId = req.url.searchParams.get('arrangorId')
		const tiltakInstanser = mockTiltakInstanser.filter(instans => instans.virksomhetId === virksomhetId)

		return res(ctx.delay(500), ctx.json(tiltakInstanser.map(tilTiltakInstansDto)))
	}),
]