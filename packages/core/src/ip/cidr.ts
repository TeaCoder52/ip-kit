import net from 'node:net'

export function ipInCidr(ip: string, cidr: string): boolean {
	const ipVersion = net.isIP(ip)
	if (!ipVersion) return false

	const [range, prefixStr] = cidr.split('/')
	const prefix = Number(prefixStr)

	if (!net.isIP(range!)) return false
	if (!Number.isInteger(prefix)) return false

	const ipBuf = ipToBuffer(ip)
	const rangeBuf = ipToBuffer(range!)

	const bits = ipVersion === 4 ? 32 : 128
	if (prefix < 0 || prefix > bits) return false

	return matchPrefix(ipBuf, rangeBuf, prefix)
}

function ipToBuffer(ip: string): Buffer {
	if (net.isIP(ip) === 4) {
		return Buffer.from(ip.split('.').map(Number))
	}

	const sections = expandIpv6(ip)
	const buf = Buffer.alloc(16)

	sections.forEach((section, i) => {
		buf.writeUInt16BE(section, i * 2)
	})

	return buf
}

function matchPrefix(a: Buffer, b: Buffer, bits: number): boolean {
	if (a.length !== b.length) return false

	const bytes = Math.floor(bits / 8)
	const remainder = bits % 8

	if (bytes > a.length) return false

	for (let i = 0; i < bytes; i++) {
		if (a[i] !== b[i]) return false
	}

	if (remainder === 0) return true

	const aByte = a[bytes]
	const bByte = b[bytes]

	if (aByte === undefined || bByte === undefined) return false

	const mask = 0xff << (8 - remainder)
	return (aByte & mask) === (bByte & mask)
}

function expandIpv6(ip: string): number[] {
	const parts = ip.split('::')

	const left = parts[0]?.split(':').filter(Boolean) ?? []
	const right = parts[1]?.split(':').filter(Boolean) ?? []

	const missing = 8 - (left.length + right.length)
	const middle = new Array(missing).fill('0')

	const full = [...left, ...middle, ...right]
	return full.map((part) => parseInt(part, 16))
}
