import dayjs from 'dayjs'
import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import { appUrl } from '../../utils/url-utils'
import {
	mockEndringsmeldinger,
	mockGjennomforinger,
	mockTilgjengeligGjennomforinger,
	mockTiltakDeltagere
} from '../data'
import { mockInnloggetAnsatt } from '../data/ansatt'
import { randomUuid } from '../utils/faker'

export const mockHandlers: RequestHandler[] = [
	rest.get(appUrl('/amt-tiltak/api/arrangor/ansatt/meg'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockInnloggetAnsatt))
	}),
	rest.get(appUrl('/amt-tiltak/api/gjennomforing/tilgjengelig'), (_req, res, ctx) => {
		const gjennomforinger = [ mockGjennomforinger[0], ...mockTilgjengeligGjennomforinger ]
		return res(ctx.delay(500), ctx.json(gjennomforinger))
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
	rest.get(appUrl('/amt-tiltak/api/tiltak-deltaker/:deltakerId'), (req, res, ctx) => {
		const deltakerId = req.params['deltakerId']
		const deltaker = mockTiltakDeltagere.find((d) => d.id === deltakerId)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
		const gjennomforing = mockGjennomforinger.find(g => g.id === deltaker.gjennomforing.id)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
		const deltakerMedGjennomforing = { ...deltaker, gjennomforing: gjennomforing }

		return res(ctx.delay(500), ctx.json(deltakerMedGjennomforing))
	}),
	rest.get(appUrl('/amt-tiltak/api/gjennomforing'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockGjennomforinger))
	}),
	rest.post(appUrl('/amt-tiltak/api/gjennomforing/:gjennomforingId/deltakeroversikt'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.get(appUrl('/amt-tiltak/api/tiltaksarrangor/endringsmelding'), (req, res, ctx) => {
		const deltakerId = req.url.searchParams.get('deltakerId') as string

		const meldinger = mockEndringsmeldinger[deltakerId] || []

		return res(ctx.delay(500), ctx.json(meldinger))
	}),
	rest.post(appUrl('/amt-tiltak/api/tiltaksarrangor/endringsmelding/deltaker/:deltakerId/startdato'), (req, res, ctx) => {
		const deltakerId = req.params.deltakerId as string

		const startDatoStr = req.url.searchParams.get('startDato') as string

		const startDato = dayjs(startDatoStr, 'YYYY-MM-DD').toDate()

		mockEndringsmeldinger[deltakerId] = [
			...(mockEndringsmeldinger[deltakerId] || []).map(e => ({ ...e, aktiv: false })),
			{ id: randomUuid(), startDato: startDato, aktiv: true }
		]

		return res(ctx.delay(500), ctx.status(200))
	})
]
