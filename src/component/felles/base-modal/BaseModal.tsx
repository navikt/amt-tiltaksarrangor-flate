import { Modal } from '@navikt/ds-react'
import classNames from 'classnames'
import React, { ReactNode } from 'react'

import styles from './BaseModal.module.scss'
import { EndringTypeIkon } from '../../page/bruker-detaljer/deltaker-detaljer/EndringTypeIkon'
import { EndringType } from '../../page/bruker-detaljer/deltaker-detaljer/types'

interface BaseModalProps {
  tittel: string
  endringstype?: EndringType
  open?: boolean
  children: ReactNode
  onClose: () => void
  className?: string
  contentClassName?: string
}

export const BaseModal = ({
  tittel,
  endringstype,
  open,
  children,
  onClose,
  contentClassName,
  className
}: BaseModalProps) => {
  const isOpen = open ?? true

  return (
    <Modal
      open={isOpen}
      header={{
        icon: endringstype && (
          <EndringTypeIkon size="large" type={endringstype} />
        ),
        heading: tittel
      }}
      onClose={onClose}
      className={classNames(styles.container, className)}
      aria-label={tittel}
    >
      <Modal.Body className={contentClassName}>
        <div className={styles.content}>{children}</div>
      </Modal.Body>
    </Modal>
  )
}
