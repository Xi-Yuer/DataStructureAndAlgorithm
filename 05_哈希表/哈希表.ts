import { isPrime } from "hy-algokit"

class HashTable<T = any> {
    // 创建一个数组用于存放链地址法中的链
    private storage: [string, T][][] = []
    // 定义数组容量的长度（该容量最好是一个质数）
    private length: number = 7
    // 记录已经存放元素的个数
    private count: number = 0

    // 保证每次扩容/缩容的容量是一个质数
    private resizeLength(num: number): number {
        if (num < 7) return 7
        const origin = Math.floor(num)
        if (!isPrime(origin)) {
            return this.resizeLength(origin + 1)
        } else {
            return origin
        }
    }

    // hash 函数
    private hashFunc(key: string, max: number) {
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

    // 扩容|缩容
    private resize(newLength: number) {
        // 设置新的长度
        this.length = newLength
        // 获取原来的数据并且将他们再次 hash 化处理，放入到新的容量数组中，目的是为了扩容/缩容之后不影响之后对数据的操作
        const oldStorage = this.storage // 原来的数组
        this.storage = []
        this.count = 0
        // 获取到原来的数据，放入到新的数组中
        oldStorage.forEach(bucket => {
            // 获取到每个桶
            if (!bucket) return
            for (let i = 0; i < bucket.length; i++) {
                // 将桶中的所有数据重新放入到新的桶中
                this.put(bucket[i][0], bucket[i][1])
            }
        })
    }


    // 插入&修改元素方法
    put(key: string, value: T) {
        // 根据 key 获取一个索引值
        const index = this.hashFunc(key, this.length)
        // 取出对应索引的数组（桶）// 判断桶是否有值
        const bucket: [string, T][] = this.storage[index] ?? []
        // 初始化一个空数组
        this.storage[index] = bucket
        let isUpdate = false
        // 判断数组是否已经存在 key
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                // 已存在(覆盖)
                bucket[i][1] = value
                isUpdate = true
            }
        }
        // 不存在（添加新的数据）
        if (!isUpdate) {
            bucket.push([key, value])
            // 元素个数++
            this.count++
            // 判断装填因子（储存数量/容量）是否大于 0.75 ,大于则需要进行扩容
            const loadFactor = this.count / this.length
            if (loadFactor > 0.75) {
                // 扩容：扩大原来的两倍
                this.resize(this.resizeLength(this.length * 2))
            }
        }

    }

    // 根据 key 获取值
    get(key: string): T | undefined {
        // 根据 key 获取索引值
        const index = this.hashFunc(key, this.length)
        // 找到索引值所对应的桶
        const bucket = this.storage[index] ?? []
        // 遍历桶并查找数组中对应的 key 的值
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1]
            }
        }
        // 没有找到返回 undefined
        return undefined
    }

    // 根据 key 删除
    delete(key: string): T | undefined {
        // 获取索引值的位置
        const index = this.hashFunc(key, this.length)
        // 获取桶
        const bucket = this.storage[index] ?? []
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                const value = bucket[i][1]
                // 找到了对应的数据并删除
                bucket[i].splice(i, 1)
                this.count--
                // 如果装填因子小于 0.25,并且填装元素大于 7  时，需要进行缩容，以节省内存空间
                const loadFactor = this.count / this.length
                if (loadFactor < 0.25 && this.length > 7) {
                    // 缩容
                    this.resize(Math.floor(this.resizeLength(this.length / 2)))
                }
                // 将删除的值返回
                return value
            }
        }
        return undefined
    }
}

const hahtable = new HashTable<number>()
// hahtable.put('aa', 100)
// hahtable.put('aa', 200)
// hahtable.put('bb', 300)
// console.log(hahtable.get('bb'))
// console.log(hahtable.get('cc'))
// console.log(hahtable.delete('aa'))
// console.log(hahtable.delete('ff'))


// test 扩容
hahtable.put('aa', 100)
hahtable.put('bb', 300)
hahtable.put('cc', 200)
hahtable.put('dd', 100)
hahtable.put('ee', 100)
hahtable.put('ff', 100)
hahtable.delete('aa')
hahtable.delete('bb')