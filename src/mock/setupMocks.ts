import { delay, http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { useMock } from '../utils/environment'
import { appUrl } from '../utils/url-utils'
import { mockMineRoller } from './data/ansatt'
import { deltakerlisteErKurs, MockGjennomforing } from './data/tiltak'
import { AdminDeltakerliste } from '../api/data/tiltak'
import { mockDeltakerlisteVeileder, mockGjennomforinger, mockKoordinatorsDeltakerliste, mockMineDeltakerlister, mockTiltakDeltakere } from './data'
import { MockTiltakDeltaker } from './data/brukere'
import { Deltaker, TiltakDeltaker, Vurderingstype } from '../api/data/deltaker'
import { DeltakerStatusAarsak, EndringsmeldingStatus, EndringsmeldingType } from '../api/data/endringsmelding'
import { randomUuid } from './utils/faker'
import dayjs from 'dayjs'
import { mockTilgjengeligeVeiledere } from './data/veileder'
import { mockDeltakerHistorikk } from './data/historikk'
import { Veileder, VeilederMedType, Veiledertype } from '../api/data/veileder'
import { AktivtForslag, ForslagEndring, ForslagEndringType, ForslagStatusType } from '../api/data/forslag'
import { EndringFraArrangor, EndringFraArrangorType } from '../api/data/endring'
import { KOMET_DELTAKERE_TOGGLE_NAVN, VIS_DRIFTSMELDING_TOGGLE_NAVN } from '../api/data/feature-toggle'
import { ulestEndringErNyeDeltaker, ulestEndringErOppdateringFraNav, ulestEndringErSvarFraNav } from '../component/page/bruker-detaljer/deltaker-detaljer/forslag/forslagUtils'

export async function enableMocking() {
	if (useMock) {
		const url = appUrl('mockServiceWorker.js')

		return worker.start({
			onUnhandledRequest: 'bypass',
			serviceWorker: {
				url: url
			}
		})
	}
}

export const worker = setupWorker(
	http.get(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/meg/roller'), async () => {
		await delay(200)
		return HttpResponse.json(mockMineRoller)
	}
	),
	http.get(appUrl(
		'/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/admin/deltakerlister'
	), async () => {
		await delay(500)
		const gjennomforinger = [
			mapGjennomforingTilAdminDeltakerliste(mockGjennomforinger[ 0 ], true),
			...mockGjennomforinger.map((g) =>
				mapGjennomforingTilAdminDeltakerliste(g, false)
			)
		]
		return HttpResponse.json(gjennomforinger)
	}
	),
	http.get(appUrl(
		'/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/deltakerliste/:deltakerlisteId'
	),
		async ({ params }) => {
			await delay(500)
			const deltakerlisteId = params.deltakerlisteId
			const gjennomforing = mockGjennomforinger.find(
				(g) => g.id === deltakerlisteId
			)
			if (gjennomforing === undefined) {
				return new HttpResponse(null, { status: 404 })
			}

			return HttpResponse.json(mockKoordinatorsDeltakerliste(gjennomforing)
			)
		}
	),
	http.get(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId')
		, async ({ params, request }) => {
			await delay(500)
			const deltakerId = params[ 'deltakerId' ]
			const deltaker = mockTiltakDeltakere.find((d) => d.id === deltakerId)!

			const referrer = request.referrer
			const ref = referrer.substring(
				referrer.indexOf('?ref=') + 5,
				referrer.length
			)

			const deltakerMedGjennomforing = mapToDeltakerDetaljerView(
				deltaker,
				ref === 'veileder'
			)

			return HttpResponse.json(deltakerMedGjennomforing)
		}
	),
	http.post(appUrl(
		'/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/admin/deltakerliste/:deltakerlisteId'
	),
		async () => {
			await delay(500)
			return new HttpResponse(null, { status: 200 })
		}
	),
	http.delete(appUrl(
		'/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/admin/deltakerliste/:deltakerlisteId')
		, async () => {
			await delay(500)
			return new HttpResponse(null, { status: 200 })
		}
	),
	http.get(appUrl(
		'/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/mine-deltakerlister')
		, async () => {
			await delay(500)
			return HttpResponse.json(mockMineDeltakerlister)
		}
	),
	http.get(appUrl(
		'/amt-tiltaksarrangor-bff/tiltaksarrangor/veileder/mine-deltakere')
		, async () => {
			await delay(500)
			return HttpResponse.json(mockDeltakerlisteVeileder)
		}
	),
	http.delete(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/endringsmelding/:endringsmeldingId')
		, async ({ params }) => {
			await delay(500)
			const endringsmeldingId = params.endringsmeldingId as string
			const deltaker = mockTiltakDeltakere.find((d) => {
				return (
					d.aktiveEndringsmeldinger.find((e) => e.id == endringsmeldingId) !=
					null
				)
			})

			if (deltaker) {
				deltaker.aktiveEndringsmeldinger =
					deltaker.aktiveEndringsmeldinger.filter(
						(e) => e.id != endringsmeldingId
					)
			}

			return new HttpResponse(null, { status: 200 })
		}),
	http.post(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId/endringsmelding')
		, async ({ params, request }) => {
			await delay(500)
			const deltakerId = params.deltakerId as string
			const bodyJson = await request.json()

			const bodyType = bodyJson as { innhold: { type: string } }

			const deltaker = mockTiltakDeltakere.find((d) => d.id == deltakerId)

			if (deltaker) {
				if (
					bodyType.innhold.type === EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO
				) {
					const body = bodyJson as {
						innhold: { type: string; oppstartsdato: string }
					}
					deltaker.aktiveEndringsmeldinger.push({
						id: randomUuid(),
						type: EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO,
						innhold: {
							oppstartsdato: dayjs(body.innhold.oppstartsdato).toDate()
						},
						sendt: new Date(),
						status: EndringsmeldingStatus.AKTIV
					})
				}
				if (bodyType.innhold.type === EndringsmeldingType.ENDRE_OPPSTARTSDATO) {
					const body = bodyJson as {
						innhold: { type: string; oppstartsdato: string }
					}
					deltaker.aktiveEndringsmeldinger.push({
						id: randomUuid(),
						type: EndringsmeldingType.ENDRE_OPPSTARTSDATO,
						innhold: {
							oppstartsdato: dayjs(body.innhold.oppstartsdato).toDate()
						},
						sendt: new Date(),
						status: EndringsmeldingStatus.AKTIV
					})
				}
				if (
					bodyType.innhold.type === EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT
				) {
					const body = bodyJson as {
						innhold: {
							type: string
							deltakelseProsent: number
							dagerPerUke: number | null
							gyldigFraDato: string
						}
					}
					deltaker.aktiveEndringsmeldinger.push({
						id: randomUuid(),
						type: EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT,
						innhold: {
							deltakelseProsent: body.innhold.deltakelseProsent,
							dagerPerUke: body.innhold.dagerPerUke,
							gyldigFraDato: dayjs(body.innhold.gyldigFraDato).toDate()
						},
						sendt: new Date(),
						status: EndringsmeldingStatus.AKTIV
					})
				}
				if (bodyType.innhold.type === EndringsmeldingType.FORLENG_DELTAKELSE) {
					const body = bodyJson as {
						innhold: { type: string; sluttdato: string }
					}
					deltaker.aktiveEndringsmeldinger.push({
						id: randomUuid(),
						type: EndringsmeldingType.FORLENG_DELTAKELSE,
						innhold: { sluttdato: dayjs(body.innhold.sluttdato).toDate() },
						sendt: new Date(),
						status: EndringsmeldingStatus.AKTIV
					})
				}
				if (bodyType.innhold.type === EndringsmeldingType.AVSLUTT_DELTAKELSE) {
					const body = bodyJson as {
						innhold: {
							type: string
							sluttdato: string
							aarsak: DeltakerStatusAarsak
						}
					}
					deltaker.aktiveEndringsmeldinger.push({
						id: randomUuid(),
						type: EndringsmeldingType.AVSLUTT_DELTAKELSE,
						innhold: {
							sluttdato: dayjs(body.innhold.sluttdato).toDate(),
							aarsak: body.innhold.aarsak
						},
						sendt: new Date(),
						status: EndringsmeldingStatus.AKTIV
					})
				}
				if (
					bodyType.innhold.type === EndringsmeldingType.DELTAKER_IKKE_AKTUELL
				) {
					const body = bodyJson as {
						innhold: { type: string; aarsak: DeltakerStatusAarsak }
					}
					deltaker.aktiveEndringsmeldinger.push({
						id: randomUuid(),
						type: EndringsmeldingType.DELTAKER_IKKE_AKTUELL,
						innhold: { aarsak: body.innhold.aarsak },
						sendt: new Date(),
						status: EndringsmeldingStatus.AKTIV
					})
				}

				if (bodyType.innhold.type === EndringsmeldingType.ENDRE_SLUTTDATO) {
					const body = bodyJson as {
						innhold: { type: string; sluttdato: string }
					}
					deltaker.aktiveEndringsmeldinger.push({
						id: randomUuid(),
						type: EndringsmeldingType.ENDRE_SLUTTDATO,
						innhold: { sluttdato: dayjs(body.innhold.sluttdato).toDate() },
						sendt: new Date(),
						status: EndringsmeldingStatus.AKTIV
					})
				}

				if (bodyType.innhold.type === EndringsmeldingType.ENDRE_SLUTTAARSAK) {
					const body = bodyJson as {
						innhold: { type: string; aarsak: DeltakerStatusAarsak }
					}
					deltaker.aktiveEndringsmeldinger.push({
						id: randomUuid(),
						type: EndringsmeldingType.ENDRE_SLUTTAARSAK,
						innhold: { aarsak: body.innhold.aarsak },
						sendt: new Date(),
						status: EndringsmeldingStatus.AKTIV
					})
				}
			}

			return new HttpResponse(null, { status: 200 })
		}
	),
	http.post(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId/vurdering')
		, async ({ params, request }) => {
			await delay(500)
			const deltakerId = params.deltakerId as string
			const bodyJson = await request.json()
			const bodyType = bodyJson as { vurderingstype: string }

			const deltaker = mockTiltakDeltakere.find((d) => d.id == deltakerId)

			if (deltaker) {
				if (bodyType.vurderingstype === Vurderingstype.OPPFYLLER_IKKE_KRAVENE) {
					const body = bodyJson as {
						vurderingstype: string
						begrunnelse: string
					}

					deltaker.gjeldendeVurderingFraArrangor = {
						vurderingstype: Vurderingstype.OPPFYLLER_IKKE_KRAVENE,
						begrunnelse: body.begrunnelse,
						gyldigFra: new Date(),
						gyldigTil: null
					}
				}

				if (bodyType.vurderingstype === Vurderingstype.OPPFYLLER_KRAVENE) {
					deltaker.gjeldendeVurderingFraArrangor = {
						vurderingstype: Vurderingstype.OPPFYLLER_KRAVENE,
						begrunnelse: null,
						gyldigFra: new Date(),
						gyldigTil: null
					}
				}
			}

			return new HttpResponse(null, { status: 200 })
		}
	),
	http.delete(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId')
		, async () => {
			await delay(500)
			return new HttpResponse(null, { status: 200 })
		}
	),
	http.get(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId/alle-endringsmeldinger'
	), async ({ params }) => {
		await delay(500)
		const deltakerId = params.deltakerId as string
		const deltaker = mockTiltakDeltakere.find((d) => d.id == deltakerId)
		const aktiveEndringsmeldinger = deltaker?.aktiveEndringsmeldinger ?? []
		const historiskeEndringsmeldinger =
			deltaker?.historiskeEndringsmeldinger ?? []

		return HttpResponse.json(({ aktiveEndringsmeldinger, historiskeEndringsmeldinger }))
	}),
	http.get(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/:deltakerlisteId/veiledere')
		, async () => {
			await delay(500)
			return HttpResponse.json(mockTilgjengeligeVeiledere)
		}
	),
	http.get(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId/historikk')
		, async () => {
			await delay(500)
			return HttpResponse.json(mockDeltakerHistorikk())
		}
	),
	http.post(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/veiledere')
		, async ({ request }) => {
			await delay(500)
			const url = new URL(request.url)
			const deltakerId = url.searchParams.get('deltakerId') ?? ''
			const body = await request.json() as { veiledere: Veileder[] }

			const deltaker = mockTiltakDeltakere.find((d) => d.id == deltakerId)
			if (!deltaker) {
				return new HttpResponse(null, { status: 404 })
			}
			const nyeVeiledere: VeilederMedType[] = body.veiledere.map((v) => {
				const veileder = mockTilgjengeligeVeiledere.find(
					(tv) => tv.ansattId === v.ansattId
				)!
				return {
					ansattId: veileder.ansattId,
					deltakerId: deltakerId,
					veiledertype: v.erMedveileder
						? Veiledertype.MEDVEILEDER
						: Veiledertype.VEILEDER,
					fornavn: veileder.fornavn,
					mellomnavn: veileder.mellomnavn,
					etternavn: veileder.etternavn
				}
			})

			deltaker.veiledere = nyeVeiledere

			return new HttpResponse(null, { status: 200 })
		}
	),
	http.post(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId/forslag/:forslagId/tilbakekall')
		, async ({ params }) => {
			await delay(500)
			const deltakerId = params.deltakerId
			const forslagId = params.forslagId

			const deltaker = mockTiltakDeltakere.find((d) => d.id == deltakerId)
			if (!deltaker) {
				return new HttpResponse(null, { status: 500 })
			}
			deltaker.aktiveForslag = deltaker.aktiveForslag.filter(
				(it) => it.id !== forslagId
			)
			return new HttpResponse(null, { status: 200 })
		}
	),
	http.post(appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId/endring/:ulestEndringId/marker-som-lest')
		, async ({ params }) => {
			await delay(500)
			const deltakerId = params.deltakerId
			const ulestEndringId = params.ulestEndringId

			const deltaker = mockTiltakDeltakere.find((d) => d.id == deltakerId)
			if (!deltaker) {
				return new HttpResponse(null, { status: 500 })
			}
			deltaker.ulesteEndringer = deltaker.ulesteEndringer.filter(
				(it) => it.id !== ulestEndringId
			)
			deltaker.svarFraNav = deltaker.ulesteEndringer.find(ulestEndringErSvarFraNav) ? true : false
			deltaker.oppdateringFraNav = deltaker.ulesteEndringer.find(ulestEndringErOppdateringFraNav) ? true : false
			deltaker.nyDeltaker = deltaker.ulesteEndringer.find(ulestEndringErNyeDeltaker) ? true : false
			return new HttpResponse(null, { status: 200 })
		}
	),
	handlePostForslagRequest('forleng', (body) => ({
		type: ForslagEndringType.ForlengDeltakelse,
		sluttdato: dayjs(body.sluttdato).toDate()
	})),
	handlePostForslagRequest('ikke-aktuell', (body) => ({
		type: ForslagEndringType.IkkeAktuell,
		aarsak: body.aarsak
	})),
	handlePostForslagRequest('avslutt', (body) => ({
		type: ForslagEndringType.AvsluttDeltakelse,
		sluttdato: body.sluttdato,
		aarsak: body.aarsak,
		harDeltatt: body.harDeltatt
	})),
	handlePostForslagRequest('deltakelsesmengde', (body) => ({
		type: ForslagEndringType.Deltakelsesmengde,
		deltakelsesprosent: body.deltakelsesprosent,
		dagerPerUke: body.dagerPerUke,
		gyldigFra: body.gyldigFra
	})),
	handlePostForslagRequest('sluttdato', (body) => ({
		type: ForslagEndringType.Sluttdato,
		sluttdato: body.sluttdato
	})),
	handlePostForslagRequest('startdato', (body) => ({
		type: ForslagEndringType.Startdato,
		startdato: body.startdato,
		sluttdato: body.sluttdato
	})),
	handlePostForslagRequest('sluttarsak', (body) => ({
		type: ForslagEndringType.Sluttarsak,
		aarsak: body.aarsak
	})),
	handlePostForslagRequest('fjern-oppstartsdato', () => ({
		type: ForslagEndringType.FjernOppstartsdato
	})),
	handlePostEndringRequest('legg-til-oppstartsdato', (body) => ({
		type: EndringFraArrangorType.LeggTilOppstartsdato,
		startdato: body.startdato,
		sluttdato: body.sluttdato
	})),
	http.get(appUrl('/amt-tiltaksarrangor-bff/unleash/api/feature'),
		async () => {
			await delay(500)
			const toggles = {
				[ VIS_DRIFTSMELDING_TOGGLE_NAVN ]: false,
				[ KOMET_DELTAKERE_TOGGLE_NAVN ]: true
			}

			return HttpResponse.json(toggles)
		}
	)
)

export const mapToDeltakerListView = (
	deltaker: MockTiltakDeltaker
): TiltakDeltaker => {
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
		navKontor: deltaker.navEnhet ? deltaker.navEnhet.navn : null,
		gjeldendeVurderingFraArrangor: deltaker.gjeldendeVurderingFraArrangor,
		adressebeskyttet: deltaker.adressebeskyttet,
		erVeilederForDeltaker: deltaker.erVeilederForDeltaker,
		aktivEndring: deltaker.aktivEndring ?? null,
		svarFraNav: deltaker.svarFraNav,
		oppdateringFraNav: deltaker.oppdateringFraNav,
		nyDeltaker: deltaker.nyDeltaker
	}
}

const mapToDeltakerDetaljerView = (
	deltaker: MockTiltakDeltaker,
	isVeileder: boolean
): Deltaker => {
	const fodselsnummer = isVeileder ? deltaker.fodselsnummer : ''
	return {
		id: deltaker.id,
		deltakerliste: {
			id: deltaker.gjennomforing.id,
			startDato: deltaker.gjennomforing.startDato,
			sluttDato: deltaker.gjennomforing.sluttDato,
			erKurs: deltakerlisteErKurs(deltaker.gjennomforing.tiltak.tiltakskode),
			tiltakstype: deltaker.gjennomforing.tiltak.tiltakskode
		},
		fornavn: deltaker.fornavn,
		mellomnavn: deltaker.mellomnavn,
		etternavn: deltaker.etternavn,
		fodselsnummer: fodselsnummer,
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
		innhold: deltaker.innhold,
		fjernesDato: deltaker.fjernesDato,
		navInformasjon: {
			navkontor: deltaker.navEnhet?.navn ?? '',
			navVeileder: deltaker.navVeileder?.navn
				? {
					navn: deltaker.navVeileder?.navn,
					telefon: deltaker.navVeileder?.telefon,
					epost: deltaker.navVeileder?.epost
				}
				: null
		},
		veiledere: deltaker.veiledere,
		aktiveForslag: deltaker.aktiveForslag,
		ulesteEndringer: deltaker.ulesteEndringer,
		aktiveEndringsmeldinger: deltaker.aktiveEndringsmeldinger,
		historiskeEndringsmeldinger: deltaker.historiskeEndringsmeldinger,
		adresse: deltaker.adresse
			? {
				adressetype: deltaker.adresse.adressetype,
				postnummer: deltaker.adresse.postnummer,
				poststed: deltaker.adresse.poststed,
				tilleggsnavn: deltaker.adresse.tilleggsnavn,
				adressenavn: deltaker.adresse.adressenavn
			}
			: null,
		gjeldendeVurderingFraArrangor: deltaker.gjeldendeVurderingFraArrangor,
		adressebeskyttet: deltaker.adressebeskyttet,
		deltakelsesmengder: deltaker.deltakelsesmengder
	}
}

const mapGjennomforingTilAdminDeltakerliste = (
	gjennomforing: MockGjennomforing,
	lagtTil: boolean
): AdminDeltakerliste => {
	return {
		id: gjennomforing.id,
		navn: gjennomforing.navn,
		tiltaksnavn: gjennomforing.tiltak.tiltaksnavn,
		arrangorNavn:
			gjennomforing.arrangor.organisasjonNavn != null
				? gjennomforing.arrangor.organisasjonNavn
				: gjennomforing.arrangor.virksomhetNavn,
		arrangorOrgnummer: gjennomforing.arrangor.virksomhetOrgnr,
		arrangorParentNavn: gjennomforing.arrangor.virksomhetNavn,
		startDato: gjennomforing.startDato,
		sluttDato: gjennomforing.sluttDato,
		lagtTil: lagtTil
	}
}

function opprettAktivtForslag(
	deltakerId: string,
	endring: ForslagEndring,
	begrunnelse: string | null
): AktivtForslag | undefined {
	const deltaker = mockTiltakDeltakere.find((d) => d.id == deltakerId)

	if (!deltaker) {
		return undefined
	}

	const forslag: AktivtForslag = {
		id: randomUuid(),
		status: {
			type: ForslagStatusType.VenterPaSvar
		},
		begrunnelse: begrunnelse,
		endring: endring,
		opprettet: new Date()
	}

	deltaker.aktiveForslag = [
		forslag,
		...deltaker.aktiveForslag.filter((it) => it.endring.type !== endring.type)
	]

	return forslag
}

function handlePostForslagRequest(
	endepunkt: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getEndring: (body: any) => ForslagEndring
) {
	return http.post(appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId/forslag/${endepunkt}`)
		, async ({ params, request }) => {
			await delay(500)
			const deltakerId = params.deltakerId as string
			const body = await request.json() as AktivtForslag

			const endring = getEndring(body)

			const forslag = opprettAktivtForslag(
				deltakerId,
				endring,
				body?.begrunnelse ?? null
			)

			if (!forslag) {
				return new HttpResponse(null, { status: 500 })
			}

			return HttpResponse.json(forslag)
		}
	)
}

function handlePostEndringRequest(
	endepunkt: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getEndringFraArrangor: (body: any) => EndringFraArrangor
) {
	return http.post(appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId/endring/${endepunkt}`)
		, async ({ params, request }) => {
			await delay(500)
			const deltakerId = params.deltakerId as string
			const body = await request.json()

			const endring = getEndringFraArrangor(body)

			const deltaker = mockTiltakDeltakere.find((d) => d.id == deltakerId)

			if (!deltaker) {
				return new HttpResponse(null, { status: 500 })
			}

			if (endring.type === EndringFraArrangorType.LeggTilOppstartsdato) {
				deltaker.startDato = endring.startdato
				deltaker.sluttDato = endring.sluttdato
			}

			const referrer = request.referrer
			const ref = referrer.substring(
				referrer.indexOf('?ref=') + 5,
				referrer.length
			)

			const deltakerMedGjennomforing = mapToDeltakerDetaljerView(
				deltaker,
				ref === 'veileder'
			)

			return HttpResponse.json(deltakerMedGjennomforing)
		}
	)
}
