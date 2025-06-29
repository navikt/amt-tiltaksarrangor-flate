import React from 'react'

interface ShowProps {
  if?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  children: React.ReactNode
}

export const Show = (props: ShowProps) =>
  props.if ? <>{props.children}</> : null
