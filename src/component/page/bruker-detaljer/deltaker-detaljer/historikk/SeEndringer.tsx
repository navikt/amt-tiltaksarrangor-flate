import { Alert, Button } from '@navikt/ds-react'
import { HistorikkModal } from './HistorikkModal'
import { useState } from 'react'
import { fetchDeltakerHistorikk } from '../../../../../api/historikk-api'
import { DeltakerHistorikkListe } from '../../../../../api/data/historikk'
import styles from './Historikk.module.scss'
import { Tiltakskode } from '../../../../../api/data/tiltak'

interface Props {
  deltakerId: string
  tiltakstype: Tiltakskode
  className?: string
}

export const SeEndringer = ({
  deltakerId,
  tiltakstype,
  className
}: Props) => {
  const [ historikkModalOpen, setHistorikkModalOpen ] = useState(false)
  const [ historikk, setHistorikk ] = useState<DeltakerHistorikkListe | null>(null)
  const [ error, setError ] = useState(false)

  const seEndringer = () => {
    fetchDeltakerHistorikk(deltakerId).then((res) => {
      setHistorikk(res.data)
      setHistorikkModalOpen(true)
      setError(true)
    })
  }

  return (
    <>
      <Button
        className={className ?? ''}
        variant="secondary"
        size="small"
        onClick={seEndringer}
      >
        Se endringer
      </Button >

      {error && (
        <Alert variant="error" className={styles.alert_hent_historikk} size="small">
          Beklager, vi kunne ikke hente historiske endringer på tiltaket.
        </Alert>
      )
      }

      <HistorikkModal
        historikk={historikk}
        tiltakstype={tiltakstype}
        open={historikkModalOpen}
        onClose={() => setHistorikkModalOpen(false)}
      />
    </>
  )
}
