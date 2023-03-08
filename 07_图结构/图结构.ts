class Graph<T> {
    // 所有顶点
    private verteces: T[] = []
    // 边(一个顶点可以有多条边)
    private adjList: Map<T, T[]> = new Map<T, T[]>()


    // 添加顶点和边的映射
    addVertx(vertx: T) {
        // 添加顶点
        this.verteces.push(vertx)
        // 为顶点添加边对应的映射
        this.adjList.set(vertx, [])
    }
    // 添加边（需要告诉我需要为哪两个顶点添加边）
    addEdge(v1: T, v2: T) {
        // 两个顶点相互为边
        this.adjList.get(v1)?.push(v2)
        this.adjList.get(v2)?.push(v1)
    }

    // 遍历顶点以及对应的边
    traverse() {
        this.verteces.forEach(vertx => {
            // 拿到对应节点的边
            const edges = this.adjList.get(vertx)
            console.log(`${vertx} -> ${edges?.join(' ')}`)
        })
    }

    // 图的遍历(访问图的每个节点，不可以重复访问)

    // 广度优先搜索
    bfs(cb?: (val: T) => void) {
        // 判断是否有节点
        if (!this.verteces.length) return
        // 创建一个队列结构访问每一个节点
        const queue: T[] = [this.verteces[0]]
        // 创建一个 Set 集合记录该顶点是否被访问过 Set 具有不重复的特点
        const visited = new Set<T>()

        // 遍历队列中的每个顶点
        while (queue.length) {
            // 访问队列中的节点
            const vertex = queue.shift()!
            // 访问该节点
            cb && cb(vertex)
            // 标记该节点已经被访问过了
            visited.add(vertex)
            // 取出该顶点的相邻顶点
            const neighbors = this.adjList.get(vertex)
            // 如果没有值跳过本次循环
            if (!neighbors) continue
            // 有值，获取到的相邻节点是一个数组集合
            for (const neighbor of neighbors) {
                // 判断当前的相邻节点是否被访问过
                if (!visited.has(neighbor)) {
                    // 将当前顶点添加到队列中继续循环
                    queue.push(neighbor)
                }
            }
        }


    }

    // 深度优先
    dfs(cb?: (val: T) => void) {
        // 判断是否有顶点
        if (!this.verteces.length) return
        // 创建一个栈结构
        const stack: T[] = [this.verteces[0]]
        // 创建一个 Set 结构标记该顶点是否已被访问过
        const visited = new Set<T>()
        // 从第一个顶点开始访问
        while (stack.length) {
            const vertex = stack.pop()!
            // 访问该节点
            cb && cb(vertex)
            // 标记该顶点已访问过
            visited.add(vertex)
            // 获取相邻节点
            const neighbors = this.adjList.get(vertex)
            if (!neighbors) continue
            // 反过来遍历相邻节点的集合
            for (let i = neighbors.length - 1; i >= 0; i--) {
                const neighbor = neighbors[i]
                // 当前顶点没有被访问过
                if (!visited.has(neighbor)) {
                    stack.push(neighbor)
                }
            }
        }

    }
}

const graph = new Graph<string>()
graph.addVertx('A')
graph.addVertx('B')
graph.addVertx('C')
graph.addVertx('D')
graph.addVertx('E')
graph.addVertx('F')
graph.addVertx('G')
graph.addVertx('H')
graph.addVertx('I')

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'E')
graph.addEdge('C', 'F')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'I')

graph.traverse()
// 广度优先遍历图结构
graph.bfs((val) => { console.log(val) })
// 深度优先遍历图结构
graph.dfs((val) => { console.log(val) })