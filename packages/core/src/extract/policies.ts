export type ExtractionStrategy = 'left-most' | 'right-most'

export interface ExtractionPolicy {
	strategy: ExtractionStrategy
	allowPrivate: boolean
	allowLoopback: boolean
}
