import type { Request, Response, NextFunction } from 'express'
import {
	extractIp,
	createTrustProxy,
	trustPresets,
	type TrustProxyConfig,
} from '@ip-kit/core'

export interface IpKitExpressOptions {
	trustProxy?: TrustProxyConfig | keyof typeof trustPresets
}

export function ipKit(options: IpKitExpressOptions = {}) {
	const proxy =
		typeof options.trustProxy === 'string'
			? createTrustProxy(trustPresets[options.trustProxy])
			: options.trustProxy
			? createTrustProxy(options.trustProxy)
			: createTrustProxy({ mode: 'none' })

	return function ipKitMiddleware(
		req: Request,
		_res: Response,
		next: NextFunction
	) {
		req.ipKit = extractIp(req, {
			trustProxy: proxy.fn,
		})

		next()
	}
}
