import React, { ReactElement, useEffect, useRef, useState } from 'react'
import styles from './CollapsablePanel.module.scss'
import { ChevronUpIcon } from '@navikt/aksel-icons'

interface Props {
	title?: string
	children: ReactElement[] | ReactElement,
	isExpandedDefaultValue: boolean
}

export const CollapsablePanel = (props: Props) => {
	const [ isExpanded, setIsExpanded ] = useState<boolean>(props.isExpandedDefaultValue)
	const [ height, setHeight ] = useState<number>(0)

	const panelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (panelRef?.current !== null) {
			setHeight(isExpanded ? panelRef.current.scrollHeight : 0)
		}
	}, [ isExpanded, props.children ])

	const toggleExpand = () => {
		setIsExpanded(!isExpanded)
	}

	const getIcon = () => {
		return <ChevronUpIcon className={isExpanded ? styles.rotateUp : styles.rotateDown}/>
	}

	return (
		<div className={styles.expandablePanel}>
			<div role="button" onKeyDown={toggleExpand} tabIndex={0} className={styles.panelHeader} onClick={toggleExpand}>
				<div className={styles.title}>{props.title}</div>
				<div className={styles.collapseButton}>{getIcon()}</div>
			</div>
			<div className={styles.panelContent} style={{ height: `${height}px` }} ref={panelRef}>{props.children}</div>
		</div>
	)
}
