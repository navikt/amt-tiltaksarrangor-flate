import faker from 'faker'

import { TiltakDeltakerStatus } from '../../api/data/deltaker'
import { AktivtForslag, ForslagEndringType, ForslagStatusType } from '../../api/data/forslag'
import { randBetween, randomUuid } from '../utils/faker'

export function lagMockAktiveForslag(deltakerStatus: typeof TiltakDeltakerStatus | string): AktivtForslag[] {
	switch (deltakerStatus) {
		case TiltakDeltakerStatus.DELTAR: return deltarForslag()
		default: return []
	}
}

function deltarForslag(): AktivtForslag[] {
	if (randBetween(1,10) <= 5) {
		return [ 
			{
				id: randomUuid(),
				opprettet: faker.date.recent(),
				begrunnelse: 'Vi har kommet i gang, men ser at det er hensiktsmessig å fortsette tett oppfølging nå når han er i gang med å kontakte de riktige arbeidsgiverne.',
				endring: {
					type: ForslagEndringType.ForlengDeltakelse,
					sluttdato: faker.date.future(),
				},
				status: {
					type: ForslagStatusType.VenterPaSvar,
				}
			}
		] 
	}
	return []
}
