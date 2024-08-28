import { Alert, Modal } from '@navikt/ds-react'
import { HistorikkEndring } from './HistorikkEndring'
import { HistorikkForslag } from './HistorikkForslag'
import { HistorikkVedtak } from './HistorikkVedtak'
import { HistorikkArrangorEndring } from './HistorikkArrangorEndring'
import { DeltakerHistorikk, DeltakerHistorikkListe } from '../../../../../api/data/historikk'
import { HistorikkType } from '../../../../../api/data/forslag'

interface Props {
  historikk: DeltakerHistorikkListe | null
  open: boolean
  onClose: () => void
}

const getHistorikkItem = (historikk: DeltakerHistorikk) => {
  switch (historikk.type) {
    case HistorikkType.Vedtak:
      return <HistorikkVedtak endringsVedtak={historikk} />
    case HistorikkType.Endring:
      return <HistorikkEndring deltakerEndring={historikk} />
    case HistorikkType.Forslag:
      return <HistorikkForslag forslag={historikk} />
    case HistorikkType.EndringFraArrangor:
      return <HistorikkArrangorEndring deltakerEndringFraArrangor={historikk} />
  }
}

export const HistorikkModal = ({ open, historikk, onClose }: Props) => {
  return (
    <Modal open={open} header={{ heading: 'Endringer' }} onClose={onClose}>
      <Modal.Body>
        {historikk &&
          historikk.map((i, index) => (
            <div key={`${i.type}${index}`} className="mb-6 last:mb-0">
              {getHistorikkItem(i)}
            </div>
          ))}
        {(!historikk || historikk.length < 0) && (
          <Alert variant="info" size="small">
            Ingen historikk å vise.
          </Alert>
        )}
      </Modal.Body>
    </Modal>
  )
}
