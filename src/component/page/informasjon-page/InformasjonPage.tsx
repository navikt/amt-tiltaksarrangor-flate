import { BodyLong, Heading } from '@navikt/ds-react'
import React from 'react'

import { Card } from '../../felles/card/Card'
import { Tilbakeknapp } from '../../felles/tilbakeknapp/Tilbakeknapp'
import clipboardImg from './clipboard.svg'
import styles from './InformasjonPage.module.less'
import lightbulbImg from './lightbulb.svg'
import mobilephoneImg from './mobilephone.svg'

interface InfoElementProps {
	title: string
	text: string
	image: string
	alt: string
}

export const InfoElement = (props: InfoElementProps): React.ReactElement<InfoElementProps> => {
	return (
		<div className={styles.infoElement}>
			<img className={styles.infoElementImg} src={props.image} alt={props.alt}/>
			<div>
				<Heading className={styles.infoElementTitle} spacing size="xsmall" level="3">{props.title}</Heading>
				<BodyLong className={styles.infoElementText} spacing>{props.text}</BodyLong>
			</div>
		</div>
	)
}

export const InformasjonPage = (): React.ReactElement => {
	return (
		<main className={styles.page}>
			<div className={styles.content}>
				<Tilbakeknapp to="/" />

				<Card className={styles.contentCard}>
					<Heading className={styles.title} spacing size="large" level="2">Informasjon om tjenesten</Heading>

					<BodyLong className={styles.brodtekst} spacing>
						Du som jobber hos en tiltaksarrangør får i denne tjenesten tilgang til å se deltakere som er meldt på tiltak hos dere.
					</BodyLong>

					<InfoElement
						title="Ikke del kontaktinformasjon videre"
						text="Kontaktinformasjonen til NAV-veileder skal ikke deles videre til deltaker.  Deltakere som ønsker å kontakte sin NAV-veileder skal logge inn på nav.no eller ringe NAV kontaktsenter."
						image={mobilephoneImg}
						alt="Mobiltelefon ikon"
					/>

					<InfoElement
						title="Deltakere som er ferdig i tiltaket"
						text="Deltakere som er merkert med “Har sluttet” eller “Ikke aktuell”, vises i 14 dager før de fjernes. Deltakerne vises etter at de har sluttet slik at ansatte hos tiltaksarrangør skal ha tilstrekkelig med tid til å se at en person skal ut av tiltaket. "
						image={clipboardImg}
						alt="Utklippstavle ikon"
					/>

					<InfoElement
						title="Løsningen er under arbeid"
						text="Det jobbes kontinuerlig med å gjøre tjenesten bedre. Vi som lager tjenesten ønsker gjerne tilbakemeldinger på utfordringer dere opplever i kommunikasjonen mellom NAV, deltaker og tiltaksarrangør. Gi tilbakemelding ved å klikke på “Tilbakemelding” som ligger til høyre. "
						image={lightbulbImg}
						alt="Lyspære ikon"
					/>
				</Card>
			</div>

		</main>
	)
}