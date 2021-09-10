import React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { SpaLenkepanel } from '../../felles/spa-lenkepanel/SpaLenkepanel';

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
            <Systemtittel>{navn}</Systemtittel>
            <div className="undertekst">
                { deltakere && <Normaltekst>{`Antall deltakere: ${deltakere}`}</Normaltekst> }
                { oppstart && <Normaltekst>{`Oppstart: ${oppstart.getUTCDate()}`}</Normaltekst> }
            </div>
        </SpaLenkepanel>
    )
}
