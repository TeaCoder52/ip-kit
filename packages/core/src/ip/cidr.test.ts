import { describe, it, expect } from 'vitest'
import { parseCidr, ipInCidr } from './cidr'

describe('CIDR matching', () => {
	describe('IPv4', () => {
		it('matches IP inside CIDR', () => {
			const cidr = parseCidr('192.168.1.0/24')
			expect(cidr).not.toBeNull()

			expect(ipInCidr('192.168.1.10', cidr!)).toBe(true)
		})

		it('does not match IP outside CIDR', () => {
			const cidr = parseCidr('192.168.1.0/24')
			expect(cidr).not.toBeNull()

			expect(ipInCidr('192.168.2.10', cidr!)).toBe(false)
		})

		it('matches /32 correctly', () => {
			const cidr = parseCidr('8.8.8.8/32')
			expect(cidr).not.toBeNull()

			expect(ipInCidr('8.8.8.8', cidr!)).toBe(true)
			expect(ipInCidr('8.8.8.9', cidr!)).toBe(false)
		})
	})

	describe('IPv6', () => {
		it('matches IPv6 inside CIDR', () => {
			const cidr = parseCidr('2001:db8::/32')
			expect(cidr).not.toBeNull()

			expect(ipInCidr('2001:db8::1', cidr!)).toBe(true)
		})

		it('does not match IPv6 outside CIDR', () => {
			const cidr = parseCidr('2001:db8::/32')
			expect(cidr).not.toBeNull()

			expect(ipInCidr('2001:dead::1', cidr!)).toBe(false)
		})

		it('matches /128 correctly', () => {
			const cidr = parseCidr('::1/128')
			expect(cidr).not.toBeNull()

			expect(ipInCidr('::1', cidr!)).toBe(true)
			expect(ipInCidr('::2', cidr!)).toBe(false)
		})
	})

	describe('invalid input', () => {
		it('returns null for invalid CIDR string', () => {
			expect(parseCidr('invalid')).toBeNull()
			expect(parseCidr('192.168.0.0')).toBeNull()
			expect(parseCidr('192.168.0.0/99')).toBeNull()
		})

		it('returns false for invalid IP', () => {
			const cidr = parseCidr('192.168.0.0/16')
			expect(cidr).not.toBeNull()

			expect(ipInCidr('unknown', cidr!)).toBe(false)
		})

		it('returns false for mismatched IP version', () => {
			const ipv4 = parseCidr('192.168.0.0/16')
			const ipv6 = parseCidr('2001:db8::/32')

			expect(ipv4).not.toBeNull()
			expect(ipv6).not.toBeNull()

			expect(ipInCidr('::1', ipv4!)).toBe(false)
			expect(ipInCidr('192.168.0.1', ipv6!)).toBe(false)
		})
	})
})
