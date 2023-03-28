import { AddPerson, People } from '@navikt/ds-icons'
import { Button, Heading, Panel } from '@navikt/ds-react'
import cls from 'classnames'
import React, { useEffect, useState } from 'react'
import { Deltaker } from '../../../../api/data/deltaker'
import { Veileder, VeilederMedType, Veiledertype } from '../../../../api/data/veileder'

import globalStyles from '../../../../globals.module.scss'
import { lagBrukerNavn } from '../../../../utils/bruker-utils'
import { EMDASH } from '../../../../utils/constants'
import { Show } from '../../../felles/Show'
import { IconLabel } from '../icon-label/IconLabel'
import { TildelVeilederModal } from '../tildel-veileder-modal/TildelVeilederModal'
import styles from './VeilederPanel.module.scss'

interface Props {
	deltaker: Deltaker
	visTildeling: boolean
}

export const VeilederPanel = ({ deltaker, visTildeling }: Props): React.ReactElement => {
	const [ veileder, setVeileder ] = useState<Veileder>()
	const [ medveiledere, setMedveiledere ] = useState<Veileder[]>([])
	const [ openModal, setOpenModal ] = useState(false)

	useEffect(() => {
		const deltakersVeiledere = deltaker.veiledere.map(veilederMedType => tilVeileder(veilederMedType))
		setVeileder(deltakersVeiledere.find(v => !v.erMedveileder))
		setMedveiledere(deltakersVeiledere.filter(v => v.erMedveileder))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ deltaker.veiledere ])

	const handleModalState = () => {
		setOpenModal(prev => !prev)
	}

	const handleSubmit = (veiledere: Veileder[]) => {
		setVeileder(veiledere.find(v => !v.erMedveileder))
		setMedveiledere(veiledere.filter(v => v.erMedveileder))
	}

	return (
		<Panel border className={styles.infoPanel}>

			<Heading size="small" level="3" className={globalStyles.blokkXs}>Tiltaksarrangør</Heading>
			<Heading size="xsmall" level="4" className={globalStyles.blokkXs}>Veileder</Heading>
			<div className={cls(styles.contentBlock, globalStyles.blokkM)}>
				<IconLabel
					labelValue={veileder ? lagBrukerNavn(veileder.fornavn, veileder.mellomnavn, veileder.etternavn) : EMDASH}
					icon={<People title="Veileder navn" />}
					iconWrapperClassName={styles.iconWrapper}
				/>
			</div>

			<Heading size="xsmall" level="4" className={globalStyles.blokkXs}>Medveiledere</Heading>
			<div className={styles.contentBlock}>
				{medveiledere.length > 0 ? medveiledere.map(v => {
					return <IconLabel
						labelValue={lagBrukerNavn(v.fornavn, v.mellomnavn, v.etternavn)}
						icon={<People title="Veileder navn" />}
						iconWrapperClassName={styles.iconWrapper}
						key={v.ansattId}
					/>
				})
					: <IconLabel
						labelValue={EMDASH}
						icon={<People title="Veileder navn" />}
						iconWrapperClassName={styles.iconWrapper}
					/>
				}
			</div>

			<Show if={visTildeling}>
				<Button variant="secondary" size="small" className={styles.knapp} onClick={handleModalState}>
					<span className={styles.knappTekst}><AddPerson /> Endre</span>
				</Button>
				
				<TildelVeilederModal
					deltaker={deltaker}
					veileder={veileder}
					medveiledere={medveiledere}
					open={openModal}
					onClose={handleModalState}
					onSubmit={handleSubmit}
				/>
			</Show>

		</Panel>
	)
}

const tilVeileder = (veilederMedType: VeilederMedType): Veileder => {
	return {
		ansattId: veilederMedType.ansattId,
		deltakerId: veilederMedType.deltakerId,
		erMedveileder: veilederMedType.veiledertype === Veiledertype.MEDVEILEDER,
		fornavn: veilederMedType.fornavn,
		mellomnavn: veilederMedType.mellomnavn,
		etternavn: veilederMedType.etternavn
	}
}
