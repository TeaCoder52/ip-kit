import type { RequestLike } from '../index'
import type { ClientIpResult } from '../result/result'
import { extractFromHeaders } from './headers'

export interface ExtractOptions {
	debug?: boolean
}

export function extractIp(
	req: RequestLike,
	_options: ExtractOptions = {}
): ClientIpResult {
	const { chain, source } = extractFromHeaders(req)

	return {
		ip: chain[0] ?? null,
		source,
		chain,
		rawChain: chain,
		warnings: [],
	}
}
