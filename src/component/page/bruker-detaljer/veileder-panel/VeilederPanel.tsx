import { AddPerson, People } from '@navikt/ds-icons'
import { Button, Heading, Panel } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import cls from 'classnames'
import React, { useMemo, useState } from 'react'
import { TiltakDeltakerDetaljer } from '../../../../api/data/deltaker'
import { Veileder } from '../../../../api/data/veileder'
import { hentVeiledereForDeltaker } from '../../../../api/tiltak-api'

import globalStyles from '../../../../globals.module.scss'
import { lagBrukerNavn } from '../../../../utils/bruker-utils'
import { EMDASH } from '../../../../utils/constants'
import { isResolved, usePromise } from '../../../../utils/use-promise'
import { IconLabel } from '../icon-label/IconLabel'
import { TildelVeilederModal } from '../tildel-veileder-modal/TildelVeilederModal'
import styles from './VeilederPanel.module.scss'

interface Props {
	deltaker: TiltakDeltakerDetaljer
}

export const VeilederPanel = ({ deltaker }: Props): React.ReactElement => {
	const hentVeilederePromise = usePromise<AxiosResponse<Veileder[]>>(() => hentVeiledereForDeltaker(deltaker.id))
	const [ veileder, setVeileder ] = useState<Veileder>()
	const [ medveiledere, setMedveiledere ] = useState<Veileder[]>([])
	const [ openModal, setOpenModal ] = useState(false)

	useMemo(() => {
		if (isResolved(hentVeilederePromise)) {
			setVeileder(hentVeilederePromise.result.data.find(v => !v.erMedveileder))
			setMedveiledere(hentVeilederePromise.result.data.filter(v => v.erMedveileder))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ hentVeilederePromise.result ])

	const handleModalState = () => {
		setOpenModal(prev => !prev)
	}

	const handleSubmit = (veiledere: Veileder[]) => {
		setVeileder(veiledere.find(v => !v.erMedveileder))
		setMedveiledere(veiledere.filter(v => v.erMedveileder))
	}

	return (
		<Panel border className={styles.infoPanel}>

			<div className={styles.buttonRow}>
				<Heading size="small" level="3" className={globalStyles.blokkXs}>Veileder</Heading>
				<Button variant="secondary" size="small" onClick={handleModalState}>
					<IconLabel labelValue="Endre" icon={<AddPerson />} />
				</Button>
			</div>
			<div className={cls(styles.contentBlock, globalStyles.blokkM)}>
				<IconLabel
					labelValue={veileder ? lagBrukerNavn(veileder.fornavn, veileder.mellomnavn, veileder.etternavn) : EMDASH}
					icon={<People title="Veileder navn" />}
					iconWrapperClassName={styles.iconWrapper}
				/>
			</div>

			<Heading size="small" level="3" className={globalStyles.blokkXs}>Medveiledere</Heading>
			<div className={cls(styles.contentBlock, globalStyles.blokkM)}>
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

			<TildelVeilederModal
				deltaker={deltaker}
				veileder={veileder}
				medveiledere={medveiledere}
				open={openModal}
				onClose={handleModalState}
				onSubmit={handleSubmit}
			/>

		</Panel>
	)
}
