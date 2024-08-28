import { Alert, Button } from '@navikt/ds-react'
import { HistorikkModal } from './HistorikkModal'
import { useState } from 'react'
import { fetchDeltakerHistorikk } from '../../../../../api/historikk-api'
import { DeltakerHistorikkListe } from '../../../../../api/data/historikk'

interface Props {
  deltakerId: string
  className?: string
}

export const SeEndringer = ({
  deltakerId,
  className
}: Props) => {
  const [ historikkModalOpen, setHistorikkModalOpen ] = useState(false)
  const [ historikk, setHistorikk ] = useState<DeltakerHistorikkListe | null>(null)
  const [ error, setError ] = useState(false)

  const seEndringer = () => {
    fetchDeltakerHistorikk(deltakerId).then((res) => {
      setHistorikk(res.data)
      setHistorikkModalOpen(true) // spør Linn om denne skal være på knappen eller i modalen
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
        <Alert variant="error" className="mt-4" size="small">
          Beklager, vi kunne ikke hente historiske endringer på tiltaket.
        </Alert>
      )
      }

      <HistorikkModal
        historikk={historikk}
        open={historikkModalOpen}
        onClose={() => setHistorikkModalOpen(false)}
      />
    </>
  )
}
