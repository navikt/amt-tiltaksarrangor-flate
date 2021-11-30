import { AxiosResponse } from 'axios'
import dayjs from 'dayjs'

import { AnsattRolle, InnloggetAnsatt } from '../domeneobjekter/ansatt'
import { TiltakDeltager, TiltakDeltagerDetaljer, TiltakDeltagerStatus } from '../domeneobjekter/deltager'
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
		startdato: dayjs(tiltakInstansDTO.oppstartdato, 'YYYY-MM-DD').toDate(),
		sluttdato: dayjs(tiltakInstansDTO.sluttdato).toDate(),
		status: toNullableEnumValue(TiltakInstansStatus, tiltakInstansDTO.status)
	}
}

export const transformTiltakDeltager = (response: AxiosResponse<TiltakDeltagerDTO[]>) : AxiosResponse<TiltakDeltager[]> => {
	const deltagere =  response.data.map(toTiltakDeltager)
	return { ...response, data: deltagere }
}

const toTiltakDeltager = (tiltakDeltagerDTO : TiltakDeltagerDTO) : TiltakDeltager => {
	return {
		...tiltakDeltagerDTO,
		startdato: dayjs(tiltakDeltagerDTO.startdato).toDate(),
		sluttdato: dayjs(tiltakDeltagerDTO.sluttdato).toDate(),
		status: toEnumValue(TiltakDeltagerStatus, tiltakDeltagerDTO.status)
	}
}

export const transformTiltakDeltagerDetaljer = (response: AxiosResponse<TiltakDeltagerDetaljerDTO>) : AxiosResponse<TiltakDeltagerDetaljer> => {
	return { ...response, data: toTiltakDeltagerDetaljer(response.data) }
}

const toTiltakDeltagerDetaljer = (tiltakDeltagerDetaljerDTO: TiltakDeltagerDetaljerDTO) : TiltakDeltagerDetaljer => {
	return {
		...tiltakDeltagerDetaljerDTO,
		startdato: dayjs(tiltakDeltagerDetaljerDTO.startdato).toDate(),
		sluttdato: dayjs(tiltakDeltagerDetaljerDTO.sluttdato).toDate(),
		status: toEnumValue(TiltakDeltagerStatus,tiltakDeltagerDetaljerDTO.status),
		tiltakInstans: toTiltakInstans(tiltakDeltagerDetaljerDTO.tiltakInstans)
	}
}

export const transformInnloggetAnsatt = (response: AxiosResponse<InnloggetAnsattDTO>) : AxiosResponse<InnloggetAnsatt> => {
	return { ...response, data: toInnloggetAnsatt(response.data) }
}

const toInnloggetAnsatt = (innloggetAnsattDTO: InnloggetAnsattDTO): InnloggetAnsatt => {
	const toVirksomhetRoller = (rollerDTO: string []) => rollerDTO.map((rolle) => toEnumValue(AnsattRolle, rolle))

	return {
		...innloggetAnsattDTO,
		leverandorer: innloggetAnsattDTO.leverandorer.map(virksomhetDTO => {
			return {
				...virksomhetDTO,
				roller: toVirksomhetRoller(virksomhetDTO.roller)
			}
		})
	}
}

