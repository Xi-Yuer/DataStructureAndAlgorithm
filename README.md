# 数据结构与算法

## 栈

```typescript
    export default abstract class IStack<T> {
        abstract push(el: T): void;
        abstract pop(): T | undefined;
        abstract peck(): T | undefined;
        abstract isEmpty(): boolean
        abstract get size(): number;
    }
```

## 队列

```typescript
    export abstract class IQueue<T> {
        // 入队
        abstract enqueue(el: T): void;
        // 出队
        abstract dequeue(): T | undefined;
        // 获取队列第一个元素
        abstract peek(): T | undefined;
        // 是否为空
        abstract isEmpty(): boolean;
        // 大小
        abstract get size(): number;
    }
```

## 列表
```typescript
    // 创建一个节点类
    export class _Node<T> {
        value: T   // 当前节点的值
        next: _Node<T> | null = null // 当前节点的下一个节点的指针
        constructor(value: T) {
            this.value = value
        }
    }

    export class LinkList<T> {
        private head: _Node<T> | null = null // 头节点
        private size: number = 0

        // 获取链表的长度
        get length() {
            return this.size
        }

        // 向链表尾部添加元素
        append(el: T) {
            // 创建一个新节点
            const newNode = new _Node<T>(el)
            // 链表为空时
            if (!this.head) { // 头节点没有数据
                this.head = newNode
            } else {
                // 链表不为空时
                let current = this.head // 找到头节点
                while (current.next) {
                    current = current.next // 只要当前节点的 next 有值，就继续循环
                }
                // 跳出循环时，说明当前的 current 已指向最后一个节点
                current.next = newNode  // 将最后一个节点的 next 指向新节点
            }

            this.size++ // 链表长度累加
        }

        // 遍历链表的方法
        traverse() {
            const values: T[] = []
            let current = this.head
            while (current) {
                values.push(current.value)
                current = current.next
            }
            console.log(values.join('-'))
        }

        // 向链表任意位置添加元素
        insert(el: T, position: number) {
            // 边界判断
            if (position < 0 || position > this.size) return false // 插入越界直接返回 false
            // 根据 el 创建新的节点
            const newNode = new _Node<T>(el)
            // 当插入到头节点时
            if (position === 0) {
                let current = this.head
                this.head = newNode
                newNode.next = current
            } else {
                let current = this.head // 当前节点
                let currentPre: _Node<T> | null = null // 当前节点的上一个节点
                let index = 0
                while (index++ < position) {
                    currentPre = current // 插入节点的上一个节点
                    current = current!.next // 循环找到插入的节点
                }
                newNode.next = current
                currentPre!.next = newNode
            }
            this.size++
        }

        // 删除链表指定索引元素
        removeAt(position: number): T | null {
            // 被删除的元素
            let delValue: T | null = null
            // 越界判断
            if (position < 0 || position >= this.size) return null
            // 当删除第一个节点时
            if (position === 0) {
                this.head = this.head?.next ?? null
                delValue = this.head?.value ?? null
            } else {
                let current = this.head
                let currentPre: _Node<T> | null = null
                let index = 0
                while (index++ < position && current) {
                    currentPre = current
                    current = current.next
                }
                // 找到了需要的节点
                currentPre!.next = current?.next ?? null
                delValue = current?.value ?? null
            }

            this.size--
            return delValue
        }

        // 获取指定索引位置的元素
        get(position: number): T | null {

            let current = this.head
            let index = 0
            if (position < 0 || position >= this.size) return null

            while (index++ < position && current) {
                current = current.next
            }
            return current?.value ?? null
        }

        // 根据索引位置修改元素
        update(el: T, position: number): boolean {
            if (position < 0 || position >= this.size) return false
            let index = 0
            let current = this.head
            while (index++ < position) {
                current = current!.next
            }
            current!.value = el
            return true
        }

        // 根据元素值获取所在链表的索引值
        indexOf(value: T): number {
            let current = this.head
            let index = 0
            while (current) {
                if (current.value === value) {
                    return index
                }
                current = current.next
                index++
            }
            return -1
        }

        // 根据元素值删除链表元素
        remove(el: T): boolean {
            let current = this.head
            let currentPre: _Node<T> | null = null
            while (current) {
                if (current.value === el) {
                    if (currentPre) {
                        currentPre.next = current.next
                        return true
                    } else {
                        this.head = current?.next ?? null
                        return true
                    }
                }
                currentPre = current
                current = current.next
            }
            return false
        }

        // 判断链表是否为空
        isEmpty(): boolean {
            return this.size === 0
        }
    }

```

## 哈希

```typescript
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
```

## 树
``` typescript
    // 打印树结构
import { btPrint } from 'hy-algokit'

// 树节点
class TreeNode<T> {
    // 值
    value: T
    // 左子节点
    left: TreeNode<T> | null = null
    // 右子节点
    right: TreeNode<T> | null = null
    constructor(value: T) {
        this.value = value
    }
}


// 搜索二叉树(左子节点小于根节点，右子节点大于根节点)
class BSTree<T> {
    // 根节点
    root: TreeNode<T> | null = null

    // 打印树结构
    print() {
        btPrint(this.root)
    }

    /**
     * 插入新的节点
     * @param root 插入到哪里
     * @param newNode 新的节点
     */
    private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
        // 判断插入左子节点还是右子节点
        if (node.value > newNode.value) {
            // 插入到左子节点的空白位置
            // 当左子节点没有值时直接插入
            if (!node.left) {
                node.left = newNode
            } else {
                // 当左子节点有值时
                this.insertNode(node.left, newNode)
            }
        } else {
            // 插入到右子节点的空白位置
            // 当右子节点没有值时直接插入
            if (!node.right) {
                node.right = newNode
            } else {
                // 当右子节点有值时
                this.insertNode(node.right, newNode)
            }
        }
    }

    // 插入
    insert(value: T) {
        // 根据传入的值创建一个节点
        const newNode = new TreeNode<T>(value)
        // 判断当前是否有根节点
        if (!this.root) {
            // 没有根节点
            this.root = newNode
        } else {
            // 有节点
            this.insertNode(this.root, newNode)
        }
    }

    // 先序遍历(先访问根节点，再访问左子树，最后访问右子树)
    preOrderTraverse(cb?: (value: T) => void) {
        this.preOrderTraverseNode(this.root, cb)
    }
    /**
     * 传入一个节点，使用先序遍历访问每个节点
     * @param node 节点
     */
    private preOrderTraverseNode(node: TreeNode<T> | null, cb?: (value: T) => void) {
        // 判断 node 节点是否有值
        if (!node) return
        // 先访问根节点
        cb && cb(node.value)
        // 访问左子节点
        this.preOrderTraverseNode(node.left, cb)
        // 访问右子节点
        this.preOrderTraverseNode(node.right, cb)
    }

    // 中序遍历
    inOrderTraverse(cb?: (value: T) => void) {
        this.inOrderTraverseNode(this.root, cb)
    }
    private inOrderTraverseNode(node: TreeNode<T> | null, cb?: (value: T) => void) {
        if (!node) return
        // 先访问左子树
        this.inOrderTraverseNode(node.left, cb)
        // 再访问根节点
        cb && cb(node.value)
        // 最后访问右子节点
        this.inOrderTraverseNode(node.right, cb)
    }

    // 后续遍历
    postOrderTraverse(cb?: (value: T) => void) {
        this.postOrderTraverseNode(this.root, cb)
    }
    private postOrderTraverseNode(node: TreeNode<T> | null, cb?: (value: T) => void) {
        if (!node) return
        // 先遍历左子树
        this.postOrderTraverseNode(node.left, cb)
        // 在遍历右子树
        this.postOrderTraverseNode(node.right, cb)
        // 最后遍历根节点
        cb && cb(node.value)
    }

    // 层序遍历(利用队列遍历)
    levelOrderTraverse(cb?: (value: T) => void) {
        // 没有根节点
        if (!this.root) return
        // 创建一个队列结构(将根节点加入队列)
        const queue: TreeNode<T>[] = [this.root]
        // 遍历队列中的节点
        while (queue.length) {
            // 出队
            const current = queue.shift()!
            // 访问该节点
            cb && cb(current.value)
            // 左子树和右子树有值的情况下依次入队
            current.left && queue.push(current.left)
            current.right && queue.push(current.right)
        }
    }

    // 最大值
    getMax(): T | null {
        let current = this.root
        while (current?.right) {
            current = current.right
        }
        return current?.value ?? null
    }

    // 最小值
    getMin(): T | null {
        let current = this.root
        while (current?.left) {
            current = current.left
        }
        return current?.value ?? null
    }

    // 搜索
    search(value: T): boolean {
        let current = this.root
        if (!current) return false
        while (current) {
            // 判断当前节点是否是我们需要的节点
            if (current?.value === value) return true
            // 如果不是(比较当前的值比当前的 curretn 大还是小，从而决定去左子树还是右子树中去搜索)
            current.value > value ? (current = current.left) : (current = current.right)
        }

        return false
    }

    // 删除

}
```