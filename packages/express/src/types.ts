import type { ClientIpResult } from '@ip-kit/core'

export interface IpKitRequestContext extends ClientIpResult {}

declare global {
	namespace Express {
		interface Request {
			ipKit?: IpKitRequestContext
		}
	}
}
