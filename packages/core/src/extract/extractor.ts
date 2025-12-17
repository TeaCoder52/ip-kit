import type { RequestLike, TrustProxyFn } from '../index'
import type { ClientIpResult, ClientIpWarning } from '../result/result'
import type { IpSource } from './headers'

import { extractFromHeaders } from './headers'
import { isValidIp } from '../ip/is-valid'
import { isPrivateIp } from '../ip/is-private'

export type HeaderPolicy = 'cloudflare-first' | 'forwarded-first' | 'legacy'

export type ClientIpReason =
	| 'FIRST_UNTRUSTED_PROXY'
	| 'SINGLE_HOP'
	| 'NO_TRUSTED_PROXIES'
	| 'NO_IP_FOUND'

export interface ExtractDebugInfo {
	checkedHeaders: IpSource[]
	rejectedIps: string[]
	trustChain: boolean[]
}

export interface ExtractOptions {
	trustProxy?: TrustProxyFn
	headerPolicy?: HeaderPolicy
	debug?: boolean
}

const SOURCE_CONFIDENCE: Record<IpSource, number> = {
	'cf-connecting-ip': 0.95,
	forwarded: 0.8,
	'x-forwarded-for': 0.6,
	'x-real-ip': 0.5,
	'remote-address': 0.4,
	none: 0,
}

export function extractIp(
	req: RequestLike,
	options: ExtractOptions = {}
): ClientIpResult {
	const trust = options.trustProxy ?? (() => false)
	const warnings: ClientIpWarning[] = []
	const rejectedIps: string[] = []
	const trustChain: boolean[] = []

	const { chain, source } = extractFromHeaders(req)

	if (chain.length === 0) {
		const warnings: ClientIpWarning[] = ['EMPTY_CHAIN']

		return Object.freeze({
			ip: null,
			source: 'none',
			chain: [],
			rawChain: [],
			warnings,
			confidence: 0,
			reason: 'NO_IP_FOUND',
		})
	}

	let clientIp: string | null = null
	let reason: ClientIpReason = 'NO_IP_FOUND'

	for (let i = chain.length - 1; i >= 0; i--) {
		const ip = chain[i]!

		if (!isValidIp(ip)) {
			rejectedIps.push(ip)
			warnings.push('INVALID_IP')
			continue
		}

		const trusted = trust(ip)
		trustChain.unshift(trusted)

		if (isPrivateIp(ip)) {
			warnings.push('PRIVATE_IP')
		}

		if (!trusted) {
			clientIp = ip
			reason = chain.length === 1 ? 'SINGLE_HOP' : 'FIRST_UNTRUSTED_PROXY'
			break
		}
	}

	if (!clientIp && chain.length > 0) {
		clientIp = chain[0]!
		reason = 'NO_TRUSTED_PROXIES'
		warnings.push('UNTRUSTED_PROXY')
	}

	// Header spoofing detection (Cloudflare-style)
	if (
		source === 'cf-connecting-ip' &&
		req.remoteAddress &&
		!trust(req.remoteAddress)
	) {
		warnings.push('HEADER_SPOOFING')
	}

	const result: ClientIpResult = {
		ip: clientIp,
		source,
		chain,
		rawChain: chain,
		warnings,
		confidence: SOURCE_CONFIDENCE[source] ?? 0,
		reason,
	}

	if (options.debug) {
		result.debug = {
			checkedHeaders: [source],
			rejectedIps,
			trustChain,
		} satisfies ExtractDebugInfo
	}

	return Object.freeze(result)
}
