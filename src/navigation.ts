import { appUrl } from './utils/url-utils'

export const DELTAKER_DETALJER_PAGE_ROUTE = appUrl('/deltaker/:brukerId')
export const DELTAKERLISTE_DETALJER_PAGE_ROUTE = appUrl('/deltakerliste/:deltakerlisteId')
export const GJENNOMFORING_DETALJER_PAGE_ROUTE = appUrl('/gjennomforing/:deltakerlisteId') // deprecated
export const INGEN_ROLLE_PAGE_ROUTE = appUrl('/ingen-rolle')
export const LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE = appUrl('/legg-til-deltakerliste')
export const MINE_DELTAKERE_PAGE_ROUTE = appUrl('/mine-deltakere')

export const MINE_DELTAKERLISTER_PAGE_ROUTE = appUrl('/')

export const HOVED_PAGE_ROUTE = appUrl('/')

export const brukerDetaljerPageUrl = (brukerId: string, ref: string): string => {
	return DELTAKER_DETALJER_PAGE_ROUTE.replace(':brukerId', brukerId)+`?ref=${ref}`
}

export const deltakerlisteDetaljerPageUrl = (deltakerlisteId: string): string => {
	return DELTAKERLISTE_DETALJER_PAGE_ROUTE.replace(':deltakerlisteId', deltakerlisteId)
}

export const getDeltakerlisteDetaljerRedirectUrl = (path: string): string => {
	return path.replace('gjennomforing', 'deltakerliste')
}
