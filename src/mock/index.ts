import { rest, setupWorker } from 'msw';
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler';

import {
	OppdaterTiltakSluttdatoRequestBody,
	OppdaterTiltakStartdatoRequestBody,
} from '../api/data/request-types';
import { mockBrukere, tilBruker } from './data/brukere';
import { mockTiltak } from './data/tiltak';
import { mockInnloggetAnsatt } from './data/ansatt';

const allHandlers: RequestHandler[] = [
	rest.get('/amt-tiltak/api/tiltaksleverandor/ansatt/me', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockInnloggetAnsatt));
	}),
	rest.get('/amt-tiltak/api/tiltak/instans/:tiltakinstansId', (req, res, ctx) => {
		const id = req.params.tiltakinstansId;

		const tiltakinstans = mockTiltak
			.flatMap(tiltak => tiltak.tiltakinstanser)
			.find(instans => instans.id === id);

		if (!tiltakinstans) {
			return res(ctx.delay(500), ctx.status(404));
		}

		return res(ctx.delay(500), ctx.json(tiltakinstans));
	}),
	rest.get('/amt-tiltak/api/tiltak/instans/:tiltakinstansId/brukere', (req, res, ctx) => {
		const brukere = mockBrukere.map(tilBruker);
		return res(ctx.delay(500), ctx.json(brukere));
	}),
	rest.get('/amt-tiltak/api/bruker/:brukerId', (req, res, ctx) => {
		const brukerId = req.params['brukerId'];
		const bruker = mockBrukere.find((b) => b.id === brukerId);

		return res(ctx.delay(500), ctx.json(bruker));
	}),
	rest.get('/amt-tiltak/api/tiltak', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockTiltak));
	}),
	rest.get('/amt-tiltak/api/tiltak', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockTiltak));
	}),
	rest.put('/amt-tiltak/api/tiltak/:tiltakinstansId/startdato', (req, res, ctx) => {
		const body = req.body as OppdaterTiltakStartdatoRequestBody;
		const tiltakinstansId = req.params['tiltakinstansId'];
		const bruker = mockBrukere.find((bruker) => bruker.tiltak.id === tiltakinstansId);

		if (!bruker) throw new Error(`Fant ingen tiltak med id: ${tiltakinstansId}`);

		bruker.tiltak.startdato = body.startdato;

		return res(ctx.delay(500), ctx.json(bruker.tiltak));
	}),
	rest.put('/amt-tiltak/api/tiltak/:tiltakinstansId/sluttdato', (req, res, ctx) => {
		const body = req.body as OppdaterTiltakSluttdatoRequestBody;
		const tiltakinstansId = req.params['tiltakinstansId'];
		const bruker = mockBrukere.find((bruker) => bruker.tiltak.id === tiltakinstansId);

		if (!bruker) throw new Error(`Fant ingen tiltak med id: ${tiltakinstansId}`);

		bruker.tiltak.sluttdato = body.sluttdato;

		return res(ctx.delay(500), ctx.json(bruker.tiltak));
	}),
];

setupWorker(...allHandlers)
	.start({ serviceWorker: { url: process.env.PUBLIC_URL + '/mockServiceWorker.js' } })
	.catch((e) => {
		// tslint:disable-next-line:no-console
		console.error('Unable to setup mocked API endpoints', e);
	});
