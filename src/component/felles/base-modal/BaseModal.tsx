import { Heading, Modal } from '@navikt/ds-react'
import classNames from 'classnames'
import React, { ReactNode, useEffect } from 'react'

import styles from './BaseModal.module.scss'

interface BaseModalProps {
	tittel: string
	open?: boolean
	children: ReactNode
	onClose: () => void
	className?: string
	contentClassName?: string
}

export const BaseModal = (props: BaseModalProps) => {
	const { tittel, open, children, onClose, contentClassName } = props
	const isOpen = open ?? true

	return (
		<Modal open={isOpen} onClose={onClose} className={classNames(styles.container, props.className)} header={{ heading: tittel }}>
			<Modal.Body className={contentClassName}>
				<div className={styles.content}>{children}</div>
			</Modal.Body>
		</Modal>
	)
}
