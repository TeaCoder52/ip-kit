import type { IpSource } from '../extract/headers'

export interface ClientIpResult {
	ip: string | null
	source: IpSource
	chain: string[]
	rawChain: string[]
	warnings: string[]
}
