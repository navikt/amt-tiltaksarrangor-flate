import { Detail, RadioGroup, TextField, useId } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { DeltakerStatusAarsakType } from '../../../../../api/data/endringsmelding'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { aarsakTekstMapper } from '../tekst-mappers'
import { AarsakRadio } from './AarsakRadio'
import styles from './AarsakSelector.module.scss'

interface AarsakSelectorProps {
	tittel: string
	onAarsakSelected: (aarsak: DeltakerStatusAarsakType, beskrivelse: Nullable<string>) => void
}

export const AarsakSelector = ({ tittel, onAarsakSelected }: AarsakSelectorProps) => {
	const [ aarsak, settAarsak ] = useState<DeltakerStatusAarsakType>()
	const [ beskrivelse, settBeskrivelse ] = useState<Nullable<string>>()
	const annetDetailId = useId()

	const visBeskrivelse = aarsak === DeltakerStatusAarsakType.ANNET

	useEffect(() => {
		if (!aarsak) return
		const aarsakBeskrivelse = aarsak === DeltakerStatusAarsakType.ANNET ? beskrivelse : null
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
			<AarsakRadio aarsakType={DeltakerStatusAarsakType.ANNET} >
				{visBeskrivelse ? <>
					<TextField
						onChange={e => settBeskrivelse(e.target.value)}
						value={beskrivelse ?? ''}
						size="small"
						label={null}
						maxLength={40}
						className={styles.tekstboks}
						aria-label={aarsakTekstMapper(DeltakerStatusAarsakType.ANNET)}
						aria-describedby={annetDetailId}
					/>
					<Detail id={annetDetailId} className={styles.detail}>Maks antall tegn: 40</Detail>
				</> : <></>
				}
			</AarsakRadio>
		</RadioGroup>
	)
}