import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

interface TiltakinstansOversiktPanelProps {
    id: string,
    navn: string,
    deltakere?: number
    oppstart?: Date,
}

export const TiltakinstansOversiktPanel = (props: TiltakinstansOversiktPanelProps) => {

    const {id, navn, deltakere, oppstart} = props

    return (
        <LenkepanelBase href={`/instans/${id}`} border>
            <Systemtittel>{navn}</Systemtittel>
            <div className="undertekst">
                { deltakere && <Normaltekst>{`Antall deltakere: ${deltakere}`}</Normaltekst> }
                { oppstart && <Normaltekst>{`Oppstart: ${oppstart.getUTCDate()}`}</Normaltekst> }
            </div>
        </LenkepanelBase>
    )
}
