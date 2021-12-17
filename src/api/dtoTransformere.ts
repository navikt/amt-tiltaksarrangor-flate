import { AxiosResponse } from 'axios'
import dayjs from 'dayjs'

import { AnsattRolle, InnloggetAnsatt } from '../domeneobjekter/ansatt'
import { TiltakDeltaker, TiltakDeltakerDetaljer, TiltakDeltakerStatus } from '../domeneobjekter/deltaker'
import { TiltakInstans, TiltakInstansStatus } from '../domeneobjekter/tiltak'
import { toEnumValue, toNullableEnumValue } from '../utils/toEnumValue'
import { InnloggetAnsattDTO } from './data/ansatt'
import { TiltakDeltagerDetaljerDTO, TiltakDeltagerDTO } from './data/deltager'
import { TiltakInstansDTO } from './data/tiltak'

export const transformTiltakInstanser = (response: AxiosResponse<TiltakInstansDTO[]>) : AxiosResponse<TiltakInstans[]> => {
	const tiltak = response.data.map(toTiltakInstans)
	return { ...response, data: tiltak }
}

export const transformTiltakInstans = (response: AxiosResponse<TiltakInstansDTO>) : AxiosResponse<TiltakInstans> => {
	return { ...response, data: toTiltakInstans(response.data) }
}

const toTiltakInstans = (tiltakInstansDTO: TiltakInstansDTO) : TiltakInstans => {
	return {
		...tiltakInstansDTO,
		oppstartdato: dayjs(tiltakInstansDTO.oppstartdato, 'YYYY-MM-DD').toDate(),
		sluttdato: dayjs(tiltakInstansDTO.sluttdato).toDate(),
		status: toNullableEnumValue(TiltakInstansStatus, tiltakInstansDTO.status)
	}
}

export const transformTiltakDeltager = (response: AxiosResponse<TiltakDeltagerDTO[]>) : AxiosResponse<TiltakDeltaker[]> => {
	const deltagere =  response.data.map(toTiltakDeltager)
	return { ...response, data: deltagere }
}
const toDateIfPresent = (date: string | null) : Date | undefined  => date? dayjs(date).toDate(): undefined

const toTiltakDeltager = (tiltakDeltagerDTO : TiltakDeltagerDTO) : TiltakDeltaker => {

	return {
		...tiltakDeltagerDTO,
		mellomnavn: tiltakDeltagerDTO.mellomnavn? tiltakDeltagerDTO.mellomnavn: undefined,
		oppstartdato: toDateIfPresent(tiltakDeltagerDTO.oppstartdato),
		sluttdato: toDateIfPresent(tiltakDeltagerDTO.sluttdato),
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
		oppstartdato: toDateIfPresent(tiltakDeltagerDetaljerDTO.oppstartdato),
		sluttdato: toDateIfPresent(tiltakDeltagerDetaljerDTO.sluttdato),
		status: toEnumValue(TiltakDeltakerStatus,tiltakDeltagerDetaljerDTO.status),
		tiltakInstans: toTiltakInstans(tiltakDeltagerDetaljerDTO.tiltakInstans),
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

