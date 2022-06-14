import env from './environment'

class Toggle {

	// Ikke i bruk
	get visSendOppstartsDatoRedigering(): boolean {
		return !env.isProd
	}

}

const toggle = new Toggle()

export default toggle