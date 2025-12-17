import { isValidIp } from './is-valid'
import { parseIp } from './parse'

export interface ParsedCidr {
	network: Uint8Array
	mask: number
	version: 4 | 6
}

export function parseCidr(cidr: string): ParsedCidr | null {
	const [ip, maskStr] = cidr.split('/')
	if (!ip || !maskStr) return null

	const mask = Number(maskStr)
	if (Number.isNaN(mask)) return null

	const parsed = parseIp(ip)
	if (!parsed) return null

	const maxMask = parsed.version === 4 ? 32 : 128
	if (mask < 0 || mask > maxMask) return null

	return {
		network: parsed.bytes,
		mask,
		version: parsed.version,
	}
}

export function ipInCidr(ip: string, cidr: ParsedCidr): boolean {
	if (!isValidIp(ip)) return false

	const parsedIp = parseIp(ip)
	if (!parsedIp || parsedIp.version !== cidr.version) return false

	const bytesToCheck = Math.floor(cidr.mask / 8)
	const remainderBits = cidr.mask % 8

	for (let i = 0; i < bytesToCheck; i++) {
		if (parsedIp.bytes[i] !== cidr.network[i]) {
			return false
		}
	}

	if (remainderBits === 0) return true

	const mask = 0xff << (8 - remainderBits)
	return (
		(parsedIp.bytes[bytesToCheck]! & mask) ===
		(cidr.network[bytesToCheck]! & mask)
	)
}
