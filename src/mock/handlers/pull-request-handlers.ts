import { ResponseComposition, rest, RestContext, RestRequest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'
import { MockedResponse } from 'msw/lib/types/response'

import { appUrl } from '../../utils/url-utils'

export const pullRequestHandlers: RequestHandler[] = [

	rest.all(appUrl('/amt-tiltak/*'), async(req, res, ctx) => {
		return handleReq(req, res, ctx)
	})

]

const handleReq = async(req: RestRequest, res: ResponseComposition, ctx: RestContext): Promise<MockedResponse> => {
	const url = req.url.pathname.replace(/\/pr-\d+/, '')
	const proxiedUrl = `${url}${req.url.search}`

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
