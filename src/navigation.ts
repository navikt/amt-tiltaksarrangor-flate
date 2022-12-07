import { appUrl } from './utils/url-utils'

export const BRUKER_DETALJER_PAGE_ROUTE = appUrl('/deltaker/:brukerId')
export const GJENNOMFORING_DETALJER_PAGE_ROUTE = appUrl('/gjennomforing/:gjennomforingId')
export const INFORMASJON_PAGE_ROUTE = appUrl('/informasjon')
export const PERSONOPPLYSNINGER_PAGE_ROUTE = appUrl('/personopplysninger')
export const INGEN_ROLLE_PAGE_ROUTE = appUrl('/ingen-rolle')
export const LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE = appUrl('/legg-til-deltakerliste')
export const GJENNOMFORING_LISTE_PAGE_ROUTE = appUrl('/')

export const HOVED_PAGE_ROUTE = appUrl('/')

export const brukerDetaljerPageUrl = (brukerId: string): string => {
	return BRUKER_DETALJER_PAGE_ROUTE.replace(':brukerId', brukerId)
}

export const gjennomforingDetaljerPageUrl = (gjennomforingId: string): string => {
	return GJENNOMFORING_DETALJER_PAGE_ROUTE.replace(':gjennomforingId', gjennomforingId)
}