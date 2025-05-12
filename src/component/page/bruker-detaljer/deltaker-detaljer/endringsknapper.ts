import { Deltaker, TiltakDeltakerStatus } from '../../../../api/data/deltaker'
import { Tiltakskode } from '../../../../api/data/tiltak'
import { ModalHandler } from './modal-store'
import { ModalDataProps } from './ModalController'
import { EndringType } from './types'

interface EndringsknappData {
	type: EndringType
	erTilgjengelig: boolean,
	modalFunc: (props: ModalDataProps) => void,
}

export function endringsknapper(deltaker: Deltaker, erKometMaster: boolean, modal: ModalHandler): EndringsknappData[] {
	const {
		visEndreOppstartModal,
		visLeggTilOppstartModal,
		visForlengDeltakelseModal,
		visSettDeltakerIkkeAktuellModal,
		visAvsluttDeltakerModal,
		visAvsluttKursDeltakerModal,
		visEndreProsentDeltakelseModal,
		visEndreSluttdatoModal,
		visEndreSluttaarsakModal,
		visFjernOppstartsdatoModal,
	} = modal

	const status = statusBooleans(deltaker.status.type)

	const ferdigPaKurs = status.erFullfort || status.erAvbrutt

	const kanFjerneOppstartsdato =
		status.erVenterPaOppstart &&
		deltaker.startDato !== null &&
		!deltaker.deltakerliste.erKurs &&
		erKometMaster

	const kanForlengeDeltakelse = () => {
		const deltarMedSluttdato = status.erDeltar && deltaker.sluttDato !== null

		if (erKometMaster) {
			return status.erHarSluttet || ferdigPaKurs || (deltarMedSluttdato && !deltaker.deltakerliste.erKurs)
		}
		return status.erHarSluttet || deltarMedSluttdato
	}

	const kanEndreSluttdato =
		status.erFullfort ||
		status.erAvbrutt ||
		status.erHarSluttet

	const kanEndreSluttaarsak = () => {

		if (erKometMaster) {
			return status.erHarSluttet || ferdigPaKurs || status.erIkkeAktuell
		}
		return status.erHarSluttet && !deltaker.deltakerliste.erKurs
	}

	const kanSetteIkkeAktuell =
		status.erVurderes ||
		status.erSoktInn ||
		status.erVenterPaOppstart

	const kanEndreDeltakelsesmengde = deltaker.tiltakskode === Tiltakskode.ARBFORB || deltaker.tiltakskode === Tiltakskode.VASV

	const kanAvslutteDeltakelse = status.erDeltar && !(erKometMaster && deltaker.deltakerliste.erKurs)
	const kanAvslutteKursDeltakelse =
		status.erDeltar && deltaker.deltakerliste.erKurs && erKometMaster

	const kanEndreStartDato =
		status.erVenterPaOppstart ||
		status.erIkkeAktuell ||
		status.erDeltar ||
		status.erVurderes ||
		status.erSoktInn

	const kanEndreOppstartsdato = kanEndreStartDato && deltaker.startDato !== null

	const kanLeggeTilOppstartsdato = () => {
		if (erKometMaster) {
			return (status.erVenterPaOppstart || status.erDeltar) && !deltaker.startDato
		}
		return kanEndreStartDato && !deltaker.startDato
	}

	return [
		{
			type: EndringType.LEGG_TIL_OPPSTARTSDATO,
			erTilgjengelig: kanLeggeTilOppstartsdato(),
			modalFunc: visLeggTilOppstartModal,
		},
		{
			type: EndringType.ENDRE_OPPSTARTSDATO,
			erTilgjengelig: kanEndreOppstartsdato,
			modalFunc: visEndreOppstartModal,
		},
		{
			type: EndringType.FORLENG_DELTAKELSE,
			erTilgjengelig: kanForlengeDeltakelse(),
			modalFunc: visForlengDeltakelseModal,
		},
		{
			type: EndringType.DELTAKER_IKKE_AKTUELL,
			erTilgjengelig: kanSetteIkkeAktuell,
			modalFunc: visSettDeltakerIkkeAktuellModal,
		},
		{
			type: EndringType.AVSLUTT_DELTAKELSE,
			erTilgjengelig: kanAvslutteDeltakelse,
			modalFunc: visAvsluttDeltakerModal,
		},
		{
			type: EndringType.AVSLUTT_KURS_DELTAKELSE,
			erTilgjengelig: kanAvslutteKursDeltakelse,
			modalFunc: visAvsluttKursDeltakerModal,
		},
		{
			type: EndringType.ENDRE_DELTAKELSE_PROSENT,
			erTilgjengelig: kanEndreDeltakelsesmengde,
			modalFunc: visEndreProsentDeltakelseModal,
		},
		{
			type: EndringType.ENDRE_SLUTTDATO,
			erTilgjengelig: kanEndreSluttdato,
			modalFunc: visEndreSluttdatoModal,
		},
		{
			type: EndringType.ENDRE_SLUTTAARSAK,
			erTilgjengelig: kanEndreSluttaarsak(),
			modalFunc: visEndreSluttaarsakModal,

		},
		{
			type: EndringType.FJERN_OPPSTARTSDATO,
			erTilgjengelig: kanFjerneOppstartsdato,
			modalFunc: visFjernOppstartsdatoModal,
		},
	]
}

function statusBooleans(status: TiltakDeltakerStatus) {
	return {
		erSoktInn: status === TiltakDeltakerStatus.SOKT_INN,
		erVurderes: status === TiltakDeltakerStatus.VURDERES,
		erVenterPaOppstart: status === TiltakDeltakerStatus.VENTER_PA_OPPSTART,
		erDeltar: status === TiltakDeltakerStatus.DELTAR,
		erFullfort: status === TiltakDeltakerStatus.FULLFORT,
		erAvbrutt: status === TiltakDeltakerStatus.AVBRUTT,
		erHarSluttet: status === TiltakDeltakerStatus.HAR_SLUTTET,
		erIkkeAktuell: status === TiltakDeltakerStatus.IKKE_AKTUELL,
	}
}
