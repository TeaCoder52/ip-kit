export type TrustProxyFn = (ip: string) => boolean

export interface TrustProxyConfig {
	mode: 'none' | 'all' | 'fn'
	fn?: TrustProxyFn
}

export function createTrustProxy(config: TrustProxyConfig): TrustProxyFn {
	switch (config.mode) {
		case 'all':
			return () => true

		case 'none':
			return () => false

		case 'fn':
			return config.fn ?? (() => false)

		default:
			return () => false
	}
}
