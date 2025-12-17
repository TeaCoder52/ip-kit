import { describe, it, expect } from 'vitest'
import { trustPresets } from './presets'
import { createTrustProxy } from './trust-proxy'

describe('trustPresets', () => {
	it('loopback trusts localhost', () => {
		const proxy = createTrustProxy(trustPresets.loopback)

		expect(proxy.fn('127.0.0.1')).toBe(true)
		expect(proxy.fn('::1')).toBe(true)
		expect(proxy.fn('8.8.8.8')).toBe(false)

		expect(proxy.test('127.0.0.1')).toEqual({
			trusted: true,
			reason: 'LOOPBACK',
		})
	})

	it('private trusts private networks', () => {
		const proxy = createTrustProxy(trustPresets.private)

		expect(proxy.fn('10.0.0.1')).toBe(true)
		expect(proxy.fn('192.168.1.1')).toBe(true)
		expect(proxy.fn('8.8.8.8')).toBe(false)
	})

	it('cloudflare trusts Cloudflare IPs', () => {
		const proxy = createTrustProxy(trustPresets.cloudflare)

		expect(proxy.fn('173.245.48.10')).toBe(true)
		expect(proxy.fn('8.8.8.8')).toBe(false)
	})
})
