import { describe, it, expect } from 'vitest'
import { ipInCidr } from './cidr'

describe('ipInCidr', () => {
	describe('IPv4', () => {
		it('matches IP inside CIDR', () => {
			expect(ipInCidr('192.168.1.10', '192.168.1.0/24')).toBe(true)
		})

		it('does not match IP outside CIDR', () => {
			expect(ipInCidr('192.168.2.10', '192.168.1.0/24')).toBe(false)
		})

		it('matches /32 correctly', () => {
			expect(ipInCidr('8.8.8.8', '8.8.8.8/32')).toBe(true)
			expect(ipInCidr('8.8.8.9', '8.8.8.8/32')).toBe(false)
		})
	})

	describe('IPv6', () => {
		it('matches IPv6 inside CIDR', () => {
			expect(ipInCidr('2001:db8::1', '2001:db8::/32')).toBe(true)
		})

		it('does not match IPv6 outside CIDR', () => {
			expect(ipInCidr('2001:dead::1', '2001:db8::/32')).toBe(false)
		})

		it('matches /128 correctly', () => {
			expect(ipInCidr('::1', '::1/128')).toBe(true)
		})
	})

	describe('invalid input', () => {
		it('returns false for invalid IP', () => {
			expect(ipInCidr('unknown', '192.168.0.0/16')).toBe(false)
		})

		it('returns false for invalid CIDR', () => {
			expect(ipInCidr('192.168.1.1', 'invalid')).toBe(false)
		})

		it('returns false for invalid prefix', () => {
			expect(ipInCidr('192.168.1.1', '192.168.0.0/99')).toBe(false)
		})
	})
})
