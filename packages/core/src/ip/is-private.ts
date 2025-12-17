import { ipInCidr } from './cidr'

const PRIVATE_CIDRS = [
	// IPv4
	'10.0.0.0/8',
	'172.16.0.0/12',
	'192.168.0.0/16',
	'127.0.0.0/8',

	// IPv6
	'::1/128',
	'fc00::/7',
	'fe80::/10',
]

export function isPrivateIp(ip: string): boolean {
	return PRIVATE_CIDRS.some((cidr) => ipInCidr(ip, cidr))
}
