import { useEffect } from 'react'

export const useTabTitle = (title = 'Deltakeroversikt') => {

	useEffect(() => {
		document.title = title
	}, [ title ])

}
