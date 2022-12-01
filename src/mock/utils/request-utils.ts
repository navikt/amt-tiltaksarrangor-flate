import { ResponseComposition, RestContext, RestRequest } from 'msw'
import { MockedResponse } from 'msw/lib/types/response'

export const forwardRequest = async(toUrl: string, req: RestRequest, res: ResponseComposition, ctx: RestContext): Promise<MockedResponse> => {
	try {

		const response = await ctx.fetch(toUrl, {
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