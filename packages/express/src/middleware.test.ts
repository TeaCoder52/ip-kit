import { describe, it, expect } from 'vitest'
import { ipKitExpress } from './middleware'

describe('ipKitExpress', () => {
	it('returns a middleware function', () => {
		const mw = ipKitExpress()
		expect(typeof mw).toBe('function')
	})
})
