import { isBrowserClient } from './dom'

let uuid: number = 0

export function getUUID (): number | string {
    let result: number | string = uuid

    if (isBrowserClient) {
        uuid += 1
    } else {
        result = 'TEST_OR_SSR'
    }
    return result
}
