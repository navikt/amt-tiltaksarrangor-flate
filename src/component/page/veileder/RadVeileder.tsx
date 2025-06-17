import { BodyShort, Button, Table, Tooltip } from '@navikt/ds-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { InformationSquareIcon } from '@navikt/aksel-icons'
import { VeiledersDeltaker } from '../../../api/data/deltaker'
import { brukerDetaljerPageUrl } from '../../../navigation'
import { lagKommaSeparertBrukerNavn } from '../../../utils/bruker-utils'
import { formatDate } from '../../../utils/date-utils'
import { getAktivEndringTekst } from '../../../utils/deltaker-utils'
import { Fnr } from '../../felles/fnr/Fnr'
import { StatusMerkelapp } from '../../felles/status-merkelapp/StatusMerkelapp'
import { AdressebeskyttetModal } from './AdressebeskyttetModal.tsx'
import styles from './RadVeileder.module.scss'

interface RadProps {
  idx: number
  deltaker: VeiledersDeltaker
}

export const RadVeileder = (props: RadProps): React.ReactElement<RadProps> => {
  const {
    fodselsnummer,
    fornavn,
    etternavn,
    mellomnavn,
    id,
    startDato,
    sluttDato,
    status,
    aktivEndring,
    sistEndret,
    adressebeskyttet
  } = props.deltaker
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const brukernaavn = adressebeskyttet
    ? 'Adressebeskyttet'
    : lagKommaSeparertBrukerNavn(fornavn, mellomnavn, etternavn)

  const deltakerDetaljerPageUrl = brukerDetaljerPageUrl(id, 'veileder')

  const handleConfrimed = () => {
    setModalOpen(false)
    navigate(deltakerDetaljerPageUrl)
  }

  const aktivEndringTekst = aktivEndring ? getAktivEndringTekst(aktivEndring) : ''

  return (
    <Table.Row key={id}>
      <Table.DataCell>
        <Link
          className={styles.brukersNavn}
          to={deltakerDetaljerPageUrl}
          onClick={(e) => {
            if (adressebeskyttet) {
              e.preventDefault()
              setModalOpen(true)
            }
          }}
        >
          {brukernaavn}
        </Link>
      </Table.DataCell>
      <Table.DataCell>
        {adressebeskyttet ? '' : <Fnr fnr={fodselsnummer} />}
      </Table.DataCell>
      <Table.DataCell>
        <BodyShort className={styles.sistEndret}>
          {formatDate(aktivEndring ? aktivEndring.sendt : sistEndret)}
          {aktivEndring && (
            <Tooltip content={aktivEndringTekst} placement="right">
              <Button
                aria-disabled
                className={styles.aktivEndringIcon}
                size="xsmall" variant="tertiary-neutral"
                icon={<InformationSquareIcon fontSize="1.5rem" />}
              />
            </Tooltip>
          )}
        </BodyShort>
      </Table.DataCell>
      <Table.DataCell>
        {formatDate(startDato)}
      </Table.DataCell>
      <Table.DataCell>
        {formatDate(sluttDato)}
      </Table.DataCell>
      <Table.DataCell>
        <StatusMerkelapp status={status} />
      </Table.DataCell>
      {adressebeskyttet && (
        <AdressebeskyttetModal
          open={modalOpen}
          handleCloseModal={() => setModalOpen(false)}
          handleConfrimed={handleConfrimed}
        />
      )}
    </Table.Row>
  )
}
