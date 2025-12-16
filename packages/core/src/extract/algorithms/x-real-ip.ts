import type { RequestLike } from '../../index'

export function fromXRealIp(
	req: RequestLike
): { chain: string[]; source: 'x-real-ip' } | null {
	const value = req.headers['x-real-ip']
	if (!value) return null

	const ip = Array.isArray(value) ? value[0] : value

	return ip ? { chain: [ip.trim()], source: 'x-real-ip' } : null
}
