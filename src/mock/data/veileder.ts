import { faker } from '@faker-js/faker/locale/nb_NO'
import {
  TilgjengeligVeileder,
  VeilederMedType,
  Veiledertype
} from '../../api/data/veileder'
import { randBetween } from '../utils/faker'
import { ansattId } from './id'

const lagMockTilgjengeligeVeiledere = (n: number): TilgjengeligVeileder[] => {
  return new Array(n).fill(null).map(() => {
    return {
      ansattId: ansattId(),
      fornavn: faker.person.firstName(),
      mellomnavn: mellomNavnEllerNull(),
      etternavn: faker.person.lastName()
    }
  })
}

const mellomNavnEllerNull = (): string | null => {
  if (randBetween(0, 10) < 3) {
    return faker.person.middleName()
  }
  return null
}

export const mockTilgjengeligeVeiledere = lagMockTilgjengeligeVeiledere(15)

export const lagMockVeiledereForDeltaker = (
  deltakerId: string
): VeilederMedType[] => {
  const tilgjengelige = [...mockTilgjengeligeVeiledere]

  faker.helpers.shuffle(tilgjengelige, { inplace: true })

  const veiledere: VeilederMedType[] = []
  if (randBetween(0, 10) < 1) {
    return veiledere
  }

  if (randBetween(0, 100) > 2) {
    veiledere.push({
      ...tilgjengelige.pop()!,
      deltakerId: deltakerId,
      veiledertype: Veiledertype.VEILEDER
    })
  }

  for (let i = 0; i < randBetween(0, 3); i++) {
    veiledere.push({
      ...tilgjengelige.pop()!,
      deltakerId: deltakerId,
      veiledertype: Veiledertype.MEDVEILEDER
    })
  }

  return veiledere
}
