function fib(n: number): number {

    // 保留斐波那契数列中每个位置的值(状态)
    const memo: number[] = []
    // 第 n 位置的值是等于 (n-1) + (n -2) = n
    for (let i = 0; i <= n; i++) {
        // 0 1 1 ==> 0 和 1 对应的位置的值是他们本身
        if (i <= 1) {
            // 设置初始化状态
            memo[i] = i
            continue
        }
        // 自底向上的求解过程
        memo[i] = memo[i - 1] + memo[i - 2]

    }
    return memo[n]
}
console.log(fib(10))



// 动态规划-状态压缩
function fib2(n: number): number {
    if (n <= 1) return n // 边界判断
    let pre = 0
    let cur = 1
    // 第 n 位置的值是等于 (n-1) + (n -2) = n
    for (let i = 2; i <= n; i++) {
        const newValue = pre + cur
        pre = cur
        cur = newValue
    }
    return cur
}
console.log(fib2(10))