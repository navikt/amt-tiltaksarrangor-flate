import { ResponseComposition, rest, RestContext, RestRequest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'
import { MockedResponse } from 'msw/lib/types/response'

import { appUrl } from '../../utils/url-utils'
import { getDevProxyCookie, getDevProxyUrl } from '../utils/dev-proxy-env'

// Set mock cookie for all outgoing requests
document.cookie = getDevProxyCookie()

export const devProxyHandlers: RequestHandler[] = [
	rest.get(appUrl('/amt-tiltak/*'), async(req, res, ctx) => {
		return proxyReq(getDevProxyUrl(), req, res, ctx)
	})
]

const proxyReq = async(proxyUrl: string, req: RestRequest, res: ResponseComposition, ctx: RestContext): Promise<MockedResponse> => {
	const proxiedUrl = `${joinUrlAndPath(proxyUrl, req.url.pathname)}${req.url.search}`

	try {
		const response = await ctx.fetch(proxiedUrl, {
			credentials: 'include',
			method: req.method,
			body: req.body?.toString(),
			headers: req.headers
		})

		const bodyText = await response.text()

		return res(ctx.status(response.status), ctx.body(bodyText))
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error('Request to proxy failed', e)
		return res(ctx.status(500))
	}
}

const joinUrlAndPath = (url: string, path: string): string => {
	url = url.endsWith('/') ? url.substring(0, url.length - 1) : url
	path = path.startsWith('/') ? path.substring(1) : path

	return `${url}/${path}`
}
