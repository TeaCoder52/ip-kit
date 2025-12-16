import { describe, it, expect } from 'vitest'
import { createTrustProxy } from './trust-proxy'

describe('createTrustProxy', () => {
	it('mode=all trusts everything', () => {
		const trust = createTrustProxy({ mode: 'all' })

		expect(trust('8.8.8.8')).toBe(true)
		expect(trust('127.0.0.1')).toBe(true)
	})

	it('mode=none trusts nothing', () => {
		const trust = createTrustProxy({ mode: 'none' })

		expect(trust('8.8.8.8')).toBe(false)
		expect(trust('127.0.0.1')).toBe(false)
	})

	it('mode=fn delegates to function', () => {
		const trust = createTrustProxy({
			mode: 'fn',
			fn: (ip) => ip === '127.0.0.1',
		})

		expect(trust('127.0.0.1')).toBe(true)
		expect(trust('8.8.8.8')).toBe(false)
	})

	it('mode=fn without fn returns false', () => {
		const trust = createTrustProxy({ mode: 'fn' })

		expect(trust('127.0.0.1')).toBe(false)
	})
})
