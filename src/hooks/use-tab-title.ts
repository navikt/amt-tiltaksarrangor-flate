import { useEffect } from 'react'

export const useTabTitle = (title: string = 'Deltakeroversikt') => {

	useEffect(() => {
		document.title = title
	}, [])

}
