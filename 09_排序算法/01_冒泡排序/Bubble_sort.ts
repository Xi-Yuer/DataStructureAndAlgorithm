import { swap, measureSort } from "hy-algokit"
import { testSort } from "../00_utils/idnex"

function MyBubbleSort(arr: number[]): number[] {
    let swapped = false
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                // [arr[i], arr[j]] = [arr[j], arr[i]]
                swap(arr, i, j)
                swapped = true
            }
        }
        if (!swapped) break
    }
    return arr
}

function BubbleSort(arr: number[]): number[] {
    let swapped = false
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1)
                swapped = true
            }
        }
        if (!swapped) break
    }
    return arr
}

measureSort(MyBubbleSort,10000) // 使用 MyBubbleSort 算法 排序 10000 个元素 消耗时间为 232.23 毫秒.
measureSort(BubbleSort,10000)   // 使用 BubbleSort 算法 排序 10000 个元素 消耗时间为 285.78 毫秒.