import { EnvelopeClosedIcon, PersonIcon, PhoneIcon } from '@navikt/aksel-icons'
import { Alert, Heading } from '@navikt/ds-react'
import React from 'react'

import { NavVeileder } from '../../../../api/data/deltaker'
import globalStyles from '../../../../globals.module.scss'
import { formaterTelefonnummer } from '../../../../utils/bruker-utils'
import { IconLabel } from '../icon-label/IconLabel'
import styles from './NavInfoPanel.module.scss'

interface Props {
  veileder: NavVeileder | null
}

export const NavInfoVeileder = (props: Props): React.ReactElement => {
  const navVeileder = props.veileder

  let veileder

  if (navVeileder != null) {
    veileder = (
      <div className={styles.contentBlock}>
        <IconLabel
          labelValue={navVeileder?.navn}
          icon={<PersonIcon title="Veileder navn" />}
          iconWrapperClassName={styles.iconWrapper}
        />
        <IconLabel
          labelValue={formaterTelefonnummer(navVeileder?.telefon)}
          icon={<PhoneIcon title="Veileder telefonnummer" />}
          iconWrapperClassName={styles.iconWrapper}
        />
        <IconLabel
          labelValue={navVeileder?.epost}
          icon={<EnvelopeClosedIcon title="Veileder epost" />}
          iconWrapperClassName={styles.iconWrapper}
        />
      </div>
    )
  } else {
    veileder = (
      <Alert variant="info" size="small">
        Det er ikke registrert en Nav-veileder til denne deltakeren.
      </Alert>
    )
  }

  return (
    <>
      <Heading size="xsmall" level="3" className={globalStyles.blokkXs}>
        Nav-veileder
      </Heading>
      {veileder}
    </>
  )
}
