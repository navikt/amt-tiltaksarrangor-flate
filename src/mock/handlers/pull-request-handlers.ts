import { ResponseComposition, rest, RestContext, RestRequest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'
import { MockedResponse } from 'msw/lib/types/response'

import { appUrl } from '../../utils/url-utils'
import { forwardRequest } from '../utils/request-utils'

export const pullRequestHandlers: RequestHandler[] = [
  rest.all(appUrl('/amt-tiltaksarrangor-bff/*'), async (req, res, ctx) => {
    return handleReq(req, res, ctx)
  })
]

const handleReq = async (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext
): Promise<MockedResponse> => {
  const url = req.url.pathname.replace(/\/pr-\d+/, '')
  const proxiedUrl = `${url}${req.url.search}`

  return forwardRequest(proxiedUrl, req, res, ctx)
}
