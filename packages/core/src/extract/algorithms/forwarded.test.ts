import { describe, it, expect } from 'vitest'
import { fromForwarded } from './forwarded'

const makeReq = (headers: Record<string, string>) => ({
	headers,
})

describe('fromForwarded', () => {
	it('extracts single IPv4', () => {
		const req = makeReq({
			forwarded: 'for=203.0.113.195',
		})

		const result = fromForwarded(req as any)

		expect(result).not.toBeNull()
		expect(result?.chain).toEqual(['203.0.113.195'])
		expect(result?.source).toBe('forwarded')
	})

	it('extracts multiple forwarded IPs', () => {
		const req = makeReq({
			forwarded: 'for=203.0.113.195, for=70.41.3.18',
		})

		const result = fromForwarded(req as any)

		expect(result?.chain).toEqual(['203.0.113.195', '70.41.3.18'])
	})

	it('handles quoted values', () => {
		const req = makeReq({
			forwarded: 'for="203.0.113.195"',
		})

		const result = fromForwarded(req as any)

		expect(result?.chain).toEqual(['203.0.113.195'])
	})

	it('returns null if no header', () => {
		const req = makeReq({})

		expect(fromForwarded(req as any)).toBeNull()
	})

	it('ignores invalid values', () => {
		const req = makeReq({
			forwarded: 'for=unknown',
		})

		const result = fromForwarded(req as any)

		expect(result).toBeNull()
	})
})
