class Toggle {

	// Kommenterer ut slik at togglen kan brukes som eksempel når man lager ny toggle
	// get navDekoratorEnabled(): boolean {
	// 	return !env.isProd
	// }
    
	get veilederEnabled(): boolean {
		return true
	}

}

const toggle = new Toggle()

export default toggle
