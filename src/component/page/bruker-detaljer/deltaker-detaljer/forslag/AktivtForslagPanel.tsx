import React from 'react'
import { AktivtForslag } from '../../../../../api/data/forslag'

import styles from './AktivtForslagPanel.module.scss'
import {
  Box,
  Button,
  HGrid,
  HStack,
  Heading,
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
import { tilbakekallForslag } from '../../../../../api/forslag-api'
import { ForslagStatusTag } from './ForslagStatusTag'
import { forslagTitle, mapTilEndringType } from './forslagUtils'

export interface Props {
  readonly forslag: AktivtForslag
  readonly deltakerId: string
  readonly onTilbakekalt: (forslag: AktivtForslag) => void
}

export const AktivtForslagPanel = ({
  forslag,
  deltakerId,
  onTilbakekalt
}: Props) => {
  const tilbakekallPromise = usePromise<void>()

  const handleClick = () => {
    tilbakekallPromise.setPromise(
      tilbakekallForslag(deltakerId, forslag.id).then(() =>
        onTilbakekalt(forslag)
      )
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
            <Tooltip content="Tilbakekall forslag" className={styles.tooltip}>
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
            </Tooltip>
          </HStack>
          <ForslagEndringsdetaljer
            endring={forslag.endring}
            begrunnelse={forslag.begrunnelse}
            sendt={forslag.opprettet}
          />
        </VStack>
      </HGrid>
    </Box>
  )
}
