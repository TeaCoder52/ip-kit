import type { IpSource } from '../extract/headers'

export type ClientIpWarning =
	| 'INVALID_IP'
	| 'PRIVATE_IP'
	| 'UNTRUSTED_PROXY'
	| 'HEADER_SPOOFING'
	| 'EMPTY_CHAIN'

export interface ClientIpResult {
	ip: string | null
	source: IpSource
	chain: string[]
	rawChain: string[]
	warnings: ClientIpWarning[]
	confidence: number
	reason: string
	debug?: Record<string, unknown>
}
