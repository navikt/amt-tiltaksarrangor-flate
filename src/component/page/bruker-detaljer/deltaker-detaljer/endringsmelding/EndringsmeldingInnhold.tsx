import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import {
	DeltakerStatusAarsak,
	DeltakerStatusAarsakType,
	Endringsmelding,
	EndringsmeldingType
} from '../../../../../api/data/endringsmelding'
import { formatDate } from '../../../../../utils/date-utils'
import { aarsakTekstMapper } from '../tekst-mappers'

export interface EndringsmeldingInnholdProps {
	endringsmelding: Endringsmelding
}

export const EndringsmeldingInnhold = (props: EndringsmeldingInnholdProps) => {
	const { endringsmelding } = props

	const getAarsakTekst = (aarsak : DeltakerStatusAarsak) => {
		return aarsak.type === DeltakerStatusAarsakType.ANNET? aarsak.beskrivelse : aarsakTekstMapper(aarsak.type)
	}

	switch (endringsmelding.type) {
		case EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO:
			return (
				<>
					<BodyShort size="small">Legg til oppstartsdato</BodyShort>
					<BodyShort size="small">Ny oppstartsdato: {formatDate(endringsmelding.innhold.oppstartsdato)}</BodyShort>
				</>
			)
		case EndringsmeldingType.ENDRE_OPPSTARTSDATO:
			return (
				<>
					<BodyShort size="small">Endre oppstartsdato</BodyShort>
					<BodyShort size="small">Ny oppstartsdato: {formatDate(endringsmelding.innhold.oppstartsdato)}</BodyShort>
				</>
			)
		case EndringsmeldingType.FORLENG_DELTAKELSE:
			return (
				<>
					<BodyShort size="small">Forlengelse</BodyShort>
					<BodyShort size="small">Ny sluttdato: {formatDate(endringsmelding.innhold.sluttdato)}</BodyShort>
				</>
			)
		case EndringsmeldingType.DELTAKER_IKKE_AKTUELL:
			return (
				<>
					<BodyShort size="small">Deltaker er ikke aktuell</BodyShort>
					<BodyShort size="small">Årsak: {getAarsakTekst(endringsmelding.innhold.aarsak)}</BodyShort>
				</>
			)
		case EndringsmeldingType.AVSLUTT_DELTAKELSE:
			return (
				<>
					<BodyShort size="small">Avslutt deltakelse </BodyShort>
					<BodyShort size="small">Årsak: {getAarsakTekst(endringsmelding.innhold.aarsak)}</BodyShort>
					<BodyShort size="small">Ny sluttdato: {formatDate(endringsmelding.innhold.sluttdato)}</BodyShort>

				</>
			)
		case EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT:
			return (
				<>
					<BodyShort size="small">Endre prosent</BodyShort>
					<BodyShort size="small">Ny deltakelsesprosent: {endringsmelding.innhold.deltakelseProsent}%</BodyShort>
					{ endringsmelding.innhold.gyldigFraDato && <BodyShort size="small">Gjelder fra {formatDate(endringsmelding.innhold.gyldigFraDato)}</BodyShort> }
				</>
			)
		default: return null
	}
}
