import { ResponseComposition, rest, RestContext, RestRequest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'
import { MockedResponse } from 'msw/lib/types/response'

import { appUrl } from '../../utils/url-utils'
import { getProxyUrl, getRequestCookie } from '../utils/mock-env'
import { joinUrlAndPath } from '../utils/url-utils'

// Set mock cookie for all outgoing requests
getRequestCookie()
	.split(';')
	.forEach(c => document.cookie = c.trim() + '; path=/')

export const devProxyHandlers: RequestHandler[] = [
	rest.all(appUrl('/amt-tiltak/*'), async(req, res, ctx) => {

		return handleReq(getProxyUrl(), req, res, ctx)
	})

]

const handleReq = async(proxyUrl: string, req: RestRequest, res: ResponseComposition, ctx: RestContext): Promise<MockedResponse> => {
	const proxiedUrl = `${joinUrlAndPath(proxyUrl, req.url.pathname)}${req.url.search}`

	try {

		const response = await ctx.fetch(proxiedUrl, {
			credentials: 'include',
			method: req.method,
			body: req.body ? JSON.stringify(req.body) : null,
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
