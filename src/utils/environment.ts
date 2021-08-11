class Environment {
	get isProduction() {
		return !this.isDevelopment;
	}

	get isDevelopment() {
		return process.env.REACT_APP_DEV === 'true';
	}
}

const env = new Environment();

export default env;
