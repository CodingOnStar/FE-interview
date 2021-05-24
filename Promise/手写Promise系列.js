//resolve
Promise.prototype.myResolve = function (params) {
    if (params instanceof Promise) return params;
    return Promise.resolve((resolve, reject) => {
        if (params && params.then && typeof params.then === 'function') {
            params.then(resolve, reject);
        } else {
            resolve(params);
        }
    })
}
//reject
Promise.prototype.myReject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}
//finally
Promise.prototype.myFinally = function (callback) {
    this.then(value => {
        return Promise.resolve(callback()).then(() => {
            return value
        })
    }, error => {
        return Promise.resolve(callback()).then(() => {
            throw error
        })
    })
}
//all
Promise.prototype.myAll = function (promises) {
    return new Promise(function (resolve, reject) {
        let len = promises.length
        let result = []
        let index = 0
        if (len === 0) {
            resolve(promises)
            return
        }
        for (let i = 0; i < len; i++) {
            Promise.resolve(promises[i]).then(data => {
                result[index] = data
                index++
                if (index === len) resolve(result)
            }).catch(err => reject(err))
        }
    })
}
//allSettled
Promise.prototype.myAllSettled = function (iterable) {
    return new Promise((resolve, reject) => {
        let elementCount = 0
        function addElementToResult (i, elem) {
            result[i] = elem
            elementCount++
            if (elementCount === result.length) {
                resolve(result)
            }
        }
        let index = 0;
        for (const promise of iterable) {
            const currentIndex = index;
            promise.then((value) => {
                addElementToResult(currentIndex, { status: 'fufilled', value })
            }, (reason) => {
                addElementToResult(currentIndex, { status: 'rejected', reason })
            })
            index++
        }
        if (index === 0) {
            resolve([])
            return
        }
    }}
//race
Promise.prototype.myRace = function (promises) {
    return Promise((resolve, reject) => {
        let len = promises.length
        if (len === 0) { return }
        for (let i = 0; i < len; i++) {
            Promise.resolve(promises[i]).then(data => {
                resolve(data)
                return
            }).catch(err => {
                reject(err)
                return
            })
        }
    })
}