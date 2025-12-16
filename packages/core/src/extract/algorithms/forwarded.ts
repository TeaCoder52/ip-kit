import type { RequestLike } from '../../index'
import { isValidIp } from '../../ip/is-valid'
import { normalizeIp } from '../../ip/normalize'

export function fromForwarded(
	req: RequestLike
): { chain: string[]; source: 'forwarded' } | null {
	const value = req.headers['forwarded']
	if (!value) return null

	const header = Array.isArray(value) ? value.join(',') : value

	const matches = [...header.matchAll(/for="?([^;," ]+)/gi)]

	const chain = matches.map((m) => normalizeIp(m[1]!)).filter(isValidIp)

	return chain.length ? { chain, source: 'forwarded' } : null
}
