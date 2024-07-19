import { Arrangor, Deltakerliste } from '../deltakerliste.viewobjects'
import { DeltakerlisterForArrangor } from './deltakerlister-pa-virksomhet/DeltakerlisterForArrangor'
import { Heading } from '@navikt/ds-react'
import React from 'react'
import globalStyles from '../../../../globals.module.scss'
import { DeltakerlistePanel } from './deltakerlister-pa-virksomhet/deltakerlister/DeltakerlistePanel'

interface DeltakerlisterForArrangorWrapperProps {
  overskrift: string
  arrangorer: Arrangor[]
  deltakerlisterLagtTil: string[]
  deltakerlisteIdLoading: string | undefined
  onLeggTil: (id: string) => void
  onFjern: (id: string) => void
}

const sortDeltakerlister = (
  deltakerlister: Deltakerliste[]
): Deltakerliste[] => {
  return deltakerlister.sort((a, b) => a.navn.localeCompare(b.navn))
}

export const DeltakerlisterForArrangorWrapper = (
  props: DeltakerlisterForArrangorWrapperProps
) => {
  return (
    <div className={globalStyles.blokkM}>
      <Heading size="medium" level="3" spacing>
        {props.overskrift}
      </Heading>

      {props.arrangorer.map((arrangor) => (
        <DeltakerlisterForArrangor
          key={arrangor.id}
          navn={arrangor.navn}
          orgNr={arrangor.id}
        >
          {sortDeltakerlister(arrangor.deltakerlister).map((deltakerliste) => (
            <DeltakerlistePanel
              key={deltakerliste.id}
              deltakerliste={deltakerliste}
              deltakerlisterLagtTil={props.deltakerlisterLagtTil}
              deltakerlisteIdLoading={props.deltakerlisteIdLoading}
              onLeggTil={props.onLeggTil}
              onFjern={props.onFjern}
            />
          ))}
        </DeltakerlisterForArrangor>
      ))}
    </div>
  )
}
