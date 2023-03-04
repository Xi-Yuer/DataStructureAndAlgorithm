import ArrayQueue from "./Queue"

// 击鼓传花
const hotPotato = (names: string[], num: number) => {

    if (names.length === -1) return -1;

    const queue = new ArrayQueue<string>()
    // 将数据加入到队列中
    for (const name of names) {
        queue.enqueue(name)
    }

    // 循环队列
    while (queue.size > 1) {
        for (let i = 1; i < num; i++) {
            const name = queue.dequeue() // 出队
            if (name) queue.enqueue(name) // 入队
        }
        queue.dequeue() // 接下来的人淘汰掉
    }
    return queue.dequeue() // 取出最后一个留下来的元素
}

hotPotato(['abc', 'cba', 'bac', 'bca'], 2) // 数到三的元素淘汰


// 约瑟夫环问题
const lastRemaining = (n: number, m: number) => {
    const queue = new ArrayQueue<number>()

    // 将范围类的元素添加进栈元素
    for (let i = 0; i < n; i++) {
        queue.enqueue(i)
    }
    
    while (queue.size > 1) {
        for (let indey = 1; indey < m; indey++) {
            queue.enqueue(queue.dequeue()!)
        }
        queue.dequeue()
    }
    return queue.dequeue()!
}

console.log(lastRemaining(5, 3))
