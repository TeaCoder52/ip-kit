import type { RequestLike } from '../index'
import { fromXForwardedFor } from './algorithms/x-forwarded-for'
import { fromXRealIp } from './algorithms/x-real-ip'
import { fromForwarded } from './algorithms/forwarded'
import { fromCloudflare } from './algorithms/cloudflare'

export type IpSource =
	| 'cf-connecting-ip'
	| 'forwarded'
	| 'x-forwarded-for'
	| 'x-real-ip'
	| 'remote-address'
	| 'none'

export function extractFromHeaders(req: RequestLike): {
	chain: string[]
	source: IpSource
} {
	return (
		fromCloudflare(req) ??
		fromForwarded(req) ??
		fromXForwardedFor(req) ??
		fromXRealIp(req) ??
		(req.remoteAddress
			? { chain: [req.remoteAddress], source: 'remote-address' }
			: { chain: [], source: 'none' })
	)
}
