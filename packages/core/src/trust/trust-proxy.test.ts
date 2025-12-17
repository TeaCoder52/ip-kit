import { describe, it, expect } from 'vitest'
import { createTrustProxy } from './trust-proxy'

describe('createTrustProxy', () => {
	it('mode=all trusts everything', () => {
		const proxy = createTrustProxy({ mode: 'all' })

		expect(proxy.fn('8.8.8.8')).toBe(true)
		expect(proxy.fn('127.0.0.1')).toBe(true)

		expect(proxy.test('8.8.8.8')).toEqual({
			trusted: true,
			reason: 'ALL_TRUSTED',
		})
	})

	it('mode=none trusts nothing', () => {
		const proxy = createTrustProxy({ mode: 'none' })

		expect(proxy.fn('8.8.8.8')).toBe(false)
		expect(proxy.fn('127.0.0.1')).toBe(false)

		expect(proxy.test('8.8.8.8')).toEqual({
			trusted: false,
			reason: 'NONE_TRUSTED',
		})
	})

	it('mode=fn delegates to custom function', () => {
		const proxy = createTrustProxy({
			mode: 'fn',
			name: 'LOOPBACK_ONLY',
			fn: (ip) => ip === '127.0.0.1',
		})

		expect(proxy.fn('127.0.0.1')).toBe(true)
		expect(proxy.fn('8.8.8.8')).toBe(false)

		expect(proxy.test('127.0.0.1')).toEqual({
			trusted: true,
			reason: 'LOOPBACK_ONLY',
		})

		expect(proxy.test('8.8.8.8')).toEqual({
			trusted: false,
			reason: 'LOOPBACK_ONLY',
		})
	})

	it('mode=fn without fn returns false', () => {
		const proxy = createTrustProxy({ mode: 'fn' })

		expect(proxy.fn('127.0.0.1')).toBe(false)
		expect(proxy.fn('8.8.8.8')).toBe(false)

		expect(proxy.test('127.0.0.1')).toEqual({
			trusted: false,
			reason: 'CUSTOM_FN',
		})
	})
})
