import { Alert, Button, Detail, Modal, ReadMore, UNSAFE_Combobox } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import { TilgjengeligVeileder, Veileder } from '../../../../api/data/veileder'
import { lagBrukerNavn } from '../../../../utils/bruker-utils'

import { AxiosResponse } from 'axios'
import { Deltaker } from '../../../../api/data/deltaker'
import {
  hentTilgjengeligeVeiledere,
  tildelVeilederForDeltaker
} from '../../../../api/tiltak-api'
import {
  isPending,
  isResolved,
  usePromise
} from '../../../../utils/use-promise'
import styles from './TildelVeilederModal.module.scss'

export type SelectOption = {
  value: string
  label: string
}

interface Props {
  deltaker: Deltaker
  veileder: Veileder | undefined
  medveiledere: Veileder[]
  open: boolean
  onClose: () => void
  onSubmit: (veiledere: Veileder[]) => void
}

const maksMedveiledere = 3

export const TildelVeilederModal = (props: Props): React.ReactElement => {
  const [ tilgjengeligeVeiledere, setTilgjengeligeVeiledere ] = useState<
    TilgjengeligVeileder[]
  >([])

  const [ muligeVeiledervalg, setMuligeVeiledervalg ] = useState<SelectOption[]>()
  const [ veileder, setVeileder ] = useState<TilgjengeligVeileder | undefined>()
  const [ medveiledere, setMedveiledere ] = useState<TilgjengeligVeileder[]>([])
  const [ tildelingFeiletError, setTildelingFeiletError ] = useState(false)

  const tildelVeilederePromise = usePromise<void>()
  const tilgjengeligeVeilederePromise = usePromise<
    AxiosResponse<TilgjengeligVeileder[]>
  >(() => hentTilgjengeligeVeiledere(props.deltaker.deltakerliste.id))

  useEffect(() => {
    if (isResolved(tilgjengeligeVeilederePromise)) {
      setTilgjengeligeVeiledere(tilgjengeligeVeilederePromise.result.data)
    }
  }, [ tilgjengeligeVeilederePromise.result ])

  useEffect(() => {
    if (props.veileder) {
      setVeileder(props.veileder)
    }
    if (props.medveiledere) {
      setMedveiledere(props.medveiledere)
    }
  }, [ props.veileder, props.medveiledere ])

  useEffect(() => {
    const medveilederIder = medveiledere.map((v) => v.ansattId)
    if (veileder !== undefined) medveilederIder.push(veileder.ansattId)

    const muligeValg = tilgjengeligeVeiledere?.filter(
      (v) => !medveilederIder.includes(v.ansattId)
    )

    setMuligeVeiledervalg(muligeValg.map(veilederToOption))
  }, [ veileder, medveiledere, tilgjengeligeVeiledere ])

  const handleVeilederChange = (valgtAnsattId: string, isSelected: boolean) => {
    if (isSelected) {
      setVeileder(tilgjengeligeVeiledere?.find((v) => v.ansattId === valgtAnsattId))
    } else { setVeileder(undefined) }
  }

  const handleMedveilederChange = (valgtAnsattId: string, isSelected: boolean) => {
    const valgteMedveiledere = tilgjengeligeVeiledere?.find((tv) => tv.ansattId === valgtAnsattId)
    if (isSelected && valgteMedveiledere) setMedveiledere([ ...medveiledere, valgteMedveiledere as TilgjengeligVeileder ])

    if (!isSelected) {
      setMedveiledere(medveiledere.filter(mv => mv.ansattId !== valgtAnsattId))
    }
  }

  const handleClose = () => {
    setVeileder(props.veileder)
    setMedveiledere(props.medveiledere)
    setTildelingFeiletError(false)
    props.onClose()
  }

  const handleSubmit = () => {
    if (medveiledere.length > maksMedveiledere) return

    const veiledere: Veileder[] = veileder
      ? [ { ...veileder, deltakerId: props.deltaker.id, erMedveileder: false } ]
      : []
    medveiledere.forEach((v) =>
      veiledere.push({
        ...v,
        deltakerId: props.deltaker.id,
        erMedveileder: true
      })
    )

    tildelVeilederePromise.setPromise(
      tildelVeilederForDeltaker(props.deltaker.id, veiledere)
        .then(() => {
          props.onSubmit(veiledere)
          props.onClose()
          setTildelingFeiletError(false)
        })
        .catch(() => setTildelingFeiletError(true))
    )
  }

  return (
    <>
      <Modal
        header={{ heading: 'Endre veiledere' }}
        open={props.open}
        onClose={handleClose}
        className={styles.modal}
      >
        <Modal.Body className={styles.modalBody}>
          <Detail className={styles.detail}>
            Tildel til{' '}
            {lagBrukerNavn(
              props.deltaker.fornavn,
              props.deltaker.mellomnavn,
              props.deltaker.etternavn
            )}
          </Detail>
          <UNSAFE_Combobox
            label="Veileder"
            size="small"
            isMultiSelect
            maxSelected={1}
            className={styles.select}
            options={muligeVeiledervalg ?? []}
            selectedOptions={veileder ? [ veilederToOption(veileder) ] : []}
            onToggleSelected={(option, isSelected) => {
              handleVeilederChange(option, isSelected)
            }}
          />
          <UNSAFE_Combobox
            label="Medveiledere"
            size="small"
            className={styles.select}
            options={muligeVeiledervalg ?? []}
            selectedOptions={medveiledere.map(m => veilederToOption(m))}
            onToggleSelected={(option, isSelected) => handleMedveilederChange(option, isSelected)}
            isMultiSelect
            maxSelected={3}
          />
          <ReadMore header="Finner du ikke riktig veileder?">
            <p>
              Veilederen må først få riktig rettighet i Altinn, og deretter logge
              inn i Deltakeroversikten. Først da kan koordinatoren finne
              veilederen.
            </p>
            <p>
              Enkeltrettigheten i Altinn heter: <br />
              <span className={styles.bold}>
                “Tiltaksarrangør veileder - Nav Deltakeroversikt”.
              </span>
            </p>
            <p>
              Enkeltrettigheten må registreres på org.nr. til{' '}
              <span className={styles.bold}>bedriftens underenhet</span> - det
              samme org.nr. som avtalen om tiltaket er koblet til.
            </p>
          </ReadMore>

          {tildelingFeiletError && (
            <Alert variant="error" size="small">
              Kunne ikke tildele veiledere. Prøv igjen eller kontakt brukerstøtte{' '}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer className={styles.buttonRow}>
          <Button variant="tertiary" size="small" onClick={handleClose}>
            Avbryt
          </Button>
          <Button
            size="small"
            loading={isPending(tildelVeilederePromise)}
            onClick={handleSubmit}
          >
            Lagre
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const veilederToOption = (veileder: TilgjengeligVeileder): SelectOption => {
  return {
    value: veileder.ansattId,
    label: lagBrukerNavn(
      veileder.fornavn,
      veileder.mellomnavn,
      veileder.etternavn
    )
  }
}
