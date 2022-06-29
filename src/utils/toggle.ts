import env from './environment'

class Toggle {

	get visBegrunnelse(): boolean {
		return !env.isProd
	}

	get visNyTilgangskontroll(): boolean {
		return !env.isProd
	}

}

const toggle = new Toggle()

export default toggle