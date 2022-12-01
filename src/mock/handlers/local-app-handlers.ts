import { ResponseComposition, rest, RestContext, RestRequest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'
import { MockedResponse } from 'msw/lib/types/response'

import environment from '../../utils/environment'
import { appUrl } from '../../utils/url-utils'
import { mockAuthInfo } from '../data/auth'
import { getRequestAuthHeader, localAmtTiltakUrl } from '../utils/mock-env'
import { forwardRequest } from '../utils/request-utils'
import { joinUrlAndPath } from '../utils/url-utils'

export const localAppHandlers: RequestHandler[] = [
	rest.get(appUrl('/auth/info'), (_req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockAuthInfo))
	}),
	rest.all(appUrl('/amt-tiltak/*'), async(req, res, ctx) => {
		return handleReq(localAmtTiltakUrl(), req, res, ctx)
	})
]

const stripContextPath = (path: string, contextPath: string): string => {
	if (path.startsWith(contextPath)) {
		return path.substring(contextPath.length, path.length)
	}

	return path
}

const handleReq = async(proxyUrl: string, req: RestRequest, res: ResponseComposition, ctx: RestContext): Promise<MockedResponse> => {
	const reqPath = stripContextPath(req.url.pathname, `${environment.publicUrl}/amt-tiltak`)
	const proxiedUrl = `${joinUrlAndPath(proxyUrl, reqPath)}${req.url.search}`

	req.headers.append('Authorization', getRequestAuthHeader())

	return forwardRequest(proxiedUrl, req, res, ctx)
}
