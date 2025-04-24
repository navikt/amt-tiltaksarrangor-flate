import { BodyLong, Detail } from '@navikt/ds-react'
import { EndringerFraTiltakskoordinator, TiltakskoordinatorEndring, TiltakskoordinatorEndringsType } from '../../../../../api/data/historikk'
import { HistorikkElement } from './HistorikkElement'
import { EndringTypeIkon } from '../EndringTypeIkon'
import { getTiltakskoordinatorEndringsTittel } from '../../../../../utils/text-mappers'
import { formatDate } from '../../../../../utils/date-utils'
import styles from './Historikk.module.scss'

interface Props {
  tiltakskoordinatorEndring: EndringerFraTiltakskoordinator
}

const getEndringsDetaljer = (endring: TiltakskoordinatorEndring) => {
  switch (endring.type) {
    case TiltakskoordinatorEndringsType.DelMedArrangor: {
      return (
        <BodyLong size="small">
          Informasjon om deltakelsen er sendt til arrangør for vurdering. Se
          “Dette deles med arrangøren” for mer informasjon om hva som er delt.
        </BodyLong>
      )
    }
    case TiltakskoordinatorEndringsType.SettPaaVenteliste: {
      return (
        <BodyLong size="small">
          Du har fått plass på ventelisten til kurset.
        </BodyLong>
      )
    }
  }
}

export const HistorikkTiltakskoordinatorEndring = ({
  tiltakskoordinatorEndring
}: Props) => {
  const endringsType = tiltakskoordinatorEndring.endring.type

  return (
    <HistorikkElement
      tittel={getTiltakskoordinatorEndringsTittel(endringsType)}
      icon={<EndringTypeIkon type={endringsType} size={'small'} />}
    >
      {getEndringsDetaljer(tiltakskoordinatorEndring.endring)}
      <Detail className={styles.endring_detail} textColor="subtle">
        {`Endret ${formatDate(tiltakskoordinatorEndring.endret)} av ${tiltakskoordinatorEndring.endretAv}${tiltakskoordinatorEndring.endretAvEnhet ? ' ' + tiltakskoordinatorEndring.endretAvEnhet : ''}.`}
      </Detail>
    </HistorikkElement>
  )
}
