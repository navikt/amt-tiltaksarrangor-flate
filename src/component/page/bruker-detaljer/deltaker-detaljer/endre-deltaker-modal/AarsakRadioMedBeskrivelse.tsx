import { DeltakerStatusAarsakType } from '../../../../../api/data/endringsmelding'
import React, { useEffect, useState } from 'react'
import { aarsakTekstMapper } from '../tekst-mappers'
import { Detail, TextField, useId } from '@navikt/ds-react'
import styles from './AarsakSelector.module.scss'
import { AarsakRadio } from './AarsakRadio'
import { Nullable } from '../../../../../utils/types/or-nothing'

interface AarsakRadioMedBeskrivelseProps {
    aarsakType: DeltakerStatusAarsakType,
    valgtAarsak: DeltakerStatusAarsakType | undefined,
    onBeskrivelse: (beskrivelse: Nullable<string>) => void
}

export const AarsakRadioMedBeskrivelse = ({ aarsakType, valgtAarsak, onBeskrivelse }: AarsakRadioMedBeskrivelseProps) => {
	const [ beskrivelse, settBeskrivelse ] = useState<Nullable<string>>()
	const detailId = useId()
	const visBeskrivelse = valgtAarsak === aarsakType

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const nyBeskrivelse = e.target.value
		settBeskrivelse(nyBeskrivelse)
		onBeskrivelse(nyBeskrivelse)
	}

	useEffect(() => {
		if (valgtAarsak === aarsakType) {
			onBeskrivelse(beskrivelse)
		}
	}, [ aarsakType, beskrivelse, onBeskrivelse, valgtAarsak ])

	return (
		<AarsakRadio aarsakType={aarsakType} >
			{visBeskrivelse ? <>
				<TextField
					onChange={handleChange}
					value={beskrivelse ?? ''}
					size="small"
					label={null}
					maxLength={40}
					className={styles.tekstboks}
					aria-label={aarsakTekstMapper(aarsakType)}
					aria-describedby={detailId}
				/>
				<Detail id={detailId} className={styles.detail}>Maks antall tegn: 40</Detail>
			</> : <></>
			}
		</AarsakRadio>
	)
}