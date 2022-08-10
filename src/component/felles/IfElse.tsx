import React, { ReactNode } from 'react'

interface Props {
	condition: boolean;
	conditionTrueElement: ReactNode,
	conditionFalseElement: ReactNode
}

export const IfElse = (props: Props): React.ReactElement => {

	const element = props.condition
		? props.conditionTrueElement
		: props.conditionFalseElement

	return <>{element}</>
}
