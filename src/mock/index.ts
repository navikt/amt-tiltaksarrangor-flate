import { setupWorker, rest } from 'msw';
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler';
import { mockBrukere } from './data/brukere';
import { Bruker } from '../api/data/bruker';
import { BrukerSokParams } from '../api';

const mockBrukerSok = (params: BrukerSokParams): Bruker[] => {
	return mockBrukere.filter((bruker) => {
		const { navnFnrSok, tiltakStatuser, tiltakTyper } = params.filter;
		if (navnFnrSok?.trim()) {
			const matcherFornavn = bruker.fornavn.toLowerCase().includes(navnFnrSok || '');
			const matcherEtternavn = bruker.etternavn.toLowerCase().includes(navnFnrSok || '');

			if (!matcherFornavn && !matcherEtternavn) {
				return false;
			}
		}

		if (tiltakStatuser.length > 0) {
			if (!tiltakStatuser.includes(bruker.tiltak.status)) {
				return false;
			}
		}

		if (tiltakTyper.length > 0) {
			if (!tiltakTyper.includes(bruker.tiltak.type)) {
				return false;
			}
		}

		return true;
	});
};

const allHandlers: RequestHandler[] = [
	rest.post('/amt-tiltak/api/bruker/sok', (req, res, ctx) => {
		const sokParams = req.body as BrukerSokParams;
		return res(ctx.delay(500), ctx.json(mockBrukerSok(sokParams)));
	})
];

setupWorker(...allHandlers)
	.start({ serviceWorker: { url: process.env.PUBLIC_URL + '/mockServiceWorker.js' } })
	.catch(e => {
		// tslint:disable-next-line:no-console
		console.error('Unable to setup mocked API endpoints', e);
	});