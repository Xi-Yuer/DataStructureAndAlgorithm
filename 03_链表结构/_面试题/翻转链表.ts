import ListNode from "./ListNode"


// 方案一：采用栈结构翻转链表
function reverseList(head: ListNode<number> | null): ListNode<number> | null {
    // 没有节点返回 null
    if (head === null) return null
    // 只有一个节点直接返回
    if (!head.next) return head

    // 数组模拟栈结构
    const stack: ListNode<number>[] = []

    while (head) {
        stack.push(head)
        head = head?.next ?? null
    }

    // newHead 为翻转列表
    const newHead: ListNode<number> = stack.pop()!
    let newHeadCurrent = newHead // 临时指针
    while (stack.length) {
        const node = stack.pop()!
        newHeadCurrent.next = node
        newHeadCurrent = newHeadCurrent.next
    }
    newHeadCurrent.next = null // 避免循环引用（因为最后一个元素的 next 指针仍然指向的是上一个翻转节点的 next）
    return newHead
}


// 方案二：非递归
function reverseList2(head: ListNode<number> | null): ListNode<number> | null {
    // 边界判断
    if (head === null || !head.next) return head

    let newHead: ListNode<number> | null = null
    while (head) {
        let current: ListNode<number> | null = head.next // 当前指向的节点
        head.next = newHead
        newHead = head
        head = current
    }

    return newHead

}


// 方案三：递归方式
function reverseList3(head: ListNode<number> | null): ListNode<number> | null {
    // 边界判断
    if (head === null || !head.next) return head
    const newHead = reverseList3(head?.next ?? null)

    /// head 此时的 head 指向的是最后倒数第二个节点
    head.next.next = head
    head.next = null
    return newHead
}

const node1 = new ListNode<number>(1)
node1.next = new ListNode<number>(2)
node1.next.next = new ListNode<number>(3)

const newHead = reverseList3(node1)
// console.log(newHead)

let current = newHead
while (current) {
    console.log(current.val)
    current = current.next
}
