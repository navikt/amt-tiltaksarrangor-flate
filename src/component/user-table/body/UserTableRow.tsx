import React, { CSSProperties } from 'react';
import { Bruker } from '../../../rest/data/bruker';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { lagBrukerNavn } from '../../../utils';

export const UserRow = (props: { idx: number, bruker: Bruker }) => {
	const {
		fodselsdato,
		fornavn,
		etternavn,
		tiltakType,
		tiltakStatus,
		tiltak
	} = props.bruker;

	const alignStart: CSSProperties = { textAlign: 'start' };

	return (
		<div role="row" aria-rowindex={props.idx} className="user-table-row">
			<div className="user-table-row__innhold">
				<Normaltekst tag="span" role="cell" style={alignStart}>{lagBrukerNavn(fornavn, etternavn)}</Normaltekst>
				<Element tag="span" role="cell">{fodselsdato}</Element>
				<Normaltekst tag="span" role="cell">{tiltakType}</Normaltekst>
				<Normaltekst tag="span" role="cell">{tiltak}</Normaltekst>
				<Element tag="span" role="cell" style={alignStart}>{tiltakStatus}</Element>
			</div>
		</div>
	);
};
