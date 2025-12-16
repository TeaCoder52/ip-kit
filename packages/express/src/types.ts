import type { ExtractResult } from '@ip-kit/core'

export interface IpKitRequestContext extends ExtractResult {}

declare global {
	namespace Express {
		interface Request {
			ipKit?: IpKitRequestContext
		}
	}
}
