import { Information } from '@navikt/ds-icons'
import { BodyLong, Heading } from '@navikt/ds-react'
import React from 'react'

import { useTabTitle } from '../../../hooks/use-tab-title'
import { GJENNOMFORING_LISTE_PAGE_ROUTE, PERSONOPPLYSNINGER_PAGE_ROUTE } from '../../../navigation'
import { Card } from '../../felles/card/Card'
import { IkonLenke } from '../../felles/ikon-lenke/IkonLenke'
import { Tilbakelenke } from '../../felles/tilbakelenke/Tilbakelenke'
import clipboardImg from './clipboard.svg'
import styles from './InformasjonPage.module.scss'
import lightbulbImg from './lightbulb.svg'
import mobilephoneImg from './mobilephone.svg'
import roadblockImg from './roadblock.svg'

interface InfoElementProps {
	title: string
	image: string
	alt: string
	children?: React.ReactNode
}

const InfoElement = (props: InfoElementProps): React.ReactElement<InfoElementProps> => {
	return (
		<div className={styles.infoElement}>
			<img className={styles.infoElementImg} src={props.image} alt={props.alt} />
			<div>
				<Heading className={styles.infoElementTitle} spacing size="xsmall" level="3">{props.title}</Heading>
				{props.children}
			</div>
		</div>
	)
}

export const InformasjonPage = (): React.ReactElement => {
	useTabTitle('Informasjon om deltakeroversikten')

	return (
		<div className={styles.page} data-testid="informasjon-page">
			<div className={styles.content}>
				<Tilbakelenke to={GJENNOMFORING_LISTE_PAGE_ROUTE} />

				<Card className={styles.contentCard}>
					<Heading className={styles.title} spacing size="large" level="2">Info om deltakeroversikten</Heading>

					<BodyLong className={styles.brodtekst} spacing>
						Du som jobber hos en tiltaksarrangør, får i denne tjenesten se deltakere som har godkjent plass på tiltak hos dere.
					</BodyLong>

					<InfoElement
						title="Ikke del kontaktinformasjon videre"
						image={mobilephoneImg}
						alt="Mobiltelefon ikon"
					>
						<BodyLong spacing>
							Kontaktinformasjonen til NAV-veileder skal ikke deles videre til deltaker. Deltakere som ønsker å kontakte NAV-veilederen sin kan logge inn på nav.no eller ringe NAV Kontaktsenter.
						</BodyLong>
					</InfoElement>

					<InfoElement
						title="Når fjernes deltaker fra listen?"
						image={clipboardImg}
						alt="Utklippstavle ikon"
					>
						<BodyLong spacing>
							Deltakere som slutter eller meldes av tiltaket vises i 14 dager før de fjernes fra listen.
						</BodyLong>
					</InfoElement>

					<InfoElement
						title="Løsningen er under arbeid"
						image={lightbulbImg}
						alt="Lyspære ikon"
					>
						<BodyLong spacing>
							Det jobbes kontinuerlig med å gjøre tjenesten bedre.
						</BodyLong>
					</InfoElement>


					<InfoElement
						title="Hvordan få tilgang til riktig deltakerliste?"
						image={roadblockImg}
						alt="Veisperring ikon"
					>
						<BodyLong spacing>
							For å få tilgang må arbeidsgiveren din tildele Altinn-rettighet til deg på den riktige underenhetens org.nr.
						</BodyLong>
						<BodyLong>
							Hvis du er usikker på hvilket organisasjonsnummer som er riktig for deltakerlisten du jobber med, så ta kontakt med den som er ansvarlig for avtalen i NAV.
						</BodyLong>
					</InfoElement>
				</Card>

				<IkonLenke
					to={PERSONOPPLYSNINGER_PAGE_ROUTE}
					className={styles.informasjonLenkeWrapper}
					ikon={<Information title="Informasjon" />}
					text="Slik behandles personopplysningene dine når du bruker deltakeroversikten"
				/>
			</div>

		</div>
	)
}
