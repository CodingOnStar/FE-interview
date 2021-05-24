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
function TreeNode (x) {
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