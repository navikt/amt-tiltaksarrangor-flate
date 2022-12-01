class Environment {

	get isDevelopment() {
		return process.env.REACT_APP_DEV === 'true'
	}

	get isProd(): boolean {
		return !this.isPreprod && window.location.hostname.endsWith('nav.no')
	}

	get isPreprod(): boolean {
		return window.location.hostname.endsWith('dev.nav.no')
	}

	get isPullRequest(): boolean {
		return this.isPreprod && this.publicUrl.match(/\/pr-\d+/) != null
	}

	get isDemo(): boolean {
		return window.location.hostname.endsWith('github.io')
	}

	get publicUrl(): string {
		return process.env.PUBLIC_URL || ''
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
