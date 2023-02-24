import env from './environment'

class Toggle {

	// Kommenterer ut slik at togglen kan brukes som eksempel når man lager ny toggle
	// get navDekoratorEnabled(): boolean {
	// 	return !env.isProd
	// }

	get veiledereEnabled(): boolean {
		return !env.isProd
	}

}

const toggle = new Toggle()

export default toggle
