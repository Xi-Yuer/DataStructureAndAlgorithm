export function isPrime(num: number): boolean {
    const origin = num
    while (--num > 1) {
        if (origin % num === 0) {
            return false
        }
    }
    return true
}