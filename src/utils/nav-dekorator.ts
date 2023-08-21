import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler'

import env from './environment'

const utledEnv = () => {
	if (env.isProd) {
		return 'prod'
	} else if (env.isPreprod) {
		return 'dev'
	} else if (env.isDemo) {
		return 'prod' // Demoen er åpen på internet, så vi bruker 'prod'
	} else {
		return 'dev'
	}
}

const utledEnforceLogin = (): boolean => {
	return env.isProd || env.isPreprod
}

const utledAppBase = (): string => {
	if (env.isProd || env.isDemo) {
		return 'https://www.nav.no/deltakeroversikt'
	} else if (env.isPreprod) {
		return 'https://amt.intern.dev.nav.no/deltakeroversikt'
	} else {
		return '/deltakeroversikt'
	}
}

export const setupNavDekorator = (): Promise<void> => {
	return injectDecoratorClientSide({
		env: utledEnv(),
		params: {
			context: 'samarbeidspartner',
			enforceLogin: utledEnforceLogin(),
			simpleFooter: true,
			shareScreen: false,
			level: 'Level4',
			logoutWarning: true,
			appBase: utledAppBase(),
		}
	})
}
