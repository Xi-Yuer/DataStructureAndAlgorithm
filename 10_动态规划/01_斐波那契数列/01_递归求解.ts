
// 求第 n 个 斐波那契数
function fibonacci(n: number): number {
    // 0 1 1 2 3 5 8 13 21 34 55...
    if (n <= 1) return n
    return fibonacci(n - 1) + fibonacci(n - 2)
}
console.log(fibonacci(10))

export { }