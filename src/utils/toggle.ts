import env from './environment'

class Toggle {

	get visSendOppstartsDatoRedigering(): boolean {
		return !env.isProd
	}

}

const toggle = new Toggle()

export default toggle