import { getCurrentScope, onScopeDispose } from 'vue'

function tryOnScopeDispose (stop: () => void) {
    const scope = getCurrentScope()
    scope && onScopeDispose(stop)
    return scope
}

export default tryOnScopeDispose
