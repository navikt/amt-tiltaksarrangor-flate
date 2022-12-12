class Environment {

	get isProd(): boolean {
		return !this.isPreprod && window.location.hostname.endsWith('nav.no')
	}

	get isPreprod(): boolean {
		return window.location.hostname.endsWith('dev.nav.no')
	}

	get isDemo(): boolean {
		return window.location.hostname.endsWith('github.io')
	}

	get baseUrl(): string {
		return import.meta.env.BASE_URL
	}

	get isMockEnabled(): boolean {
		return import.meta.env.VITE_MOCK === 'true'
	}

	get name(): string {
		if (this.isProd) {
			return 'production'
		} else if (this.isPreprod) {
			return 'preprod'
		} else if (this.isDemo) {
			return 'demo'
		} else {
			return 'development'
		}
	}

}

const env = new Environment()

export default env
