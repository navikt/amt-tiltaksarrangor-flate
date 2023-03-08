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

	useEffect(() => {
		//For å sikre at skjermlesere ikke leser opp innholdet bak modal når den er åpen.
		Modal.setAppElement('#root')
	}, [])

	return (
		<Modal
			open={open ?? true}
			onClose={onClose}
			className={classNames(styles.container, props.className)}
		>
			<Modal.Content className={contentClassName}>
				<Heading size="large" className={styles.heading}>
					{tittel}
				</Heading>
				<div className={styles.content}>
					{children}
				</div>
			</Modal.Content>
		</Modal >
	)

}
