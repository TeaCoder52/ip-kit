import type { RequestLike } from '../../index'

export function fromCloudflare(
	req: RequestLike
): { chain: string[]; source: 'cf-connecting-ip' } | null {
	const value = req.headers['cf-connecting-ip']
	if (!value) return null

	const ip = Array.isArray(value) ? value[0] : value

	return ip ? { chain: [ip.trim()], source: 'cf-connecting-ip' } : null
}
