import { parseCidr, ipInCidr, type ParsedCidr } from '../ip/cidr'

export interface CidrMatcher {
	(ip: string): boolean
	readonly cidrs: readonly string[]
}

export function createCidrMatcher(cidrs: readonly string[]): CidrMatcher {
	const parsed: ParsedCidr[] = []

	for (const cidr of cidrs) {
		const parsedCidr = parseCidr(cidr)
		if (parsedCidr) {
			parsed.push(parsedCidr)
		}
	}

	const fn = (ip: string): boolean => {
		for (const cidr of parsed) {
			if (ipInCidr(ip, cidr)) {
				return true
			}
		}
		return false
	}

	Object.defineProperty(fn, 'cidrs', {
		value: cidrs,
		writable: false,
	})

	return fn as CidrMatcher
}
