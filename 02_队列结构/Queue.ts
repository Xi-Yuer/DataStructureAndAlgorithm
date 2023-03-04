import { IQueue } from "./IQueue";

// 基于数据的队列结构
export default class ArrayQueue<T> extends IQueue<T> {
    private data: Array<T> = []

    // 入队
    enqueue(el: T): void {
        this.data.push(el);
    }

    // 出队
    dequeue(): T | undefined {
        return this.data.shift();
    }

    // 查看队列第一个元素
    peek(): T | undefined {
        return this.data[0];
    }

    // 判断队列是否为空
    isEmpty(): boolean {
        return this.data.length === 0;
    }

    // 队列的大小
    get size(): number {
        return this.data.length;
    }

}