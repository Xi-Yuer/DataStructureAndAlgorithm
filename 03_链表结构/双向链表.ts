import { LinkList, _Node } from "./单项链表"

class _DoubleNode<T> {
    // 当前节点的值
    value: T
    // 当前节点的前一个节点的指针
    pre: _DoubleNode<T> | null = null
    // 当前节点的后一个节点的指针
    next: _DoubleNode<T> | null = null
    constructor(value: T) {
        this.value = value
    }
}

// 双向链表
class DoubleLinkedList<T> extends LinkList<T> {
    protected head: _DoubleNode<T> | null = null
    protected tail: _DoubleNode<T> | null = null

    // 向双向链表尾部添加元素
    append(el: T): void {
        // 创建一个新的节点
        const newNode = new _DoubleNode<T>(el)
        // 当链表中暂无元素时
        if (!this.head) {
            // 头部和尾部都是当前节点
            this.head = newNode
            this.tail = newNode
        } else {
            // 当头部不为空时(向链表尾部添加节点)
            this.tail!.next = newNode  // 将新的节点添加到尾部(也就是tail.next对应的节点)
            newNode.pre = this.tail    // 将新添加的节点的 pre 指向刚才尾部节点的
            this.tail = newNode        // 将 tail 指向新添加的节点
        }
        this.size++  // 链表长度加一
    }

    // 向双向链表的头部添加新的节点
    prepend(el: T) {
        // 创建一个节点
        const newNode = new _DoubleNode<T>(el)
        // 当链表没有任何节点时
        if (!this.head) {
            this.head = newNode
            this.tail = newNode
        } else {
            // 当头部不为空时
            this.head.pre = newNode
            newNode.next = this.head
            this.head = newNode
        }
        // 链表长度加一
        this.size++
    }

    // 反向遍历双向链表
    postTraverse() {
        let current = this.tail
        const values: T[] = []
        while (current) {
            values.push(current.value)
            current = current.pre
        }
        console.log(values.join('-'))
    }

    // 根据索引插入新的节点
    insert(el: T, position: number): boolean {
        // 越界判断
        if (position < 0 || position > this.size) {
            return false
        }
        // 向头部添加元素(当添加的元素位置在头部或者添加元素时，链表长度只有一个)
        if (position === 0) {
            this.prepend(el)
        } else if (position === this.size) {
            this.append(el)
        }
        else {
            // 创建一个新的节点
            const newNode = new _DoubleNode<T>(el)

            let current = this.head
            let index = 0

            while (index++ < position) {
                current = current!.next
            }

            current!.pre!.next = newNode
            newNode.next = current
            newNode.pre = current!.pre
            this.size++
        }
        return true
    }

    // 根据索引删除元素
    removeAt(position: number): T | null {
        // 越界
        if (position < 0 || position >= this.size) {
            return null
        }
        if (this.size === 0) {
            return null
        }
        let deleteNode = this.head
        // 删除的节点是第一个
        if (position === 0) {
            // 如果链表长度只有一
            if (this.size === 1) {
                deleteNode = this.head
                this.head = null
                this.tail = null
            } else {
                this.head = this.head!.next
                this.head!.pre = null
            }
        }
        // 删除的节点是最后一个
        if (position === this.size - 1) {
            deleteNode = this.tail
            this.tail = this.tail!.pre
            this.tail!.next = null
        } else {
            // 删除的节点在中间
            let head = this.head
            let current: _DoubleNode<T> | null = null
            let index = 0
            while (index++ <= position) {
                current = head
                head = head?.next ?? null
            }
            deleteNode = current
            // 将当前节点的前一个节点的 next 指向当前节点的下一个节点
            current!.pre!.next = current!.next
            current!.next!.pre = current!.pre
        }
        this.size--
        return deleteNode?.value ?? null
    }
}

console.log("====================doublelinklist=======================")
const doublelinklist = new DoubleLinkedList<string>()
doublelinklist.append('a')
doublelinklist.append('b')
doublelinklist.append('c')
doublelinklist.append('d')
doublelinklist.prepend('e')
doublelinklist.prepend('f')

doublelinklist.traverse()
doublelinklist.postTraverse()
doublelinklist.insert('g', 3)
doublelinklist.traverse()     // f-e-a-g-b-c-d
// console.log(doublelinklist)
doublelinklist.postTraverse()  // d-c-b-a-e-f
doublelinklist.removeAt(1)
// console.log(doublelinklist.removeAt(1))
doublelinklist.traverse()  // f-a-g-b-c-d
doublelinklist.postTraverse()