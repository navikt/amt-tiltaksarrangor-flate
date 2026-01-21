import { Alert, Modal } from '@navikt/ds-react'
import { HistorikkEndring } from './HistorikkEndring'
import { HistorikkForslag } from './HistorikkForslag'
import { HistorikkVedtak } from './HistorikkVedtak'
import { HistorikkArrangorEndring } from './HistorikkArrangorEndring'
import { DeltakerHistorikk, DeltakerHistorikkListe } from '../../../../../api/data/historikk'
import { HistorikkType } from '../../../../../api/data/forslag'
import styles from './Historikk.module.scss'
import { Tiltakskode } from '../../../../../api/data/tiltak'
import { HistorikkImportertFraArena } from './HistorikkImportertFraArena'
import { HistorikkVurderingFraArrangor } from './HistorikkVurderingFraArrangor'
import { HistorikkSoktInn } from './HistorikkSoktInn'
import { HistorikkTiltakskoordinatorEndring } from './HistorikkTiltakskoordinatorEndring'

interface Props {
  historikk: DeltakerHistorikkListe | null
  tiltakskode: Tiltakskode
  open: boolean
  onClose: () => void
}

const getHistorikkItem = (historikk: DeltakerHistorikk, tiltakskode: Tiltakskode) => {
  switch (historikk.type) {
    case HistorikkType.Vedtak:
      return <HistorikkVedtak endringsVedtak={historikk} tiltakskode={tiltakskode} />
    case HistorikkType.InnsokPaaFellesOppstart:
      return <HistorikkSoktInn soktInnHistorikk={historikk} tiltakskode={tiltakskode} />
    case HistorikkType.Endring:
      return <HistorikkEndring deltakerEndring={historikk} tiltakskode={tiltakskode} />
    case HistorikkType.Forslag:
      return <HistorikkForslag forslag={historikk} />
    case HistorikkType.EndringFraArrangor:
      return <HistorikkArrangorEndring deltakerEndringFraArrangor={historikk} />
    case HistorikkType.ImportertFraArena:
      return (
        <HistorikkImportertFraArena
          deltakelseVedImport={historikk}
          tiltakskode={tiltakskode}
        />
      )
    case HistorikkType.VurderingFraArrangor:
      return (
          <HistorikkVurderingFraArrangor vurdering={historikk}/>
      )
    case HistorikkType.EndringFraTiltakskoordinator:
      return (
        <HistorikkTiltakskoordinatorEndring
          tiltakskoordinatorEndring={historikk}
        />
      )
  }
}

export const HistorikkModal = ({ open, historikk, tiltakskode, onClose }: Props) => {
  return (
    <Modal open={open} header={{ heading: 'Endringer' }} onClose={onClose}>
      <Modal.Body>
        {historikk &&
          historikk.map((i, index) => (
            <div key={`${i.type}${index}`} className={styles.historikk_list_item}>
              {getHistorikkItem(i, tiltakskode)}
            </div>
          ))}
        {(!historikk || historikk.length === 0) && (
          <Alert variant="info" size="small">
            Ingen historikk å vise.
          </Alert>
        )}
      </Modal.Body>
    </Modal>
  )
}
