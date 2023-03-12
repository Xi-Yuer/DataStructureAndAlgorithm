function Jump(n: number): number {
    const dp: number[] = [] // 定义状态
    // 初始化状态
    dp[0] = 1
    dp[1] = 1
    // 状态转移
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }

    return dp[n]
}

console.log(Jump(3))
console.log(Jump(4))

// 状态压缩
function Jump2(n: number): number {
    // 初始化（状态压缩）
    let pre = 1
    let cur = 1
    for (let i = 2; i <= n; i++) {
        // 状态转移
        const newValue = pre + cur
        pre = cur
        cur = newValue
    }
    return cur
}
console.log(Jump2(10))