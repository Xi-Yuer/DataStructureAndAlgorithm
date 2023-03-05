
// 顺序查找
function sequentSearch(array: number[], num: number) {
    console.time()
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element === num) {
            return index
        }
    }
    console.timeEnd()
    return -1
}

console.log(sequentSearch([1, 3, 5, 10, 100, 222, 333], 222))


// 二分查找
function binarySearch(array: number[], num: number) {
    // 左边的索引
    let left = 0
    // 右边的索引
    let right = array.length - 1

    while (left <= right) {
        // 中间的数
        let mid = Math.floor((left + right) / 2)
        const midNum = array[mid]
        if (midNum === num) {
            return mid
        } else if (midNum < num) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
}

console.log(binarySearch([1, 3, 5, 10, 100, 222], 222))