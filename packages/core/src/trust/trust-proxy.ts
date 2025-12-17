export type TrustProxyDecision = {
	trusted: boolean
	reason?: string
}

export type TrustProxyFn = (ip: string) => boolean

export interface TrustProxy {
	test(ip: string): TrustProxyDecision
	fn: TrustProxyFn
}

export interface TrustProxyConfig {
	mode: 'none' | 'all' | 'fn'
	fn?: TrustProxyFn
	name?: string
}

export function createTrustProxy(config: TrustProxyConfig): TrustProxy {
	switch (config.mode) {
		case 'all':
			return {
				fn: () => true,
				test: () => ({ trusted: true, reason: 'ALL_TRUSTED' }),
			}

		case 'none':
			return {
				fn: () => false,
				test: () => ({ trusted: false, reason: 'NONE_TRUSTED' }),
			}

		case 'fn':
			return {
				fn: config.fn ?? (() => false),
				test: (ip) => ({
					trusted: !!config.fn?.(ip),
					reason: config.name ?? 'CUSTOM_FN',
				}),
			}
	}
}
