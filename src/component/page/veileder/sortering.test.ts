import { describe, it, expect } from 'vitest'

import { VeiledersDeltaker, TiltakDeltakerStatus } from '../../../api/data/deltaker'
import { DeltakerKolonne, sorterVeiledersDeltakere } from './sortering'
import { Veiledertype } from '../../../api/data/veileder'

// Mock data helpers
const createMockVeiledersDeltaker = (
  overrides: Partial<VeiledersDeltaker> = {}
): VeiledersDeltaker => ({
  id: '123e4567-e89b-12d3-a456-426614174000',
  fornavn: 'Test',
  mellomnavn: null,
  etternavn: 'Person',
  fodselsnummer: '01010150000',
  startDato: new Date('2024-01-01'),
  sluttDato: null,
  status: {
    type: TiltakDeltakerStatus.DELTAR,
    endretDato: new Date('2024-01-01'),
    aarsak: null
  },
  deltakerliste: {
    id: '456',
    type: 'Tiltak',
    navn: 'Test Program'
  },
  veiledertype: Veiledertype.VEILEDER,
  aktivEndring: null,
  sistEndret: new Date('2024-01-01'),
  adressebeskyttet: false,
  svarFraNav: false,
  oppdateringFraNav: false,
  nyDeltaker: false,
  erUnderOppfolging: false,
  ...overrides
})

describe('sorterVeiledersDeltakere', () => {
  describe('NAVN-sortering (stigende)', () => {
    it('skal sortere korrekt med blandet stor/liten bokstav - VISER FEILEN', () => {
      const deltakere = [
        createMockVeiledersDeltaker({ fornavn: 'Alice', etternavn: 'Abr' }),
        createMockVeiledersDeltaker({ fornavn: 'Bob', etternavn: 'AVR' }),
        createMockVeiledersDeltaker({ fornavn: 'Charlie', etternavn: 'And' })
      ]

      const result = sorterVeiledersDeltakere(deltakere, {
        orderBy: DeltakerKolonne.NAVN,
        direction: 'ascending'
      })

      expect(result[0].etternavn).toBe('Abr')
      expect(result[1].etternavn).toBe('And')
      expect(result[2].etternavn).toBe('AVR')
    })

    it('skal sortere etter etternavn i stigende rekkefølge', () => {
      const deltakere = [
        createMockVeiledersDeltaker({ fornavn: 'Alice', etternavn: 'Avramsen' }),
        createMockVeiledersDeltaker({ fornavn: 'Bob', etternavn: 'Abramsen' }),
        createMockVeiledersDeltaker({ fornavn: 'Charlie', etternavn: 'Anderssen' })
      ]

      const result = sorterVeiledersDeltakere(deltakere, {
        orderBy: DeltakerKolonne.NAVN,
        direction: 'ascending'
      })

      // Skal sorteres: Abramsen, Anderssen, Avramsen (uten hensyn til stor/liten)
      expect(result[0].etternavn).toBe('Abramsen')
      expect(result[1].etternavn).toBe('Anderssen')
      expect(result[2].etternavn).toBe('Avramsen')
    })

    it('skal sortere etter fornavn når etternavn er likt', () => {
      const deltakere = [
        createMockVeiledersDeltaker({ fornavn: 'Zebulon', etternavn: 'Smith' }),
        createMockVeiledersDeltaker({ fornavn: 'Alice', etternavn: 'Smith' }),
        createMockVeiledersDeltaker({ fornavn: 'Marcus', etternavn: 'Smith' })
      ]

      const result = sorterVeiledersDeltakere(deltakere, {
        orderBy: DeltakerKolonne.NAVN,
        direction: 'ascending'
      })

      // Skal sorteres etter fornavn: Alice, Marcus, Zebulon
      expect(result[0].fornavn).toBe('Alice')
      expect(result[1].fornavn).toBe('Marcus')
      expect(result[2].fornavn).toBe('Zebulon')
    })

    it('skal håndtere blandet stor/liten bokstav korrekt', () => {
      const deltakere = [
        createMockVeiledersDeltaker({ fornavn: 'Test', etternavn: 'åBerg' }),
        createMockVeiledersDeltaker({ fornavn: 'Test', etternavn: 'Aberg' }),
        createMockVeiledersDeltaker({ fornavn: 'Test', etternavn: 'aBerg' })
      ]

      const result = sorterVeiledersDeltakere(deltakere, {
        orderBy: DeltakerKolonne.NAVN,
        direction: 'ascending'
      })

      // All should convert to lowercase before comparison
      expect(result).toHaveLength(3)
    })
  })

  describe('NAVN-sortering (synkende)', () => {
    it('skal sortere etter etternavn i synkende rekkefølge', () => {
      const deltakere = [
        createMockVeiledersDeltaker({ fornavn: 'Alice', etternavn: 'Abramsen' }),
        createMockVeiledersDeltaker({ fornavn: 'Bob', etternavn: 'Anderssen' }),
        createMockVeiledersDeltaker({ fornavn: 'Charlie', etternavn: 'Avramsen' })
      ]

      const result = sorterVeiledersDeltakere(deltakere, {
        orderBy: DeltakerKolonne.NAVN,
        direction: 'descending'
      })

      // Skal sorteres: Avramsen, Anderssen, Abramsen
      expect(result[0].etternavn).toBe('Avramsen')
      expect(result[1].etternavn).toBe('Anderssen')
      expect(result[2].etternavn).toBe('Abramsen')
    })
  })

  describe('FODSELSNUMMER-sortering', () => {
    it('skal sortere etter fødselsnummer i stigende rekkefølge', () => {
      const deltakere = [
        createMockVeiledersDeltaker({ fodselsnummer: '03010190000' }),
        createMockVeiledersDeltaker({ fodselsnummer: '01010190000' }),
        createMockVeiledersDeltaker({ fodselsnummer: '02010190000' })
      ]

      const result = sorterVeiledersDeltakere(deltakere, {
        orderBy: DeltakerKolonne.FODSELSNUMMER,
        direction: 'ascending'
      })

      expect(result[0].fodselsnummer).toBe('01010190000')
      expect(result[1].fodselsnummer).toBe('02010190000')
      expect(result[2].fodselsnummer).toBe('03010190000')
    })
  })

  describe('STATUS-sortering', () => {
    it('skal sortere etter status i stigende rekkefølge', () => {
      const deltakere = [
        createMockVeiledersDeltaker({ status: { type: TiltakDeltakerStatus.DELTAR, endretDato: new Date(), aarsak: null } }),
        createMockVeiledersDeltaker({ status: { type: TiltakDeltakerStatus.AVBRUTT, endretDato: new Date(), aarsak: null } }),
        createMockVeiledersDeltaker({ status: { type: TiltakDeltakerStatus.FULLFORT, endretDato: new Date(), aarsak: null } })
      ]

      const result = sorterVeiledersDeltakere(deltakere, {
        orderBy: DeltakerKolonne.STATUS,
        direction: 'ascending'
      })

      expect(result[0].status.type).toBe(TiltakDeltakerStatus.AVBRUTT)
    })
  })

  describe('OPPSTART-sortering', () => {
    it('skal sortere etter startdato i stigende rekkefølge', () => {
      const date1 = new Date('2024-01-15')
      const date2 = new Date('2024-02-01')
      const date3 = new Date('2024-01-01')

      const deltakere = [
        createMockVeiledersDeltaker({ startDato: date1 }),
        createMockVeiledersDeltaker({ startDato: date2 }),
        createMockVeiledersDeltaker({ startDato: date3 })
      ]

      const result = sorterVeiledersDeltakere(deltakere, {
        orderBy: DeltakerKolonne.OPPSTART,
        direction: 'ascending'
      })

      expect(result[0].startDato).toEqual(date3)
      expect(result[1].startDato).toEqual(date1)
      expect(result[2].startDato).toEqual(date2)
    })

    it('skal håndtere null startdato', () => {
      const deltakere = [
        createMockVeiledersDeltaker({ startDato: new Date('2024-01-15') }),
        createMockVeiledersDeltaker({ startDato: null }),
        createMockVeiledersDeltaker({ startDato: new Date('2024-02-01') })
      ]

      const result = sorterVeiledersDeltakere(deltakere, {
        orderBy: DeltakerKolonne.OPPSTART,
        direction: 'ascending'
      })

      expect(result).toHaveLength(3)
    })
  })

  describe('SLUTT-sortering', () => {
    it('skal sortere etter sluttdato i stigende rekkefølge', () => {
      const date1 = new Date('2024-06-15')
      const date2 = new Date('2024-12-01')
      const date3 = new Date('2024-03-01')

      const deltakere = [
        createMockVeiledersDeltaker({ sluttDato: date1 }),
        createMockVeiledersDeltaker({ sluttDato: date2 }),
        createMockVeiledersDeltaker({ sluttDato: date3 })
      ]

      const result = sorterVeiledersDeltakere(deltakere, {
        orderBy: DeltakerKolonne.SLUTT,
        direction: 'ascending'
      })

      expect(result[0].sluttDato).toEqual(date3)
      expect(result[1].sluttDato).toEqual(date1)
      expect(result[2].sluttDato).toEqual(date2)
    })
  })

  describe('SIST_ENDRET-sortering', () => {
    it('skal sortere etter sistEndret i stigende rekkefølge', () => {
      const date1 = new Date('2024-01-15')
      const date2 = new Date('2024-02-01')
      const date3 = new Date('2024-01-01')

      const deltakere = [
        createMockVeiledersDeltaker({ sistEndret: date1 }),
        createMockVeiledersDeltaker({ sistEndret: date2 }),
        createMockVeiledersDeltaker({ sistEndret: date3 })
      ]

      const result = sorterVeiledersDeltakere(deltakere, {
        orderBy: DeltakerKolonne.SIST_ENDRET,
        direction: 'ascending'
      })

      expect(result[0].sistEndret).toEqual(date3)
      expect(result[1].sistEndret).toEqual(date1)
      expect(result[2].sistEndret).toEqual(date2)
    })
  })

  describe('Ingen sortering (undefined)', () => {
    it('skal sortere etter status endretDato synkende når ingen sortering er gitt', () => {
      const date1 = new Date('2024-01-01')
      const date2 = new Date('2024-01-05')
      const date3 = new Date('2024-01-03')

      const deltakere = [
        createMockVeiledersDeltaker({
          etternavn: 'A',
          status: { type: TiltakDeltakerStatus.DELTAR, endretDato: date1, aarsak: null }
        }),
        createMockVeiledersDeltaker({
          etternavn: 'B',
          status: { type: TiltakDeltakerStatus.DELTAR, endretDato: date2, aarsak: null }
        }),
        createMockVeiledersDeltaker({
          etternavn: 'C',
          status: { type: TiltakDeltakerStatus.DELTAR, endretDato: date3, aarsak: null }
        })
      ]

      const result = sorterVeiledersDeltakere(deltakere, undefined)

      // Skal sorteres etter endretDato synkende: date2, date3, date1
      expect(result[0].status.endretDato).toEqual(date2)
      expect(result[1].status.endretDato).toEqual(date3)
      expect(result[2].status.endretDato).toEqual(date1)
    })
  })
})
