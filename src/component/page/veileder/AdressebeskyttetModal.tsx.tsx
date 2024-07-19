import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons'
import { BodyLong, Button, ConfirmationPanel, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'

interface Props {
  open: boolean
  handleCloseModal: () => void
  handleConfrimed: () => void
}

export const AdressebeskyttetModal = ({
  open,
  handleCloseModal,
  handleConfrimed
}: Props): React.ReactElement<Props> => {
  const [confirmed, setConfirmed] = useState(false)
  const [confirmedError, setConfirmedError] = useState(false)

  const handleGaVidere = () => {
    if (confirmed) {
      handleConfrimed()
    } else setConfirmedError(true)
  }
  return (
    <Modal
      open={open}
      header={{
        heading: 'Obs: Adressebeskyttet',
        icon: <ExclamationmarkTriangleIcon aria-hidden />
      }}
      onClose={handleCloseModal}
    >
      <Modal.Body>
        <BodyLong spacing>
          Denne personen har beskyttet adresse. Vær oppmerksom på at når du
          klikker deg videre så logger vi navnet ditt og tidspunktet.
        </BodyLong>
        <ConfirmationPanel
          checked={confirmed}
          error={confirmedError && 'Du må bekrefte før du kan fortsette.'}
          label="Ja, jeg er veileder til denne personen."
          onChange={() => {
            setConfirmed((x) => !x)
            setConfirmedError(false)
          }}
        >
          <BodyLong>
            Er det nødvendig for deg å åpne denne deltakelsen?
          </BodyLong>
        </ConfirmationPanel>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" onClick={handleGaVidere} size="small">
          Gå videre
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
