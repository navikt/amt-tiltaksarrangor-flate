import { Alert, Button } from '@navikt/ds-react'
import React, { useState } from 'react'
import { isPending, usePromise } from '../../../../../utils/use-promise'

interface SendTilNavKnappProps {
  onEndringSendt: () => void
  sendEndring: () => Promise<void>
  disabled?: boolean
  forslag?: boolean
  endringFraArrangor?: boolean
}

const getTekst = (endringFraArrangor?: boolean, forslag?: boolean) => {
  if (endringFraArrangor) {
    return 'Lagre'
  } else if (forslag) {
    return 'Send forslag til Nav-veileder'
  } else {
    return 'Send til Nav'
  }
}

export const SendTilNavKnapp = ({
  disabled,
  sendEndring,
  onEndringSendt,
  forslag,
  endringFraArrangor
}: SendTilNavKnappProps) => {
  const [showError, setShowError] = useState<boolean>()
  const [errorMessage, setErrorMessage] = useState<string | null>()
  const opprettEndringPromise = usePromise<void>()

  const tekst = getTekst(endringFraArrangor, forslag)

  const onClick = () => {
    opprettEndringPromise.setPromise(
      sendEndring()
        .then(() => {
          onEndringSendt()
          setShowError(false)
          setErrorMessage(null)
        })
        .catch((message: string | null) => {
          setErrorMessage(message)
          setShowError(true)
        })
    )
  }

  return (
    <>
      <Button
        variant="primary"
        size="small"
        loading={isPending(opprettEndringPromise)}
        onClick={onClick}
        disabled={disabled}
      >
        {tekst}
      </Button>
      {showError && (
        <Alert variant="error">{errorMessage || 'Noe gikk galt'}</Alert>
      )}
    </>
  )
}
