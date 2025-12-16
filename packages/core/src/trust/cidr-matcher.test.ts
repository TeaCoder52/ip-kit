import { describe, it, expect } from 'vitest'
import { createCidrMatcher } from './cidr-matcher'

describe('createCidrMatcher', () => {
	const match = createCidrMatcher(['10.0.0.0/8', '192.168.0.0/16'])

	it('matches IP inside CIDR list', () => {
		expect(match('10.1.2.3')).toBe(true)
		expect(match('192.168.1.1')).toBe(true)
	})

	it('does not match IP outside CIDR list', () => {
		expect(match('8.8.8.8')).toBe(false)
	})

	it('returns false for invalid IP', () => {
		expect(match('unknown')).toBe(false)
	})
})
