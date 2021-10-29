import cls from 'classnames'
import { Knapp } from 'nav-frontend-knapper'
import React, { useEffect, useState } from 'react'

import styles from './KopierKnapp.module.less'

interface KopierKnappProps {
	text: string;
	className?: string;
}

const COPY_TOOLTIP_DURATION_MS = 1000

function writeToClipBoard(text: string): void {
	const textField = window.document.createElement('textarea')

	textField.innerText = text
	window.document.body.appendChild(textField)

	textField.select()

	window.document.execCommand('copy')
	textField.remove()
}

export const KopierKnapp = (props: KopierKnappProps) => {
	const [ copySuccess, setCopySuccess ] = useState<boolean>(false)

	const handleOnClick = () => {
		writeToClipBoard(props.text)
		setCopySuccess(true)
	}

	useEffect(() => {
		if (copySuccess) {
			const timeOutId = window.setTimeout(() => setCopySuccess(false), COPY_TOOLTIP_DURATION_MS)

			return () => clearTimeout(timeOutId)
		}
	}, [ copySuccess ])

	return (
		<div className={styles.wrapper}>
			<Knapp onClick={handleOnClick} className={cls(styles.kopierKnapp, props.className)}>
				{props.text}
			</Knapp>
			<span className={cls(styles.tooltip, { [styles.tooltipVisible]: copySuccess })}>
                Kopiert
			</span>
		</div>
	)
}