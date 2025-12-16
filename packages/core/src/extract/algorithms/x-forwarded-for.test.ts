import { describe, it, expect } from 'vitest'
import { fromXForwardedFor } from './x-forwarded-for'

describe('fromXForwardedFor', () => {
	it('splits comma-separated IPs', () => {
		const req = {
			headers: {
				'x-forwarded-for': '1.1.1.1, 2.2.2.2',
			},
		}

		const result = fromXForwardedFor(req as any)

		expect(result?.chain).toEqual(['1.1.1.1', '2.2.2.2'])
	})

	it('returns null for empty header', () => {
		const req = {
			headers: {
				'x-forwarded-for': '',
			},
		}

		expect(fromXForwardedFor(req as any)).toBeNull()
	})
})
