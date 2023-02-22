import { OverordnetEnhetVO } from '../deltakerliste.viewobjects'
import { DeltakerlisterPaEnhet } from './deltakerlister-pa-virksomhet/DeltakerlisterPaEnhet'
import { Heading } from '@navikt/ds-react'
import React from 'react'
import globalStyles from '../../../../globals.module.scss'

interface UnderenheterPaOverenhetProps {
    overordnetEnhet: OverordnetEnhetVO;
    deltakerlisterLagtTil: string[];
    deltakerlisteIdLoading: string | undefined;
    onLeggTil: (id: string) => void;
    onFjern: (id: string) => void;
}

export const UnderenheterPaOverenhet = (props: UnderenheterPaOverenhetProps) => {
	return (
		<div className={globalStyles.blokkM}>
			<Heading size="medium" level="3" spacing>{props.overordnetEnhet.navn}</Heading>
			{props.overordnetEnhet.enheter.map((enhet) =>
				<DeltakerlisterPaEnhet key={enhet.id}
					enhet={enhet}
					deltakerlisterLagtTil={props.deltakerlisterLagtTil}
					deltakerlisteIdLoading={props.deltakerlisteIdLoading}
					onLeggTil={props.onLeggTil}
					onFjern={props.onFjern}/>
			)}
		</div>
	)
}
