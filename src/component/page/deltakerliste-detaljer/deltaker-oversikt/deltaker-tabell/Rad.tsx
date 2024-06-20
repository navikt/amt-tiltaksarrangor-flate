import { Table, Link as LinkDs } from '@navikt/ds-react'
import React, { useState } from 'react'
import cls from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import { KursDeltakerStatuser, TiltakDeltaker, Vurderingstype } from '../../../../../api/data/deltaker'
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
import { CheckmarkCircleFillIcon, PlusCircleFillIcon } from '@navikt/aksel-icons'
import { AdressebeskyttetModal } from '../../../veileder/AdressebeskyttetModal.tsx'

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
		gjeldendeVurderingFraArrangor,
		adressebeskyttet,
		erVeilederForDeltaker
	} = props.deltaker
	const [ modalOpen, setModalOpen ] = useState(false)
	const navigate = useNavigate()
	const veileder = veiledere.filter(v => v.veiledertype === Veiledertype.VEILEDER)[0]

	const veiledernavn = veileder ? lagKommaSeparertBrukerNavn(veileder.fornavn, veileder.mellomnavn, veileder.etternavn) : EMDASH
	const deltakerNavn = lagKommaSeparertBrukerNavn(fornavn, mellomnavn, etternavn)

	const vurderingIkon = gjeldendeVurderingFraArrangor?.vurderingstype === Vurderingstype.OPPFYLLER_IKKE_KRAVENE
		? <PlusCircleFillIcon className={ styles.oppfyllerIkkeKraveneIkon } aria-label="Vurdert til oppfyller ikke kravene" />
		: <CheckmarkCircleFillIcon className={ styles.oppfyllerKraveneIkon } aria-label="Vurdert til oppfyller kravene" />

	const deltakerDetaljerPageUrl = brukerDetaljerPageUrl(id, 'koordinator')

	const handleConfrimed = () => {
		setModalOpen(false)
		loggKlikk(klikkDeltakerRadOversikt)
		navigate(deltakerDetaljerPageUrl)
	}

	return (
		<Table.Row key={id}>
			<Table.DataCell className={ styles.smallText }>
				<Link className={styles.brukersNavn} to={deltakerDetaljerPageUrl} onClick={(e) => {
					if (adressebeskyttet && erVeilederForDeltaker) {
						e.preventDefault()
						setModalOpen(true)
					} else {
						loggKlikk(klikkDeltakerRadOversikt)
					}
				}}>
					{ adressebeskyttet ? 'Adressebeskyttet' : deltakerNavn }
				</Link>
			</Table.DataCell>
			<Table.DataCell className={ styles.smallText }>
				{ adressebeskyttet ? '' : <Fnr fnr={ fodselsnummer } /> }
			</Table.DataCell>
			<Table.DataCell className={ styles.smallText }>{formatDate(soktInnDato)}</Table.DataCell>
			<Table.DataCell className={ styles.smallText }>{utledStartdato(startDato, aktiveEndringsmeldinger)}</Table.DataCell>
			<Table.DataCell className={ styles.smallText }>{utledSluttdato(sluttDato, aktiveEndringsmeldinger)}</Table.DataCell>
			<Table.DataCell className={ cls(styles.smallText) }>
				<div className={ cls(styles.statusCelle) }>
					<StatusMerkelapp status={ status } erDeltakerlisteVisning />
					{ status.type === KursDeltakerStatuser.VURDERES && gjeldendeVurderingFraArrangor && vurderingIkon }
				</div>
			</Table.DataCell>
			<Table.DataCell className={ styles.smallText }>
				{veiledernavn}
			</Table.DataCell>
			<AdressebeskyttetModal open={modalOpen} handleCloseModal={() => setModalOpen(false)} handleConfrimed={handleConfrimed} />
		</Table.Row >
	)
}
