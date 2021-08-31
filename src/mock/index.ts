import { rest, setupWorker } from 'msw';
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler';

import {
	BrukerSokParams,
	OppdaterTiltakSluttdatoRequestBody,
	OppdaterTiltakStartdatoRequestBody,
} from '../api/data/request-types';
import { mockBrukerSok } from './bruker-sok';
import { mockBrukere, tilBruker } from './data/brukere';

const allHandlers: RequestHandler[] = [
	rest.get('/auth-proxy/is-authenticated', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json({ isAuthenticated: false }));
	}),
	rest.post('/amt-tiltak/api/bruker/sok', (req, res, ctx) => {
		const sokParams = req.body as BrukerSokParams;
		const brukere = mockBrukere.map(tilBruker);

		return res(ctx.delay(500), ctx.json(mockBrukerSok(brukere, sokParams)));
	}),
	rest.get('/amt-tiltak/api/bruker/:brukerId', (req, res, ctx) => {
		const brukerId = req.params['brukerId'];
		const bruker = mockBrukere.find((b) => b.id === brukerId);

		return res(ctx.delay(500), ctx.json(bruker));
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
