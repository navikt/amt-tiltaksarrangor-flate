import amplitude from 'amplitude-js'

import { APP_NAME, TEAM_NAME } from './constants'
import env from './environment'

export const initAmplitude = () => {
	amplitude.getInstance().init('default', '', {
		apiEndpoint: 'amplitude.nav.no/collect-auto',
		saveEvents: false,
		includeUtm: true,
		includeReferrer: true,
		platform: window.location.toString(),
	})
}

const logAmplitudeEvent = (eventName: string, data?: { [key: string]: any }): void => {
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

export const logSidevisning = (pathname: string): void => {
	logAmplitudeEvent('sidevisning', { path: pathname })
}
