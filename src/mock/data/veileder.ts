import faker from 'faker'
import { TilgjengeligVeileder, VeilederMedType, Veiledertype } from '../../api/data/veileder'
import { randBetween } from '../utils/faker'
import { ansattId } from './id'


const lagMockTilgjengeligeVeiledere = (n: number): TilgjengeligVeileder[] => {
	return new Array(n).fill(null).map(() => {
		return {
			ansattId: ansattId(),
			fornavn: faker.name.firstName(),
			mellomnavn: mellomNavnEllerNull(),
			etternavn: faker.name.lastName(),
		}
	})
}

const mellomNavnEllerNull = (): string | null => {
	if (randBetween(0, 10) < 3) {
		return faker.name.middleName()
	}
	return null
}

export const mockTilgjengeligeVeiledere = lagMockTilgjengeligeVeiledere(50)

export const lagMockVeiledereForDeltaker = (deltakerId: string): VeilederMedType[] => {
	const tilgjengelige = [ ...mockTilgjengeligeVeiledere ]

	faker.helpers.shuffle(tilgjengelige)

	const veiledere: VeilederMedType[] = []
	if (randBetween(0, 10) < 1) {
		return veiledere
	}


	if (randBetween(0, 100) > 2) {
		veiledere.push(
			{

				// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
				...tilgjengelige.pop()!,
				deltakerId: deltakerId,
				veiledertype: Veiledertype.VEILEDER,
			}
		)
	}

	for (let i = 0; i < randBetween(0, 3); i++) {
		veiledere.push(
			{
				// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
				...tilgjengelige.pop()!,
				deltakerId: deltakerId,
				veiledertype: Veiledertype.MEDVEILEDER,
			}
		)
	}

	return veiledere
}
