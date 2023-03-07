import { Button, Detail } from '@navikt/ds-react'
import React, { useEffect, useMemo, useState } from 'react'
import { TilgjengeligVeileder, Veileder } from '../../../../api/data/veileder'
import { MultiValue, SingleValue } from 'react-select'
import { lagBrukerNavn } from '../../../../utils/bruker-utils'

import styles from './TildelVeilederModal.module.scss'
import { isPending, isResolved, usePromise } from '../../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { hentTilgjengeligeVeiledere, tildelVeilederForDeltaker } from '../../../../api/tiltak-api'
import { TiltakDeltakerDetaljer } from '../../../../api/data/deltaker'
import { SelectField, SelectOption } from '../../../felles/select-field/SelectField'
import { BaseModal } from '../../../felles/base-modal/BaseModal'


interface Props {
	deltaker: TiltakDeltakerDetaljer
	veileder: Veileder | undefined
	medveiledere: Veileder[]
	open: boolean
	onClose: () => void
	onSubmit: (veiledere: Veileder[]) => void
}

const maksMedveiledere = 3

export const TildelVeilederModal = (props: Props): React.ReactElement => {
	const [ tilgjengeligeVeiledere, setTilgjengeligeVeiledere ] = useState<TilgjengeligVeileder[]>([])
	const [ veilederValg, setVeilederValg ] = useState<SelectOption[]>()
	const [ veileder, setVeileder ] = useState<TilgjengeligVeileder | undefined>()
	const [ medveiledere, setMedveiledere ] = useState<TilgjengeligVeileder[]>([])
	const [ veilederError, setVeilederError ] = useState(false)

	const tildelVeilederePromise = usePromise<void>()
	const tilgjengeligeVeilederePromise = usePromise<AxiosResponse<TilgjengeligVeileder[]>>(
		() => hentTilgjengeligeVeiledere(props.deltaker.gjennomforing.id)
	)


	useMemo(() => {
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
		const ansattIder = medveiledere.map(v => v.ansattId)
		if (veileder !== undefined) ansattIder.push(veileder.ansattId)

		const muligeValg = tilgjengeligeVeiledere?.filter(v => !ansattIder.includes(v.ansattId))

		setVeilederValg(muligeValg.map(veilederToOption))

	}, [ veileder, medveiledere, tilgjengeligeVeiledere ])

	const handleVeilederChange = (valg: SingleValue<SelectOption>) => {
		setVeileder(tilgjengeligeVeiledere?.find(v => v.ansattId === valg?.value))
		setVeilederError(false)
	}

	const handleMedveilederChange = (valg: MultiValue<SelectOption>) => {
		const valgteMedveiledere = valg.map(v => tilgjengeligeVeiledere?.find(tv => tv.ansattId === v.value))
		setMedveiledere(valgteMedveiledere as TilgjengeligVeileder[])
	}

	const handleClose = () => {
		setVeileder(props.veileder)
		setMedveiledere(props.medveiledere)
		setVeilederError(false)
		props.onClose()
	}

	const handleSubmit = () => {
		if (!veileder) {
			setVeilederError(true)
			return
		}
		if (medveiledere.length > maksMedveiledere) return

		const veiledere: Veileder[] = [ { ...veileder, deltakerId: props.deltaker.id, erMedveileder: false } ]
		medveiledere.forEach(v => veiledere.push({ ...v, deltakerId: props.deltaker.id, erMedveileder: true }))

		tildelVeilederePromise.setPromise(
			tildelVeilederForDeltaker(props.deltaker.id, veiledere)
				.then(() => {
					props.onSubmit(veiledere)
					props.onClose()
				})
		)
	}

	return (
		<>
			<BaseModal tittel={'Tildel veiledere'} open={props.open} onClose={handleClose} className={styles.modal}>
				<Detail className={styles.detail}>
					Tildel til {lagBrukerNavn(props.deltaker.fornavn, props.deltaker.mellomnavn, props.deltaker.etternavn)}
				</Detail>
				<SelectField
					label="Veileder"
					isSearchable
					isClearable={false}
					value={veileder ? veilederToOption(veileder) : undefined}
					options={veilederValg}
					onChange={handleVeilederChange as (valg: SingleValue<SelectOption> | MultiValue<SelectOption>) => void}
					className={styles.select}
					isError={veilederError}
					feilmelding="Du må velge en veileder"
				/>
				<SelectField
					label="Medveiledere (valgfritt)"
					isSearchable
					isMulti
					value={medveiledere.map(veilederToOption)}
					options={veilederValg}
					onChange={handleMedveilederChange as (valg: SingleValue<SelectOption> | MultiValue<SelectOption>) => void}
					className={styles.select}
					isError={medveiledere.length > maksMedveiledere}
					feilmelding="Deltaker kan ha maks 3 medveiledere"
				/>
				<div className={styles.buttonRow}>
					<Button variant="tertiary" size="small" onClick={handleClose}>Avbryt</Button>
					<Button size="small" loading={isPending(tildelVeilederePromise)} onClick={handleSubmit}>Lagre</Button>
				</div>
			</BaseModal>
		</>
	)
}

const veilederToOption = (veileder: TilgjengeligVeileder): SelectOption => {
	return { value: veileder.ansattId, label: lagBrukerNavn(veileder.fornavn, veileder.mellomnavn, veileder.etternavn) }
}
