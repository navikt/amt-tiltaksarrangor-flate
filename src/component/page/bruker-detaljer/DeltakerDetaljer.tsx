import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { Tiltakskode } from '../../../api/data/tiltak'
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

  return (
    <div className={styles.detaljer}>
      <section className={styles.section}>
        <DeltakelseInfo deltaker={deltaker} />

        {(deltaker.tiltakskode === Tiltakskode.GRUPPEAMO || deltaker.tiltakskode === Tiltakskode.GRUFAGYRKE) && (
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
    Tiltakskode.DIGIOPPARB,
    Tiltakskode.GRUFAGYRKE,
    Tiltakskode.JOBBK,
    Tiltakskode.GRUPPEAMO
  ].includes(tiltakskode)
}
