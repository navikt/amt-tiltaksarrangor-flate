import { describe, it, expect } from 'vitest'

import {
  TiltakDeltaker,
  TiltakDeltakerStatus
} from '../../../../../api/data/deltaker'
import { Veiledertype } from '../../../../../api/data/veileder'
import { DeltakerKolonne, sorterDeltakere } from './sortering'

// Mock data helpers
const createMockDeltaker = (
  overrides: Partial<TiltakDeltaker> = {}
): TiltakDeltaker => ({
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
  soktInnDato: new Date('2023-12-01'),
  veiledere: [
    {
      ansattId: '123e4567-e89b-12d3-a456-426614174001',
      deltakerId: '123e4567-e89b-12d3-a456-426614174000',
      fornavn: 'Veileder',
      mellomnavn: null,
      etternavn: 'Testersen',
      veiledertype: Veiledertype.VEILEDER
    }
  ],
  navKontor: null,
  gjeldendeVurderingFraArrangor: null,
  adressebeskyttet: false,
  erVeilederForDeltaker: false,
  aktivEndring: null,
  svarFraNav: false,
  oppdateringFraNav: false,
  nyDeltaker: false,
  ...overrides
})

describe('sorterDeltakere', () => {
  describe('NAVN-sortering (stigende)', () => {
    it('skal sortere korrekt med blandet stor/liten bokstav', () => {
      const deltakere = [
        createMockDeltaker({ fornavn: 'Alice', etternavn: 'Abr' }),
        createMockDeltaker({ fornavn: 'Bob', etternavn: 'AVR' }),
        createMockDeltaker({ fornavn: 'Charlie', etternavn: 'And' })
      ]

      const result = sorterDeltakere(deltakere, {
        orderBy: DeltakerKolonne.NAVN,
        direction: 'ascending'
      })

      expect(result[0].etternavn).toBe('Abr')
      expect(result[1].etternavn).toBe('And')
      expect(result[2].etternavn).toBe('AVR')
    })

    it('skal sortere etter etternavn i stigende rekkefølge', () => {
      const deltakere = [
        createMockDeltaker({ fornavn: 'Alice', etternavn: 'Avramsen' }),
        createMockDeltaker({ fornavn: 'Bob', etternavn: 'Abramsen' }),
        createMockDeltaker({ fornavn: 'Charlie', etternavn: 'Anderssen' })
      ]

      const result = sorterDeltakere(deltakere, {
        orderBy: DeltakerKolonne.NAVN,
        direction: 'ascending'
      })

      // Should be sorted: Abramsen, Anderssen, Avramsen (case-insensitive)
      expect(result[0].etternavn).toBe('Abramsen')
      expect(result[1].etternavn).toBe('Anderssen')
      expect(result[2].etternavn).toBe('Avramsen')
    })

    it('skal sortere etter fornavn når etternavn er likt', () => {
      const deltakere = [
        createMockDeltaker({ fornavn: 'Zebulon', etternavn: 'Smith' }),
        createMockDeltaker({ fornavn: 'Alice', etternavn: 'Smith' }),
        createMockDeltaker({ fornavn: 'Marcus', etternavn: 'Smith' })
      ]

      const result = sorterDeltakere(deltakere, {
        orderBy: DeltakerKolonne.NAVN,
        direction: 'ascending'
      })

      // Should be sorted by fornavn: Alice, Marcus, Zebulon
      expect(result[0].fornavn).toBe('Alice')
      expect(result[1].fornavn).toBe('Marcus')
      expect(result[2].fornavn).toBe('Zebulon')
    })

    it('skal håndtere blandet stor/liten bokstav korrekt', () => {
      const deltakere = [
        createMockDeltaker({ fornavn: 'Test', etternavn: 'åBerg' }),
        createMockDeltaker({ fornavn: 'Test', etternavn: 'Aberg' }),
        createMockDeltaker({ fornavn: 'Test', etternavn: 'aBerg' })
      ]

      const result = sorterDeltakere(deltakere, {
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
        createMockDeltaker({ fornavn: 'Alice', etternavn: 'Abramsen' }),
        createMockDeltaker({ fornavn: 'Bob', etternavn: 'Anderssen' }),
        createMockDeltaker({ fornavn: 'Charlie', etternavn: 'Avramsen' })
      ]

      const result = sorterDeltakere(deltakere, {
        orderBy: DeltakerKolonne.NAVN,
        direction: 'descending'
      })

      // Should be sorted: Avramsen, Anderssen, Abramsen
      expect(result[0].etternavn).toBe('Avramsen')
      expect(result[1].etternavn).toBe('Anderssen')
      expect(result[2].etternavn).toBe('Abramsen')
    })
  })

  describe('FODSELSNUMMER-sortering', () => {
    it('skal sortere etter fødselsnummer i stigende rekkefølge', () => {
      const deltakere = [
        createMockDeltaker({ fodselsnummer: '03010190000' }),
        createMockDeltaker({ fodselsnummer: '01010190000' }),
        createMockDeltaker({ fodselsnummer: '02010190000' })
      ]

      const result = sorterDeltakere(deltakere, {
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
        createMockDeltaker({
          status: {
            type: TiltakDeltakerStatus.DELTAR,
            endretDato: new Date(),
            aarsak: null
          }
        }),
        createMockDeltaker({
          status: {
            type: TiltakDeltakerStatus.AVBRUTT,
            endretDato: new Date(),
            aarsak: null
          }
        }),
        createMockDeltaker({
          status: {
            type: TiltakDeltakerStatus.FULLFORT,
            endretDato: new Date(),
            aarsak: null
          }
        })
      ]

      const result = sorterDeltakere(deltakere, {
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
        createMockDeltaker({ startDato: date1 }),
        createMockDeltaker({ startDato: date2 }),
        createMockDeltaker({ startDato: date3 })
      ]

      const result = sorterDeltakere(deltakere, {
        orderBy: DeltakerKolonne.OPPSTART,
        direction: 'ascending'
      })

      expect(result[0].startDato).toEqual(date3)
      expect(result[1].startDato).toEqual(date1)
      expect(result[2].startDato).toEqual(date2)
    })

    it('skal håndtere null startdato', () => {
      const deltakere = [
        createMockDeltaker({ startDato: new Date('2024-01-15') }),
        createMockDeltaker({ startDato: null }),
        createMockDeltaker({ startDato: new Date('2024-02-01') })
      ]

      const result = sorterDeltakere(deltakere, {
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
        createMockDeltaker({ sluttDato: date1 }),
        createMockDeltaker({ sluttDato: date2 }),
        createMockDeltaker({ sluttDato: date3 })
      ]

      const result = sorterDeltakere(deltakere, {
        orderBy: DeltakerKolonne.SLUTT,
        direction: 'ascending'
      })

      expect(result[0].sluttDato).toEqual(date3)
      expect(result[1].sluttDato).toEqual(date1)
      expect(result[2].sluttDato).toEqual(date2)
    })
  })

  describe('SOKT_INN-sortering', () => {
    it('skal sortere etter søktInnDato i stigende rekkefølge', () => {
      const date1 = new Date('2023-12-15')
      const date2 = new Date('2023-11-01')
      const date3 = new Date('2024-01-01')

      const deltakere = [
        createMockDeltaker({ soktInnDato: date1 }),
        createMockDeltaker({ soktInnDato: date2 }),
        createMockDeltaker({ soktInnDato: date3 })
      ]

      const result = sorterDeltakere(deltakere, {
        orderBy: DeltakerKolonne.SOKT_INN,
        direction: 'ascending'
      })

      expect(result[0].soktInnDato).toEqual(date2)
      expect(result[1].soktInnDato).toEqual(date1)
      expect(result[2].soktInnDato).toEqual(date3)
    })
  })

  describe('VEILEDER-sortering', () => {
    it('skal sortere etter veileder etternavn i stigende rekkefølge', () => {
      const deltakere = [
        createMockDeltaker({
          veiledere: [
            {
              ansattId: '123e4567-e89b-12d3-a456-426614174002',
              deltakerId: '123e4567-e89b-12d3-a456-426614174000',
              veiledertype: Veiledertype.VEILEDER,
              fornavn: 'Test',
              mellomnavn: null,
              etternavn: 'Zebra'
            }
          ]
        }),
        createMockDeltaker({
          veiledere: [
            {
              ansattId: '123e4567-e89b-12d3-a456-426614174001',
              deltakerId: '123e4567-e89b-12d3-a456-426614174000',
              veiledertype: Veiledertype.VEILEDER,
              fornavn: 'Test',
              mellomnavn: null,
              etternavn: 'Anderson'
            }
          ]
        }),
        createMockDeltaker({
          veiledere: [
            {
              ansattId: '123e4567-e89b-12d3-a456-426614174003',
              deltakerId: '123e4567-e89b-12d3-a456-426614174000',
              veiledertype: Veiledertype.VEILEDER,
              fornavn: 'Test',
              mellomnavn: null,
              etternavn: 'Moe'
            }
          ]
        })
      ]

      const result = sorterDeltakere(deltakere, {
        orderBy: DeltakerKolonne.VEILEDER,
        direction: 'ascending'
      })

      expect(result[0].veiledere[0].etternavn).toBe('Anderson')
      expect(result[1].veiledere[0].etternavn).toBe('Moe')
      expect(result[2].veiledere[0].etternavn).toBe('Zebra')
    })

    it('skal håndtere manglende veileder på en elegant måte', () => {
      const deltakere = [
        createMockDeltaker({ veiledere: [] }),
        createMockDeltaker({
          veiledere: [
            {
              ansattId: '123e4567-e89b-12d3-a456-426614174001',
              deltakerId: '123e4567-e89b-12d3-a456-426614174000',
              fornavn: 'Test',
              mellomnavn: null,
              etternavn: 'Anderson',
              veiledertype: Veiledertype.VEILEDER
            }
          ]
        })
      ]

      const result = sorterDeltakere(deltakere, {
        orderBy: DeltakerKolonne.VEILEDER,
        direction: 'ascending'
      })

      expect(result).toHaveLength(2)
    })
  })

  describe('Ingen sortering (undefined)', () => {
    it('skal sortere etter status endretDato synkende når ingen sortering er gitt', () => {
      const date1 = new Date('2024-01-01')
      const date2 = new Date('2024-01-05')
      const date3 = new Date('2024-01-03')

      const deltakere = [
        createMockDeltaker({
          etternavn: 'A',
          status: {
            type: TiltakDeltakerStatus.DELTAR,
            endretDato: date1,
            aarsak: null
          }
        }),
        createMockDeltaker({
          etternavn: 'B',
          status: {
            type: TiltakDeltakerStatus.DELTAR,
            endretDato: date2,
            aarsak: null
          }
        }),
        createMockDeltaker({
          etternavn: 'C',
          status: {
            type: TiltakDeltakerStatus.DELTAR,
            endretDato: date3,
            aarsak: null
          }
        })
      ]

      const result = sorterDeltakere(deltakere, undefined)

      // Skal sorteres etter endretDato synkende: date2, date3, date1
      expect(result[0].status.endretDato).toEqual(date2)
      expect(result[1].status.endretDato).toEqual(date3)
      expect(result[2].status.endretDato).toEqual(date1)
    })
  })
})
