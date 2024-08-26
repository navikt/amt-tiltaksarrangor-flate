import { BodyLong, Detail, Heading, ReadMore } from '@navikt/ds-react'
import React from 'react'
import styles from './HistorikkElement.module.scss'
import { formatDate } from '../../../../../utils/date-utils'
import { ForslagEndringsdetaljer } from '../forslag/ForslagEndringsdetaljer'

interface Props {
	tittel: string
	icon: React.ReactNode
	forslag?: React.ReactNode
	children: React.ReactNode
}

export const HistorikkElement = ({
	tittel,
	icon,
	forslag,
	children
}: Props) => {
	return (
		<div
			className={styles.historikkElement}
			style={{
				gridTemplateColumns: '1.25rem auto'
			}}
		>
			<div className={styles.ikon} aria-hidden>
				{icon}
			</div>

			<div className={styles.historikkBolk}>
				<div className={styles.historikkTittel}>
					<Heading level="2" size="small" className={styles.tittel}>
						{tittel}
					</Heading>
				</div>
					{children}

					{forslag && (
						<ReadMore size="small" header="Forslaget fra arrangør">
							<BodyLong size="small" weight="semibold">
								{getForslagTittel(forslag.endring.type)}
							</BodyLong>
							<ForslagEndringsdetaljer forslag={forslag} />
							<Detail
								className={styles.detail}
								textColor="subtle"
							>{`Sendt ${formatDate(forslag?.opprettet)} fra ${forslag.arrangorNavn}.`}</Detail>
						</ReadMore>
					)}
				</div>
			</div>
			)
			}
