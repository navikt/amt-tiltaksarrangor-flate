import env from './environment'

class Toggle {

	get visNyTilgangskontroll(): boolean {
		return !env.isProd
	}

}

const toggle = new Toggle()

export default toggle