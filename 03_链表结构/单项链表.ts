// 创建一个节点类
export class _Node<T> {
    value: T   // 当前节点的值
    next: _Node<T> | null = null // 当前节点的下一个节点的指针
    constructor(value: T) {
        this.value = value
    }
}

export class LinkList<T> {
    protected head: _Node<T> | null = null // 头节点
    protected size: number = 0
    // 链表的尾部
    protected tail: _Node<T> | null = null

    // 获取链表的长度
    get length() {
        return this.size
    }

    // 判断当前节点是否是最后一个节点
    private isTail(node: _Node<T>) {
        return node === this.tail
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
            // let current = this.head // 找到头节点
            // while (current.next) {
            //     current = current.next // 只要当前节点的 next 有值，就继续循环
            // }
            // // 跳出循环时，说明当前的 current 已指向最后一个节点
            // current.next = newNode  // 将最后一个节点的 next 指向新节点
            this.tail!.next = newNode
        }
        this.tail = newNode
        this.size++ // 链表长度累加
    }

    // 遍历链表的方法
    traverse() {
        const values: T[] = []
        let current = this.head
        while (current) {
            values.push(current.value)
            if (this.isTail(current)) {// 最后一个节点
                current = null
            } else {
                current = current.next// 不是最后一个节点
            }
        }
        // 当是循环列表时
        if (this.head && this.tail?.next === this.head) {
            values.push(this.head.value)
        }
        console.log(values.join('-'))
    }

    // 向链表任意位置添加元素
    insert(el: T, position: number): boolean {
        // 边界判断
        if (position < 0 || position > this.size) return false // 插入越界直接返回 false
        // 根据 el 创建新的节点
        const newNode = new _Node<T>(el)
        // 当插入到头节点时
        if (position === 0) {
            let current = this.head
            this.head = newNode
            newNode.next = current
            return true
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

            // 当插入的元素刚好是查到尾部，就需要修改 tail
            if (position === this.length) {
                this.tail = newNode
            }
        }
        this.size++
        return true
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
            // 当删除时链表只有一个节点，需要改变 tail 的指向
            if (this.length === 1) {
                this.tail = null
            }
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

            // 删除的节点刚好是最后一个
            if (position === this.length - 1) {
                this.tail = currentPre
            }
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
            if (this.isTail(current)) { // 当当前节点是最后一个节点时终止循环
                current = null
            } else {
                current = current.next
            }
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