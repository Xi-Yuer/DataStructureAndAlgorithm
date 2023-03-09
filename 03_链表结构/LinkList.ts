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


const linklist = new LinkList<string>()
linklist.append('1')
linklist.append('2')
linklist.append('3')
linklist.insert('4', 0)
linklist.traverse()
linklist.insert('5', 2)
linklist.traverse()
console.log(linklist.removeAt(2))
linklist.traverse()
console.log(linklist.get(1))
linklist.traverse()
linklist.update('aa', 4)
linklist.traverse()
console.log(linklist.indexOf('2'))
linklist.remove('2')
linklist.traverse()
console.log(linklist.isEmpty())