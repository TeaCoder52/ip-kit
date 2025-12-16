import { describe, it, expect } from 'vitest'
import { trustPresets } from './presets'
import { createTrustProxy } from './trust-proxy'

describe('trustPresets', () => {
	it('loopback trusts localhost', () => {
		const trust = createTrustProxy(trustPresets.loopback)

		expect(trust('127.0.0.1')).toBe(true)
		expect(trust('::1')).toBe(true)
		expect(trust('8.8.8.8')).toBe(false)
	})

	it('private trusts private networks', () => {
		const trust = createTrustProxy(trustPresets.private)

		expect(trust('10.0.0.1')).toBe(true)
		expect(trust('192.168.1.1')).toBe(true)
		expect(trust('8.8.8.8')).toBe(false)
	})

	it('cloudflare trusts CF IPs', () => {
		const trust = createTrustProxy(trustPresets.cloudflare)

		expect(trust('173.245.48.10')).toBe(true)
		expect(trust('8.8.8.8')).toBe(false)
	})
})
