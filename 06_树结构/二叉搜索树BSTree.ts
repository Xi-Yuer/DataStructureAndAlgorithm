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
bst.insert(6)

// bst.print()
console.log(bst)