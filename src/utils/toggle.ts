import env from './environment'

class Toggle {

	get exampleToggle(): boolean {
		return !env.isProd
	}

}

const toggle = new Toggle()

export default toggle