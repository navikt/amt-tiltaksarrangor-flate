import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { SpaLenkepanel } from '../../../../felles/SpaLenkepanel';
import styles from './TiltakinstansOversiktPanel.module.less';
import { formatDateStr } from '../../../../../utils/date-utils';

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
                <Element className="blokk-xxs">{navn}</Element>
                <div className={styles.undertekst}>
                    { deltakere !== undefined && <Normaltekst>{`Antall deltakere: ${deltakere}`}</Normaltekst> }
                    { oppstart && <Normaltekst>{`Oppstart: ${formatDateStr(oppstart)}`}</Normaltekst> }
                </div>
            </div>
        </SpaLenkepanel>
    )
}
