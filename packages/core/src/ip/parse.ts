import { isValidIp } from './is-valid'
import { normalizeIp } from './normalize'

export interface ParsedIp {
	version: 4 | 6
	bytes: Uint8Array
	string: string
}

export function parseIp(ip: string): ParsedIp | null {
	const normalized = normalizeIp(ip)

	if (!normalized || !isValidIp(normalized)) {
		return null
	}

	if (normalized.includes('.')) {
		const parts = normalized.split('.')
		if (parts.length !== 4) return null

		const bytes = new Uint8Array(4)
		for (let i = 0; i < 4; i++) {
			const n = Number(parts[i])
			if (n < 0 || n > 255 || Number.isNaN(n)) return null
			bytes[i] = n
		}

		return {
			version: 4,
			bytes,
			string: normalized,
		}
	}

	if (normalized.includes(':')) {
		try {
			const buf = new Uint8Array(16)
			const view = new DataView(buf.buffer)

			const segments = normalized.split(':')
			const full = normalized.includes('::')
				? expandIpv6(segments)
				: segments

			if (full.length !== 8) return null

			full.forEach((seg, i) => {
				const value = parseInt(seg || '0', 16)
				view.setUint16(i * 2, value)
			})

			return {
				version: 6,
				bytes: buf,
				string: normalized,
			}
		} catch {
			return null
		}
	}

	return null
}

function expandIpv6(parts: string[]): string[] {
	const index = parts.indexOf('')
	if (index === -1) return parts

	const missing = 8 - (parts.length - 1)
	return [
		...parts.slice(0, index),
		...Array(missing).fill('0'),
		...parts.slice(index + 1),
	]
}
