
type sortAlgoFn = (arr: number[]) => number[]
// 测试排序算法
export function testSort(sortFn: sortAlgoFn) {
    // 随机一个数组
    const randomNums = Array.from({ length: 10 }, () => {
        return Math.floor(Math.random() * 200)
    })
    const newNums = sortFn(randomNums)
    console.log(isSort(newNums) ? '排序正确' : '排序错误')
    console.log(newNums.join('->'))
}

// 是否正确排序
function isSort(arr: number[]) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false
        }
    }
    return true
}