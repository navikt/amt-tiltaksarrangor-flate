import { ResponseComposition, rest, RestContext, RestRequest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'
import { MockedResponse } from 'msw/lib/types/response'

import environment from '../../utils/environment'
import { appUrl } from '../../utils/url-utils'
import { joinUrlAndPath } from '../utils/url-utils'

const getPullRequestUrl = (): string => {
	return environment.publicUrl.replace(/\/pr-\d+/, '')
}

export const pullRequestHandlers: RequestHandler[] = [

	rest.all(appUrl('/amt-tiltak/*'), async(req, res, ctx) => {
		return handleReq(getPullRequestUrl(), req, res, ctx)
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
