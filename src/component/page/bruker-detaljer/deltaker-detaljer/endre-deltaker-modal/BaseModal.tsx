import { Heading, Modal } from '@navikt/ds-react'
import React, { ReactNode } from 'react'

import styles from './BaseModal.module.scss'
interface BaseModalProps {
	tittel: string
	children: ReactNode
	onClose: () => void
}

export const BaseModal = (props: BaseModalProps) => {
	const { tittel, children, onClose } = props
	return (
		<Modal
			open={true}
			onClose={onClose}
			className={styles.container}
		>
			<Modal.Content>
				<Heading size="large" className={styles.heading}>
					{tittel}
				</Heading>
				<div className={styles.content}>
					{children}
				</div>
			</Modal.Content>
		</Modal>
	)

}