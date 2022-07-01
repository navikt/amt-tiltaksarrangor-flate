import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

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

type UsePromise<R, E = Error> = PromiseState<R, E> & { reset: () => void, setPromise: Dispatch<SetStateAction<Promise<R> | undefined>> }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePromise = <R, E = Error>(func?: () => Promise<R>, dependencies?: any[]): UsePromise<R, E> => {
	const isCanceledRef = useRef(false)
	const [ promise, setPromise ] = useState<Promise<R>>()
	const [ promiseState, setPromiseState ] = useState<PromiseState<R, E>>(defaultState)

	const reset = () => {
		isCanceledRef.current = true
		setPromiseState({ status: Status.NOT_STARTED, error: undefined, result: undefined })
	}

	useEffect(() => {
		if (func) {
			setPromiseState({ status: Status.PENDING, error: undefined, result: undefined })
			setPromise(func())
		}
		// eslint-disable-next-line
	}, dependencies || [])

	useEffect(() => {
		if (promise) {
			isCanceledRef.current = false

			setPromiseState({ status: Status.PENDING, error: undefined, result: undefined })

			promise
				.then((res) => {
					if (isCanceledRef.current) return

					setPromiseState({ status: Status.RESOLVED, result: res, error: undefined })
				})
				.catch((err) => {
					if (isCanceledRef.current) return

					setPromiseState({ status: Status.REJECTED, result: undefined, error: err })
				})

			return () => {
				isCanceledRef.current = true
			}
		}
		// eslint-disable-next-line
	}, [ promise ])

	return {
		...promiseState,
		setPromise,
		reset
	}
}

export const isNotStarted = <R, E>(state: PromiseState<R, E>): state is NotStartedPromiseState => {
	return state.status === Status.NOT_STARTED
}

export const isNotStartedOrPending = <R, E>(state: PromiseState<R, E>): state is NotStartedPromiseState | PendingPromiseState => {
	return state.status === Status.NOT_STARTED || state.status === Status.PENDING
}

export const isPending = <R, E>(state: PromiseState<R, E>): state is PendingPromiseState => {
	return state.status === Status.PENDING
}

export const isResolved = <R, E>(state: PromiseState<R, E>): state is ResolvedPromiseState<R> => {
	return state.status === Status.RESOLVED
}

export const isRejected = <R, E>(state: PromiseState<R, E>): state is RejectedPromiseState<E> => {
	return state.status === Status.REJECTED
}
