import { HouseIcon } from '@navikt/aksel-icons'
import { Label } from '@navikt/ds-react'
import React, { useId } from 'react'
import styles from './DeltakerDetaljerHeader.module.scss'
import { Adresse } from '../../../api/data/deltaker'
import { mapAdresseTypeTilTekst } from '../../../utils/text-mappers'
import { lagAdresseTekst } from '../../../utils/deltaker-utils'

interface DeltakerAdresseProps {
	adresse?: Adresse | null
}

export const DeltakerAdresse = ( { adresse }: DeltakerAdresseProps ): React.ReactElement => {
	const adresseId = useId()

	return (
		<div className={ styles.adresse }>
			<HouseIcon />
			<div>
				<Label htmlFor={ adresseId } as="span" size="small">
					{ adresse ? mapAdresseTypeTilTekst( adresse?.adressetype ) : 'Adresse' }
				</Label>{ ' ' }
				<div id={ adresseId }>
					{ adresse ? lagAdresseTekst( adresse ) : '-' }
				</div>
			</div>
		</div>
	)
}
