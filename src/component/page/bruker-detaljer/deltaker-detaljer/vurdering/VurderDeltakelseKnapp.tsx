import { CheckmarkCircleFillIcon, PencilIcon, PlusCircleFillIcon } from '@navikt/aksel-icons'
import { Button, Dropdown } from '@navikt/ds-react'
import React, { useRef, useState } from 'react'
import { Vurdering, Vurderingstype } from '../../../../../api/data/deltaker'
import styles from './VurderDeltakelseKnapp.module.scss'
import { vurderingstypeTeksMapper } from '../../deltaker-detaljer/tekst-mappers'
import { SettOppfyllerIkkeKravenelModal } from './SettOppfyllerIkkeKravenelModal'
import { SettOppfyllerKravenelModal } from './SettOppfyllerKravenelModal'
import { fetchDeltaker } from '../../../../../api/tiltak-api'

interface EndreDeltakelseKnappProps {
	deltakerId: string
	updateVurdering: (vurdering: Vurdering | null) => void
}

const vurderingDropDownItem = (vurderingstype: Vurderingstype, onClick: React.MouseEventHandler<HTMLElement>) => {
	const icon = vurderingstype === Vurderingstype.OPPFYLLER_IKKE_KRAVENE
		? <PlusCircleFillIcon className={ styles.oppfyllerIkkeKraveneIkon } aria-hidden />
		: <CheckmarkCircleFillIcon className={ styles.oppfyllerKraveneIkon } aria-hidden />

	return (
		<Dropdown.Menu.List.Item onClick={onClick}>
			{icon}
			<span>{vurderingstypeTeksMapper(vurderingstype)}</span>
		</Dropdown.Menu.List.Item>
	)
}
export const VurderDeltakelseKnapp = ({ deltakerId, updateVurdering }: EndreDeltakelseKnappProps) => {
	const [ oppfyllerKraveneModalOpen, setOppfyllerKraveneModalOpen ] = useState(false)
	const [ oppfyllerIkkeKraveneModalOpen, setOppfyllerIkkeKraveneModalOpen ] = useState(false)
	const vurderDeltakelseRef = useRef<HTMLButtonElement>(null)

	const handleCloseModal = () => {
		setOppfyllerKraveneModalOpen(false)
		setOppfyllerIkkeKraveneModalOpen(false)
		vurderDeltakelseRef?.current?.focus()
	}

	const onVurderingSendt = () => {
		fetchDeltaker(deltakerId)
			.then((res) => {
				if(res?.data){
					updateVurdering(res.data.gjeldendeVurderingFraArrangor)
				}
			})
			.then(() => vurderDeltakelseRef?.current?.focus())
	}

	return (
		<>
			<SettOppfyllerKravenelModal
				isOpen={oppfyllerKraveneModalOpen}
				deltakerId={deltakerId}
				onClose={handleCloseModal}
				onVurderingSendt={onVurderingSendt}
			/>
			<SettOppfyllerIkkeKravenelModal
				isOpen={oppfyllerIkkeKraveneModalOpen}
				deltakerId={deltakerId}
				onClose={handleCloseModal}
				onVurderingSendt={onVurderingSendt}
			/>
			<Dropdown>
				<Button
					ref={vurderDeltakelseRef}
					className={styles.knapp}
					as={Dropdown.Toggle}
					variant="secondary"
					size="small"
					icon={<PencilIcon aria-hidden />}
				>
					Vurder
				</Button>
				<Dropdown.Menu className={ styles.dropdownWrapper }>
					<Dropdown.Menu.List className={styles.dropdown}>
						{vurderingDropDownItem(Vurderingstype.OPPFYLLER_KRAVENE, () => setOppfyllerKraveneModalOpen(true))}
						{vurderingDropDownItem(Vurderingstype.OPPFYLLER_IKKE_KRAVENE, () => setOppfyllerIkkeKraveneModalOpen(true))}
					</Dropdown.Menu.List>
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}
