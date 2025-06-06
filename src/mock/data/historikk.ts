import {
  ArrangorEndringsType,
  DeltakerHistorikkListe,
  DeltakerHistorikkStatus,
  EndringType,
  Oppstartstype,
  TiltakskoordinatorEndringsType
} from '../../api/data/historikk'
import {
  ForslagEndringAarsakType,
  ForslagEndringType,
  ForslagStatusType,
  HistorikkType
} from '../../api/data/forslag'
import dayjs from 'dayjs'
import nb from 'dayjs/locale/nb'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { randomUuid } from '../utils/faker'
import { Vurderingstype } from '../../api/data/deltaker'
import { DeltakerStatusAarsakType } from '../../api/data/deltakerStatusArsak'

dayjs.locale(nb)
dayjs.extend(customParseFormat)

export const mockDeltakerHistorikk = (): DeltakerHistorikkListe => {
  return [
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.EndreSluttarsak,
        aarsak: { type: DeltakerStatusAarsakType.IKKE_MOTT, beskrivelse: null },
        begrunnelse: null
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'Nav Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: {
        id: randomUuid(),
        type: HistorikkType.Forslag,
        opprettet: dayjs().toDate(),
        begrunnelse: null,
        arrangorNavn: 'Muligheter As',
        endring: {
          type: ForslagEndringType.Sluttarsak,
          aarsak: {
            type: ForslagEndringAarsakType.IkkeMott
          }
        },
        status: {
          type: ForslagStatusType.Godkjent,
          godkjent: dayjs().toDate()
        }
      }
    },
    {
      id: randomUuid(),
      type: HistorikkType.Forslag,
      opprettet: dayjs().toDate(),
      begrunnelse: 'Har ikke møtt opp',
      arrangorNavn: 'Muligheter As',
      endring: {
        type: ForslagEndringType.IkkeAktuell,
        aarsak: {
          type: ForslagEndringAarsakType.IkkeMott
        }
      },
      status: {
        type: ForslagStatusType.Erstattet,
        erstattet: dayjs().toDate()
      }
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.EndreSluttdato,
        sluttdato: dayjs().toDate(),
        begrunnelse: null
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'Nav Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: null
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.FjernOppstartsdato,
        begrunnelse: 'Fordi vi er enige om at det er for tidlig'
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'Nav Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: {
        id: randomUuid(),
        type: HistorikkType.Forslag,
        opprettet: dayjs().toDate(),
        begrunnelse: 'Trenger mer tid før oppstart',
        arrangorNavn: 'Muligheter As',
        endring: {
          type: ForslagEndringType.FjernOppstartsdato
        },
        status: {
          type: ForslagStatusType.Godkjent,
          godkjent: dayjs().toDate()
        }
      }
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.EndreStartdato,
        sluttdato: dayjs().toDate(),
        startdato: dayjs().toDate(),
        begrunnelse: null
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'Nav Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: {
        id: randomUuid(),
        type: HistorikkType.Forslag,
        opprettet: dayjs().toDate(),
        begrunnelse: 'Trenger mer tid',
        arrangorNavn: 'Muligheter As',
        endring: {
          type: ForslagEndringType.Startdato,
          sluttdato: dayjs().add(4, 'month').toDate(),
          startdato: dayjs().add(1, 'month').toDate()
        },
        status: {
          type: ForslagStatusType.Godkjent,
          godkjent: dayjs().toDate()
        }
      }
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.ReaktiverDeltakelse,
        reaktivertDato: dayjs().toDate(),
        begrunnelse:
          'Det var en feil at deltakelsen ble satt til ikke aktuell, dette er nå rettet.'
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'Nav Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: null
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.AvsluttDeltakelse,
        aarsak: {
          type: DeltakerStatusAarsakType.FATT_JOBB,
          beskrivelse: null
        },
        sluttdato: dayjs().toDate(),
        begrunnelse: null,
        harFullfort: false,
        oppstartstype: Oppstartstype.LOPENDE
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'Nav Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: {
        id: randomUuid(),
        type: HistorikkType.Forslag,
        opprettet: dayjs().toDate(),
        begrunnelse: 'Trenger mer tid',
        arrangorNavn: 'Muligheter As',
        endring: {
          type: ForslagEndringType.AvsluttDeltakelse,
          sluttdato: dayjs().add(1, 'month').toDate(),
          aarsak: {
            type: ForslagEndringAarsakType.FattJobb
          },
          harDeltatt: null,
          harFullfort: null
        },
        status: {
          type: ForslagStatusType.Godkjent,
          godkjent: dayjs().toDate()
        }
      }
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.IkkeAktuell,
        aarsak: {
          type: DeltakerStatusAarsakType.FATT_JOBB,
          beskrivelse: null
        },
        begrunnelse: null
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'Nav Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: null
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.ForlengDeltakelse,
        sluttdato: dayjs().add(1, 'month').toDate(),
        begrunnelse: 'Forlenger fordi vi må'
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'Nav Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: {
        id: randomUuid(),
        type: HistorikkType.Forslag,
        opprettet: dayjs().toDate(),
        begrunnelse: 'Trenger mer tid',
        arrangorNavn: 'Muligheter As',
        endring: {
          type: ForslagEndringType.ForlengDeltakelse,
          sluttdato: dayjs().add(1, 'month').toDate()
        },
        status: {
          type: ForslagStatusType.Godkjent,
          godkjent: dayjs().toDate()
        }
      }
    },
    {
      id: randomUuid(),
      type: HistorikkType.Forslag,
      opprettet: dayjs().toDate(),
      begrunnelse: 'Trenger mer tid til hjelp',
      arrangorNavn: 'Muligheter As',
      endring: {
        type: ForslagEndringType.ForlengDeltakelse,
        sluttdato: dayjs().add(1, 'month').toDate()
      },
      status: {
        type: ForslagStatusType.Avvist,
        avvist: dayjs().toDate(),
        avvistAv: 'Navn Navnesen',
        avvistAvEnhet: 'Nav Fredrikstad',
        begrunnelseFraNav: 'Kan ikke forlenge så lenge'
      }
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.EndreDeltakelsesmengde,
        begrunnelse: 'Det er ok.',
        deltakelsesprosent: 80,
        dagerPerUke: 4,
        gyldigFra: dayjs().subtract(1, 'day').toDate()
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'Nav Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: {
        id: randomUuid(),
        type: HistorikkType.Forslag,
        opprettet: dayjs().toDate(),
        begrunnelse: 'Trenger mer tid til hjelp',
        arrangorNavn: 'Muligheter As',
        endring: {
          type: ForslagEndringType.Deltakelsesmengde,
          deltakelsesprosent: 80,
          dagerPerUke: 4,
          gyldigFra: dayjs().subtract(1, 'day').toDate()
        },
        status: {
          type: ForslagStatusType.Godkjent,
          godkjent: dayjs().toDate()
        }
      }
    },
    {
      type: HistorikkType.EndringFraArrangor,
      id: randomUuid(),
      opprettet: dayjs().toDate(),
      arrangorNavn: 'Muligheter AS',
      endring: {
        type: ArrangorEndringsType.LeggTilOppstartsdato,
        startdato: dayjs().toDate(),
        sluttdato: dayjs().add(10, 'months').toDate()
      }
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.EndreBakgrunnsinformasjon,
        bakgrunnsinformasjon: ''
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'Nav Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: null
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.EndreInnhold,
        ledetekst:
          'Arbeidsforberedende trening er et tilbud for deg som først ønsker å jobbe i et tilrettelagt arbeidsmiljø. Du får veiledning og støtte av en veileder. Sammen kartlegger dere hvordan din kompetanse, interesser og ferdigheter påvirker muligheten din til å jobbe.',
        innhold: [
          {
            tekst: 'Støtte til jobbsøking',
            innholdskode: 'type1',
            beskrivelse: null
          },
          {
            tekst: 'Karriereveiledning',
            innholdskode: 'type2',
            beskrivelse: null
          }
        ]
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'Nav Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: null
    },
    {
      type: HistorikkType.Vedtak,
      fattet: dayjs().subtract(10, 'days').toDate(),
      bakgrunnsinformasjon: 'Bakgrunnsinformasjon',
      deltakelsesprosent: 100,
      dagerPerUke: null,
      fattetAvNav: true,
      deltakelsesinnhold: {
        ledetekst:
          'Du får tett oppfølging og støtte av en veileder. Sammen kartlegger dere hvordan din kompetanse, interesser og ferdigheter påvirker muligheten din til å jobbe.',
        innhold: [
          {
            tekst: 'Støtte til jobbsøking',
            innholdskode: 'type1',
            beskrivelse: null
          }
        ]
      },
      opprettetAv: 'Navn Navnesen',
      opprettetAvEnhet: 'Nav Fredrikstad',
      opprettet: dayjs().subtract(3, 'day').toDate()
    },
    {
      type: HistorikkType.ImportertFraArena,
      importertDato: dayjs().subtract(10, 'days').toDate(),
      dagerPerUke: null,
      deltakelsesprosent: 100,
      startdato: dayjs().subtract(3, 'day').toDate(),
      sluttdato: dayjs().add(3, 'day').toDate(),
      status: {
        type: DeltakerHistorikkStatus.DELTAR,
        aarsak: null
      }
    }, ...lagHistorikkFellesOppstart()
  ]
}

export const lagHistorikkFellesOppstart = (): DeltakerHistorikkListe => {
  return [
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.AvsluttDeltakelse,
        aarsak: {
          type: DeltakerStatusAarsakType.FATT_JOBB,
          beskrivelse: null
        },
        sluttdato: dayjs().toDate(),
        begrunnelse: null,
        harFullfort: true,
        oppstartstype: Oppstartstype.FELLES
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'Nav Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: null
    },
    {
      type: HistorikkType.EndringFraTiltakskoordinator,
      endring: {
        type: TiltakskoordinatorEndringsType.Avslag,
        aarsak: {
          type: DeltakerStatusAarsakType.KURS_FULLT,
          beskrivelse: null
        },
        begrunnelse: 'For mange kandidater'
      },
      endret: dayjs().subtract(5, 'day').toDate(),
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'Nav Fredrikstad'
    },
    {
      type: HistorikkType.EndringFraTiltakskoordinator,
      endring: {
        type: TiltakskoordinatorEndringsType.TildelPlass
      },
      endret: dayjs().subtract(17, 'day').toDate(),
      endretAv: 'Navn Navnesen'
    },
    {
      type: HistorikkType.EndringFraTiltakskoordinator,
      endring: {
        type: TiltakskoordinatorEndringsType.SettPaaVenteliste
      },
      endret: dayjs().subtract(17, 'day').toDate(),
      endretAv: 'Nav',
      endretAvEnhet: 'Nav Fredrikstad'
    },
    {
      type: HistorikkType.VurderingFraArrangor,
      vurderingstype: Vurderingstype.OPPFYLLER_IKKE_KRAVENE,
      begrunnelse: 'Oppfyller ikke kravene',
      opprettetDato: dayjs().subtract(17, 'day').toDate(),
      endretAv: 'Navn Navnesen'
    },
    {
      type: HistorikkType.EndringFraTiltakskoordinator,
      endring: {
        type: TiltakskoordinatorEndringsType.DelMedArrangor
      },
      endret: dayjs().subtract(17, 'day').toDate(),
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'Nav Fredrikstad'
    },
    {
      type: HistorikkType.InnsokPaaFellesOppstart,
      innsokt: dayjs().subtract(10, 'days').toDate(),
      innsoktAv: 'Navn Navnesen',
      innsoktAvEnhet: 'Nav Fredrikstad',
      utkastDelt: dayjs().subtract(3, 'day').toDate(),
      utkastGodkjentAvNav: false,
      deltakelsesinnholdVedInnsok: null
    }
  ]
}
