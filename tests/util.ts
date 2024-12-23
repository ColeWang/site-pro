export function resizeWindow (width: number, height: number): void {
    (window as any).innerWidth = width || window.innerWidth
    ;(window as any).innerHeight = height || window.innerHeight
    window.dispatchEvent(new Event('resize'))
}
