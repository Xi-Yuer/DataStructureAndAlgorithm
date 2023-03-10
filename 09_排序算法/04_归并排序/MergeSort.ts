import { measureSort } from "hy-algokit"
import { testSort } from "../00_utils/idnex"

function MergeSort(arr: number[]): number[] {
    // debugger
    // 返回条件
    if (arr.length <= 1) return arr

    // 将数组拆分（分解成两个小数组）
    // 获取到数组中间位置
    const mid = Math.floor(arr.length / 2)
 
    // 获取到左边和右边的切割
    const leftArr = arr.slice(0, mid)
    const rightArr = arr.slice(mid)

    // 递归切割leftArr,rightArr
    const newLeftArr = MergeSort(leftArr)
    const newRightArr = MergeSort(rightArr)

    // 将两个子数组进行合并(双指针)
    let i = 0
    let j = 0
    const newArr = []

    while (i < newLeftArr.length && j < newRightArr.length) {
        if (newLeftArr[i] <= newRightArr[j]) {
            newArr.push(newLeftArr[i])
            i++
        } else {
            newArr.push(newRightArr[j])
            j++
        }
    }

    // 是否默认数组中还有剩余元素
    // 循环完左边还有剩余数据
    if (i < newLeftArr.length) {
        newArr.push(...newLeftArr.slice(i))
    }
    // 循环完右边还有剩余数据
    if (j < newRightArr.length) {
        newArr.push(...newRightArr.slice(j))
    }
    return newArr
}

testSort(MergeSort)
measureSort(MergeSort) // 使用 MergeSort 算法 排序 100000 个元素 消耗时间为 55.43 毫秒.