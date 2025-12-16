import type { RequestLike, TrustProxyFn } from '../index'
import type { ClientIpResult } from '../result/result'
import { extractFromHeaders } from './headers'

export interface ExtractOptions {
	debug?: boolean
	trustProxy?: TrustProxyFn
}

export function extractIp(
	req: RequestLike,
	_options: ExtractOptions = {}
): ClientIpResult {
	const { chain, source } = extractFromHeaders(req)
	const trust = _options.trustProxy ?? (() => false)

	let clientIp: string | null = null
	const filteredChain: string[] = []

	for (let i = chain.length - 1; i >= 0; i--) {
		const ip = chain[i]

		filteredChain.unshift(ip!)

		if (!trust(ip!)) {
			clientIp = ip!

			break
		}
	}

	return {
		ip: clientIp,
		source,
		chain: filteredChain,
		rawChain: chain,
		warnings: [],
	}
}
