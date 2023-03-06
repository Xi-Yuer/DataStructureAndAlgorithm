
// 当传入一个字符串时，可以映射出一个索引值
/**
 * 
 * @param key 传入的key值
 * @param max 数组的长度
 * @returns 索引值
 */
export function HashFunc(key: string, max: number): number {
    // 计算hashCode  ==> cat => 20337(27为底时)
    let hashCode = 0
    let length = key.length
    for (let i = 0; i < length; i++) {
        // 霍纳法则计算hashCode
        hashCode = 31 * hashCode + key.charCodeAt(i)
    }
    // 求出索引值
    const index = hashCode % max
    return index
}

console.log(HashFunc('abc', 7))
console.log(HashFunc('cba', 7))
console.log(HashFunc('bac', 7))
console.log(HashFunc('cab', 7))
console.log(HashFunc('abb', 7))