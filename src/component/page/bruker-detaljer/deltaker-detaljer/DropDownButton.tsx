import React from 'react'

import { EndringTypeIkon } from './EndringTypeIkon'
import { endringTypeTekstMapper } from './tekst-mappers'
import { EndringType } from './types'
import { Dropdown } from '@navikt/ds-react'

interface DropDownButtonProps {
  onClick: () => void
  endringstype: EndringType
}

export const DropDownButton = (props: DropDownButtonProps) => {
  return (
    <Dropdown.Menu.List.Item onClick={props.onClick}>
      <EndringTypeIkon type={props.endringstype} />
      <span>
        {endringTypeTekstMapper(props.endringstype)}
      </span>
    </Dropdown.Menu.List.Item>
  )
}
