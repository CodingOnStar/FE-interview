/*
Promise.all你知道有什么特性吗？
Promise在实例化时，就已经执行了。即Promise在创建之初，就执行了
*/
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function myPromise (fn) {
    const that = this;
    this.state = PENDING;
    this.value = null;
    that.resolvedCallbacks = [];
    that.rejectedCallbacks = [];

    function resolve (value) {
        if (that.state = PENDING) {
            that.state = RESOLVED;
            that.value = value;
            that.resolvedCallbacks.map(cb => cb(that.value))
        }
    }
    function reject (value) {
        if (that.state = PENDING) {
            that.state = REJECTED;
            that.value = value;
            that.rejectedCallbacks.map(cb => cb(that.value))
        }
    }
    try {
        fn(resolve, reject)
    } catch {
        reject(e)
    }
}
myPromise.prototype.then = function (onFullfilled, onRejected) {
    const that = this;
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e };
    if (this.state = PENDING) {
        this.resolvedCallbacks.push(onFullfilled)
        this.rejectedCallbacks.push(onRejected)
    }
    if (this.state = RESOLVED) {
        onFullfilled(that.value)
    }
    if (this.state = REJECTED) {
        onRejected(that.value)
    }
}

function myPromiseAll (promiseArray) {
    return new Promise(function (resolve, reject) {
        if (!Array.isArray(promiseArray)) {
            return reject(new Error('传入的参数必须是数组！'))
        }
        const res = []
        let counter = 0
        const promiseNum = promiseArray.length
        for (let i = 0; i < promiseNum; i++) {
            Promise.resolve(promiseArray[i]).then(value => {
                counter++;
                res[i] = value
                if (counter === promiseNum) {
                    resolve(res)
                }
            }).catch(err => { reject(err) })
        }
    })
}








