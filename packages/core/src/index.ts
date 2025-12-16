export * from './extract/extractor'
export * from './trust/trust-proxy'
export * from './trust/presets'
export * from './result/result'
export * from './ip/types'

export interface RequestLike {
	headers: Record<string, string | string[] | undefined>
	remoteAddress?: string | null
}
