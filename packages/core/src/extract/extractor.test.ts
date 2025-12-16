import { describe, it, expect } from 'vitest'
import { extractIp } from './extractor'

describe('extractIp', () => {
	it('prefers forwarded over x-forwarded-for', () => {
		const req = {
			headers: {
				forwarded: 'for=1.1.1.1',
				'x-forwarded-for': '2.2.2.2',
			},
		}

		const result = extractIp(req as any)

		expect(result.ip).toBe('1.1.1.1')
		expect(result.source).toBe('forwarded')
	})

	it('falls back to remoteAddress', () => {
		const req = {
			headers: {},
			remoteAddress: '127.0.0.1',
		}

		const result = extractIp(req as any)

		expect(result.ip).toBe('127.0.0.1')
		expect(result.source).toBe('remote-address')
	})
})
