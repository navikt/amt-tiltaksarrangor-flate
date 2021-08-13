import { setupWorker, rest } from 'msw';
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler';
import { mockBrukere, tilBruker } from './data/brukere';
import { Bruker } from '../api/data/bruker';
import { BrukerSokParams } from '../api';

const mockBrukerSok = (brukere: Bruker[], params: BrukerSokParams): Bruker[] => {
	return brukere.filter((bruker) => {
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
		const brukere = mockBrukere.map(tilBruker);

		return res(ctx.delay(500), ctx.json(mockBrukerSok(brukere, sokParams)));
	}),
	rest.get('/amt-tiltak/api/bruker/:brukerId',(req, res, ctx) => {
		const brukerId = req.params['brukerId'];
		const bruker = mockBrukere.find((b) => b.id === brukerId);

		return res(ctx.delay(500), ctx.json(bruker));
	})
];

setupWorker(...allHandlers)
	.start({ serviceWorker: { url: process.env.PUBLIC_URL + '/mockServiceWorker.js' } })
	.catch(e => {
		// tslint:disable-next-line:no-console
		console.error('Unable to setup mocked API endpoints', e);
	});