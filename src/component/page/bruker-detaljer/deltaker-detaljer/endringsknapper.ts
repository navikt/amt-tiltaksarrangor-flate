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

export function endringsknapper(deltaker: Deltaker, modal: ModalHandler): EndringsknappData[] {
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
		visEndreAvslutningModal
	} = modal

	const status = statusBooleans(deltaker.status.type)

	const ferdigPaKurs = status.erFullfort || status.erAvbrutt

	const kanFjerneOppstartsdato =
		status.erVenterPaOppstart &&
		deltaker.startDato !== null &&
		!deltaker.deltakerliste.erKurs

	const kanForlengeDeltakelse = () => {
		const deltarMedSluttdato = status.erDeltar && deltaker.sluttDato !== null
		return status.erHarSluttet || ferdigPaKurs || deltarMedSluttdato
	}

	const kanEndreSluttdato =
		status.erFullfort ||
		status.erAvbrutt ||
		status.erHarSluttet

	const kanEndreSluttaarsak = () => status.erHarSluttet || status.erAvbrutt || status.erIkkeAktuell

	const kanSetteIkkeAktuell =
		status.erVurderes ||
		status.erSoktInn ||
		status.erVenterPaOppstart

	const kanEndreDeltakelsesmengde = deltaker.tiltakskode === Tiltakskode.ARBEIDSFORBEREDENDE_TRENING || deltaker.tiltakskode === Tiltakskode.VARIG_TILRETTELAGT_ARBEID_SKJERMET

	const kanAvslutteDeltakelse = status.erDeltar && !deltaker.deltakerliste.erKurs
	const kanAvslutteKursDeltakelse =
		status.erDeltar && deltaker.deltakerliste.erKurs

	const kanEndreAvslutning = (status.erFullfort || status.erAvbrutt) &&
		deltaker.deltakerliste.erKurs

	const kanEndreStartDato =
		status.erVenterPaOppstart ||
		status.erIkkeAktuell ||
		status.erDeltar ||
		status.erVurderes ||
		status.erSoktInn

	const kanEndreOppstartsdato = kanEndreStartDato && deltaker.startDato !== null

	const kanLeggeTilOppstartsdato = () => (status.erVenterPaOppstart || status.erDeltar) && !deltaker.startDato

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
		{
			type: EndringType.ENDRE_AVSLUTNING,
			erTilgjengelig: kanEndreAvslutning,
			modalFunc: visEndreAvslutningModal,
		}
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
