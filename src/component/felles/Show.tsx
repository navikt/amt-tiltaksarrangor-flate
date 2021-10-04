interface ShowProps {
	if?: any;
	children?: any;
}

export const Show = (props: ShowProps) => (props.if ? props.children : null)
