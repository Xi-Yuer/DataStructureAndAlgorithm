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