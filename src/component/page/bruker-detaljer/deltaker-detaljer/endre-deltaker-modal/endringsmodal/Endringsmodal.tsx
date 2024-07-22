import React, { ReactNode, useState } from 'react'
import { BaseModal } from '../../../../../felles/base-modal/BaseModal'
import { Detail } from '@navikt/ds-react'
import { VeilederConfirmationPanel } from '../VeilederConfirmationPanel'
import { SendTilNavKnapp } from '../SendTilNavKnapp'
import { BegrunnelseInput, BegrunnelseType } from './BegrunnelseInput'

import styles from './Endringsmodal.module.scss'

interface EndringsmodalProps {
  readonly tittel: string
  readonly erForslag?: boolean
  readonly visGodkjennVilkaarPanel: boolean
  readonly erSendKnappDisabled?: boolean
  readonly begrunnelseType?: BegrunnelseType
  readonly onClose: () => void
  readonly onBegrunnelse?: (begrunnelse: string) => void
  readonly onSend: () => Promise<void>
  readonly children?: ReactNode
}

export function Endringsmodal(props: EndringsmodalProps) {
  const [vilkaarGodkjent, setVilkaarGodkjent] = useState(false)

  const krevVilkaarGodkjent =
    props.erForslag !== true && props.visGodkjennVilkaarPanel
  const prefix = props.erForslag ? 'Foreslå: ' : ''

  return (
    <BaseModal
      tittel={`${prefix}${props.tittel}`}
      onClose={props.onClose}
      className={styles.modal}
    >
      {props.erForslag && (
        <Detail>Forslaget sendes til NAV-veileder og deltaker.</Detail>
      )}

      {props.children}

      {props.erForslag && props.onBegrunnelse && props.begrunnelseType && (
        <BegrunnelseInput
          type={props.begrunnelseType}
          onChange={props.onBegrunnelse}
        />
      )}

      {krevVilkaarGodkjent && (
        <VeilederConfirmationPanel
          vilkaarGodkjent={vilkaarGodkjent}
          setVilkaarGodkjent={setVilkaarGodkjent}
        />
      )}

      <SendTilNavKnapp
        onEndringSendt={props.onClose}
        sendEndring={props.onSend}
        disabled={
          props.erSendKnappDisabled || (!vilkaarGodkjent && krevVilkaarGodkjent)
        }
        forslag={props.erForslag}
      />
    </BaseModal>
  )
}
