import type { EffectScope } from 'vue'
import { getCurrentScope, onScopeDispose } from 'vue'

function tryOnScopeDispose (stop: () => void): EffectScope | undefined {
    const scope = getCurrentScope()
    scope && onScopeDispose(stop)
    return scope
}

export default tryOnScopeDispose
