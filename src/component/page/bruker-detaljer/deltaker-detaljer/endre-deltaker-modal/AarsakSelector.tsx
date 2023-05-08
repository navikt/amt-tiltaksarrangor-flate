import { Detail, RadioGroup, TextField, useId } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { DeltakerStatusAarsakType } from '../../../../../api/data/endringsmelding'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { aarsakTekstMapper } from '../tekst-mappers'
import { AarsakRadio } from './AarsakRadio'
import styles from './AarsakSelector.module.scss'

interface AarsakSelectorProps {
	tittel: string,
	skalViseOppfyllerIkkeKrav: boolean,
	onAarsakSelected: (aarsak: DeltakerStatusAarsakType, beskrivelse: Nullable<string>) => void
}

export const AarsakSelector = ({ tittel, skalViseOppfyllerIkkeKrav, onAarsakSelected }: AarsakSelectorProps) => {
	const [ aarsak, settAarsak ] = useState<DeltakerStatusAarsakType>()
	const [ beskrivelse, settBeskrivelse ] = useState<Nullable<string>>()
	const annetDetailId = useId()
	const oppfyllerIkkeKraveneDetailId = useId()

	const visBeskrivelseOppfyllerIkkeKravene = aarsak === DeltakerStatusAarsakType.OPPFYLLER_IKKE_KRAVENE
	const visBeskrivelseAnnet = aarsak === DeltakerStatusAarsakType.ANNET

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
			{ skalViseOppfyllerIkkeKrav && <AarsakRadio aarsakType={DeltakerStatusAarsakType.OPPFYLLER_IKKE_KRAVENE} >
				{visBeskrivelseOppfyllerIkkeKravene ? <>
					<TextField
						onChange={e => settBeskrivelse(e.target.value)}
						value={beskrivelse ?? ''}
						size="small"
						label={null}
						maxLength={40}
						className={styles.tekstboks}
						aria-label={aarsakTekstMapper(DeltakerStatusAarsakType.OPPFYLLER_IKKE_KRAVENE)}
						aria-describedby={oppfyllerIkkeKraveneDetailId}
					/>
					<Detail id={oppfyllerIkkeKraveneDetailId} className={styles.detail}>Maks antall tegn: 40</Detail>
				</> : <></>
				}
			</AarsakRadio> }
			<AarsakRadio aarsakType={DeltakerStatusAarsakType.ANNET} >
				{visBeskrivelseAnnet ? <>
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
