import { EnhetVO } from '../../deltakerliste.viewobjects';
import { Deltakerliste } from './deltakerlister/Deltakerliste';

interface DeltakerlisterPaEnhetProps {
    enhet: EnhetVO,
    onLeggTil: (id: string) => void;
    onFjern: (id: string) => void;
}

export const DeltakerlisterPaEnhet = (props: DeltakerlisterPaEnhetProps) => {
    return (
        <div>
            <div>{props.enhet.navn} org.nr.: {props.enhet.id}</div>

            {props.enhet.deltakerlister.map((deltakerliste) =>
                <Deltakerliste key={deltakerliste.id}
                               deltakerliste={deltakerliste}
                               onLeggTil={props.onLeggTil}
                               onFjern={props.onFjern}/>
            )}
        </div>
    )
}
