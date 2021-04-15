console.log('script start');

setTimeout(function () {
    console.log('timeout1');
}, 10);
Promise.resolve().then(console.log('then2'))
new Promise(resolve => {
    console.log('promise1');
    resolve();
    setTimeout(() => console.log('timeout2'), 0);
}).then(function () {
    console.log('then1')
})

console.log('script end');