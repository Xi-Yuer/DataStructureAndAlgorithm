import { measureSort } from "hy-algokit"
import { testSort } from "../00_utils/idnex"

function InsertionSort(arr: number[]): number[] {

    for (let i = 1; i < arr.length; i++) {
        const newNum = arr[i]
        let j = i - 1
        while (arr[j] > newNum && j >= 0) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = newNum
    }
    return arr
}

testSort(InsertionSort)
measureSort(InsertionSort)