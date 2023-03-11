import { testSort } from "../00_utils/idnex"

function ShellSort(arr: number[]): number[] {
    // 选择不同的增量(间隔/步长)
    let gap = Math.floor(arr.length / 2)
    while (gap > 0) {
        // 获取不同的 gap ,使用不同的 gap 进行插入排序
        for (let i = gap; i < arr.length; i++) {
            let j = i
            const num = arr[i]

            // while 循环使用 number 向前找到一个比 number 小的值
            while (j > gap - 1 && num < arr[j - gap]) {
                arr[j] = arr[j - gap]
                j = j - gap
            }
            arr[j] = num
        }
        gap = Math.floor(gap / 2)
    }
    return arr
}
testSort(ShellSort)