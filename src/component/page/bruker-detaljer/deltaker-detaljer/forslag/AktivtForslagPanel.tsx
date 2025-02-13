import React from 'react'
import { AktivtForslag, ForslagStatusType } from '../../../../../api/data/forslag'

import styles from './AktivtForslagPanel.module.scss'
import {
  BodyLong,
  Box,
  Button,
  Detail,
  HGrid,
  HStack,
  Heading,
  ReadMore,
  Tooltip,
  VStack
} from '@navikt/ds-react'
import { EndringTypeIkon } from '../EndringTypeIkon'
import { XMarkIcon } from '@navikt/aksel-icons'
import {
  isPending,
  isResolved,
  usePromise
} from '../../../../../utils/use-promise'
import { ForslagEndringsdetaljer } from './ForslagEndringsdetaljer'
import { settSvarFraNavSomLest, tilbakekallForslag } from '../../../../../api/forslag-api'
import { ForslagStatusTag } from './ForslagStatusTag'
import { forslagTitle, mapTilEndringType } from './forslagUtils'
import { formatDate } from '../../../../../utils/date-utils'

export interface Props {
  readonly forslag: AktivtForslag
  readonly deltakerId: string
  readonly fjernBehandledeForslag: (forslag: AktivtForslag) => void
}

export const AktivtForslagPanel = ({
  forslag,
  deltakerId,
  fjernBehandledeForslag
}: Props) => {
  const tilbakekallPromise = usePromise<void>()
  const markerSomLestPromise = usePromise<void>()

  const handleClick = () => {
    tilbakekallPromise.setPromise(
      tilbakekallForslag(deltakerId, forslag.id).then(() =>
        fjernBehandledeForslag(forslag)
      )
    )
  }

  const handleLestForslag = () => {
    markerSomLestPromise.setPromise(
      settSvarFraNavSomLest(deltakerId, forslag.id)
        .then(() => fjernBehandledeForslag(forslag))
    )
  }

  return (
    <Box
      background="surface-default"
      borderColor="border-default"
      borderWidth="1"
      borderRadius="medium"
      className={styles.panel}
    >
      <HGrid columns="2rem auto" className={styles.grid}>
        <VStack>
          <EndringTypeIkon
            size="large"
            type={mapTilEndringType(forslag.endring.type)}
          />
        </VStack>
        <VStack>
          <HStack gap="4">
            <Heading level="4" size="small">
              {forslagTitle(forslag.endring.type)}
            </Heading>
            <ForslagStatusTag
              type={forslag.status.type}
              className={styles.status}
            />

            {forslag.status.type === ForslagStatusType.VenterPaSvar &&
              (<Tooltip content="Tilbakekall forslag" className={styles.tooltip}>
                <Button
                  icon={<XMarkIcon aria-hidden />}
                  loading={
                    isPending(tilbakekallPromise) ||
                    isResolved(tilbakekallPromise)
                  }
                  variant="tertiary"
                  size="small"
                  onClick={handleClick}
                  className={styles.closeButton}
                  aria-label="Tilbakekall forslag"
                />
              </Tooltip>)}

          </HStack>
          {forslag.status.type === ForslagStatusType.VenterPaSvar && (
            <ForslagEndringsdetaljer
              endring={forslag.endring}
              begrunnelse={forslag.begrunnelse}
              sendt={forslag.opprettet}
            />
          )}

          {forslag.status.type === ForslagStatusType.Godkjent && (
            <>
              <Detail className={styles.forslag_detail_sendt}>
                Godkjent {formatDate(forslag.status.godkjent)} av Nav.
              </Detail>
              <ReadMore size="small" header="Forslaget fra arrangør" defaultOpen>
                <ForslagEndringsdetaljer
                  endring={forslag.endring}
                  begrunnelse={forslag.begrunnelse}
                  sendt={forslag.opprettet}
                />
              </ReadMore>
            </>
          )}

          {forslag.status.type === ForslagStatusType.Avvist && (
            <>
              <BodyLong className={styles.forslag_detail_beskrivelse} size="small">
                {forslag.status.begrunnelseFraNav}
              </BodyLong>
              <Detail className={styles.forslag_detail_sendt}>
                Avvist {formatDate(forslag.status.avvist)} av Nav.
              </Detail>
              <ReadMore size="small" header="Forslaget fra arrangør" defaultOpen>
                <ForslagEndringsdetaljer
                  endring={forslag.endring}
                  begrunnelse={forslag.begrunnelse}
                  sendt={forslag.opprettet}
                />
              </ReadMore>
            </>
          )}

        </VStack>
      </HGrid>

      {(forslag.status.type === ForslagStatusType.Godkjent
        || forslag.status.type === ForslagStatusType.Avvist) && (
          <Box
            background="surface-action-subtle"
            className={styles.markerSomLestBox}
            borderRadius="0 0 medium medium"
          >
            <div className={styles.markerSomLestKnappWrapper}>
              <Button size="small" onClick={handleLestForslag}>Marker som lest</Button>
            </div>
          </Box>
        )}
    </Box>
  )
}
