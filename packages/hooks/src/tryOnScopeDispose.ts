import type { EffectScope } from 'vue'
import { getCurrentScope, onScopeDispose } from 'vue'

interface ScopeDispose {
    (): void;
}

function tryOnScopeDispose (stop: ScopeDispose): EffectScope | undefined {
    const scope = getCurrentScope()
    scope && onScopeDispose(stop)
    return scope
}

export default tryOnScopeDispose
