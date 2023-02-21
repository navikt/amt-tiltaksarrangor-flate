import { OverordnetEnhetVO } from '../deltakerliste.viewobjects';
import { DeltakerlisterPaEnhet } from './deltakerlister-pa-virksomhet/DeltakerlisterPaEnhet';

interface UnderenheterPaOverenhetProps {
    overordnetEnhet: OverordnetEnhetVO,
    onLeggTil: (id: string) => void;
    onFjern: (id: string) => void;
}

export const UnderenheterPaOverenhet = (props: UnderenheterPaOverenhetProps) => {
    return (
        <div>
            <div>{props.overordnetEnhet.navn}</div>

            {props.overordnetEnhet.enheter.map((enhet) =>
                <DeltakerlisterPaEnhet key={enhet.id}
                                       enhet={enhet}
                                       onLeggTil={props.onLeggTil}
                                       onFjern={props.onFjern}/>
            )}
        </div>
    )
}
