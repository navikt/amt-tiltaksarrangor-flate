import { rest, setupWorker } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import { mockTiltakDeltagere, mockTiltakInstanser } from './data'
import { mockInnloggetAnsatt } from './data/ansatt'
import { tilTiltakDeltagerDetaljerDto, tilTiltakInstansDto } from './dto-mapper'

const allHandlers: RequestHandler[] = [
	rest.get('/amt-tiltak/api/tiltaksleverandor/ansatt/meg', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockInnloggetAnsatt))
	}),
	rest.get('/amt-tiltak/api/tiltak-instans/:tiltakinstansId', (req, res, ctx) => {
		const tiltakinstansId = req.params.tiltakinstansId
		const tiltakinstans = mockTiltakInstanser.find(instans => instans.id === tiltakinstansId)

		return res(ctx.delay(500), ctx.json(tiltakinstans))
	}),
	rest.get('/amt-tiltak/api/tiltak-instans/:tiltakinstansId/deltagere', (req, res, ctx) => {
		const tiltakinstansId = req.params.tiltakinstansId
		const brukere = mockTiltakDeltagere.filter(deltager => deltager.tiltakInstansId === tiltakinstansId)

		return res(ctx.delay(500), ctx.json(brukere))
	}),
	rest.get('/amt-tiltak/api/tiltak-deltager/:brukerId', (req, res, ctx) => {
		const brukerId = req.params['brukerId']
		const bruker = mockTiltakDeltagere.find((b) => b.id === brukerId)! // eslint-disable-line @typescript-eslint/no-non-null-assertion

		return res(ctx.delay(500), ctx.json(tilTiltakDeltagerDetaljerDto(bruker)))
	}),
	rest.get('/amt-tiltak/api/tiltak', (req, res, ctx) => {
		const virksomhetId = req.url.searchParams.get('tiltaksleverandorId')
		const tiltakInstanser = mockTiltakInstanser.filter(instans => instans.virksomhetId === virksomhetId)

		return res(ctx.delay(500), ctx.json(tiltakInstanser.map(tilTiltakInstansDto)))
	}),
]

setupWorker(...allHandlers)
	.start({ serviceWorker: { url: process.env.PUBLIC_URL + '/mockServiceWorker.js' } })
	.catch((e) => {
		// eslint-disable-next-line no-console
		console.error('Unable to setup mocked API endpoints', e)
	})
