import { AxiosResponse } from 'axios';
import { TiltakInstansDTO } from './data/tiltak';
import { TiltakInstans, TiltakInstansStatus } from '../domeneobjekter/tiltak';
import { TiltakDeltagerDetaljerDTO, TiltakDeltagerDTO } from './data/deltager';
import { TiltakDeltager, TiltakDeltagerDetaljer, TiltakDeltagerStatus } from '../domeneobjekter/deltager';
import { AnsattRolle, InnloggetAnsatt } from '../domeneobjekter/ansatt';
import { InnloggetAnsattDTO } from './data/ansatt';
import toEnumValue from '../utils/toEnumValue';

export const transformTiltakInstanser = (response: AxiosResponse<TiltakInstansDTO[]>) : AxiosResponse<TiltakInstans[]> => {
    const tiltak = response.data.map(toTiltakInstans);
    return {...response, data: tiltak}
}

export const transformTiltakInstans = (response: AxiosResponse<TiltakInstansDTO>) : AxiosResponse<TiltakInstans> => {
    return {...response, data: toTiltakInstans(response.data)}
}

const toTiltakInstans = (tiltakInstansDTO: TiltakInstansDTO) : TiltakInstans => {
    return {
        ...tiltakInstansDTO,
        startdato: new Date(tiltakInstansDTO.startdato),
        sluttdato: new Date(tiltakInstansDTO.sluttdato),
        status: toEnumValue(TiltakInstansStatus, tiltakInstansDTO.status)
    };
}

export const transformTiltakDeltager = (response: AxiosResponse<TiltakDeltagerDTO[]>) : AxiosResponse<TiltakDeltager[]> => {
    const deltagere =  response.data.map(toTiltakDeltager);
    return {...response, data: deltagere}
}

const toTiltakDeltager = (tiltakDeltagerDTO : TiltakDeltagerDTO) : TiltakDeltager => {
    return {
        ...tiltakDeltagerDTO,
        startdato: new Date(tiltakDeltagerDTO.startdato),
        sluttdato: new Date(tiltakDeltagerDTO.sluttdato),
        status: toEnumValue(TiltakDeltagerStatus, tiltakDeltagerDTO.status)
    }
}

export const transformTiltakDeltagerDetaljer = (response: AxiosResponse<TiltakDeltagerDetaljerDTO>) : AxiosResponse<TiltakDeltagerDetaljer> => {
    return {...response, data: toTiltakDeltagerDetaljer(response.data)};
}

const toTiltakDeltagerDetaljer = (tiltakDeltagerDetaljerDTO: TiltakDeltagerDetaljerDTO) : TiltakDeltagerDetaljer => {
    return {
        ...tiltakDeltagerDetaljerDTO,
        startdato: new Date(tiltakDeltagerDetaljerDTO.startdato),
        sluttdato: new Date(tiltakDeltagerDetaljerDTO.sluttdato),
        status: toEnumValue(TiltakDeltagerStatus,tiltakDeltagerDetaljerDTO.status),
        tiltakInstans: toTiltakInstans(tiltakDeltagerDetaljerDTO.tiltakInstans)
    }
}

export const transformInnloggetAnsatt = (response: AxiosResponse<InnloggetAnsattDTO>) : AxiosResponse<InnloggetAnsatt> => {
    return {...response, data: toInnloggetAnsatt(response.data)}
}

const toInnloggetAnsatt = (innloggetAnsattDTO: InnloggetAnsattDTO): InnloggetAnsatt => {
    const toVirksomhetRoller = (rollerDTO: string []) => rollerDTO.map((rolle) => toEnumValue(AnsattRolle, rolle))

    return {
        ...innloggetAnsattDTO,
        virksomheter: innloggetAnsattDTO.virksomheter.map(virksomhetDTO => {
            return {
                ...virksomhetDTO,
                roller: toVirksomhetRoller(virksomhetDTO.roller)
            }
        })
    }
}

