import { describe, it, expect } from 'vitest'
import { ipKit } from './middleware'

describe('ipKit', () => {
	it('returns a middleware function', () => {
		const mw = ipKit()
		expect(typeof mw).toBe('function')
	})
})
