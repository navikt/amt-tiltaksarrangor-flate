import { CaretRightCircleFillIcon } from '@navikt/aksel-icons'
import { BodyLong } from '@navikt/ds-react'
import { DeltakelseInnholdListe } from '../DeltakelseInnholdListe'
import { HistorikkElement } from './HistorikkElement'
import { formatDate } from '../../../../../utils/date-utils'
import { Vedtak } from '../../../../../api/data/historikk'

interface Props {
	endringsVedtak: Vedtak
}

export const HistorikkVedtak = ({ endringsVedtak }: Props) => {
	const {
		fattet,
		fattetAvNav,
		opprettetAv,
		opprettetAvEnhet,
		deltakelsesinnhold,
		bakgrunnsinformasjon
	} = endringsVedtak

	return (
		<HistorikkElement
			tittel={`Påmelding ${formatDate(fattet)}`}
			icon={<CaretRightCircleFillIcon color="var(--a-limegreen-800)" />}
		>
			<BodyLong size="small" weight="semibold">
				Dette er innholdet
			</BodyLong>
			<BodyLong size="small">{deltakelsesinnhold.ledetekst}</BodyLong>
			<DeltakelseInnholdListe
				deltakelsesinnhold={deltakelsesinnhold}
				className="-mt-3 -mb-1"
			/>

			<BodyLong size="small" weight="semibold" className="mt-2">
				Bakgrunnsinfo
			</BodyLong>
			<BodyLong size="small">{bakgrunnsinformasjon}</BodyLong>

			<BodyLong size="small" textColor="subtle" className="mt-1">
				{fattetAvNav
					? `Meldt på av ${opprettetAv} ${opprettetAvEnhet} ${formatDate(fattet)}.`
					: `Utkast delt av ${opprettetAv} ${opprettetAvEnhet}. Du godkjente utkastet ${formatDate(fattet)}.`}
			</BodyLong>
		</HistorikkElement>
	)
}
