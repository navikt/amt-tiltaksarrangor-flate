class Environment {
	get isProduction() {
		return !this.isDevelopment;
	}

	get isDevelopment() {
		return process.env.REACT_APP_DEV === 'true';
	}

	get isRunningOnGhPages() {
		return window.location.hostname === 'navikt.github.io';
	}
}

const env = new Environment();

export default env;
