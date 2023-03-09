export default class ListNode<T> {
    val: T | number
    next: ListNode<T> | null
    constructor(val: T, next?: ListNode<T> | null) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
    }
}