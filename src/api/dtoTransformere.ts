import { AxiosResponse } from 'axios'
import dayjs from 'dayjs'

import { AnsattRolle, InnloggetAnsatt } from '../domeneobjekter/ansatt'
import { TiltakDeltaker, TiltakDeltakerDetaljer, TiltakDeltakerStatus } from '../domeneobjekter/deltaker'
import { Gjennomforing, TiltakGjennomforingStatus } from '../domeneobjekter/tiltak'
import { toEnumValue, toNullableEnumValue } from '../utils/toEnumValue'
import { InnloggetAnsattDTO } from './data/ansatt'
import { TiltakDeltagerDetaljerDTO, TiltakDeltagerDTO } from './data/deltaker'
import { GjennomforingDTO } from './data/tiltak'

export const transformGjennomforinger = (response: AxiosResponse<GjennomforingDTO[]>) : AxiosResponse<Gjennomforing[]> => {
	const tiltak = response.data.map(toGjennomforing)
	return { ...response, data: tiltak }
}

export const transformGjennomforing = (response: AxiosResponse<GjennomforingDTO>) : AxiosResponse<Gjennomforing> => {
	return { ...response, data: toGjennomforing(response.data) }
}

const toGjennomforing = (gjennomforing: GjennomforingDTO) : Gjennomforing => {
	return {
		...gjennomforing,
		startDato: dayjs(gjennomforing.startDato, 'YYYY-MM-DD').toDate(),
		sluttDato: dayjs(gjennomforing.sluttDato).toDate(),
		status: toNullableEnumValue(TiltakGjennomforingStatus, gjennomforing.status)
	}
}

export const transformTiltakDeltager = (response: AxiosResponse<TiltakDeltagerDTO[]>) : AxiosResponse<TiltakDeltaker[]> => {
	const deltakere =  response.data.map(toTiltakDeltager)
	return { ...response, data: deltakere }
}
const toDateIfPresent = (date: string | null) : Date | undefined  => date? dayjs(date).toDate(): undefined

const toTiltakDeltager = (tiltakDeltagerDTO : TiltakDeltagerDTO) : TiltakDeltaker => {

	return {
		...tiltakDeltagerDTO,
		mellomnavn: tiltakDeltagerDTO.mellomnavn? tiltakDeltagerDTO.mellomnavn: undefined,
		startDato: toDateIfPresent(tiltakDeltagerDTO.startDato),
		sluttDato: toDateIfPresent(tiltakDeltagerDTO.sluttDato),
		status: toEnumValue(TiltakDeltakerStatus, tiltakDeltagerDTO.status),
		registrertDato: dayjs(tiltakDeltagerDTO.registrertDato).toDate()
	}
}

export const transformTiltakDeltagerDetaljer = (response: AxiosResponse<TiltakDeltagerDetaljerDTO>) : AxiosResponse<TiltakDeltakerDetaljer> => {
	return { ...response, data: toTiltakDeltagerDetaljer(response.data) }
}

const toTiltakDeltagerDetaljer = (tiltakDeltagerDetaljerDTO: TiltakDeltagerDetaljerDTO) : TiltakDeltakerDetaljer => {

	return {
		...tiltakDeltagerDetaljerDTO,
		mellomnavn: tiltakDeltagerDetaljerDTO.mellomnavn? tiltakDeltagerDetaljerDTO.mellomnavn: undefined,
		startDato: toDateIfPresent(tiltakDeltagerDetaljerDTO.startDato),
		sluttDato: toDateIfPresent(tiltakDeltagerDetaljerDTO.sluttDato),
		status: toEnumValue(TiltakDeltakerStatus,tiltakDeltagerDetaljerDTO.status),
		gjennomforing: toGjennomforing(tiltakDeltagerDetaljerDTO.gjennomforing),
		registrertDato: dayjs(tiltakDeltagerDetaljerDTO.registrertDato).toDate()
	}
}

export const transformInnloggetAnsatt = (response: AxiosResponse<InnloggetAnsattDTO>) : AxiosResponse<InnloggetAnsatt> => {
	return { ...response, data: toInnloggetAnsatt(response.data) }
}

const toInnloggetAnsatt = (innloggetAnsattDTO: InnloggetAnsattDTO): InnloggetAnsatt => {
	const toVirksomhetRoller = (rollerDTO: string []) => rollerDTO.map((rolle) => toEnumValue(AnsattRolle, rolle))

	return {
		...innloggetAnsattDTO,
		arrangorer: innloggetAnsattDTO.arrangorer.map(virksomhetDTO => {
			return {
				...virksomhetDTO,
				roller: toVirksomhetRoller(virksomhetDTO.roller)
			}
		})
	}
}

