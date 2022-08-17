import { NavVeileder } from '../../../../api/data/deltaker';
import { Alert, Heading } from '@navikt/ds-react';
import globalStyles from '../../../../globals.module.scss';
import React from 'react';
import styles from './NavInfoPanel.module.scss';
import { IconLabel } from '../icon-label/IconLabel';
import { Email, People, Telephone } from '@navikt/ds-icons';
import { formaterTelefonnummer } from '../../../../utils/bruker-utils';

interface Props {
    veileder: NavVeileder | null
}

export const NavInfoVeileder = (props: Props): React.ReactElement => {
    const navVeileder = props.veileder

    let veileder;

    if (navVeileder != null) {
        veileder = (
            <div className={styles.contentBlock}>
                <IconLabel
                    labelValue={navVeileder?.navn}
                    icon={<People title="Veileder navn"/>}
                    iconWrapperClassName={styles.iconWrapper}
                />
                <IconLabel
                    labelValue={formaterTelefonnummer(navVeileder?.telefon)}
                    icon={<Telephone title="Veileder telefonnummer"/>}
                    iconWrapperClassName={styles.iconWrapper}
                />
                <IconLabel
                    labelValue={navVeileder?.epost}
                    icon={<Email title="Veileder epost"/>}
                    iconWrapperClassName={styles.iconWrapper}
                />
            </div>
        )
    } else {
        veileder = (
            <Alert variant="info">
                Det er ikke registrert en NAV-veileder til denne deltakeren.
            </Alert>
        )
    }

    return (
        <>
            <Heading size="small" level="4" className={globalStyles.blokkXs}>NAV-veileder</Heading>
            {veileder}
        </>
    )
}
