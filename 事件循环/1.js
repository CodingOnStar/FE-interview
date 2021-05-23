/*
为什么浏览器中有事件循环？

JS是单线程；event loop；
两种任务：
1.宏任务：setTimeout setInterval 整体代码 I/O操作
2.微任务：new Promise().then() MutationObserver(前端的回溯)

为什么引入微任务？只有宏任务可以吗
因为所有的任务是先进先出的原则，如果有高优先级的任务，就需要微任务的类型来解决

微任务和宏任务在Node中的执行顺序：
Node v10以前：
1.执行完一个阶段中的所有任务
2.执行nextTick队列里的任务
3.执行完微任务队列的内容

Node v10以后：
与浏览器相同
*/
async function async1 () {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2 () {
    console.log('async2');
}
console.log('script start');
setTimeout(function () {
    console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});
console.log('script end');
