import dayjs from 'dayjs'
import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import { TiltakDeltaker, TiltakDeltakerDetaljer } from '../../api/data/deltaker'
import { DeltakerStatusAarsakType, EndringsmeldingType } from '../../api/data/endringsmelding'
import { VIS_DRIFTSMELDING_TOGGLE_NAVN } from '../../api/data/feature-toggle'
import { Veileder } from '../../api/data/veileder'
import { appUrl } from '../../utils/url-utils'
import {
	mockDeltakerlisteVeileder,
	mockDeltakeroversikt,
	mockGjennomforinger,
	mockKoordinatorer,
	mockTilgjengeligGjennomforinger,
	mockTiltakDeltakere
} from '../data'
import { mockMineRoller } from '../data/ansatt'
import { mockAuthInfo } from '../data/auth'
import { MockTiltakDeltaker } from '../data/brukere'
import { mockTilgjengeligeVeiledere } from '../data/veileder'
import { randomUuid } from '../utils/faker'

export const mockHandlers: RequestHandler[] = [
	rest.get(appUrl('/auth/info'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockAuthInfo))
	}),
	rest.get(appUrl('/amt-tiltak/api/tiltaksarrangor/ansatt/meg/roller'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockMineRoller))
	}),
	rest.get(appUrl('/amt-tiltak/api/tiltaksarrangor/gjennomforing/tilgjengelig'), (_req, res, ctx) => {
		const gjennomforinger = [ mockGjennomforinger[0], ...mockTilgjengeligGjennomforinger ]
		return res(ctx.delay(500), ctx.json(gjennomforinger))
	}),
	rest.get(appUrl('/amt-tiltak/api/tiltaksarrangor/gjennomforing/:gjennomforingId'), (req, res, ctx) => {
		const gjennomforingId = req.params.gjennomforingId
		const gjennomforing = mockGjennomforinger.find(g => g.id === gjennomforingId)
		if (gjennomforing === undefined) {
			return res(
				ctx.delay(500),
				ctx.status(404),
			)
		}

		return res(ctx.delay(500), ctx.json(gjennomforing))
	}),
	rest.get(appUrl('/amt-tiltak/api/tiltaksarrangor/deltaker'), (req, res, ctx) => {
		const gjennomforingId = req.url.searchParams.get('gjennomforingId') as string
		const data: TiltakDeltaker[] = mockTiltakDeltakere
			.filter(deltaker => deltaker.gjennomforing.id === gjennomforingId)
			.map(deltaker => mapToDeltakerListView(deltaker))

		return res(ctx.delay(500), ctx.json(data))
	}),
	rest.get(appUrl('/amt-tiltak/api/tiltaksarrangor/gjennomforing/:gjennomforingId/koordinatorer'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockKoordinatorer))
	}),
	rest.get(appUrl('/amt-tiltak/api/tiltaksarrangor/deltaker/:deltakerId'), (req, res, ctx) => {
		const deltakerId = req.params['deltakerId']
		const deltaker = mockTiltakDeltakere.find((d) => d.id === deltakerId)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
		const deltakerMedGjennomforing = mapToDeltakerDetaljerView(deltaker)

		return res(ctx.delay(500), ctx.json(deltakerMedGjennomforing))
	}),
	rest.get(appUrl('/amt-tiltak/api/tiltaksarrangor/gjennomforing'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockGjennomforinger))
	}),
	rest.post(appUrl('/amt-tiltak/api/tiltaksarrangor/gjennomforing/:gjennomforingId/tilgang'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.delete(appUrl('/amt-tiltak/api/tiltaksarrangor/gjennomforing/:gjennomforingId/tilgang'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.get(appUrl('/amt-tiltak/api/tiltaksarrangor/deltakeroversikt'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockDeltakeroversikt))
	}),
	rest.get(appUrl('/amt-tiltak/api/tiltaksarrangor/veileder/deltakerliste'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockDeltakerlisteVeileder))
	}),
	rest.get(appUrl('/amt-tiltak/api/tiltaksarrangor/endringsmelding'), (req, res, ctx) => {
		const deltakerId = req.url.searchParams.get('deltakerId') as string

		const meldinger = mockTiltakDeltakere.find(d => d.id == deltakerId)?.aktiveEndringsmeldinger ?? []

		return res(ctx.delay(500), ctx.json(meldinger))
	}),
	rest.patch(appUrl('/amt-tiltak/api/tiltaksarrangor/endringsmelding/:endringsmeldingId/tilbakekall'), (req, res, ctx) => {
		const endringsmeldingId = req.params.endringsmeldingId as string

		const deltaker = mockTiltakDeltakere.find(d => {
			return d.aktiveEndringsmeldinger.find(e => e.id == endringsmeldingId) != null
		})

		if (deltaker) {
			deltaker.aktiveEndringsmeldinger = deltaker.aktiveEndringsmeldinger.filter(e => e.id != endringsmeldingId)
		}

		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.post(appUrl('/amt-tiltak/api/tiltaksarrangor/deltaker/:deltakerId/oppstartsdato'), (req, res, ctx) => {
		const deltakerId = req.params.deltakerId as string
		const body = req.body as { oppstartsdato: string }

		const deltaker = mockTiltakDeltakere.find(d => d.id == deltakerId)

		if (deltaker) {
			deltaker.aktiveEndringsmeldinger.push({
				id: randomUuid(),
				type: EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO,
				innhold: { oppstartsdato: dayjs(body.oppstartsdato).toDate() }
			})
		}

		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.patch(appUrl('/amt-tiltak/api/tiltaksarrangor/deltaker/:deltakerId/oppstartsdato'), (req, res, ctx) => {
		const deltakerId = req.params.deltakerId as string
		const body = req.body as { oppstartsdato: string }

		const deltaker = mockTiltakDeltakere.find(d => d.id == deltakerId)

		if (deltaker) {
			deltaker.aktiveEndringsmeldinger.push({
				id: randomUuid(),
				type: EndringsmeldingType.ENDRE_OPPSTARTSDATO,
				innhold: { oppstartsdato: dayjs(body.oppstartsdato).toDate() }
			})
		}

		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.patch(appUrl('/amt-tiltak/api/tiltaksarrangor/deltaker/:deltakerId/forleng-deltakelse'), (req, res, ctx) => {
		const deltakerId = req.params.deltakerId as string
		const body = req.body as { sluttdato: string }

		const deltaker = mockTiltakDeltakere.find(d => d.id == deltakerId)

		if (deltaker) {
			deltaker.aktiveEndringsmeldinger.push({
				id: randomUuid(),
				type: EndringsmeldingType.FORLENG_DELTAKELSE,
				innhold: { sluttdato: dayjs(body.sluttdato).toDate() }
			})
		}

		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.patch(appUrl('/amt-tiltak/api/tiltaksarrangor/deltaker/:deltakerId/avslutt-deltakelse'), (req, res, ctx) => {
		const deltakerId = req.params.deltakerId as string
		const body = req.body as { sluttdato: string, aarsak: { type: DeltakerStatusAarsakType, beskrivelse: string | null } }

		const deltaker = mockTiltakDeltakere.find(d => d.id == deltakerId)

		if (deltaker) {
			deltaker.aktiveEndringsmeldinger.push({
				id: randomUuid(),
				type: EndringsmeldingType.AVSLUTT_DELTAKELSE,
				innhold: { sluttdato: dayjs(body.sluttdato).toDate(), aarsak: body.aarsak }
			})
		}

		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.patch(appUrl('/amt-tiltak/api/tiltaksarrangor/deltaker/:deltakerId/ikke-aktuell'), (req, res, ctx) => {
		const deltakerId = req.params.deltakerId as string
		const body = req.body as { aarsak: { type: DeltakerStatusAarsakType, beskrivelse: string | null } }

		const deltaker = mockTiltakDeltakere.find(d => d.id == deltakerId)

		if (deltaker) {
			deltaker.aktiveEndringsmeldinger.push({
				id: randomUuid(),
				type: EndringsmeldingType.DELTAKER_IKKE_AKTUELL,
				innhold: { aarsak: body.aarsak }
			})
		}

		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.patch(appUrl('/amt-tiltak/api/tiltaksarrangor/deltaker/:deltakerId/deltakelse-prosent'), (req, res, ctx) => {
		const deltakerId = req.params.deltakerId as string
		const body = req.body as { deltakelseProsent: number, gyldigFraDato: Date }

		const deltaker = mockTiltakDeltakere.find(d => d.id == deltakerId)

		if (deltaker) {
			deltaker.aktiveEndringsmeldinger.push({
				id: randomUuid(),
				type: EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT,
				innhold: body
			})
		}

		return res(ctx.delay(500), ctx.status(200))

	}),
	rest.patch(appUrl('/amt-tiltak/api/tiltaksarrangor/deltaker/:deltakerId/skjul'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.get(appUrl('/amt-tiltak/api/tiltaksarrangor/endringsmelding/aktiv?deltakerId=:deltakerId'), (req, res, ctx) => {
		const deltakerId = req.url.searchParams.get('deltakerId') as string
		const endringsmeldinger = mockTiltakDeltakere.find(d => d.id == deltakerId)?.aktiveEndringsmeldinger ?? []

		return res(ctx.delay(500), ctx.json(endringsmeldinger))
	}),
	rest.get(appUrl('/amt-tiltak/api/tiltaksarrangor/veiledere/tilgjengelig?gjennomforingId=:gjennomforingId'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockTilgjengeligeVeiledere))
	}),
	rest.get(appUrl('/amt-tiltak/api/tiltaksarrangor/veiledere?deltakerId=:deltakerId'), (req, res, ctx) => {
		const deltakerId = req.url.searchParams.get('deltakerId') as string
		const veiledere = mockTiltakDeltakere.find(d => d.id === deltakerId)?.aktiveVeiledere
		return res(ctx.delay(500), ctx.json(veiledere))
	}),
	rest.patch(appUrl('/amt-tiltak/api/tiltaksarrangor/veiledere?deltakerId=:deltakerId'), (req, res, ctx) => {
		const deltakerId = req.url.searchParams.get('deltakerId') as string
		const body = req.body as { veiledere: Veileder[] }

		const deltaker = mockTiltakDeltakere.find(d => d.id == deltakerId)
		if (!deltaker) {
			return res(ctx.delay(500), ctx.status(404))
		}
		const nyeVeiledere: Veileder[] = body.veiledere.map(v => {
			return {
				// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
				...mockTilgjengeligeVeiledere.find(tv => tv.ansattId === v.ansattId)!,
				deltakerId: deltakerId,
				erMedveileder: v.erMedveileder,
			}
		})

		deltaker.aktiveVeiledere = nyeVeiledere

		return res(ctx.delay(500), ctx.status(200))
	}),

	rest.get(appUrl('/unleash/api/feature'), (req, res, ctx) => {
		const toggles = { [VIS_DRIFTSMELDING_TOGGLE_NAVN]: false }

		return res(ctx.delay(500), ctx.json(toggles))
	})
]

const mapToDeltakerListView = (deltaker: MockTiltakDeltaker): TiltakDeltaker => {
	return {
		id: deltaker.id,
		fornavn: deltaker.fornavn,
		mellomnavn: deltaker.mellomnavn,
		etternavn: deltaker.etternavn,
		fodselsnummer: deltaker.fodselsnummer,
		startDato: deltaker.startDato,
		sluttDato: deltaker.sluttDato,
		status: deltaker.status,
		registrertDato: deltaker.registrertDato,
		aktiveEndringsmeldinger: deltaker.aktiveEndringsmeldinger,
		aktiveVeiledere: deltaker.aktiveVeiledere,
	}
}

const mapToDeltakerDetaljerView = (deltaker: MockTiltakDeltaker): TiltakDeltakerDetaljer => {
	return {
		id: deltaker.id,
		fornavn: deltaker.fornavn,
		mellomnavn: deltaker.mellomnavn,
		etternavn: deltaker.etternavn,
		fodselsnummer: deltaker.fodselsnummer,
		startDato: deltaker.startDato,
		sluttDato: deltaker.sluttDato,
		deltakelseProsent: deltaker.deltakelseProsent,
		status: deltaker.status,
		registrertDato: deltaker.registrertDato,
		epost: deltaker.epost,
		telefonnummer: deltaker.telefonnummer,
		navEnhet: deltaker.navEnhet,
		navVeileder: deltaker.navVeileder,
		gjennomforing: deltaker.gjennomforing,
		fjernesDato: deltaker.fjernesDato,
		innsokBegrunnelse: deltaker.innsokBegrunnelse
	}
}
