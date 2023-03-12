
//  [2,3,4,1,5,,7,4,8,12]
function maxProfit(price: number[]): number {
    if (price.length <= 1) return 0 // 边界判断
    // 定义状态
    const dp: number[] = []
    // 初始化
    dp[0] = 0 // 第一天买入卖出的收益为零
    // 状态转移方程
    let minPrice = price[0]  // 前一个最小值
    for (let i = 0; i < price.length; i++) {
        // 今天卖出的收益为当天卖出的价格减去前面买入的最小价格
        dp[i] = price[i] - minPrice
        minPrice = Math.min(price[i], minPrice) // 保存最小值
    }

    return Math.max(...dp)
}

// 计算出每天卖出的收益，每天卖出的收益需要减去前某天最小买入的支出
// 收益 = 每天的卖出 - 最小买入
// console.log(maxProfit([2, 3, 4, 1, 5, 8, 7, 4, 8, 12]))


// 状态压缩
function maxProfit2(price: number[]): number {
    // 最大收益
    let preValue = 0
    // 最小买入
    let minPrice = price[0]
    for (let i = 0; i < price.length; i++) {
        // 计算当天卖出的最大收益
        preValue = Math.max(price[i] - minPrice, preValue)  // 今天是否卖出
        // 最小买入
        minPrice = Math.min(price[i], minPrice)             // 今天是否买入
    }
    return preValue
}

console.log(maxProfit2([7, 1, 5, 3, 6, 4]))