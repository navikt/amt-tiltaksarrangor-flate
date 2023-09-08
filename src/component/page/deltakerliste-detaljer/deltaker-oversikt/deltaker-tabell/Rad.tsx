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
import { Fnr } from '../../../../felles/fnr/Fnr'
import { StatusMerkelapp } from '../../../../felles/status-merkelapp/StatusMerkelapp'

import styles from './Rad.module.scss'
import { Veiledertype } from '../../../../../api/data/veileder'

interface RadProps {
	idx: number
	deltaker: TiltakDeltaker
}

const hentSluttdatoEndringsmelding = (endringsmeldinger: Endringsmelding[]) => {
	return endringsmeldinger?.flatMap(e => {
		const erSluttdatoMelding = 
			e.type === EndringsmeldingType.FORLENG_DELTAKELSE ||
			e.type === EndringsmeldingType.AVSLUTT_DELTAKELSE ||
			e.type === EndringsmeldingType.ENDRE_SLUTTDATO

		return erSluttdatoMelding ? e : []
	})[0]
}

const hentStartdatoEndringsmelding = (endringsmeldinger: Endringsmelding[]) => {
	return endringsmeldinger?.flatMap(e => {
		const erStartdatoMelding = 
			e.type === EndringsmeldingType.ENDRE_OPPSTARTSDATO || 
			e.type === EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO

		return erStartdatoMelding ? e : []
	})[0]
}


export const utledStartdato = (deltakerStartdato: Date | null, endringsmeldinger: Endringsmelding[]) => {
	const endringsmelding = hentStartdatoEndringsmelding(endringsmeldinger)
	return endringsmelding ? formatDate(endringsmelding.innhold.oppstartsdato) + '*' : formatDate(deltakerStartdato)
}

export const utledSluttdato = (deltakerSluttdato: Date | null, endringsmeldinger: Endringsmelding[]) => {
	const endringsmelding = hentSluttdatoEndringsmelding(endringsmeldinger)
	return endringsmelding ? formatDate(endringsmelding.innhold.sluttdato) + '*' : formatDate(deltakerSluttdato)
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
			<Table.DataCell className={ styles.smallText }>
				<Link className={styles.brukersNavn} to={brukerDetaljerPageUrl(id, 'koordinator')} onClick={() => loggKlikk(klikkDeltakerRadOversikt)}>
					{deltakerNavn}
				</Link>
			</Table.DataCell>
			<Table.DataCell className={ styles.smallText }><Fnr fnr={fodselsnummer} /></Table.DataCell>
			<Table.DataCell className={ styles.smallText }>{formatDate(soktInnDato)}</Table.DataCell>
			<Table.DataCell className={ styles.smallText }>{utledStartdato(startDato, aktiveEndringsmeldinger)}</Table.DataCell>
			<Table.DataCell className={ styles.smallText }>{utledSluttdato(sluttDato, aktiveEndringsmeldinger)}</Table.DataCell>
			<Table.DataCell className={ styles.smallText }>
				<StatusMerkelapp status={status} erDeltakerlisteVisning />
			</Table.DataCell>
			<Table.DataCell className={ styles.smallText }>
				{veiledernavn}
			</Table.DataCell>
		</Table.Row >
	)
}
