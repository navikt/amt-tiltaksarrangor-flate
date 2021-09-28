import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { SpaLenkepanel } from '../../../../felles/SpaLenkepanel';
import styles from './TiltakinstansOversiktPanel.module.less';
import globalStyles from '../../../../../globals.module.less';
import { dateStrWithMonthName } from '../../../../../utils/date-utils';

interface TiltakinstansOversiktPanelProps {
    id: string,
    navn: string,
    deltakere?: number
    oppstart?: string,
}

export const TiltakinstansOversiktPanel = (props: TiltakinstansOversiktPanelProps) => {
    const {id, navn, deltakere, oppstart} = props

    return (
        <SpaLenkepanel to={`/instans/${id}`} border>
            <div className={styles.content} >
                <Element className={globalStyles.blokkXxs}>{navn}</Element>
                <div className={styles.undertekst}>
                    { deltakere !== undefined && <Normaltekst>{`Antall deltakere: ${deltakere}`}</Normaltekst> }
                    { oppstart && <Normaltekst>{`Oppstart: ${dateStrWithMonthName(oppstart)}`}</Normaltekst> }
                </div>
            </div>
        </SpaLenkepanel>
    )
}
