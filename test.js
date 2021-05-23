/* console.log('script start');

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

 console.log('script end');*/
/* function TreeNode(x) {
 this.val = x;
 this.left = null;
 this.right = null;
 } 
function Power (base, exponent) {
    // write code here
    let res = 1,
        n;
    if (exponent > 0) {
        // 指数大于0的情况下
        n = exponent;
    } else if (exponent < 0) {
        // 指数小于0的情况下
        if (!base) throw new Error('分母不能为0');
        n = -exponent;
    } else {
        // 指数等于0的情况下
        return 1;
    }
    while (n) {
        // 也可以用递归做，这里采用了循环
        if (n & 1)
            // 当指数为奇数时，包括了1
            res *= base;
        base *= base;
        n >>= 1;
    }
    return exponent > 0 ? res : 1 / res;
}
console.log(Power(2, 3))

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
console.log('start')
setTimeout(() => {
    console.log('children2')
    Promise.resolve().then(() => {
        console.log('children3')
    })
}, 0);
new Promise(function (resolve, reject) {
    console.log('children4')
    setTimeout(() => {
        console.log('children5')
        resolve('children6')
    }, 0);
}).then((result) => {
    console.log('children7')
    setTimeout(() => {
        console.log(result)
    }, 0);
})*/
const p = function () {
    return new Promise((resolve, reject) => {
        const p1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1)
            }, 0);
            resolve(2)
        })
        p1.then((result) => {
            console.log(result)
        })
        console.log(3)
        resolve(4)
    })
}
p.then((result) => {
    console.log(result)
})
console.log('end')