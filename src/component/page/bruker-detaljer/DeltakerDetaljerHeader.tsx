import {
  ChevronDownIcon,
  ChevronUpIcon,
  EnvelopeClosedIcon,
  PhoneIcon
} from '@navikt/aksel-icons'
import { Button, Heading } from '@navikt/ds-react'
import cls from 'classnames'
import React, { useEffect, useState } from 'react'

import {
  MINE_DELTAKERE_PAGE_ROUTE,
  deltakerlisteDetaljerPageUrl
} from '../../../navigation'
import { useTilbakelenkeContext } from '../../../store/TilbakelenkeContextProvider'
import {
  formaterTelefonnummer,
  lagBrukerNavn
} from '../../../utils/bruker-utils'
import styles from './DeltakerDetaljerHeader.module.scss'
import { IconLabel } from './icon-label/IconLabel'
import { KopierKnapp } from './kopier-knapp/KopierKnapp'
import { useInnloggetBrukerContext } from '../../../store/InnloggetBrukerContextProvider'
import { isOnlyKoordinator, isOnlyVeileder } from '../../../utils/rolle-utils'
import { useQuery } from '../../../utils/use-query'
import { Adresse } from '../../../api/data/deltaker'
import { DeltakerAdresse } from './DeltakerAdresse'
import { Show } from '../../felles/Show'
import { Tiltakskode } from '../../../api/data/tiltak'
import { skalTiltakViseAdresse } from '../../../utils/deltaker-utils'

interface BrukerPaaTiltakHeaderProps {
  deltakerlisteId: string
  fornavn: string
  mellomnavn: string | null
  etternavn: string
  fodselsnummer: string
  telefonnummer: string | null
  epost: string | null
  adresse?: Adresse | null
  tiltakskode: Tiltakskode
  adressebeskyttet: boolean
}

export const DeltakerDetaljerHeader = (
  props: BrukerPaaTiltakHeaderProps
): React.ReactElement => {
  const {
    deltakerlisteId,
    fornavn,
    mellomnavn,
    etternavn,
    fodselsnummer,
    telefonnummer,
    epost,
    adresse,
    tiltakskode
  } = props
  const { setTilbakeTilUrl } = useTilbakelenkeContext()
  const { roller } = useInnloggetBrukerContext()
  const query = useQuery()
  const [visAdresse, setVisAdresse] = useState(false)
  const visAdresseForTiltak =
    !props.adressebeskyttet && skalTiltakViseAdresse(tiltakskode)

  const toggleVisAdresse = () => {
    setVisAdresse(!visAdresse)
  }

  useEffect(() => {
    if (isOnlyVeileder(roller)) {
      setTilbakeTilUrl(MINE_DELTAKERE_PAGE_ROUTE)
    } else if (isOnlyKoordinator(roller)) {
      setTilbakeTilUrl(deltakerlisteDetaljerPageUrl(deltakerlisteId))
    } else {
      const ref = query.get('ref')
      if (ref !== null && ref === 'veileder') {
        setTilbakeTilUrl(MINE_DELTAKERE_PAGE_ROUTE)
      } else {
        setTilbakeTilUrl(deltakerlisteDetaljerPageUrl(deltakerlisteId))
      }
    }
  }, [deltakerlisteId, roller])

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerInfoWrapper}>
          <div className={cls(styles.headerTitleWrapper)}>
            <Heading size="small" level="2" className={styles.headerTitle}>
              {lagBrukerNavn(fornavn, mellomnavn, etternavn)}
            </Heading>
            {fodselsnummer && (
              <KopierKnapp
                kopierTekst={fodselsnummer}
                ariaLabel={`Kopier fødselsnummer ${fodselsnummer.split('').join(' ')}`}
              >
                {fodselsnummer}
              </KopierKnapp>
            )}
          </div>

          <div className={styles.headerInfo}>
            <IconLabel
              labelValue={formaterTelefonnummer(telefonnummer)}
              icon={<PhoneIcon title="Deltaker telefonnummer" />}
            />
            <IconLabel
              labelValue={epost}
              icon={<EnvelopeClosedIcon title="Deltaker e-post" />}
            />
          </div>
        </div>
        {visAdresseForTiltak && (
          <Button
            variant="tertiary"
            icon={visAdresse ? <ChevronUpIcon /> : <ChevronDownIcon />}
            iconPosition="right"
            onClick={toggleVisAdresse}
            className={styles.toggleAdresseKnapp}
            size="small"
          >
            {visAdresse ? 'Lukk' : 'Vis mer'}
          </Button>
        )}
      </div>
      <Show if={visAdresse}>
        <DeltakerAdresse adresse={adresse} />
      </Show>
    </div>
  )
}
