import { internalUrl } from './utils/url-utils'

export const BRUKER_DETALJER_PAGE_ROUTE = internalUrl('/user/:brukerId')
export const GJENNOMFORING_DETALJER_PAGE_ROUTE = internalUrl('/gjennomforing/:gjennomforingId')
export const INFORMASJON_PAGE_ROUTE = internalUrl('/informasjon')
export const GJENNOMFORING_LISTE_PAGE_ROUTE = internalUrl('/')

export const brukerDetaljerPageUrl = (brukerId: string): string => {
	return BRUKER_DETALJER_PAGE_ROUTE.replace(':brukerId', brukerId)
}

export const gjennomforingDetaljerPageUrl = (gjennomforingId: string): string => {
	return GJENNOMFORING_DETALJER_PAGE_ROUTE.replace(':gjennomforingId', gjennomforingId)
}
