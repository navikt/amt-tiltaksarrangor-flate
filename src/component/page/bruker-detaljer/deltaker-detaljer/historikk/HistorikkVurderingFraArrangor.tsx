import { MenuElipsisHorizontalCircleFillIcon } from '@navikt/aksel-icons'
import { BodyShort, Detail } from '@navikt/ds-react'
import { HistorikkElement } from './HistorikkElement'
import { VurderingFraArrangor } from '../../../../../api/data/historikk'
import { formatDateStr } from '../../../../../utils/date-utils'
import { Vurderingstype } from '../../../../../api/data/deltaker'

interface Props {
  vurdering: VurderingFraArrangor
}
export const HistorikkVurderingFraArrangor = ({ vurdering }: Props) => {
  const vurderingstypeTekst = getVurderingstypeTekst(vurdering.vurderingstype)
  const vurderingsdato = formatDateStr(vurdering.opprettetDato.toString())
  return (
    <HistorikkElement
      tittel={'Vurdering fra arrangør'}
      icon={
        <MenuElipsisHorizontalCircleFillIcon color="var(--a-deepblue-400)" />
      }
    >
      <BodyShort size="small">Vurdering: {vurderingstypeTekst}</BodyShort>
      {vurdering.begrunnelse && (
        <BodyShort size="small">Begrunnelse: {vurdering.begrunnelse}</BodyShort>
      )}
      <Detail className="mt-1" textColor="subtle">
        Endret {vurderingsdato} av {vurdering.endretAv}
      </Detail>
    </HistorikkElement>
  )
}

function getVurderingstypeTekst(vurderingstype: Vurderingstype) {
  if (vurderingstype == Vurderingstype.OPPFYLLER_KRAVENE)
    return 'Kravene for deltakelse er oppfylt'
  else if (vurderingstype == Vurderingstype.OPPFYLLER_IKKE_KRAVENE)
    return 'Kravene for deltakelse er ikke oppfylt'
}
