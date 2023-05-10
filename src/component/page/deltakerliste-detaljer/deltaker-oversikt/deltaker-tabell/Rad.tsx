import { Table } from '@navikt/ds-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { TiltakDeltaker } from '../../../../../api/data/deltaker'
import { Endringsmelding, EndringsmeldingType } from '../../../../../api/data/endringsmelding'
import { brukerDetaljerPageUrl } from '../../../../../navigation'
import { klikkDeltakerRadOversikt, loggKlikk } from '../../../../../utils/amplitude-utils'
import { lagKommaSeparertBrukerNavn } from '../../../../../utils/bruker-utils'
import { EMDASH } from '../../../../../utils/constants'
import { formatDate } from '../../../../../utils/date-utils'
import toggle from '../../../../../utils/toggle'
import { Fnr } from '../../../../felles/fnr/Fnr'
import { Show } from '../../../../felles/Show'
import { StatusMerkelapp } from '../../../../felles/status-merkelapp/StatusMerkelapp'

import styles from './Rad.module.scss'
import { Veiledertype } from '../../../../../api/data/veileder'

interface RadProps {
	idx: number
	deltaker: TiltakDeltaker
}

const hentEndringsmeldingSluttdato = (endringsmeldinger: Endringsmelding[]) => {
	return endringsmeldinger?.flatMap(e => {
		return e.type === EndringsmeldingType.FORLENG_DELTAKELSE || e.type === EndringsmeldingType.AVSLUTT_DELTAKELSE || e.type === EndringsmeldingType.ENDRE_SLUTTDATO ? e.innhold.sluttdato : []
	})[0]
}

const hentEndringsmeldingStartdato = (endringsmeldinger: Endringsmelding[]) => {
	return endringsmeldinger?.flatMap(e => {
		return e.type === EndringsmeldingType.ENDRE_OPPSTARTSDATO || e.type === EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO ? e.innhold.oppstartsdato : []
	})[0]
}

export const utledStartdato = (deltakerStartdato: Date | null, endringsmeldinger: Endringsmelding[]) => {
	const endringsmeldingStartdato = hentEndringsmeldingStartdato(endringsmeldinger)
	return endringsmeldingStartdato? formatDate(endringsmeldingStartdato)+ '*': formatDate(deltakerStartdato)
}

export const utledSluttdato = (deltakerSluttdato: Date | null, endringsmeldinger: Endringsmelding[]) => {
	const endringsmeldingSluttdato = hentEndringsmeldingSluttdato(endringsmeldinger)
	return endringsmeldingSluttdato? formatDate(endringsmeldingSluttdato)+ '*': formatDate(deltakerSluttdato)
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
		soktInnDato,
		status,
		aktiveEndringsmeldinger,
		veiledere,
	} = props.deltaker

	const veileder = veiledere.filter(v => v.veiledertype === Veiledertype.VEILEDER)[0]

	const veiledernavn = veileder ? lagKommaSeparertBrukerNavn(veileder.fornavn, veileder.mellomnavn, veileder.etternavn) : EMDASH
	const deltakerNavn = lagKommaSeparertBrukerNavn(fornavn, mellomnavn, etternavn)

	return (
		<Table.Row key={id}>
			<Table.DataCell>
				<Link className={styles.brukersNavn} to={brukerDetaljerPageUrl(id, 'koordinator')} onClick={() => loggKlikk(klikkDeltakerRadOversikt)}>
					{deltakerNavn}
				</Link>
			</Table.DataCell>
			<Table.DataCell><Fnr fnr={fodselsnummer} /></Table.DataCell>
			<Table.DataCell>{formatDate(soktInnDato)}</Table.DataCell>
			<Table.DataCell>{utledStartdato(startDato, aktiveEndringsmeldinger)}</Table.DataCell>
			<Table.DataCell>{utledSluttdato(sluttDato, aktiveEndringsmeldinger)}</Table.DataCell>
			<Table.DataCell>
				<StatusMerkelapp status={status} erDeltakerlisteVisning />
			</Table.DataCell>
			<Show if={toggle.veilederEnabled}>
				<Table.DataCell>
					{veiledernavn}
				</Table.DataCell>
			</Show>
		</Table.Row >
	)
}
