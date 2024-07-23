import dayjs from 'dayjs'
import { RequestHandler, rest } from 'msw'

import {
  Deltaker,
  TiltakDeltaker,
  Vurderingstype
} from '../../api/data/deltaker'
import {
  DeltakerStatusAarsak,
  EndringsmeldingStatus,
  EndringsmeldingType
} from '../../api/data/endringsmelding'
import {
  KOMET_DELTAKERE_TOGGLE_NAVN,
  VIS_DRIFTSMELDING_TOGGLE_NAVN
} from '../../api/data/feature-toggle'
import { AdminDeltakerliste } from '../../api/data/tiltak'
import {
  Veileder,
  VeilederMedType,
  Veiledertype
} from '../../api/data/veileder'
import { appUrl } from '../../utils/url-utils'
import {
  mockDeltakerlisteVeileder,
  mockGjennomforinger,
  mockKoordinatorsDeltakerliste,
  mockMineDeltakerlister,
  mockTiltakDeltakere
} from '../data'
import { mockMineRoller } from '../data/ansatt'
import { MockTiltakDeltaker } from '../data/brukere'
import { MockGjennomforing, deltakerlisteErKurs } from '../data/tiltak'
import { mockTilgjengeligeVeiledere } from '../data/veileder'
import { randomUuid } from '../utils/faker'
import {
  AktivtForslag,
  ForslagEndring,
  ForslagEndringType,
  ForslagStatusType
} from '../../api/data/forslag'

export const mockHandlers: RequestHandler[] = [
  rest.get(
    appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/meg/roller'),
    (_req, res, ctx) => {
      return res(ctx.delay(500), ctx.json(mockMineRoller))
    }
  ),
  rest.get(
    appUrl(
      '/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/admin/deltakerlister'
    ),
    (_req, res, ctx) => {
      const gjennomforinger = [
        mapGjennomforingTilAdminDeltakerliste(mockGjennomforinger[0], true),
        ...mockGjennomforinger.map((g) =>
          mapGjennomforingTilAdminDeltakerliste(g, false)
        )
      ]
      return res(ctx.delay(500), ctx.json(gjennomforinger))
    }
  ),
  rest.get(
    appUrl(
      '/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/deltakerliste/:deltakerlisteId'
    ),
    (req, res, ctx) => {
      const deltakerlisteId = req.params.deltakerlisteId
      const gjennomforing = mockGjennomforinger.find(
        (g) => g.id === deltakerlisteId
      )
      if (gjennomforing === undefined) {
        return res(ctx.delay(500), ctx.status(404))
      }

      return res(
        ctx.delay(500),
        ctx.json(mockKoordinatorsDeltakerliste(gjennomforing))
      )
    }
  ),
  rest.get(
    appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId'),
    (req, res, ctx) => {
      const deltakerId = req.params['deltakerId']
      const deltaker = mockTiltakDeltakere.find((d) => d.id === deltakerId)! // eslint-disable-line @typescript-eslint/no-non-null-assertion

      const referrer = req.referrer
      const ref = referrer.substring(
        referrer.indexOf('?ref=') + 5,
        referrer.length
      )

      const deltakerMedGjennomforing = mapToDeltakerDetaljerView(
        deltaker,
        ref === 'veileder'
      )

      return res(ctx.delay(500), ctx.json(deltakerMedGjennomforing))
    }
  ),
  rest.post(
    appUrl(
      '/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/admin/deltakerliste/:deltakerlisteId'
    ),
    (_req, res, ctx) => {
      return res(ctx.delay(500), ctx.status(200))
    }
  ),
  rest.delete(
    appUrl(
      '/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/admin/deltakerliste/:deltakerlisteId'
    ),
    (_req, res, ctx) => {
      return res(ctx.delay(500), ctx.status(200))
    }
  ),
  rest.get(
    appUrl(
      '/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/mine-deltakerlister'
    ),
    (_req, res, ctx) => {
      return res(ctx.delay(500), ctx.json(mockMineDeltakerlister))
    }
  ),
  rest.get(
    appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/veileder/mine-deltakere'),
    (_req, res, ctx) => {
      return res(ctx.delay(500), ctx.json(mockDeltakerlisteVeileder))
    }
  ),
  rest.delete(
    appUrl(
      '/amt-tiltaksarrangor-bff/tiltaksarrangor/endringsmelding/:endringsmeldingId'
    ),
    (req, res, ctx) => {
      const endringsmeldingId = req.params.endringsmeldingId as string

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

      return res(ctx.delay(500), ctx.status(200))
    }
  ),
  rest.post(
    appUrl(
      '/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId/endringsmelding'
    ),
    (req, res, ctx) => {
      const deltakerId = req.params.deltakerId as string
      const bodyType = req.body as { innhold: { type: string } }

      const deltaker = mockTiltakDeltakere.find((d) => d.id == deltakerId)

      if (deltaker) {
        if (
          bodyType.innhold.type === EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO
        ) {
          const body = req.body as {
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
          const body = req.body as {
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
          const body = req.body as {
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
          const body = req.body as {
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
          const body = req.body as {
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
          const body = req.body as {
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
          const body = req.body as {
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
          const body = req.body as {
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

      return res(ctx.delay(500), ctx.status(200))
    }
  ),
  rest.post(
    appUrl(
      '/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId/vurdering'
    ),
    (req, res, ctx) => {
      const deltakerId = req.params.deltakerId as string
      const bodyType = req.body as { vurderingstype: string }

      const deltaker = mockTiltakDeltakere.find((d) => d.id == deltakerId)

      if (deltaker) {
        if (bodyType.vurderingstype === Vurderingstype.OPPFYLLER_IKKE_KRAVENE) {
          const body = req.body as {
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

      return res(ctx.delay(500), ctx.status(200))
    }
  ),
  rest.delete(
    appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId'),
    (req, res, ctx) => {
      return res(ctx.delay(500), ctx.status(200))
    }
  ),
  rest.get(
    appUrl(
      '/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId/alle-endringsmeldinger'
    ),
    (req, res, ctx) => {
      const deltakerId = req.params.deltakerId as string
      const deltaker = mockTiltakDeltakere.find((d) => d.id == deltakerId)
      const aktiveEndringsmeldinger = deltaker?.aktiveEndringsmeldinger ?? []
      const historiskeEndringsmeldinger =
        deltaker?.historiskeEndringsmeldinger ?? []

      return res(
        ctx.delay(500),
        ctx.json({ aktiveEndringsmeldinger, historiskeEndringsmeldinger })
      )
    }
  ),
  rest.get(
    appUrl(
      '/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/:deltakerlisteId/veiledere'
    ),
    (req, res, ctx) => {
      return res(ctx.delay(500), ctx.json(mockTilgjengeligeVeiledere))
    }
  ),
  rest.post(
    appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/veiledere'),
    (req, res, ctx) => {
      const deltakerId = req.url.searchParams.get('deltakerId') as string
      const body = req.body as { veiledere: Veileder[] }

      const deltaker = mockTiltakDeltakere.find((d) => d.id == deltakerId)
      if (!deltaker) {
        return res(ctx.delay(500), ctx.status(404))
      }
      const nyeVeiledere: VeilederMedType[] = body.veiledere.map((v) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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

      return res(ctx.delay(500), ctx.status(200))
    }
  ),
  rest.post(
    appUrl(
      '/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId/forslag/:forslagId/tilbakekall'
    ),
    (req, res, ctx) => {
      const deltakerId = req.params.deltakerId
      const forslagId = req.params.forslagId

      const deltaker = mockTiltakDeltakere.find((d) => d.id == deltakerId)
      if (!deltaker) {
        return res(ctx.delay(500), ctx.status(500))
      }
      deltaker.aktiveForslag = deltaker.aktiveForslag.filter(
        (it) => it.id !== forslagId
      )
      return res(ctx.delay(500), ctx.status(200))
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
    aarsak: body.aarsak
  })),
  handlePostForslagRequest('deltakelsesmengde', (body) => ({
    type: ForslagEndringType.Deltakelsesmengde,
    deltakelsesprosent: body.deltakelsesprosent,
    dagerPerUke: body.dagerPerUke
  })),
  rest.get(
    appUrl('/amt-tiltaksarrangor-bff/unleash/api/feature'),
    (req, res, ctx) => {
      const toggles = {
        [VIS_DRIFTSMELDING_TOGGLE_NAVN]: false,
        [KOMET_DELTAKERE_TOGGLE_NAVN]: true
      }

      return res(ctx.delay(500), ctx.json(toggles))
    }
  )
]

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
    erVeilederForDeltaker: deltaker.erVeilederForDeltaker
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
    historiskeVurderingerFraArrangor: deltaker.historiskeVurderingerFraArrangor,
    adressebeskyttet: deltaker.adressebeskyttet
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

function handlePostForslagRequest(
  endepunkt: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getEndring: (body: any) => ForslagEndring
) {
  return rest.post(
    appUrl(
      `/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/:deltakerId/forslag/${endepunkt}`
    ),
    async (req, res, ctx) => {
      const deltakerId = req.params.deltakerId as string
      const body = await req.json()

      const endring = getEndring(body)

      const forslag = opprettAktivtForslag(
        deltakerId,
        endring,
        body.begrunnelse ?? null
      )

      if (!forslag) {
        return res(ctx.delay(500), ctx.status(500))
      }

      return res(ctx.delay(500), ctx.status(200), ctx.json(forslag))
    }
  )
}
