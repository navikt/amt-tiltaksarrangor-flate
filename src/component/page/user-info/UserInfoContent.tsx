import React, { ReactNode } from 'react';

import { DetaljertBruker } from '../../../api/data/bruker';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import { mapTiltakStatusTilTekst, mapTiltakTypeTilTekst } from '../../../utils/text-mappers';
import { Knapp } from 'nav-frontend-knapper';
import { formatDateInputStr } from '../../../utils/date-utils';
import { Input } from 'nav-frontend-skjema';
import styles from './UserInfoContent.module.less';


interface SeksjonProps {
    tittel: string;
    children?: ReactNode;
}

const Seksjon = ({tittel, children}: SeksjonProps) =>
    <div>
        <Ingress className={styles.textBold}>{tittel}</Ingress>
        {children}
    </div>;

export const UserInfoContent = (props: { bruker: DetaljertBruker }) => {
    const { tiltak, navEnhet, navVeileder, kontaktinfo } = props.bruker;

    return (
        <div className={styles.userInfoContent}>

            <Seksjon tittel="Kontaktinformasjon">
                <Normaltekst>Telefon: {kontaktinfo.telefonnummer}</Normaltekst>
                <Normaltekst>Email: {kontaktinfo.email}</Normaltekst>
            </Seksjon>

            <Seksjon tittel="Status">
                <Normaltekst>{mapTiltakStatusTilTekst(tiltak.status)}</Normaltekst>
            </Seksjon>

            <Seksjon tittel="Periode for gjennomføring">
                <div className={styles.periodeInputWrapper}>
                    <Input label="Start" type="date" value={formatDateInputStr(tiltak.startDato)}/>
                    <Knapp className={styles.periodeKnapp}>Lagre</Knapp>
                </div>
                <div className={styles.periodeInputWrapper}>
                    <Input label="Slutt" type="date" value={formatDateInputStr(tiltak.sluttDato)}/>
                    <Knapp className={styles.periodeKnapp}>Lagre</Knapp>
                </div>
            </Seksjon>

            <Seksjon tittel="NAV-kontor">
                <Normaltekst>{navEnhet.enhetNavn}</Normaltekst>
            </Seksjon>

            <Seksjon tittel="Veileder">
                <Normaltekst>Navn: {navVeileder?.navn}</Normaltekst>
                <Normaltekst>Email: {navVeileder?.email}</Normaltekst>
                <Normaltekst>Telefonnummer: {navVeileder?.telefonnummer}</Normaltekst>
            </Seksjon>

            <Seksjon tittel="Tiltak">
                <Normaltekst>Type: {mapTiltakTypeTilTekst(tiltak.type)}</Normaltekst>
            </Seksjon>

            <Seksjon tittel="Beskrivelse" />
        </div>
    );
}