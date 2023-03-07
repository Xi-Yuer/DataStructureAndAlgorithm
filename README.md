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
...

## 哈希

## 树