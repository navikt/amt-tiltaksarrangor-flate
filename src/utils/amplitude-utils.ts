import amplitude from 'amplitude-js'

import { APP_NAME, TEAM_NAME } from './constants'
import env from './environment'

type EventDataValue = string | boolean | number | null | undefined
export const klikkFnrKnapp = 'klikk-fnr-knapp'
export const klikkKolonneSortering = 'klikk-kolonne-sortering-deltaker-liste'
export const klikkFilterMeny = 'klikk-filter-meny'
export const klikkDeltakerRadOversikt = 'klikk-deltaker-deltaker-liste'


export const initAmplitude = (): void => {
	amplitude.getInstance().init('default', '', {
		apiEndpoint: 'amplitude.nav.no/collect-auto',
		saveEvents: false,
		includeUtm: true,
		includeReferrer: true,
		platform: window.location.toString(),
	})
}

const logAmplitudeEvent = (eventName: string, data?: { [key: string]: EventDataValue }): void => {
	setTimeout(() => {
		data = {
			app: APP_NAME,
			team: TEAM_NAME,
			...(data || {}),
		}

		if (!env.isPreprod && !env.isProd) {
			// eslint-disable-next-line no-console
			console.log(`Amplitude event: ${eventName}`, data)
			return
		}

		try {
			amplitude.getInstance().logEvent(eventName, data)
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
	})
}

export const loggSidevisning = (pathname: string): void => {
	logAmplitudeEvent('sidevisning', { path: pathname })
}

export const loggKlikk = (event: string, verdi?: string, status?: string) => {
	logAmplitudeEvent(event, { eventType: 'klikk', verdi, status })
}