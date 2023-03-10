# 排序算法

## 如何对一个对象进行排序
```typescript
    class Person {
        name:string
        age:number

        // 可以实现一个对象中的valueOf方法，当两个对象进行数学比较时会比较valueOf返回的数值
        valueOf(){
            return this.age
        }
    }
```