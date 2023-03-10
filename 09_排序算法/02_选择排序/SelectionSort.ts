import { swap, testSort as hytest } from "hy-algokit"
import { testSort } from "../00_utils/idnex"


function SelectionSort(arr: number[]): number[] {
    for (let i = 0; i < arr.length - 1; i++) {
        // 记录最小值的索引，默认为零
        let minIndex = i
        for (let j = 1 + i; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        swap(arr, i, minIndex)
    }
    return arr
}

testSort(SelectionSort)

