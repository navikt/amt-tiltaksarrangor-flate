import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { Pameldingstype, Tiltakskode } from '../../../api/data/tiltak'
import { formatDate } from '../../../utils/date-utils'
import { Show } from '../../felles/Show'
import { Bestilling } from './bestilling/Bestilling'
import { DeltakelsesinnholdDetaljer } from './deltakelsesinnhold/DeltakelsesinnholdDetaljer'
import { DeltakelseInfo } from './deltaker-detaljer/DeltakelseInfo'
import { useDeltakerContext } from './deltaker-detaljer/DeltakerContext'
import { DeltakerVurdering } from './deltaker-detaljer/vurdering/DeltakerVurdering'
import styles from './DeltakerDetaljer.module.scss'
import { NavInfoPanel } from './nav-info-panel/NavInfoPanel'
import { VeilederPanel } from './veileder-panel/VeilederPanel'
import { erOpplaringstiltak } from '../../../utils/deltaker-utils'

export const DeltakerDetaljer = (props: {
  visTildeling: boolean
}): React.ReactElement => {
  const { deltaker } = useDeltakerContext()
  const {
    navInformasjon,
    soktInnPa,
    soktInnDato,
    bestillingTekst,
    tiltakskode,
    innhold
  } = deltaker

  const visDeltakerVurdering = deltaker.deltakerliste.pameldingstype === Pameldingstype.TRENGER_GODKJENNING &&
    erOpplaringstiltak(deltaker.deltakerliste.tiltakskode)

  return (
    <div className={styles.detaljer}>
      <section className={styles.section}>
        <DeltakelseInfo deltaker={deltaker} />

        {visDeltakerVurdering && (
          <DeltakerVurdering deltaker={deltaker} />
        )}

        <div className={styles.innsokt}>
          <BodyShort size="small">
            <Label as="span" size="small">
              Søkt inn på:
            </Label>{' '}
            {soktInnPa}
          </BodyShort>
          <BodyShort size="small">
            <Label as="span" size="small">
              Dato:
            </Label>{' '}
            {formatDate(soktInnDato)}
          </BodyShort>
        </div>

        {innhold && (
          <DeltakelsesinnholdDetaljer innhold={innhold} tiltakskode={tiltakskode} />
        )}

        <Show if={visBestilling(tiltakskode)}>
          <Bestilling
            tekst={bestillingTekst}
            label="Bakgrunnsinfo"
          />
        </Show>
      </section>

      <section>
        <NavInfoPanel
          navkontor={navInformasjon.navkontor}
          navVeileder={navInformasjon.navVeileder}
        />
        <VeilederPanel deltaker={deltaker} visTildeling={props.visTildeling} />
      </section>
    </div>
  )
}

const visBestilling = (tiltakskode: Tiltakskode) => {
  return ![
    Tiltakskode.DIGITALT_OPPFOLGINGSTILTAK,
    Tiltakskode.GRUPPE_FAG_OG_YRKESOPPLAERING,
    Tiltakskode.JOBBKLUBB,
    Tiltakskode.GRUPPE_ARBEIDSMARKEDSOPPLAERING
  ].includes(tiltakskode)
}
