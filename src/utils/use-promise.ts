import { useEffect, useState } from 'react'

export enum Status {
	NOT_STARTED = 'NOT_STARTED',
	PENDING = 'PENDING',
    RESOLVED = 'RESOLVED',
    REJECTED = 'REJECTED'
}

type PromiseState<R, E> = NotStartedPromiseState | PendingPromiseState | ResolvedPromiseState<R> | RejectedPromiseState<E>

interface NotStartedPromiseState {
	result: undefined;
	error: undefined;
	status: Status.NOT_STARTED;
}

interface PendingPromiseState {
    result: undefined;
    error: undefined;
    status: Status.PENDING;
}

interface ResolvedPromiseState<R> {
    result: R;
    error: undefined;
    status: Status.RESOLVED;
}

interface RejectedPromiseState<E> {
    result: undefined;
    error: E;
    status: Status.REJECTED;
}

const defaultState: NotStartedPromiseState = {
	result: undefined,
	error: undefined,
	status: Status.NOT_STARTED
}

export const usePromise = <R, E = Error>(func?: () => Promise<R>, dependencies?: any[]) => {
	const [ promise, setPromise ] = useState<Promise<R>>()
	const [ promiseState, setPromiseState ] = useState<PromiseState<R, E>>(defaultState)

	useEffect(() => {
		if (func) {
			setPromise(func())
		}
		// eslint-disable-next-line
	}, dependencies || [])

	useEffect(() => {
		if (promise) {
			let canceled = false

			setPromiseState(defaultState)

			promise
				.then((res) => {
					if (canceled) return

					setPromiseState({ status: Status.RESOLVED, result: res, error: undefined })
				})
				.catch((err) => {
					if (canceled) return

					setPromiseState({ status: Status.REJECTED, result: undefined, error: err })
				})

			return () => {
				canceled = true
			}
		}
		// eslint-disable-next-line
	}, [ promise ])

	return {
		...promiseState,
		setPromise
	}
}

export const isNotStartedOrPending = <R, E>(state: PromiseState<R, E>): state is NotStartedPromiseState | PendingPromiseState => {
	return state.status === Status.NOT_STARTED || state.status === Status.PENDING
}

export const isResolved = <R, E>(state: PromiseState<R, E>): state is ResolvedPromiseState<R> => {
	return state.status === Status.RESOLVED
}

export const isRejected = <R, E>(state: PromiseState<R, E>): state is RejectedPromiseState<E> => {
	return state.status === Status.REJECTED
}
