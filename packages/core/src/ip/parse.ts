import { isValidIp } from './is-valid'
import { normalizeIp } from './normalize'

export function parseIp(ip: string): string | null {
	const normalized = normalizeIp(ip)

	return isValidIp(normalized) ? normalized : null
}
