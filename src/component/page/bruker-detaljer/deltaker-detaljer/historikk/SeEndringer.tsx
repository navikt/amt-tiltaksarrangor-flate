import { Alert, Button } from '@navikt/ds-react'
import { HistorikkModal } from './HistorikkModal'
import { useState } from 'react'
import { fetchDeltakerHistorikk } from '../../../../../api/historikk-api'
import { DeltakerHistorikkListe } from '../../../../../api/data/historikk'
import { Tiltakskode } from '../../../../../api/data/tiltak'

interface Props {
  deltakerId: string
  tiltakskode: Tiltakskode
  className?: string
}

export const SeEndringer = ({
  deltakerId,
  tiltakskode,
  className
}: Props) => {
  const [ historikkModalOpen, setHistorikkModalOpen ] = useState(false)
  const [ historikk, setHistorikk ] = useState<DeltakerHistorikkListe | null>(null)
  const [ error, setError ] = useState(false)

  const seEndringer = () => {
    fetchDeltakerHistorikk(deltakerId).then((res) => {
      setHistorikk(res.data)
      setHistorikkModalOpen(true)
    }).catch(() => {
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
        <Alert variant="error" size="small">
          Beklager, vi kunne ikke hente historiske endringer på tiltaket.
        </Alert>
      )
      }

      <HistorikkModal
        historikk={historikk}
        tiltakskode={tiltakskode}
        open={historikkModalOpen}
        onClose={() => setHistorikkModalOpen(false)}
      />
    </>
  )
}
