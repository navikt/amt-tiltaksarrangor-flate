import { Checkbox, Table } from '@navikt/ds-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { TiltakDeltaker } from '../../../api/data/deltaker'
import { EndringsmeldingType } from '../../../api/data/endringsmelding'
import { brukerDetaljerPageUrl } from '../../../navigation'
import { klikkDeltakerRadOversikt, loggKlikk } from '../../../utils/amplitude-utils'
import { lagKommaSeparertBrukerNavn } from '../../../utils/bruker-utils'
import { EMDASH } from '../../../utils/constants'
import { formatDate } from '../../../utils/date-utils'
import toggle from '../../../utils/toggle'
import { Fnr } from '../fnr/Fnr'
import { Show } from '../Show'
import { StatusMerkelapp } from '../status-merkelapp/StatusMerkelapp'
import { TabellType } from './DeltakerTabell'

import styles from './Rad.module.scss'

interface RadProps {
	idx: number
	deltaker: TiltakDeltaker
	visning: TabellType
	visCheckBox?: boolean
}

export const Rad = (props: RadProps): React.ReactElement<RadProps> => {
	const {
		fodselsnummer,
		fornavn,
		etternavn,
		mellomnavn,
		id,
		startDato,
		sluttDato,
		registrertDato,
		status,
		aktiveEndringsmeldinger,
		aktiveVeiledere,
	} = props.deltaker

	const aktivSluttdato = aktiveEndringsmeldinger?.flatMap(e => {
		return e.type === EndringsmeldingType.FORLENG_DELTAKELSE || e.type === EndringsmeldingType.AVSLUTT_DELTAKELSE ? e.innhold.sluttdato : []
	})[0]
	const aktivStartdato = aktiveEndringsmeldinger?.flatMap(e => {
		return e.type === EndringsmeldingType.ENDRE_OPPSTARTSDATO || e.type === EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO ? e.innhold.oppstartsdato : []
	})[0]

	const startDatoTekst = aktivStartdato
		? formatDate(aktivStartdato) + '*'
		: formatDate(startDato)

	const sluttDatoTekst = aktivSluttdato
		? formatDate(aktivSluttdato) + '*'
		: formatDate(sluttDato)

	const veileder = aktiveVeiledere.filter(v => !v.erMedveileder)[0]

	const deltakerNavn = lagKommaSeparertBrukerNavn(fornavn, mellomnavn, etternavn)

	if (props.visning === TabellType.KOORDINATOR) {
		return (
			<Table.Row key={id}>
				<CheckBoxCell navn={deltakerNavn} id={id} visCheckBox={props.visCheckBox} />
				<Navn navn={deltakerNavn} id={id} />
				<Table.DataCell><Fnr fnr={fodselsnummer} /></Table.DataCell>
				<Table.DataCell>{formatDate(registrertDato)}</Table.DataCell>
				<Table.DataCell>{startDatoTekst}</Table.DataCell>
				<Table.DataCell>{sluttDatoTekst}</Table.DataCell>
				<Table.DataCell>
					<StatusMerkelapp status={status} />
				</Table.DataCell>
				<Show if={toggle.veiledereEnabled}>
					<Table.DataCell>
						{veileder ? lagKommaSeparertBrukerNavn(veileder.fornavn, veileder.mellomnavn, veileder.etternavn) : EMDASH}
					</Table.DataCell>
				</Show>
			</Table.Row >
		)
	}

	return (
		<Table.Row key={id}>
			<Navn navn={deltakerNavn} id={id} />
			<Table.DataCell><Fnr fnr={fodselsnummer} /></Table.DataCell>
			<Table.DataCell>{startDatoTekst}</Table.DataCell>
			<Table.DataCell>{sluttDatoTekst}</Table.DataCell>
			<Table.DataCell>
				<StatusMerkelapp status={status} />
			</Table.DataCell>
		</Table.Row>
	)
}


interface NavnProps {
	navn: string
	id: string
}

const Navn = ({ navn, id }: NavnProps) => (
	<Table.DataCell>
		<Link className={styles.brukersNavn} to={brukerDetaljerPageUrl(id)} onClick={() => loggKlikk(klikkDeltakerRadOversikt)}>
			{navn}
		</Link>
	</Table.DataCell>
)


interface CheckBoxCellProps {
	navn: string
	id: string
	visCheckBox?: boolean
}

const CheckBoxCell = ({ navn, id, visCheckBox }: CheckBoxCellProps) => {
	if (visCheckBox) {
		return (
			<Table.DataCell>
				<Checkbox
					value={id}
					hideLabel={true}
					aria-label={navn}
					size="small"
				>
					{navn}
				</Checkbox>
			</Table.DataCell>
		)
	}
	return <></>
}

