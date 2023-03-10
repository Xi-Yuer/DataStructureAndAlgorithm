import { measureSort, swap } from "hy-algokit"
import { testSort } from "../00_utils/idnex"

function QuickSort(arr: number[]): number[] {

    // 第一次将整个数组划分一个区域
    Partition(0, arr.length - 1)

    // 定义一个函数用来划分区域
    function Partition(left: number, right: number) {
        // 结束调节
        if (left >= right) return
        // 找到基准元素
        const pivot = arr[right]
        // 双指针进行交换操作(使得基准数左边大于基准数，右边小于基准数)
        let i = left
        let j = right - 1
        while (i <= j) {
            while (arr[i] < pivot) {
                // 此目的是为了从左往右找到比基准数大的数
                i++
            }
            // 来到这里表明找到了大于基准数的数
            while (arr[j] > pivot) {
                // 此目的是为了从右往左找到比基准数小的数
                j--
            }
            // 来到这里表明找到了比基准数（pivot）小于的数和比基准数大于的数

            // 交换他们的位置
            if (i <= j) {
                swap(arr, i, j)
                i++
                j--
            }
        }
        // 将基准数放到正确的位置(中间)
        swap(arr, i, right)
        // 左右继续划分区域
        Partition(left, j)
        Partition(i + 1, right)
    }
    return arr
}

testSort(QuickSort)
measureSort(QuickSort)