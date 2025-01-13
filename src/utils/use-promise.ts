import { AxiosError } from 'axios'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

export enum Status {
  NOT_STARTED = 'NOT_STARTED',
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED'
}

type PromiseState<R> =
  | NotStartedPromiseState
  | PendingPromiseState
  | ResolvedPromiseState<R>
  | RejectedPromiseState

interface NotStartedPromiseState {
  result: undefined
  error: undefined
  status: Status.NOT_STARTED
}

interface PendingPromiseState {
  result: undefined
  error: undefined
  status: Status.PENDING
}

interface ResolvedPromiseState<R> {
  result: R
  error: undefined
  status: Status.RESOLVED
}

interface RejectedPromiseState {
  result: undefined
  error: AxiosError
  status: Status.REJECTED
}

const defaultState: NotStartedPromiseState = {
  result: undefined,
  error: undefined,
  status: Status.NOT_STARTED
}

export type UsePromise<R = Error> = PromiseState<R> & {
  reset: () => void
  setPromise: Dispatch<SetStateAction<Promise<R> | undefined>>
}

export const usePromise = <R = Error>(
  func?: () => Promise<R>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies?: any[]
): UsePromise<R> => {
  const isCanceledRef = useRef(false)
  const [promise, setPromise] = useState<Promise<R>>()
  const [promiseState, setPromiseState] =
    useState<PromiseState<R>>(defaultState)

  const reset = () => {
    isCanceledRef.current = true
    setPromiseState({
      status: Status.NOT_STARTED,
      error: undefined,
      result: undefined
    })
  }

  useEffect(() => {
    if (func) {
      setPromiseState({
        status: Status.PENDING,
        error: undefined,
        result: undefined
      })
      setPromise(func())
    }
    // eslint-disable-next-line
  }, dependencies || [])

  useEffect(() => {
    if (promise) {
      isCanceledRef.current = false

      setPromiseState({
        status: Status.PENDING,
        error: undefined,
        result: undefined
      })

      promise
        .then((res) => {
          if (isCanceledRef.current) return

          setPromiseState({
            status: Status.RESOLVED,
            result: res,
            error: undefined
          })
        })
        .catch((err) => {
          if (isCanceledRef.current) return

          setPromiseState({
            status: Status.REJECTED,
            result: undefined,
            error: err
          })
        })

      return () => {
        isCanceledRef.current = true
      }
    }
    // eslint-disable-next-line
  }, [promise])

  return {
    ...promiseState,
    setPromise,
    reset
  }
}

export const isNotStarted = <R>(
  state: PromiseState<R>
): state is NotStartedPromiseState => {
  return state.status === Status.NOT_STARTED
}

export const isNotStartedOrPending = <R>(
  state: PromiseState<R>
): state is NotStartedPromiseState | PendingPromiseState => {
  return state.status === Status.NOT_STARTED || state.status === Status.PENDING
}

export const isPending = <R>(
  state: PromiseState<R>
): state is PendingPromiseState => {
  return state.status === Status.PENDING
}

export const isResolved = <R>(
  state: PromiseState<R>
): state is ResolvedPromiseState<R> => {
  return state.status === Status.RESOLVED
}

export const isRejected = <R>(
  state: PromiseState<R>
): state is RejectedPromiseState => {
  return state.status === Status.REJECTED
}

export const isNotFound = <R>(state: PromiseState<R>): boolean => {
  return (
    state.status === Status.REJECTED && state.error.response?.status === 404
  )
}
