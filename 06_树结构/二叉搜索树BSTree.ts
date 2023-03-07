// 打印树结构
import { btPrint } from 'hy-algokit'

// 树节点
class TreeNode<T> {
    // 值
    value: T
    // 左子节点
    left: TreeNode<T> | null = null
    // 右子节点
    right: TreeNode<T> | null = null
    constructor(value: T) {
        this.value = value
    }
}


// 搜索二叉树(左子节点小于根节点，右子节点大于根节点)
class BSTree<T> {
    // 根节点
    root: TreeNode<T> | null = null

    // 打印树结构
    print() {
        btPrint(this.root)
    }

    /**
     * 插入新的节点
     * @param root 插入到哪里
     * @param newNode 新的节点
     */
    private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
        // 判断插入左子节点还是右子节点
        if (node.value > newNode.value) {
            // 插入到左子节点的空白位置
            // 当左子节点没有值时直接插入
            if (!node.left) {
                node.left = newNode
            } else {
                // 当左子节点有值时
                this.insertNode(node.left, newNode)
            }
        } else {
            // 插入到右子节点的空白位置
            // 当右子节点没有值时直接插入
            if (!node.right) {
                node.right = newNode
            } else {
                // 当右子节点有值时
                this.insertNode(node.right, newNode)
            }
        }
    }

    // 插入
    insert(value: T) {
        // 根据传入的值创建一个节点
        const newNode = new TreeNode<T>(value)
        // 判断当前是否有根节点
        if (!this.root) {
            // 没有根节点
            this.root = newNode
        } else {
            // 有节点
            this.insertNode(this.root, newNode)
        }
    }

    // 先序遍历(先访问根节点，再访问左子树，最后访问右子树)
    preOrderTraverse(cb?: (value: T) => void) {
        this.preOrderTraverseNode(this.root, cb)
    }
    /**
     * 传入一个节点，使用先序遍历访问每个节点
     * @param node 节点
     */
    private preOrderTraverseNode(node: TreeNode<T> | null, cb?: (value: T) => void) {
        // 判断 node 节点是否有值
        if (!node) return
        // 先访问根节点
        cb && cb(node.value)
        // 访问左子节点
        this.preOrderTraverseNode(node.left, cb)
        // 访问右子节点
        this.preOrderTraverseNode(node.right, cb)
    }

    // 中序遍历
    inOrderTraverse(cb?: (value: T) => void) {
        this.inOrderTraverseNode(this.root, cb)
    }
    private inOrderTraverseNode(node: TreeNode<T> | null, cb?: (value: T) => void) {
        if (!node) return
        // 先访问左子树
        this.inOrderTraverseNode(node.left, cb)
        // 再访问根节点
        cb && cb(node.value)
        // 最后访问右子节点
        this.inOrderTraverseNode(node.right, cb)
    }

    // 后续遍历
    postOrderTraverse(cb?: (value: T) => void) {
        this.postOrderTraverseNode(this.root, cb)
    }
    private postOrderTraverseNode(node: TreeNode<T> | null, cb?: (value: T) => void) {
        if (!node) return
        // 先遍历左子树
        this.postOrderTraverseNode(node.left, cb)
        // 在遍历右子树
        this.postOrderTraverseNode(node.right, cb)
        // 最后遍历根节点
        cb && cb(node.value)
    }

    // 层序遍历(利用队列遍历)
    levelOrderTraverse(cb?: (value: T) => void) {
        // 没有根节点
        if (!this.root) return
        // 创建一个队列结构(将根节点加入队列)
        const queue: TreeNode<T>[] = [this.root]
        // 遍历队列中的节点
        while (queue.length) {
            // 出队
            const current = queue.shift()!
            // 访问该节点
            cb && cb(current.value)
            // 左子树和右子树有值的情况下依次入队
            current.left && queue.push(current.left)
            current.right && queue.push(current.right)
        }
    }

    // 最大值
    getMax(): T | null {
        let current = this.root
        while (current?.right) {
            current = current.right
        }
        return current?.value ?? null
    }

    // 最小值
    getMin(): T | null {
        let current = this.root
        while (current?.left) {
            current = current.left
        }
        return current?.value ?? null
    }

    // 搜索
    search(value: T): boolean {
        let current = this.root
        if (!current) return false
        while (current) {
            // 判断当前节点是否是我们需要的节点
            if (current?.value === value) return true
            // 如果不是(比较当前的值比当前的 curretn 大还是小，从而决定去左子树还是右子树中去搜索)
            current.value > value ? (current = current.left) : (current = current.right)
        }

        return false
    }

    // 删除
    
}

const bst = new BSTree<number>()
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)

// bst.print()
// 正序遍历
// bst.preOrderTraverse(value => { console.log(value) })    // 11 -> 7 -> 5 -> 3 -> 6 -> 9 -> 8 -> 10 -> 15 -> 13 -> 12 -> 14 -> 20 -> 18 -> 25

// 先序遍历
// bst.inOrderTraverse(value => { console.log(value) })     // 3 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11 -> 13 -> 13 -> 14 -> 15 -> 18 -> 20 -> 25

// 后续遍历
// bst.postOrderTraverse(value => { console.log(value) })   // 3 -> 6 -> 5 -> 8 -> 10 -> 9 -> 7 -> 12 -> 14 -> 13 -> 18 -> 25 -> 20 -> 15 -> 11

// 层序遍历
// bst.levelOrderTraverse(value => { console.log(value) })  // 11 -> 7 -> 15 -> 5 -> 9 -> 13 -> 20 -> 3 -> 6 -> 8 -> 10 -> 12 -> 14 -> 18 -> 25

// console.log(bst.getMax()) // 25
// console.log(bst.getMin()) // 3

console.log(bst.search(25))