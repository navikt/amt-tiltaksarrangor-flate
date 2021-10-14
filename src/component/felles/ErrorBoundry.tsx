import React from 'react';

interface ErrorBoundryProps {
	children: React.ReactNode;
	renderOnError: React.ReactNode | ((error: Error) => React.ReactNode);
}

type ErrorBoundryState = WithErrorState | WithoutErrorState;

interface WithErrorState {
	error: Error;
	hasError: true;
}

interface WithoutErrorState {
	error: undefined;
	hasError: false;
}

export class ErrorBoundary extends React.Component<ErrorBoundryProps, ErrorBoundryState> {

	constructor(props: ErrorBoundryProps) {
		super(props);
		this.state = { error: undefined, hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		return { error, hasError: true };
	}

	render() {
		if (this.state.hasError) {
			if (typeof this.props.renderOnError === 'function') {
				return this.props.renderOnError(this.state.error)
			} else {
				return this.props.renderOnError
			}
		}

		return this.props.children;
	}
}