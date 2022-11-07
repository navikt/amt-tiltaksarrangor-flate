import dayjs from 'dayjs'
import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import { TiltakDeltaker } from '../../api/data/deltaker'
import { EndringsmeldingType } from '../../api/data/endringsmelding'
import { appUrl } from '../../utils/url-utils'
import {
	mockEndringsmeldinger,
	mockGjennomforinger,
	mockKoordinatorer,
	mockTilgjengeligGjennomforinger,
	mockTiltakDeltagere
} from '../data'
import { mockInnloggetAnsatt } from '../data/ansatt'
import { mockAuthInfo } from '../data/auth'
import { randomUuid } from '../utils/faker'

export const mockHandlers: RequestHandler[] = [
	rest.get(appUrl('/auth/info'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockAuthInfo))
	}),
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
	rest.get(appUrl('/amt-tiltak/api/tiltak-deltaker'), (req, res, ctx) => {
		const gjennomforingId = req.url.searchParams.get('gjennomforingId') as string
		const data: TiltakDeltaker[] = mockTiltakDeltagere
			.filter(deltaker => deltaker.gjennomforing.id === gjennomforingId)

		return res(ctx.delay(500), ctx.json(data))
	}),
	rest.get(appUrl('/amt-tiltak/api/gjennomforing/:gjennomforingId/koordinatorer'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockKoordinatorer))
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
	rest.post(appUrl('/amt-tiltak/api/gjennomforing/:gjennomforingId/tilgang'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.delete(appUrl('/amt-tiltak/api/gjennomforing/:gjennomforingId/tilgang'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.get(appUrl('/amt-tiltak/api/tiltaksarrangor/endringsmelding'), (req, res, ctx) => {
		const deltakerId = req.url.searchParams.get('deltakerId') as string

		const meldinger = mockEndringsmeldinger[deltakerId] || []

		return res(ctx.delay(500), ctx.json(meldinger))
	}),
	rest.post(appUrl('/amt-tiltak/api/tiltaksarrangor/tiltak-deltaker/:deltakerId/oppstartsdato'), (req, res, ctx) => {
		const deltakerId = req.params.deltakerId as string
		const body = req.body as { oppstartsdato: string }

		mockEndringsmeldinger[deltakerId].push({
			id: randomUuid(),
			type: EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO,
			innhold: { oppstartsdato: dayjs(body.oppstartsdato).toDate() }
		})
		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.patch(appUrl('/amt-tiltak/api/tiltaksarrangor/tiltak-deltaker/:deltakerId/avslutt-deltakelse'), (req, res, ctx) => {
		const deltakerId = req.params.deltakerId as string
		const body = req.body as { sluttdato: string }

		mockEndringsmeldinger[deltakerId].push({
			id: randomUuid(),
			type: EndringsmeldingType.AVSLUTT_DELTAKELSE,
			innhold: { sluttdato: dayjs(body.sluttdato).toDate() }
		})
		return res(ctx.delay(500), ctx.status(200))
	}),
]
