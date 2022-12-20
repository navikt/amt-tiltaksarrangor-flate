import env from './environment'

class Toggle {

	get navDekoratorEnabled(): boolean {
		return !env.isProd
	}

}

const toggle = new Toggle()

export default toggle