function maxArray(arr: number[]): number {
    // 初始化状态
    const dp: number[] = []
    dp[0] = arr[0]

    // 状态转移方程
    for (let i = 1; i < arr.length; i++) {
        // 第 n 项的连续数组和最大值要么是自己本省，要么是前面的最大数组和加上自己
        dp[i] = Math.max(arr[i], arr[i] + dp[i - 1])
    }
    console.log(dp)
    return Math.max(...dp)
}
console.log(maxArray([-2, 1, -3, 4, -1, 2, 1, -5 - 4]))