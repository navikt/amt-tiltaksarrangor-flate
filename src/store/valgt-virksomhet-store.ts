import constate from 'constate';
import { useEffect, useState } from 'react';
import { Virksomhet } from '../api/data/ansatt';

export interface ValgtVirksomhet {
	id: string;
	virksomhetsnavn: string;
	virksomhetsnummer: string;
}

const SIST_VALGT_VIRKSOMHET_ID_STORAGE_KEY = 'amt_sist_valgt_virksomhet_id';

const hentSistValgtVirksomhetId = (): string | null => {
	return localStorage.getItem(SIST_VALGT_VIRKSOMHET_ID_STORAGE_KEY);
};

const lagreSistValgtVirksomhetId = (virksomhetId: string): void => {
	localStorage.setItem(SIST_VALGT_VIRKSOMHET_ID_STORAGE_KEY, virksomhetId);
};

const finnVirksomhet = (virksomhetId: string | null, virksomheter: Virksomhet[]): Virksomhet | undefined => {
	if (!virksomhetId) return undefined;
	return virksomheter.find(v => v.id === virksomhetId);
}

export const hentSisteLagretEllerForsteTilgjengeligVirksomhet = (tilgjengeligeVirksomheter: Virksomhet[]): Virksomhet | undefined => {
	const sisteVirksomhetId = hentSistValgtVirksomhetId();
	const sisteVirksomhet = finnVirksomhet(sisteVirksomhetId, tilgjengeligeVirksomheter);

	return sisteVirksomhet || tilgjengeligeVirksomheter[0]
};

// TODO: Koden ovenfor hører kanskje ikke hjemme her NOSONAR

export const [ValgtVirksomhettoreProvider, useValgtVirksomhetStore] = constate((props: { defaultValgtVirksomhet: ValgtVirksomhet }) => {
	const [valgtVirksomhet, setValgtVirksomhet] = useState<ValgtVirksomhet>(props.defaultValgtVirksomhet);

	useEffect(() => {
		lagreSistValgtVirksomhetId(valgtVirksomhet.id);
	}, [valgtVirksomhet]);

	return {
		valgtVirksomhet,
		setValgtVirksomhet,
	};
});