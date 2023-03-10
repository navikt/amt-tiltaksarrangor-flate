import { Heading, Modal } from '@navikt/ds-react'
import React, { ReactNode } from 'react'

import styles from './BaseModal.module.scss'

interface BaseModalProps {
	tittel: string
	open?: boolean
	children: ReactNode
	onClose: () => void
	contentClassName?: string
}

export const BaseModal = (props: BaseModalProps) => {
	const { tittel, open, children, onClose, contentClassName } = props
	return (
		<Modal
			open={open ?? true}
			onClose={onClose}
			className={styles.container}
		>
			<Modal.Content className={contentClassName}>
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