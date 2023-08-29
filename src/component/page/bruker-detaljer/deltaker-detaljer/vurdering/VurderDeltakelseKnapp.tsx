import { CheckmarkCircleFillIcon, PencilIcon, PlusCircleFillIcon } from '@navikt/aksel-icons'
import { Button, Dropdown } from '@navikt/ds-react'
import React, { useRef, useState } from 'react'
import { Deltaker, Vurderingstype } from '../../../../../api/data/deltaker'
import styles from './VurderDeltakelseKnapp.module.scss'
import { vurderingstypeTeksMapper } from '../../deltaker-detaljer/tekst-mappers'
import { SettOppfyllerIkkeKravenelModal } from './SettOppfyllerIkkeKravenelModal'
import { SettOppfyllerKravenelModal } from './SettOppfyllerKravenelModal'

interface EndreDeltakelseKnappProps {
	deltaker: Deltaker
	onEndringUtfort: () => void
}

const vurderingDropDownItem = (vurderingstype: Vurderingstype, onClick: React.MouseEventHandler<HTMLElement> ) => {
	const icon = vurderingstype === Vurderingstype.OPPFYLLER_IKKE_KRAVENE
		? <PlusCircleFillIcon className={styles.ikkeAktuellIkon} aria-hidden />
		: <CheckmarkCircleFillIcon className={styles.erAktuellIkon} aria-hidden />

	return (
		<Dropdown.Menu.GroupedList.Item onClick={onClick}>
			{icon}
			<span>{vurderingstypeTeksMapper(vurderingstype)}</span>
		</Dropdown.Menu.GroupedList.Item>
	)
}
export const VurderDeltakelseKnapp = ({ deltaker, onEndringUtfort }: EndreDeltakelseKnappProps) => {
	const [ oppfyllerKraveneModalOpen, setOppfyllerKraveneModalOpen ] = useState(false)
	const [ oppfyllerIkkeKraveneModalOpen, setOppfyllerIkkeKraveneModalOpen ] = useState(false)

	// TODO onEndringUtfort må hente ny vurdering fra backend?

	const vurderDeltakelseRef = useRef<HTMLButtonElement>(null)
	const handleCloseModal = () => {
		setOppfyllerKraveneModalOpen(false)
		setOppfyllerIkkeKraveneModalOpen(false)
		vurderDeltakelseRef?.current?.focus()
	}

	return (
		<>
			<SettOppfyllerKravenelModal isOpen={oppfyllerKraveneModalOpen} deltakerId={deltaker.id} onClose={handleCloseModal} />
			<SettOppfyllerIkkeKravenelModal isOpen={oppfyllerIkkeKraveneModalOpen} deltakerId={deltaker.id} onClose={handleCloseModal} />
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
				<Dropdown.Menu>
					<Dropdown.Menu.GroupedList className={styles.dropdown}>
						<Dropdown.Menu.GroupedList.Heading>Vurder deltaker</Dropdown.Menu.GroupedList.Heading>
						{vurderingDropDownItem(Vurderingstype.OPPFYLLER_KRAVENE, () => setOppfyllerKraveneModalOpen(true))}
						{vurderingDropDownItem(Vurderingstype.OPPFYLLER_IKKE_KRAVENE, () => setOppfyllerIkkeKraveneModalOpen(true))}
					</Dropdown.Menu.GroupedList>
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}
