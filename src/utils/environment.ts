class Environment {
	get isProduction(): boolean {
		return !this.isDevelopment;
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
