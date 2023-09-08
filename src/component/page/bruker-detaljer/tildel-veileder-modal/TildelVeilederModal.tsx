import { Alert, Button, Detail } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import { TilgjengeligVeileder, Veileder } from '../../../../api/data/veileder'
import { MultiValue, SingleValue } from 'react-select'
import { lagBrukerNavn } from '../../../../utils/bruker-utils'

import styles from './TildelVeilederModal.module.scss'
import { isPending, isResolved, usePromise } from '../../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { hentTilgjengeligeVeiledere, tildelVeilederForDeltaker } from '../../../../api/tiltak-api'
import { Deltaker } from '../../../../api/data/deltaker'
import { SelectField, SelectOption } from '../../../felles/select-field/SelectField'
import { BaseModal } from '../../../felles/base-modal/BaseModal'

interface Props {
	deltaker: Deltaker
	veileder: Veileder | undefined
	medveiledere: Veileder[]
	open: boolean
	onClose: () => void
	onSubmit: (veiledere: Veileder[]) => void
}

const maksMedveiledere = 3

export const TildelVeilederModal = (props: Props): React.ReactElement => {
	const [ tilgjengeligeVeiledere, setTilgjengeligeVeiledere ] = useState<TilgjengeligVeileder[]>([])
	const [ muligeVeiledervalg, setMuligeVeiledervalg ] = useState<SelectOption[]>()
	const [ veileder, setVeileder ] = useState<TilgjengeligVeileder | undefined>()
	const [ medveiledere, setMedveiledere ] = useState<TilgjengeligVeileder[]>([])
	const [ tildelingFeiletError, setTildelingFeiletError ] = useState(false)

	const tildelVeilederePromise = usePromise<void>()
	const tilgjengeligeVeilederePromise = usePromise<AxiosResponse<TilgjengeligVeileder[]>>(() =>
		hentTilgjengeligeVeiledere(props.deltaker.deltakerliste.id)
	)

	useEffect(() => {
		if (isResolved(tilgjengeligeVeilederePromise)) {
			setTilgjengeligeVeiledere(tilgjengeligeVeilederePromise.result.data)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ tilgjengeligeVeilederePromise.result ])

	useEffect(() => {
		if (props.veileder) {
			setVeileder(props.veileder)
		}
		if (props.medveiledere) {
			setMedveiledere(props.medveiledere)
		}
	}, [ props.veileder, props.medveiledere ])

	useEffect(() => {
		const medveilederIder = medveiledere.map((v) => v.ansattId)
		if (veileder !== undefined) medveilederIder.push(veileder.ansattId)

		const muligeValg = tilgjengeligeVeiledere?.filter((v) => !medveilederIder.includes(v.ansattId))

		setMuligeVeiledervalg(muligeValg.map(veilederToOption))
	}, [ veileder, medveiledere, tilgjengeligeVeiledere ])

	const handleVeilederChange = (valg: SingleValue<SelectOption>) => {
		setVeileder(tilgjengeligeVeiledere?.find((v) => v.ansattId === valg?.value))
	}

	const handleMedveilederChange = (valg: MultiValue<SelectOption>) => {
		const valgteMedveiledere = valg.map((v) => tilgjengeligeVeiledere?.find((tv) => tv.ansattId === v.value))
		setMedveiledere(valgteMedveiledere as TilgjengeligVeileder[])
	}

	const handleClose = () => {
		console.log('Close modal handler')
		setVeileder(props.veileder)
		setMedveiledere(props.medveiledere)
		setTildelingFeiletError(false)
		props.onClose()
	}

	const handleSubmit = () => {
		if (medveiledere.length > maksMedveiledere) return

		const veiledere: Veileder[] = veileder
			? [ { ...veileder, deltakerId: props.deltaker.id, erMedveileder: false } ]
			: []
		medveiledere.forEach((v) => veiledere.push({ ...v, deltakerId: props.deltaker.id, erMedveileder: true }))

		tildelVeilederePromise.setPromise(
			tildelVeilederForDeltaker(props.deltaker.id, veiledere)
				.then(() => {
					props.onSubmit(veiledere)
					props.onClose()
					setTildelingFeiletError(false)
				})
				.catch(() => setTildelingFeiletError(true))
		)
	}

	return (
		<>
			<BaseModal tittel={'Endre veiledere'} open={props.open} onClose={handleClose} className={styles.modal}>
				<Detail className={styles.detail}>
					Tildel til{' '}
					{lagBrukerNavn(props.deltaker.fornavn, props.deltaker.mellomnavn, props.deltaker.etternavn)}
				</Detail>
				<SelectField
					label="Veileder"
					isClearable
					value={veileder ? veilederToOption(veileder) : undefined}
					options={muligeVeiledervalg}
					onChange={
						handleVeilederChange as (valg: SingleValue<SelectOption> | MultiValue<SelectOption>) => void
					}
					className={styles.select}
				/>
				<SelectField
					label="Medveiledere"
					isMulti
					value={medveiledere.map(veilederToOption)}
					options={muligeVeiledervalg}
					onChange={
						handleMedveilederChange as (valg: SingleValue<SelectOption> | MultiValue<SelectOption>) => void
					}
					className={styles.select}
					isError={medveiledere.length > maksMedveiledere}
					feilmelding="Deltaker kan ha maks 3 medveiledere"
				/>
				<Alert variant="info" className={styles.alert}>
					Finner du ikke veilederen du leter etter? Veilederen må først få riktig rettighet i Altinn, og
					deretter logge inn i deltakeroversikten.
				</Alert>
				{tildelingFeiletError && (
					<Alert variant="error" size="small">
						Kunne ikke tildele veiledere. Prøv igjen eller kontakt brukerstøtte{' '}
					</Alert>
				)}
				<div className={styles.buttonRow}>
					<Button variant="tertiary" size="small" onClick={handleClose}>
						Avbryt
					</Button>
					<Button size="small" loading={isPending(tildelVeilederePromise)} onClick={handleSubmit}>
						Lagre
					</Button>
				</div>
			</BaseModal>
		</>
	)
}

const veilederToOption = (veileder: TilgjengeligVeileder): SelectOption => {
	return { value: veileder.ansattId, label: lagBrukerNavn(veileder.fornavn, veileder.mellomnavn, veileder.etternavn) }
}
