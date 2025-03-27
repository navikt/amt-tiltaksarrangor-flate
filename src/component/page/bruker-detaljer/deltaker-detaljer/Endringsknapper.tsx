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

export function endringsknapper(deltaker: Deltaker, erForslagEnabled: boolean, modal: ModalHandler): EndringsknappData[] {
	const {
		visEndreOppstartModal,
		visLeggTilOppstartModal,
		visForlengDeltakelseModal,
		visSettDeltakerIkkeAktuellModal,
		visAvsluttDeltakerModal,
		visEndreProsentDeltakelseModal,
		visEndreSluttdatoModal,
		visEndreSluttaarsakModal,
		visFjernOppstartsdatoModal,
	} = modal

	const kanEndreStartDato =
		deltaker.status.type === TiltakDeltakerStatus.VENTER_PA_OPPSTART ||
		deltaker.status.type === TiltakDeltakerStatus.IKKE_AKTUELL ||
		deltaker.status.type === TiltakDeltakerStatus.DELTAR ||
		deltaker.status.type === TiltakDeltakerStatus.VURDERES ||
		deltaker.status.type === TiltakDeltakerStatus.SOKT_INN

	const kanFjerneOppstartsdato =
		deltaker.status.type === TiltakDeltakerStatus.VENTER_PA_OPPSTART &&
		deltaker.startDato !== null && !deltaker.deltakerliste.erKurs && erForslagEnabled

	const kanForlengeDeltakelse = () => {
		const harSluttet = deltaker.status.type === TiltakDeltakerStatus.HAR_SLUTTET
		const ferdigPaKurs = [TiltakDeltakerStatus.FULLFORT, TiltakDeltakerStatus.AVBRUTT].includes(deltaker.status.type)
		const deltarMedSluttdato = deltaker.status.type === TiltakDeltakerStatus.DELTAR && deltaker.sluttDato !== null

		if (erForslagEnabled) {
			return harSluttet || ferdigPaKurs || (deltarMedSluttdato && !deltaker.deltakerliste.erKurs)
		}
		return harSluttet || deltarMedSluttdato
	}

	const kanEndreSluttdato = deltaker.status.type === TiltakDeltakerStatus.FULLFORT ||
		deltaker.status.type === TiltakDeltakerStatus.AVBRUTT ||
		deltaker.status.type === TiltakDeltakerStatus.HAR_SLUTTET

	const kanEndreSluttaarsak = () => {
		const harSluttet = deltaker.status.type === TiltakDeltakerStatus.HAR_SLUTTET
		const ferdigPaKurs = [TiltakDeltakerStatus.FULLFORT, TiltakDeltakerStatus.AVBRUTT].includes(deltaker.status.type)
		const ikkeAktuell = deltaker.status.type === TiltakDeltakerStatus.IKKE_AKTUELL

		if (erForslagEnabled) {
			return harSluttet || ferdigPaKurs || ikkeAktuell
		}
		return harSluttet && !deltaker.deltakerliste.erKurs
	}

	const kanSetteIkkeAktuell = deltaker.status.type === TiltakDeltakerStatus.VURDERES ||
		deltaker.status.type === TiltakDeltakerStatus.SOKT_INN ||
		deltaker.status.type === TiltakDeltakerStatus.VENTER_PA_OPPSTART

	const kanEndreDeltakelsesmengde = deltaker.tiltakskode === Tiltakskode.ARBFORB || deltaker.tiltakskode === Tiltakskode.VASV

	const kanAvsluteDeltakelse = deltaker.status.type === TiltakDeltakerStatus.DELTAR

	const kanEndreOppstartsdato = kanEndreStartDato && deltaker.startDato !== null

	const kanLeggeTilOppstartsdato = () => {
		if (erForslagEnabled) {
			return (deltaker.status.type === TiltakDeltakerStatus.VENTER_PA_OPPSTART || deltaker.status.type === TiltakDeltakerStatus.DELTAR) && !deltaker.startDato

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
			erTilgjengelig: kanAvsluteDeltakelse,
			modalFunc: visAvsluttDeltakerModal,
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
