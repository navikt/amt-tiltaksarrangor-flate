class Environment {
	get isProd(): boolean {
		return !this.isPreprod && window.location.hostname.endsWith('nav.no');
	}

	get isPreprod(): boolean {
		return window.location.hostname.endsWith('dev.nav.no');
	}

	get isDevelopment(): boolean {
		return process.env.REACT_APP_DEV === 'true';
	}

	get isDemo(): boolean {
		return window.location.hostname.endsWith('github.io');
	}
}

const env = new Environment();

export default env;
