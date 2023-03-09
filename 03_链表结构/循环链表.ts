import { LinkList } from "./单项链表";

// 循环链表（链表中最后一个元素的next指向的是头部）
export class CircularList<T> extends LinkList<T> {
    // 重新实现的方法
    append(el: T): void {
        super.append(el)
        // 拿到最后一个节点，将他的 next 指向第一个节点
        this.tail!.next = this.head
    }
    insert(el: T, position: number): boolean {
        const isSuccess = super.insert(el, position)
        // 当插入的节点在最后一个位置或者第一个位置时时(需要将最后一个节点的 next 指向头结点)
        if (isSuccess && position === this.length - 1 || position === 0) {
            this.tail!.next = this.head
        }
        return isSuccess
    }

    removeAt(position: number): T | null {
        const value = super.removeAt(position)
        // 当删除的是第一个节点时(需要改变一下 tail 的指向)
        if (value && this.tail && position === 0 || position === this.length) {
            this.tail!.next = this.head
        }
        return value
    }
}
const circularList = new CircularList<string>()
circularList.append('a')
circularList.append('b')
circularList.append('c')
circularList.append('d')

circularList.traverse()