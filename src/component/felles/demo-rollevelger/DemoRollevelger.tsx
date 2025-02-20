import React from 'react'
import { Checkbox, CheckboxGroup } from '@navikt/ds-react'
import { Rolle } from '../../../api/data/ansatt'
import styles from './DemoRollevelger.module.scss'
import { useInnloggetBrukerContext } from '../../../store/InnloggetBrukerContextProvider'

export const DemoRollevelger = (): React.ReactElement => {
  const { setRoller } = useInnloggetBrukerContext()

  const handleChange = (roller: Rolle[]) => {
    setRoller(roller)
  }

  return (
    <div className={styles.rolleVelgerContainer}>
      <CheckboxGroup
        legend="Velg rolle:"
        onChange={(roller: Rolle[]) => handleChange(roller)}
        defaultValue={[Rolle.KOORDINATOR, Rolle.VEILEDER]}
        size="small"
      >
        <Checkbox value={Rolle.KOORDINATOR}>Koordinator</Checkbox>
        <Checkbox value={Rolle.VEILEDER}>Veileder</Checkbox>
      </CheckboxGroup>
    </div>
  )
}
