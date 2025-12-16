import { ipInCidr } from '../ip/cidr'

export function createCidrMatcher(cidrs: string[]) {
	const normalized = cidrs.filter(Boolean)

	return (ip: string): boolean => {
		for (const cidr of normalized) {
			if (ipInCidr(ip, cidr)) {
				return true
			}
		}
		return false
	}
}
