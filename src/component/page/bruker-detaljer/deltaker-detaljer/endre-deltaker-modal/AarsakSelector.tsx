import { RadioGroup } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { DeltakerStatusAarsakType } from '../../../../../api/data/endringsmelding'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { AarsakRadio } from './AarsakRadio'
import { AarsakRadioMedBeskrivelse } from './AarsakRadioMedBeskrivelse'

interface AarsakSelectorProps {
	tittel: string,
	skalViseOppfyllerIkkeKrav: boolean,
	onAarsakSelected: (aarsak: DeltakerStatusAarsakType, beskrivelse: Nullable<string>) => void
}

export const AarsakSelector = ({ tittel, skalViseOppfyllerIkkeKrav, onAarsakSelected }: AarsakSelectorProps) => {
	const [ aarsak, settAarsak ] = useState<DeltakerStatusAarsakType>()
	const [ beskrivelse, settBeskrivelse ] = useState<Nullable<string>>()

	const onBeskrivelse = (nyBeskrivelse: Nullable<string>) => {
		settBeskrivelse(nyBeskrivelse)
	}

	useEffect(() => {
		if (!aarsak) return
		const aarsakBeskrivelse = (aarsak === DeltakerStatusAarsakType.ANNET || aarsak === DeltakerStatusAarsakType.OPPFYLLER_IKKE_KRAVENE) ? beskrivelse : null
		onAarsakSelected(aarsak, aarsakBeskrivelse)
	}, [ beskrivelse, aarsak, onAarsakSelected, tittel ])
	return (
		<RadioGroup
			legend={tittel}
			onChange={(a) => settAarsak(a)}>
			<AarsakRadio aarsakType={DeltakerStatusAarsakType.FATT_JOBB} />
			<AarsakRadio aarsakType={DeltakerStatusAarsakType.SYK} />
			<AarsakRadio aarsakType={DeltakerStatusAarsakType.TRENGER_ANNEN_STOTTE} />
			<AarsakRadio aarsakType={DeltakerStatusAarsakType.IKKE_MOTT} />
			<AarsakRadio aarsakType={DeltakerStatusAarsakType.UTDANNING} />
			{ skalViseOppfyllerIkkeKrav && <AarsakRadioMedBeskrivelse aarsakType={DeltakerStatusAarsakType.OPPFYLLER_IKKE_KRAVENE} valgtAarsak={aarsak} onBeskrivelse={onBeskrivelse}/> }
			<AarsakRadioMedBeskrivelse aarsakType={DeltakerStatusAarsakType.ANNET} valgtAarsak={aarsak} onBeskrivelse={onBeskrivelse}/>
		</RadioGroup>
	)
}
