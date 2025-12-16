import net from 'node:net'

export function isValidIp(value: string): boolean {
	return net.isIP(value) !== 0
}
