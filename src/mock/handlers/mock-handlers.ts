import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import { TilgangInvitasjonInfo } from '../../api/data/deltaker'
import { appUrl } from '../../utils/url-utils'
import { mockGjennomforinger, mockTiltakDeltagere } from '../data'
import { mockInnloggetAnsatt } from '../data/ansatt'

export const mockHandlers: RequestHandler[] = [
	rest.get(appUrl('/amt-tiltak/api/arrangor/ansatt/meg'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockInnloggetAnsatt))
	}),
	rest.get(appUrl('/amt-tiltak/api/gjennomforing/:gjennomforingId'), (req, res, ctx) => {
		const gjennomforingId = req.params.gjennomforingId
		const gjennomforing = mockGjennomforinger.find(g => g.id === gjennomforingId)

		return res(ctx.delay(500), ctx.json(gjennomforing))
	}),
	rest.get(appUrl('/amt-tiltak/api/gjennomforing/:gjennomforingId/deltakere'), (req, res, ctx) => {
		const gjennomforingId = req.params.gjennomforingId
		const brukere = mockTiltakDeltagere.filter(deltaker => deltaker.gjennomforing.id === gjennomforingId)

		return res(ctx.delay(500), ctx.json(brukere))
	}),
	rest.get(appUrl('/amt-tiltak/api/tiltak-deltaker/:brukerId'), (req, res, ctx) => {
		const brukerId = req.params['brukerId']
		const bruker = mockTiltakDeltagere.find((b) => b.id === brukerId)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
		const gjennomforing = mockGjennomforinger.find(g => g.id === bruker.gjennomforing.id)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
		const deltakerMedGjennomforing = { ...bruker, gjennomforing: gjennomforing }

		return res(ctx.delay(500), ctx.json(deltakerMedGjennomforing))
	}),
	rest.get(appUrl('/amt-tiltak/api/gjennomforing'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockGjennomforinger))
	}),
	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/tilgang/invitasjon/:invitasjonId/info'), (req, res, ctx) => {
		const info: TilgangInvitasjonInfo = {
			gjennomforingNavn: 'Oppfølging tjenesteområde 2 og 3',
			overordnetEnhetNavn: 'Muligheter AS',
			erBrukt: false
		}

		return res(ctx.delay(500), ctx.json(info))
	}),
	rest.patch(appUrl('/amt-tiltak/api/nav-ansatt/tilgang/invitasjon/:invitasjonId/aksepter'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
]
