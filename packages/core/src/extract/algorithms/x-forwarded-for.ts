import type { RequestLike } from '../../index'

export function fromXForwardedFor(
	req: RequestLike
): { chain: string[]; source: 'x-forwarded-for' } | null {
	const value = req.headers['x-forwarded-for']
	if (!value) return null

	const header = Array.isArray(value) ? value.join(',') : value
	const chain = header
		.split(',')
		.map((ip) => ip.trim())
		.filter(Boolean)

	return chain.length ? { chain, source: 'x-forwarded-for' } : null
}
