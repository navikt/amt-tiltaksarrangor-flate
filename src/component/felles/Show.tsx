interface ShowProps {
	if?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
	children: JSX.Element;
}

export const Show = (props: ShowProps): JSX.Element | null => (props.if ? props.children : null)
