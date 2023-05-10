import dayjs from 'dayjs'
import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import { TiltakDeltaker, Deltaker } from '../../api/data/deltaker'
import { DeltakerStatusAarsak, EndringsmeldingType } from '../../api/data/endringsmelding'
import { VIS_DRIFTSMELDING_TOGGLE_NAVN } from '../../api/data/feature-toggle'
import { Veileder, VeilederMedType, Veiledertype } from '../../api/data/veileder'
import { appUrl } from '../../utils/url-utils'
import {
	mockDeltakerlisteVeileder,
	mockMineDeltakerlister,
	mockGjennomforinger,
	mockTiltakDeltakere,
	mockKoordinatorsDeltakerliste
} from '../data'
import { mockMineRoller } from '../data/ansatt'
import { mockAuthInfo } from '../data/auth'
import { MockTiltakDeltaker } from '../data/brukere'
import { mockTilgjengeligeVeiledere } from '../data/veileder'
import { randomUuid } from '../utils/faker'
import { deltakerlisteErKurs, MockGjennomforing } from '../data/tiltak'
import { AdminDeltakerliste } from '../../api/data/tiltak'

export const mockHandlers: RequestHandler[] = [
	rest.get(appUrl('/auth/info'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockAuthInfo))
	}),
	rest.get(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/meg/roller'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockMineRoller))
	}),
	rest.get(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/admin/deltakerlister'), (_req, res, ctx) => {
		const gjennomforinger = [ mapGjennomforingTilAdminDeltakerliste(mockGjennomforinger[0], true), ...mockGjennomforinger.map(g => mapGjennomforingTilAdminDeltakerliste(g, false)) ]
		return res(ctx.delay(500), ctx.json(gjennomforinger))
	}),
	rest.get(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/deltakerliste/:deltakerlisteId'), (req, res, ctx) => {
		const deltakerlisteId = req.params.deltakerlisteId
		const gjennomforing = mockGjennomforinger.find(g => g.id === deltakerlisteId)
		if (gjennomforing === undefined) {
			return res(
				ctx.delay(500),
				ctx.status(404),
			)
		}

		return res(ctx.delay(500), ctx.json(mockKoordinatorsDeltakerliste(gjennomforing)))
	}),
	rest.get(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId'), (req, res, ctx) => {
		const deltakerId = req.params['deltakerId']
		const deltaker = mockTiltakDeltakere.find((d) => d.id === deltakerId)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
		const deltakerMedGjennomforing = mapToDeltakerDetaljerView(deltaker)

		return res(ctx.delay(500), ctx.json(deltakerMedGjennomforing))
	}),
	rest.post(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/admin/deltakerliste/:deltakerlisteId'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.delete(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/admin/deltakerliste/:deltakerlisteId'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.get(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/mine-deltakerlister'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockMineDeltakerlister))
	}),
	rest.get(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/veileder/mine-deltakere'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockDeltakerlisteVeileder))
	}),
	rest.delete(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/endringsmelding/:endringsmeldingId'), (req, res, ctx) => {
		const endringsmeldingId = req.params.endringsmeldingId as string

		const deltaker = mockTiltakDeltakere.find(d => {
			return d.aktiveEndringsmeldinger.find(e => e.id == endringsmeldingId) != null
		})

		if (deltaker) {
			deltaker.aktiveEndringsmeldinger = deltaker.aktiveEndringsmeldinger.filter(e => e.id != endringsmeldingId)
		}

		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.post(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId/endringsmelding'), (req, res, ctx) => {
		const deltakerId = req.params.deltakerId as string
		const bodyType = req.body as { innhold: { type: string } }

		const deltaker = mockTiltakDeltakere.find(d => d.id == deltakerId)

		if (deltaker) {
			if (bodyType.innhold.type === EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO) {
				const body = req.body as { innhold: { type: string, oppstartsdato: string } }
				deltaker.aktiveEndringsmeldinger.push({
					id: randomUuid(),
					type: EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO,
					innhold: { oppstartsdato: dayjs(body.innhold.oppstartsdato).toDate() }
				})
			}
			if (bodyType.innhold.type === EndringsmeldingType.ENDRE_OPPSTARTSDATO) {
				const body = req.body as { innhold: { type: string, oppstartsdato: string } }
				deltaker.aktiveEndringsmeldinger.push({
					id: randomUuid(),
					type: EndringsmeldingType.ENDRE_OPPSTARTSDATO,
					innhold: { oppstartsdato: dayjs(body.innhold.oppstartsdato).toDate() }
				})
			}
			if (bodyType.innhold.type === EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT) {
				const body = req.body as { innhold: { type: string, deltakelseProsent: number, gyldigFraDato: string } }
				deltaker.aktiveEndringsmeldinger.push({
					id: randomUuid(),
					type: EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT,
					innhold: { deltakelseProsent: body.innhold.deltakelseProsent, gyldigFraDato: dayjs(body.innhold.gyldigFraDato).toDate() }
				})
			}
			if (bodyType.innhold.type === EndringsmeldingType.FORLENG_DELTAKELSE) {
				const body = req.body as { innhold: { type: string, sluttdato: string } }
				deltaker.aktiveEndringsmeldinger.push({
					id: randomUuid(),
					type: EndringsmeldingType.FORLENG_DELTAKELSE,
					innhold: { sluttdato: dayjs(body.innhold.sluttdato).toDate() }
				})
			}
			if (bodyType.innhold.type === EndringsmeldingType.AVSLUTT_DELTAKELSE) {
				const body = req.body as { innhold: { type: string, sluttdato: string, aarsak: DeltakerStatusAarsak } }
				deltaker.aktiveEndringsmeldinger.push({
					id: randomUuid(),
					type: EndringsmeldingType.AVSLUTT_DELTAKELSE,
					innhold: { sluttdato: dayjs(body.innhold.sluttdato).toDate(), aarsak: body.innhold.aarsak }
				})
			}
			if (bodyType.innhold.type === EndringsmeldingType.DELTAKER_IKKE_AKTUELL) {
				const body = req.body as { innhold: { type: string, aarsak: DeltakerStatusAarsak } }
				deltaker.aktiveEndringsmeldinger.push({
					id: randomUuid(),
					type: EndringsmeldingType.DELTAKER_IKKE_AKTUELL,
					innhold: { aarsak: body.innhold.aarsak }
				})
			}

			if (bodyType.innhold.type === EndringsmeldingType.TILBY_PLASS) {
				deltaker.aktiveEndringsmeldinger.push({
					id: randomUuid(),
					type: EndringsmeldingType.TILBY_PLASS,
				})
			}
			if (bodyType.innhold.type === EndringsmeldingType.SETT_PAA_VENTELISTE) {
				deltaker.aktiveEndringsmeldinger.push({
					id: randomUuid(),
					type: EndringsmeldingType.SETT_PAA_VENTELISTE,
				})
			}
			if (bodyType.innhold.type === EndringsmeldingType.ENDRE_SLUTTDATO) {
				const body = req.body as { innhold: { type: string, sluttdato: string } }
				deltaker.aktiveEndringsmeldinger.push({
					id: randomUuid(),
					type: EndringsmeldingType.ENDRE_SLUTTDATO,
					innhold: { sluttdato: dayjs(body.innhold.sluttdato).toDate() }

				})
			}
		}

		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.delete(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.get(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId/endringsmeldinger'), (req, res, ctx) => {
		const deltakerId = req.params.deltakerId as string
		const endringsmeldinger = mockTiltakDeltakere.find(d => d.id == deltakerId)?.aktiveEndringsmeldinger ?? []

		return res(ctx.delay(500), ctx.json(endringsmeldinger))
	}),
	rest.get(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/:deltakerlisteId/veiledere'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockTilgjengeligeVeiledere))
	}),
	rest.post(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/veiledere'), (req, res, ctx) => {
		const deltakerId = req.url.searchParams.get('deltakerId') as string
		const body = req.body as { veiledere: Veileder[] }

		const deltaker = mockTiltakDeltakere.find(d => d.id == deltakerId)
		if (!deltaker) {
			return res(ctx.delay(500), ctx.status(404))
		}
		const nyeVeiledere: VeilederMedType[] = body.veiledere.map(v => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const veileder = mockTilgjengeligeVeiledere.find(tv => tv.ansattId === v.ansattId)!
			return {
				ansattId: veileder.ansattId,
				deltakerId: deltakerId,
				veiledertype: v.erMedveileder ? Veiledertype.MEDVEILEDER : Veiledertype.VEILEDER,
				fornavn: veileder.fornavn,
				mellomnavn: veileder.mellomnavn,
				etternavn: veileder.etternavn,
			}
		})

		deltaker.veiledere = nyeVeiledere

		return res(ctx.delay(500), ctx.status(200))
	}),

	rest.get(appUrl('/unleash/api/feature'), (req, res, ctx) => {
		const toggles = { [VIS_DRIFTSMELDING_TOGGLE_NAVN]: false }

		return res(ctx.delay(500), ctx.json(toggles))
	})
]

export const mapToDeltakerListView = (deltaker: MockTiltakDeltaker): TiltakDeltaker => {
	return {
		id: deltaker.id,
		fornavn: deltaker.fornavn,
		mellomnavn: deltaker.mellomnavn,
		etternavn: deltaker.etternavn,
		fodselsnummer: deltaker.fodselsnummer,
		startDato: deltaker.startDato,
		sluttDato: deltaker.sluttDato,
		status: deltaker.status,
		soktInnDato: deltaker.registrertDato,
		aktiveEndringsmeldinger: deltaker.aktiveEndringsmeldinger,
		veiledere: deltaker.veiledere,
	}
}

const mapToDeltakerDetaljerView = (deltaker: MockTiltakDeltaker): Deltaker => {
	return {
		id: deltaker.id,
		deltakerliste: {
			id: deltaker.gjennomforing.id,
			startDato: deltaker.gjennomforing.startDato,
			sluttDato: deltaker.gjennomforing.sluttDato,
			erKurs: deltakerlisteErKurs(deltaker.gjennomforing.tiltak.tiltakskode)
		},
		fornavn: deltaker.fornavn,
		mellomnavn: deltaker.mellomnavn,
		etternavn: deltaker.etternavn,
		fodselsnummer: deltaker.fodselsnummer,
		telefonnummer: deltaker.telefonnummer,
		epost: deltaker.epost,
		status: deltaker.status,
		startDato: deltaker.startDato,
		sluttDato: deltaker.sluttDato,
		deltakelseProsent: deltaker.deltakelseProsent,
		dagerPerUke: deltaker.dagerPerUke,
		soktInnPa: deltaker.gjennomforing.navn,
		soktInnDato: deltaker.registrertDato,
		tiltakskode: deltaker.gjennomforing.tiltak.tiltakskode,
		bestillingTekst: deltaker.innsokBegrunnelse,
		fjernesDato: deltaker.fjernesDato,
		navInformasjon: {
			navkontor: deltaker.navEnhet?.navn ?? '',
			navVeileder: deltaker.navVeileder?.navn ? {
				navn: deltaker.navVeileder?.navn,
				telefon: deltaker.navVeileder?.telefon,
				epost: deltaker.navVeileder?.epost
			} : null
		},
		veiledere: deltaker.veiledere,
		aktiveEndringsmeldinger: deltaker.aktiveEndringsmeldinger
	}
}

const mapGjennomforingTilAdminDeltakerliste = (gjennomforing: MockGjennomforing, lagtTil: boolean): AdminDeltakerliste => {
	return {
		id: gjennomforing.id,
		navn: gjennomforing.navn,
		tiltaksnavn: gjennomforing.tiltak.tiltaksnavn,
		arrangorNavn: gjennomforing.arrangor.organisasjonNavn != null ? gjennomforing.arrangor.organisasjonNavn : gjennomforing.arrangor.virksomhetNavn,
		arrangorOrgnummer: gjennomforing.arrangor.virksomhetOrgnr,
		arrangorParentNavn: gjennomforing.arrangor.virksomhetNavn,
		startDato: gjennomforing.startDato,
		sluttDato: gjennomforing.sluttDato,
		lagtTil: lagtTil
	}
}
