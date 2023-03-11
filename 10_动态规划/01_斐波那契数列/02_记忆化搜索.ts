const memo: number[] = []
function fibonacci(n: number, memo: number[] = []): number {
    if (n <= 1) return n
    // 求 n 值
    if (memo[n]) {
        // 当该值求过了直接返回该值
        return memo[n]
    }
    // 没有从 memo 中获取到值(说明该值没有求过)
    const res = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    // 保存求过的值
    memo[n] = res
    return res
}

console.log(fibonacci(10)) // 55

export { }