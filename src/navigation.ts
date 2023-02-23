import { appUrl } from './utils/url-utils'

export const DELTAKER_DETALJER_PAGE_ROUTE = appUrl('/deltaker/:brukerId')
export const GJENNOMFORING_DETALJER_PAGE_ROUTE = appUrl('/gjennomforing/:gjennomforingId')
export const INGEN_ROLLE_PAGE_ROUTE = appUrl('/ingen-rolle')
export const LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE = appUrl('/legg-til-deltakerliste')
export const DU_ER_LOGGET_UT_PAGE_ROUTE = appUrl('/du-er-logget-ut')

export const GJENNOMFORING_LISTE_PAGE_ROUTE = appUrl('/')

export const HOVED_PAGE_ROUTE = appUrl('/')

export const brukerDetaljerPageUrl = (brukerId: string): string => {
	return DELTAKER_DETALJER_PAGE_ROUTE.replace(':brukerId', brukerId)
}

export const gjennomforingDetaljerPageUrl = (gjennomforingId: string): string => {
	return GJENNOMFORING_DETALJER_PAGE_ROUTE.replace(':gjennomforingId', gjennomforingId)
}