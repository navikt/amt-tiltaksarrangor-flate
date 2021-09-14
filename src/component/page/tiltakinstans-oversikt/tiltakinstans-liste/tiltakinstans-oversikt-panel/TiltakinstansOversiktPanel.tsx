import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { SpaLenkepanel } from '../../../../felles/spa-lenkepanel/SpaLenkepanel';
import styles from './TiltakinstansOversiktPanel.module.less';

interface TiltakinstansOversiktPanelProps {
    id: string,
    navn: string,
    deltakere?: number
    oppstart?: Date,
}

export const TiltakinstansOversiktPanel = (props: TiltakinstansOversiktPanelProps) => {
    const {id, navn, deltakere, oppstart} = props

    return (
        <SpaLenkepanel to={`/instans/${id}`} border>
            <div className={styles.content} >
                <Element className="blokk-xxs">{navn}</Element>
                <div className={styles.undertekst}>
                    { deltakere && <Normaltekst>{`Antall deltakere: ${deltakere}`}</Normaltekst> }
                    { oppstart && <Normaltekst>{`Oppstart: ${oppstart.getUTCDate()}`}</Normaltekst> }
                </div>
            </div>
        </SpaLenkepanel>
    )
}
