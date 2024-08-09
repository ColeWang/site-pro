import { testA } from './a/aaa.ts'
import { hasClass, preventDefault } from '@site-pro/utils'

interface Func {
    (): void
}

function test (func: Func) {
    console.log('123456')
    console.log(func)
    console.log(hasClass)
    console.log(preventDefault)
}

export { test, testA }
