import { Gjennomforing } from '../../../api/data/tiltak';
import { OverordnetEnhetVO } from './deltakerliste.viewobjects';

export const deltakerlisteMapper = (gjennomforinger: Gjennomforing[], gjennomforingIderAlleredeLagtTil: string[]): OverordnetEnhetVO[] => {
    const data: OverordnetEnhetVO[] = []

    gjennomforinger.forEach((gjennomforing) => {
        const overordnetEnhetNavn = gjennomforing.arrangor.organisasjonNavn != null
            ? gjennomforing.arrangor.organisasjonNavn
            : gjennomforing.arrangor.virksomhetNavn

        if (!data.some((i) => i.navn === overordnetEnhetNavn)) {
            data.push({navn: overordnetEnhetNavn, enheter: []})
        }

        const overornetEnhet = data.find((i) => i.navn === overordnetEnhetNavn)!!

        if (!overornetEnhet.enheter.some((i) => i.navn === gjennomforing.arrangor.virksomhetNavn)) {
            overornetEnhet.enheter.push({
                id: gjennomforing.arrangor.virksomhetOrgnr,
                navn: gjennomforing.arrangor.virksomhetNavn,
                deltakerlister: []
            })
        }

        const enhet = overornetEnhet.enheter.find((i) => i.navn === gjennomforing.arrangor.virksomhetNavn)

        enhet?.deltakerlister.push({
            id: gjennomforing.id,
            navn: gjennomforing.navn,
            tiltaksnavn: gjennomforing.tiltak.tiltaksnavn,
            startDato: gjennomforing.startDato,
            sluttDato: gjennomforing.sluttDato,
            lagtTil: gjennomforingIderAlleredeLagtTil.some((i) => i === gjennomforing.id)
        })
    })

    return data;
}
