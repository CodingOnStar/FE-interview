#Vue的异步更新DOM原理
>Vue中的数据更新是异步的，意味着Data修改后，不能够立即获取修改后的DOM元素

简单对象的了解：
1. Data对象：Vue中的data方法中返回对象
2. Dep对象：每一个Data都会创建一个Dep，用来搜索所有使用到这个属性的Watcher对象。
3. Watcher对象：主要用于渲染DOM
 
 ==什么时候我们才能够获取到真正的DOM元素？==
 * 答：在Vue的nextTick回调中

 **问题：为什么Vue需要在nextTick回调中获取最新的DOM？**

 答：首先加入Vue是同步执行DOM更新的话，对于多次更新同一Data，DOM也会更新N次，但事实上，我们只需要最后一次更新即可，减少无用功。
 * Vue 2.0 引入VirtualDOM后，组件内部使用VDOM进行渲染。也就是说组件内部其实不关心哪个状态发生了变化，它只需要计算一次就可以得知哪些节点需要更新。也就是说，如果改变了N个状态，其实只需要发送一个信号就可以将DOM更新到最新。
 * 所以如何才能将渲染推迟到所有状态都修改完毕呢？答案就是将渲染操作推迟到本轮事件循环的最后或者下一轮事件循环。将渲染推迟到本轮事件循环的最后执行渲染的时机会比推迟到下一轮快很多，所以Vue优先将渲染操作推迟到本轮事件循环的最后，如果执行环境不支持会降级到下一轮。
 
 **当然，Vue的变化侦测机制决定了它必然会在每次状态发生变化时都会发出渲染的信号，但Vue会在收到信号之后检查队列中是否已经存在这个任务，保证队列中不会有重复。如果队列中不存在，则将渲染操作添加到队列中。**
 之后通过异步的方式延迟执行队列中的所有渲染的操作并清空队列，同一轮事件循环中反复修改状态时，并不会反复向队列中添加相同的渲染操作。

 ### 注意
 Vue的更新操作默认会将执行渲染的操作添加到微任务队列中，而微任务的执行时机优先于宏任务。**所以有一个很有意思的事情是，我们在代码中如果先使用setTimeout将函数注册到宏任务中，然后再去修改状态，在setTimeout注册的回调中依然可以获取到更新后的DOM。而如果使用vm.\$nextTick向微任务队列中插入任务，则代码中注册的顺序就非常重要，因为渲染操作和使用vm.$nextTick注册的回调都是向微任务队列中添加任务，那么执行回调的顺序就会按照插入队列中的循序去执行，也就是说，先插入队列的先执行。**

 ```js
 /*当一个Data更新时，会依次执行以下代码
1. 触发Data.set
2. 调用dep.notify
3. Dep遍历所有相关的watcher执行update方法
4. 执行更新操作
5. 将当前的watcher添加到异步队列
6. 执行异步队列，并传入回调
*/
class Watcher {
    // 4. 执行更新操作
    update () {
        queueWatcher(this);
    }
}

const queue = [];

function queueWatcher (watcher: Watcher) {
    // 5. 将当前 Watcher 添加到异步队列
    queue.push(watcher);
    // 6. 执行异步队列，并传入回调
    nextTick(flushSchedulerQueue);
}

// 更新视图的具体方法
function flushSchedulerQueue () {
    let watcher, id;
    // 排序，先渲染父节点，再渲染子节点
    // 这样可以避免不必要的子节点渲染，如：父节点中 v-if 为 false 的子节点，就不用渲染了
    queue.sort((a, b) => a.id - b.id);
    // 遍历所有 Watcher 进行批量更新。
    for (index = 0; index < queue.length; index++) {
        watcher = queue[index];
        // 更新 DOM
        watcher.run();
    }
}
//nextTick
const callbacks = [];
let timerFunc;

function nextTick (cb?: Function, ctx?: Object) {
    let _resolve;
    // 1.将传入的 flushSchedulerQueue 方法添加到回调数组
    callbacks.push(() => {
        cb.call(ctx);
    });
    // 2.执行异步任务
    // 此方法会根据浏览器兼容性，选用不同的异步策略
    timerFunc();
}
//可以看到，nextTick 函数非常简单，它只是将传入的 flushSchedulerQueue 添加到 callbacks 数组中，然后执行了 timerFunc 方法。


//timerFunc
let timerFunc;
// 判断是否兼容 Promise
if (typeof Promise !== "undefined") {
    timerFunc = () => {
        Promise.resolve().then(flushCallbacks);
    };
    // 判断是否兼容 MutationObserver
    // https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver
} else if (typeof MutationObserver !== "undefined") {
    let counter = 1;
    const observer = new MutationObserver(flushCallbacks);
    const textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
        characterData: true,
    });
    timerFunc = () => {
        counter = (counter + 1) % 2;
        textNode.data = String(counter);
    };
    // 判断是否兼容 setImmediate
    // 该方法存在一些 IE 浏览器中
} else if (typeof setImmediate !== "undefined") {
    // 这是一个宏任务，但相比 setTimeout 要更好
    timerFunc = () => {
        setImmediate(flushCallbacks);
    };
} else {
    // 如果以上方法都不知道，使用 setTimeout 0
    timerFunc = () => {
        setTimeout(flushCallbacks, 0);
    };
}

// 异步执行完后，执行所有的回调方法，也就是执行 flushSchedulerQueue
function flushCallbacks () {
    for (let i = 0; i < copies.length; i++) {
        callbacks[i]();
    }
}
//可以看到，timerFunc 是根据浏览器兼容性创建的一个异步方法，它执行完成之后，会调用 flushSchedulerQueue 方法进行具体的 DOM 更新。

// 我们使用 this.$nextTick 其实就是调用 nextTick 方法
Vue.prototype.$nextTick = function (fn: Function) {
    return nextTick(fn, this);
};
```