import { Table } from '@navikt/ds-react'
import cls from 'classnames'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  TiltakDeltaker,
  TiltakDeltakerStatus,
  Vurderingstype
} from '../../../../../api/data/deltaker'
import { brukerDetaljerPageUrl } from '../../../../../navigation'
import { lagKommaSeparertBrukerNavn } from '../../../../../utils/bruker-utils'
import { EMDASH } from '../../../../../utils/constants'
import { formatDate } from '../../../../../utils/date-utils'
import { Fnr } from '../../../../felles/fnr/Fnr'
import { StatusMerkelapp } from '../../../../felles/status-merkelapp/StatusMerkelapp'

import {
  CheckmarkCircleFillIcon,
  PlusCircleFillIcon
} from '@navikt/aksel-icons'
import { Veiledertype } from '../../../../../api/data/veileder'
import { AdressebeskyttetModal } from '../../../veileder/AdressebeskyttetModal.tsx'
import styles from './Rad.module.scss'

interface RadProps {
  idx: number
  deltaker: TiltakDeltaker
}

export const Rad = (props: RadProps): React.ReactElement<RadProps> => {
  const {
    fodselsnummer,
    fornavn,
    etternavn,
    mellomnavn,
    id,
    startDato,
    sluttDato,
    soktInnDato,
    status,
    veiledere,
    gjeldendeVurderingFraArrangor,
    adressebeskyttet,
    erVeilederForDeltaker
  } = props.deltaker
  const [modalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()
  const veileder = veiledere.filter(
    (v) => v.veiledertype === Veiledertype.VEILEDER
  )[0]

  const veiledernavn = veileder
    ? lagKommaSeparertBrukerNavn(
        veileder.fornavn,
        veileder.mellomnavn,
        veileder.etternavn
      )
    : EMDASH
  const deltakerNavn = lagKommaSeparertBrukerNavn(
    fornavn,
    mellomnavn,
    etternavn
  )

  const vurderingIkon =
    gjeldendeVurderingFraArrangor?.vurderingstype ===
    Vurderingstype.OPPFYLLER_IKKE_KRAVENE ? (
      <PlusCircleFillIcon
        className={styles.oppfyllerIkkeKraveneIkon}
        aria-label="Vurdert til oppfyller ikke kravene"
      />
    ) : (
      <CheckmarkCircleFillIcon
        className={styles.oppfyllerKraveneIkon}
        aria-label="Vurdert til oppfyller kravene"
      />
    )

  const deltakerDetaljerPageUrl = brukerDetaljerPageUrl(id, 'koordinator')

  const handleConfrimed = () => {
    setModalOpen(false)
    navigate(deltakerDetaljerPageUrl)
  }

  return (
    <Table.Row key={id}>
      <Table.DataCell className={styles.smallText}>
        <Link
          className={styles.brukersNavn}
          to={deltakerDetaljerPageUrl}
          data-testid={adressebeskyttet ? 'rad_adressebeskyttet' : ''}
          onClick={(e) => {
            if (adressebeskyttet && erVeilederForDeltaker) {
              e.preventDefault()
              setModalOpen(true)
            }
          }}
        >
          {adressebeskyttet ? 'Adressebeskyttet' : deltakerNavn}
        </Link>
      </Table.DataCell>
      <Table.DataCell className={styles.smallText}>
        {adressebeskyttet ? '' : <Fnr fnr={fodselsnummer} />}
      </Table.DataCell>
      <Table.DataCell className={styles.smallText}>
        {formatDate(soktInnDato)}
      </Table.DataCell>
      <Table.DataCell className={styles.smallText}>
        {formatDate(startDato)}
      </Table.DataCell>
      <Table.DataCell className={styles.smallText}>
        {formatDate(sluttDato)}
      </Table.DataCell>
      <Table.DataCell className={cls(styles.smallText)}>
        <div className={cls(styles.statusCelle)}>
          <StatusMerkelapp status={status} erDeltakerlisteVisning />
          {(status.type === TiltakDeltakerStatus.VURDERES || status.type == TiltakDeltakerStatus.SOKT_INN) &&
            gjeldendeVurderingFraArrangor &&
            vurderingIkon}
        </div>
      </Table.DataCell>
      <Table.DataCell className={styles.smallText}>
        {veiledernavn}
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
