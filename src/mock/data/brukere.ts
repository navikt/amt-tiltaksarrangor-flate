import { faker } from '@faker-js/faker/locale/nb_NO'

import dayjs from 'dayjs'
import {
  Adresse,
  Adressetype,
  AktivEndring,
  AktivEndringForDeltaker,
  AktivEndringsType,
  Deltakelsesmengder,
  TiltakDeltakerStatus,
  Vurdering,
  Vurderingstype
} from '../../api/data/deltaker'
import {
  DeltakerStatusAarsakType,
  Endringsmelding
} from '../../api/data/endringsmelding'
import { AktivtForslag, ForslagEndringType, ForslagStatusType, HistorikkForslag, HistorikkType } from '../../api/data/forslag'
import { DeltakerEndring } from '../../api/data/historikk'
import { Gjennomforing, Tiltakskode } from '../../api/data/tiltak'
import { VeilederMedType } from '../../api/data/veileder'
import { ulestEndringErNyeDeltaker, ulestEndringErOppdateringFraNav, ulestEndringErSvarFraNav } from '../../component/page/bruker-detaljer/deltaker-detaljer/forslag/forslagUtils'
import { randBetween, randomBoolean, randomFnr, randomUuid } from '../utils/faker'
import {
  lagMockEndringsmeldingForDeltaker,
  lagMockHistoriskeEndringsmeldingForDeltaker
} from './endringsmelding'
import { mockDeltakerHistorikk } from './historikk'
import { deltakerId } from './id'
import { lagMockAktiveForslag } from './mock-forslag'
import { deltakerlisteErKurs, MockGjennomforing } from './tiltak'
import { lagMockVeiledereForDeltaker } from './veileder'
import { Deltakelsesinnhold } from '../../api/data/innhold'
import { UlestEndring, UlestEndringType } from '../../api/data/ulestEndring'

export type MockVurdering = Vurdering

export interface MockNavEnhet {
  navn: string
}

export type MockAdresse = Adresse

export interface MockNavVeileder {
  navn: string
  telefon: string | null
  epost: string | null
}

export interface MockTiltakDeltaker {
  id: string
  fornavn: string
  mellomnavn: string | null
  etternavn: string
  fodselsnummer: string
  startDato: Date | null
  sluttDato: Date | null
  deltakelseProsent: number | null
  dagerPerUke: number | null
  status: {
    type: TiltakDeltakerStatus
    endretDato: Date
    aarsak: {
      type: DeltakerStatusAarsakType
      beskrivelse: string | null
    } | null
  }
  registrertDato: Date
  epost: string | null
  telefonnummer: string | null
  navEnhet: MockNavEnhet | null
  navVeileder: MockNavVeileder | null
  gjennomforing: MockGjennomforing
  fjernesDato: Date | null
  innsokBegrunnelse: string | null
  innhold: Deltakelsesinnhold | null
  aktiveForslag: AktivtForslag[]
  ulesteEndringer: UlestEndring[]
  aktiveEndringsmeldinger: Endringsmelding[]
  historiskeEndringsmeldinger: Endringsmelding[]
  veiledere: VeilederMedType[]
  adresse: MockAdresse | null
  gjeldendeVurderingFraArrangor: MockVurdering | null
  adressebeskyttet: boolean
  erVeilederForDeltaker: boolean
  deltakelsesmengder: Deltakelsesmengder | null
  aktivEndring?: AktivEndringForDeltaker | null,
  svarFraNav: boolean,
  oppdateringFraNav: boolean,
  nyDeltaker: boolean
}

const navEnheter: MockNavEnhet[] = [
  { navn: 'Nav Bærum' },
  { navn: 'Nav Åsnes' },
  { navn: 'Nav Møre og Romsdal' },
  { navn: 'Nav Moss' }
]

const lagMailFraNavn = (navn: string, mailDomain: string): string => {
  const mailNavn = navn
    .replaceAll(' ', '.')
    .replaceAll('æ', 'ae')
    .replaceAll('ø', 'o')
    .replaceAll('å', 'a')
    .toLowerCase()

  return `${mailNavn}@${mailDomain}`
}

export const lagMockTiltakDeltagereForGjennomforing = (
  gjennomforing: Gjennomforing,
  antallDeltakere = 10
): MockTiltakDeltaker[] => {
  const deltakere: MockTiltakDeltaker[] = []

  for (let i = 0; i < antallDeltakere; i++) {
    deltakere.push(lagMockTiltakDeltagerForGjennomforing(gjennomforing))
  }

  return deltakere
}

const lagTelefonnummer = (): string => {
  return faker.phone.number().replaceAll(' ', '')
}

const lagAdresse = (): MockAdresse => {
  return {
    adressetype: faker.helpers.arrayElement([
      Adressetype.BOSTEDSADRESSE,
      Adressetype.KONTAKTADRESSE,
      Adressetype.OPPHOLDSADRESSE
    ]),
    postnummer: '0010',
    poststed: 'Oslo',
    tilleggsnavn: null,
    adressenavn: 'Portveien 2'
  }
}

const getStatus = (
  erKurs: boolean,
  tiltakskode: Tiltakskode
): TiltakDeltakerStatus => {
  const i = randBetween(0, 10)

  if (erKurs && tiltakskode == Tiltakskode.GRUPPEAMO) {
    if (i < 2) return TiltakDeltakerStatus.VURDERES
    if (i < 4) return TiltakDeltakerStatus.DELTAR
    if (i < 7) return TiltakDeltakerStatus.VENTER_PA_OPPSTART
    if (i < 8) return TiltakDeltakerStatus.FULLFORT
    if (i < 10) return TiltakDeltakerStatus.AVBRUTT
  }
  if (erKurs) {
    if (i < 4) return TiltakDeltakerStatus.DELTAR
    if (i < 7) return TiltakDeltakerStatus.VENTER_PA_OPPSTART
    if (i < 8) return TiltakDeltakerStatus.FULLFORT
    if (i < 10) return TiltakDeltakerStatus.AVBRUTT
  }
  if (i < 5) return TiltakDeltakerStatus.DELTAR
  if (i < 7) return TiltakDeltakerStatus.VENTER_PA_OPPSTART
  if (i < 8) return TiltakDeltakerStatus.HAR_SLUTTET
  if (i < 9) return TiltakDeltakerStatus.IKKE_AKTUELL

  return TiltakDeltakerStatus.DELTAR
}

const finnStartdato = (
  erKurs: boolean,
  gjennomforing: Gjennomforing,
  skalHaDatoer: boolean,
  deltakerstatus: TiltakDeltakerStatus
): Date | null => {
  if (erKurs) {
    return gjennomforing.startDato
  } else {
    return skalHaDatoer
      ? deltakerstatus === TiltakDeltakerStatus.VENTER_PA_OPPSTART
        ? faker.date.soon()
        : faker.date.recent({ days: 60 })
      : null
  }
}

const finnSluttdato = (
  erKurs: boolean,
  gjennomforing: Gjennomforing,
  startDato: Date | null,
  deltakerstatus: TiltakDeltakerStatus
): Date | null => {
  const erAvbrutt =
    deltakerstatus === TiltakDeltakerStatus.AVBRUTT ||
    deltakerstatus === TiltakDeltakerStatus.HAR_SLUTTET ||
    deltakerstatus === TiltakDeltakerStatus.FULLFORT

  if (gjennomforing.tiltak.tiltakskode === Tiltakskode.VASV) return null
  if (erKurs && erAvbrutt) {
    return startDato && gjennomforing.sluttDato
      ? faker.date.between({ from: startDato, to: gjennomforing.sluttDato })
      : gjennomforing.sluttDato
  } else if (erKurs) {
    return gjennomforing.sluttDato
  } else {
    return startDato != null
      ? deltakerstatus === TiltakDeltakerStatus.HAR_SLUTTET
        ? faker.date.between({ from: startDato, to: new Date() })
        : faker.date.between({
          from: startDato,
          to: gjennomforing.sluttDato ?? new Date()
        })
      : null
  }
}

const lagVurdering = (erHistorisk: boolean): MockVurdering => {
  const vurderingstype = faker.helpers.arrayElement([
    Vurderingstype.OPPFYLLER_KRAVENE,
    Vurderingstype.OPPFYLLER_IKKE_KRAVENE
  ])
  const gyldigFra = faker.date.past()
  const historiskGyldigTilDato = new Date()
  historiskGyldigTilDato.setDate(gyldigFra.getDate() + 1)

  return {
    vurderingstype,
    begrunnelse:
      vurderingstype === Vurderingstype.OPPFYLLER_KRAVENE
        ? null
        : 'Opfyller ikke kravene',
    gyldigFra,
    gyldigTil: erHistorisk
      ? historiskGyldigTilDato
      : faker.helpers.arrayElement([ faker.date.future(), null ])
  }
}

const lagMockTiltakDeltagerForGjennomforing = (
  gjennomforing: Gjennomforing
): MockTiltakDeltaker => {
  const erKurs = deltakerlisteErKurs(gjennomforing.tiltak.tiltakskode)
  const status = getStatus(erKurs, gjennomforing.tiltak.tiltakskode)
  const gender = faker.person.sexType()
  const brukerFornavn = faker.person.firstName(gender)
  const brukerMellomnavn = randomBoolean(50)
    ? faker.person.firstName(gender)
    : null
  const brukerEtternavn = faker.person.lastName()

  const veilederNavn = faker.person.firstName() + ' ' + faker.person.lastName()

  // 80% av deltakere med status VENTER_PA_OPPSTART, IKKE_AKTUELL skal ikke ha datoer
  const skalHaDatoer = [
    TiltakDeltakerStatus.VENTER_PA_OPPSTART,
    TiltakDeltakerStatus.IKKE_AKTUELL
  ].includes(status)
    ? randomBoolean(20)
    : true

  const startDato = finnStartdato(erKurs, gjennomforing, skalHaDatoer, status)
  const sluttDato = finnSluttdato(erKurs, gjennomforing, startDato, status)

  const fjernesDato =
    status === TiltakDeltakerStatus.IKKE_AKTUELL ||
      status === TiltakDeltakerStatus.HAR_SLUTTET
      ? faker.date.future()
      : null

  const veileder = randomBoolean(90)
    ? {
      epost: lagMailFraNavn(veilederNavn, 'nav.no'),
      navn: veilederNavn,
      telefon: lagTelefonnummer()
    }
    : null

  const gjeldendeVurderingFraArrangor = lagVurdering(false)
  const deltakelseProsent = randBetween(0, 10) > 4 ? randBetween(0, 100) : null
  const dagerPerUke = randBetween(0, 10) > 5 ? randBetween(1, 5) : null

  const id = deltakerId()

  const erForslagEnabled = erKometMasterForTiltak(
    gjennomforing.tiltak.tiltakskode
  )
  const aktiveForslag = erForslagEnabled ? lagMockAktiveForslag(status) : []
  const aktiveEndringsmeldinger = erForslagEnabled ? [] : lagMockEndringsmeldingForDeltaker(status)
  let aktivEndring: AktivEndringForDeltaker | null = null

  if (aktiveForslag.length > 0) {
    const forslag = aktiveForslag[ 0 ]
    aktivEndring = {
      type: AktivEndringsType.Forslag,
      sendt: faker.date.recent(),
      endingsType: mapForlsagTypeTilAktivEndring(forslag.endring.type)
    }
  } else if (aktiveEndringsmeldinger.length > 0) {
    aktivEndring = {
      type: AktivEndringsType.Endringsmelding,
      sendt: faker.date.recent(),
      endingsType: AktivEndring.LeggTilOppstartsDato
    }
  }

  const historikk = mockDeltakerHistorikk()
  const ulestHistorikk: UlestEndring[] = randomBoolean(30)
    ? historikk.filter(h => h.type === HistorikkType.Endring ||
      (h.type === HistorikkType.Forslag && h.status.type === ForslagStatusType.Avvist))
      .map(h => {
        return h.type === HistorikkType.Endring ? {
          id: randomUuid(),
          deltakerId: id,
          oppdatering: {
            type: UlestEndringType.DeltakelsesEndring,
            endring: h as DeltakerEndring
          },
        } : {
          id: randomUuid(),
          deltakerId: id,
          oppdatering: {
            type: UlestEndringType.AvvistForslag,
            forslag: h as HistorikkForslag
          },
        }
      })
    : []

  const ulesteEndringer: UlestEndring[] = ulestHistorikk[ 0 ] ? [ ulestHistorikk[ 0 ] ] : []
  const telefonnummer = lagTelefonnummer()

  const rndaomNumber = randBetween(0, 10)
  if (rndaomNumber < 2) {
    ulesteEndringer.push({
      id: randomUuid(),
      deltakerId: id,
      oppdatering: {
        type: UlestEndringType.NavBrukerEndring,
        telefonnummer: telefonnummer,
        epost: null,
        oppdatert: faker.date.recent()
      }
    })
  } else if (rndaomNumber < 4) {
    ulesteEndringer.push(
      {
        id: randomUuid(),
        deltakerId: id,
        oppdatering: {
          type: UlestEndringType.NavEndring,
          nyNavVeileder: true,
          navVeilederNavn: veilederNavn,
          navEnhet: 'Nav Oslo',
          navVeilederTelefonnummer: veileder?.telefon ?? null,
          navVeilederEpost: veileder?.epost ?? null,
          oppdatert: faker.date.recent()
        }
      })
  } else if (rndaomNumber < 6) {
    ulesteEndringer.push(
      {
        id: randomUuid(),
        deltakerId: id,
        oppdatering: {
          type: UlestEndringType.NavEndring,
          nyNavVeileder: null,
          navVeilederNavn: veilederNavn,
          navEnhet: 'Nav Oslo',
          navVeilederTelefonnummer: veileder?.telefon ?? null,
          navVeilederEpost: veileder?.epost ?? null,
          oppdatert: faker.date.recent()
        }
      })
  }

  ulesteEndringer.push(
    {
      id: randomUuid(),
      deltakerId: id,
      oppdatering: {
        type: UlestEndringType.NyDeltaker,
        opprettet: faker.date.recent(),
        opprettetAvNavn: veilederNavn,
        opprettetAvEnhet: 'Nav Oslo'
      }
    })

  return {
    id: id,
    fornavn: brukerFornavn,
    mellomnavn: brukerMellomnavn,
    etternavn: brukerEtternavn,
    fodselsnummer: randomFnr(),
    epost: lagMailFraNavn(`${brukerFornavn} ${brukerEtternavn}`, 'example.com'),
    telefonnummer,
    startDato: startDato,
    sluttDato: sluttDato,
    deltakelseProsent: deltakelseProsent,
    dagerPerUke: dagerPerUke,
    status: {
      type: status,
      endretDato: faker.date.recent(),
      aarsak:
        status === TiltakDeltakerStatus.IKKE_AKTUELL ||
          status === TiltakDeltakerStatus.AVBRUTT ||
          status === TiltakDeltakerStatus.HAR_SLUTTET
          ? {
            type: DeltakerStatusAarsakType.FATT_JOBB,
            beskrivelse: null
          }
          : null
    },
    navEnhet:
      randBetween(0, 10) < 9 ? faker.helpers.arrayElement(navEnheter) : null,
    navVeileder: veileder,
    fjernesDato: fjernesDato,
    gjennomforing: gjennomforing,
    registrertDato: faker.date.past(),
    innsokBegrunnelse: genererBegrunnelse(brukerFornavn),
    innhold: mockInnhold(gjennomforing.tiltak.tiltakskode),
    aktiveForslag,
    aktiveEndringsmeldinger,
    historiskeEndringsmeldinger: lagMockHistoriskeEndringsmeldingForDeltaker(
      status,
      startDato,
      sluttDato
    ),
    veiledere: lagMockVeiledereForDeltaker(id),
    adresse: lagAdresse(),
    gjeldendeVurderingFraArrangor,
    erVeilederForDeltaker: false,
    adressebeskyttet: false,
    deltakelsesmengder: {
      nesteDeltakelsesmengde: deltakelseProsent
        ? {
          dagerPerUke: null,
          deltakelsesprosent: 42,
          gyldigFra: dayjs().add(7, 'days').toDate()
        }
        : null,
      sisteDeltakelsesmengde: deltakelseProsent
        ? {
          dagerPerUke: null,
          deltakelsesprosent: 42,
          gyldigFra: dayjs().add(7, 'days').toDate()
        }
        : null
    },
    aktivEndring,
    ulesteEndringer,
    svarFraNav: ulesteEndringer.find(ulestEndringErSvarFraNav) ? true : false,
    oppdateringFraNav: ulesteEndringer.find(ulestEndringErOppdateringFraNav) ? true : false,
    nyDeltaker: ulesteEndringer.find(ulestEndringErNyeDeltaker) ? true : false
  }
}

const innholdselementer = [
  {
    tekst: 'Støtte til jobbsøking',
    innholdskode: 'type1',
    beskrivelse: null
  },
  {
    tekst: 'Karriereveiledning',
    innholdskode: 'type2',
    beskrivelse: null
  },
  {
    tekst: 'Kartlegge hvordan helsen din påvirker muligheten din til å jobbe',
    innholdskode: 'type3',
    beskrivelse: null
  },
  {
    tekst:
      'Kartlegge grunnleggende ferdigheter som språk og hvordan du leser, skriver, regner og bruker datamaskin',
    innholdskode: 'type4',
    beskrivelse: null
  },
  {
    tekst: 'Kartlegge dine forventninger til å jobbe',
    innholdskode: 'type5',
    beskrivelse: null
  },
  {
    tekst: 'Veiledning i sosial mestring',
    innholdskode: 'type6',
    beskrivelse: null
  },
  {
    tekst: 'Hjelp til å tilpasse arbeidsoppgaver og arbeidsplassen',
    innholdskode: 'type7',
    beskrivelse: null
  },
  {
    tekst: 'Veiledning til arbeidsgiver',
    innholdskode: 'type8',
    beskrivelse: null
  },
  {
    tekst: 'Oppfølging på arbeidsplassen',
    innholdskode: 'type9',
    beskrivelse: null
  },
  {
    tekst: 'Arbeidspraksis',
    innholdskode: 'type10',
    beskrivelse: null
  },
  {
    tekst: 'Annet',
    innholdskode: 'annet',
    beskrivelse: 'Ønsker å kartlegge arbeidspraksis \nTeste ulike verktøy'
  }
]

function mockInnhold(tiltakskode: Tiltakskode): Deltakelsesinnhold | null {
  if (tiltakskode !== Tiltakskode.ARBFORB) {
    return null
  }

  return {
    ledetekst:
      'Du får tett oppfølging og støtte av en veileder. Sammen Kartlegger dere hvordan din kompetanse, interesser og ferdigheter påvirker muligheten din til å jobbe.',
    innhold: faker.helpers.arrayElements(innholdselementer)
  }
}

const genererBegrunnelse = (fornavn: string) => {
  return `\
${fornavn} har stått uten arbeid en lengre periode på grunn av helseutfordringer. Hen har mye arbeidserfaring og har spisskompetanse innen ledelse i salg og service. Hen har fått god hjelp fra helsevesenet og er nå klar for å starte prosessen med å finne nytt arbeid. ${fornavn} har et ønske om å bytte bransje, men er usikker på hvilke typer jobber som kan være aktuelle. Hen har trolig også behov for å kartlegge om hen har behov for tilrettelegging på arbeidsplassen.

${fornavn} ønsker:
- Yrkes- og karriereveiledning
- Hjelp/sparring på å skrive søknader og intervjutrening
- Hjelp, veiledning og vurdering av nødvendig tilrettelegging på arbeidsplassen

${fornavn} håper at hen raskt kommer i kontakt med mulige arbeidsgivere for å starte å jobbe. Hen tror selv at hen har behov for hjelp i inntil 4 måneder, inklusiv oppfølging på arbeidsplassen.

Nav kan vurdere tilskudd for å kompensere for utgifter arbeidsgiver skulle ha med tilrettelegging.`
}

const mapForlsagTypeTilAktivEndring = (endringsType: ForslagEndringType) => {
  switch (endringsType) {
    case ForslagEndringType.AvsluttDeltakelse:
      return AktivEndring.AvsluttDeltakelse
    case ForslagEndringType.Deltakelsesmengde:
      return AktivEndring.Deltakelsesmengde
    case ForslagEndringType.ForlengDeltakelse:
      return AktivEndring.ForlengDeltakelse
    case ForslagEndringType.IkkeAktuell:
      return AktivEndring.IkkeAktuell
    case ForslagEndringType.Sluttarsak:
      return AktivEndring.Sluttarsak
    case ForslagEndringType.Sluttdato:
      return AktivEndring.Sluttdato
    case ForslagEndringType.Startdato:
      return AktivEndring.Startdato
    case ForslagEndringType.FjernOppstartsdato:
      return AktivEndring.FjernOppstartsdato
  }
}

const erKometMasterForTiltak = (tiltakstype: Tiltakskode) => {
  const tiltakstyperKometErMasterFor = [
    Tiltakskode.ARBFORB,
    Tiltakskode.ARBRRHDAG,
    Tiltakskode.AVKLARAG,
    Tiltakskode.INDOPPFAG,
    Tiltakskode.DIGIOPPARB,
    Tiltakskode.VASV ]
  if (tiltakstyperKometErMasterFor.includes(tiltakstype))
    return true
  return false
}