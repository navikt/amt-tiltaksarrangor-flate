import { DeltakerlisteVO } from '../../../deltakerliste.viewobjects';

interface DeltakerlisteProps {
    deltakerliste: DeltakerlisteVO;
    onLeggTil: (id: string) => void;
    onFjern: (id: string) => void;
}

export const Deltakerliste = (props: DeltakerlisteProps) => {
    return (
        <div>
            <div>{props.deltakerliste.navn}</div>
        </div>
    )

}
