import { faker } from '@faker-js/faker/locale/nb_NO'

import {
  AktivEndring,
  AktivEndringForDeltaker,
  KoordinatorForDeltakerliste,
  MineDeltakerlister,
  VeiledersDeltaker
} from '../../api/data/deltaker'
import {
  Gjennomforing,
  Koordinator,
  TiltakGjennomforingStatus,
  Tiltakskode
} from '../../api/data/tiltak'
import { Veiledertype } from '../../api/data/veileder'
import { randBetween } from '../utils/faker'
import { arrangorForGjennomforing } from './arrangor'
import { MockTiltakDeltaker } from './brukere'
import { gjennomforingId } from './id'

export type MockGjennomforing = Gjennomforing

interface GjennomforingInfo {
  gjennomforingNavn: string
  tiltakskode: Tiltakskode
  tiltaksnavn: string
  status: TiltakGjennomforingStatus
}

export const deltakerlisteErKurs = (tiltakskode: Tiltakskode): boolean => {
  return [
    Tiltakskode.GRUPPE_FAG_OG_YRKESOPPLAERING,
    Tiltakskode.JOBBKLUBB,
    Tiltakskode.GRUPPE_ARBEIDSMARKEDSOPPLAERING
  ].includes(tiltakskode)
}

export const gjennomforingInfoListe: GjennomforingInfo[] = [
  {
    gjennomforingNavn:
      'Oppfølging Åsedalen for alle mennesker og andre. Dette er bare en lang tekst for å sjekke om ting bryter riktig.',
    tiltakskode: Tiltakskode.OPPFOLGING,
    tiltaksnavn: 'Oppfølging',
    status: TiltakGjennomforingStatus.GJENNOMFORES
  },
  {
    gjennomforingNavn: 'Oppfølging Region Østvest',
    tiltakskode: Tiltakskode.OPPFOLGING,
    tiltaksnavn: 'Oppfølging',
    status: TiltakGjennomforingStatus.GJENNOMFORES
  },
  {
    gjennomforingNavn: 'Avklaring Region Test',
    tiltakskode: Tiltakskode.AVKLARING,
    tiltaksnavn: 'Avklaring',
    status: TiltakGjennomforingStatus.GJENNOMFORES
  },
  {
    gjennomforingNavn: 'AFT Region Vestøst',
    tiltakskode: Tiltakskode.ARBEIDSFORBEREDENDE_TRENING,
    tiltaksnavn: 'Arbeidsforberedende trening (AFT)',
    status: TiltakGjennomforingStatus.GJENNOMFORES
  },
  {
    gjennomforingNavn: 'Oppfølging Region Nordsør',
    tiltakskode: Tiltakskode.OPPFOLGING,
    tiltaksnavn: 'Oppfølging',
    status: TiltakGjennomforingStatus.PLANLAGT
  },
  {
    gjennomforingNavn: 'Arbeidsrettet rehabilitering Region Nordsør',
    tiltakskode: Tiltakskode.ARBEIDSRETTET_REHABILITERING,
    tiltaksnavn: 'Arbeidsrettet rehabilitering',
    status: TiltakGjennomforingStatus.GJENNOMFORES
  },
  {
    gjennomforingNavn: 'Digitalt jobbsøkerkurs Region Nordsør',
    tiltakskode: Tiltakskode.DIGITALT_OPPFOLGINGSTILTAK,
    tiltaksnavn: 'Digitalt jobbsøkerkurs for arbeidsledige',
    status: TiltakGjennomforingStatus.GJENNOMFORES
  },
  {
    gjennomforingNavn:
      'Varig tilrettelagt arbeid i skjermet virksomhet Region Nordsør',
    tiltakskode: Tiltakskode.VARIG_TILRETTELAGT_ARBEID_SKJERMET,
    tiltaksnavn: 'Varig tilrettelagt arbeid i skjermet virksomhet ',
    status: TiltakGjennomforingStatus.GJENNOMFORES
  },
  {
    gjennomforingNavn: 'Jobbklubb i tjenesteområde 1',
    tiltakskode: Tiltakskode.JOBBKLUBB,
    tiltaksnavn: 'Jobbklubb',
    status: TiltakGjennomforingStatus.GJENNOMFORES
  },
  {
    gjennomforingNavn: 'Gruppe AMO Nordvest',
    tiltakskode: Tiltakskode.GRUPPE_ARBEIDSMARKEDSOPPLAERING,
    tiltaksnavn: 'Gruppe AMO',
    status: TiltakGjennomforingStatus.GJENNOMFORES
  },
  {
    gjennomforingNavn: 'Gruppe AMO Sørvest',
    tiltakskode: Tiltakskode.GRUPPE_ARBEIDSMARKEDSOPPLAERING,
    tiltaksnavn: 'Gruppe AMO',
    status: TiltakGjennomforingStatus.GJENNOMFORES
  },
  {
    gjennomforingNavn:
      'Gruppe fag- og yrkesopplæring VGS og høyere yrkesfaglig utdanning',
    tiltakskode: Tiltakskode.GRUPPE_FAG_OG_YRKESOPPLAERING,
    tiltaksnavn: 'Gruppe fag- og yrkesopplæring',
    status: TiltakGjennomforingStatus.GJENNOMFORES
  }
]

export const lagMockGjennomforinger = (
  gjennomforingInfoer: GjennomforingInfo[]
): MockGjennomforing[] => {
  const gjennomforinger: Gjennomforing[] = []

  gjennomforingInfoer.forEach((t) =>
    gjennomforinger.push(lagMockGjennomforing(t))
  )

  return gjennomforinger
}

const lagMockGjennomforing = (
  gjennomforingInfo: GjennomforingInfo
): MockGjennomforing => {
  return {
    id: gjennomforingId(),
    navn: gjennomforingInfo.gjennomforingNavn,
    status: gjennomforingInfo.status,
    tiltak: {
      tiltaksnavn: gjennomforingInfo.tiltaksnavn,
      tiltakskode: gjennomforingInfo.tiltakskode
    },
    startDato: faker.date.past(),
    sluttDato: faker.date.future(),
    arrangor: arrangorForGjennomforing()
  }
}

export const lagMockKoordinatorer = (): Koordinator[] => {
  return [
    {
      fornavn: 'Per',
      mellomnavn: null,
      etternavn: 'Koordinatorsen'
    },
    {
      fornavn: 'Karoline',
      mellomnavn: 'Ann',
      etternavn: 'Koordinatorsdottir'
    }
  ]
}

export const lagMockMineDeltakerlister = (
  gjennomforinger: MockGjennomforing[],
  veiledersDeltakere: VeiledersDeltaker[]
): MineDeltakerlister => {
  const deltakerlister: KoordinatorForDeltakerliste[] = []
  gjennomforinger.forEach((t) =>
    deltakerlister.push(lagMockKoordinatorForDeltakerliste(t))
  )

  const antallVeilederFor = veiledersDeltakere.filter(
    (deltaker) => deltaker.veiledertype === Veiledertype.VEILEDER
  ).length
  const antallMedveilederFor = veiledersDeltakere.filter(
    (deltaker) => deltaker.veiledertype === Veiledertype.MEDVEILEDER
  ).length

  return {
    veilederFor: {
      veilederFor: antallVeilederFor,
      medveilederFor: antallMedveilederFor
    },
    koordinatorFor: {
      deltakerlister: deltakerlister
    }
  }
}

const lagMockKoordinatorForDeltakerliste = (
  gjennomforing: MockGjennomforing
): KoordinatorForDeltakerliste => {
  return {
    id: gjennomforing.id,
    navn: gjennomforing.navn,
    type: gjennomforing.tiltak.tiltaksnavn,
    startdato: gjennomforing.startDato,
    sluttdato: gjennomforing.sluttDato,
    erKurs: deltakerlisteErKurs(gjennomforing.tiltak.tiltakskode)
  }
}

export const lagMockDeltakerlisteVeileder = (
  deltakere: MockTiltakDeltaker[]
): VeiledersDeltaker[] => {
  const deltakerlisteVeileder: VeiledersDeltaker[] = []
  deltakere.forEach((d) =>
    deltakerlisteVeileder.push(lagMockVeiledersDeltaker(d))
  )

  return deltakerlisteVeileder
}

export const lagMockAktivEndring = (): null | AktivEndringForDeltaker => {
  const i = randBetween(0, 10)
  if (i < 3) return null

  let endingsType = AktivEndring.ForlengDeltakelse

  if (i < 5) {
    endingsType = AktivEndring.ForlengDeltakelse
  } else if (i < 7) {
    endingsType = AktivEndring.AvsluttDeltakelse
  } else if (i < 8) {
    endingsType = AktivEndring.IkkeAktuell
  } else if (i < 9) {
    endingsType = AktivEndring.ForlengDeltakelse
  } else if (i < 10) {
    endingsType = AktivEndring.Deltakelsesmengde
  }

  return {
    endingsType,
    sendt: faker.date.recent()
  }
}

const lagMockVeiledersDeltaker = (
  deltaker: MockTiltakDeltaker
): VeiledersDeltaker => {
  return {
    id: deltaker.id,
    fornavn: deltaker.fornavn,
    mellomnavn: deltaker.mellomnavn,
    etternavn: deltaker.etternavn,
    fodselsnummer: deltaker.fodselsnummer,
    startDato: deltaker.startDato,
    sluttDato: deltaker.sluttDato,
    status: deltaker.status,
    deltakerliste: {
      id: deltaker.gjennomforing.id,
      type: deltaker.gjennomforing.tiltak.tiltaksnavn,
      navn: deltaker.gjennomforing.navn
    },
    veiledertype: getVeiledertype(),
    aktivEndring: deltaker.aktivEndring ?? null,
    sistEndret: faker.date.recent(),
    adressebeskyttet: deltaker.adressebeskyttet,
    svarFraNav: deltaker.svarFraNav,
    oppdateringFraNav: deltaker.oppdateringFraNav,
    nyDeltaker: deltaker.nyDeltaker,
		erUnderOppfolging: deltaker.erUnderOppfolging,
  }
}

const getVeiledertype = (): Veiledertype => {
  if (randBetween(0, 10) < 3) {
    return Veiledertype.MEDVEILEDER
  } else {
    return Veiledertype.VEILEDER
  }
}

