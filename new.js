function _new (fn, ...args) {
    if (typeof fn !== 'function') {
        throw new TypeError('Error')
    }
    let obj = Object.create(fn.prototype)
    let result = fn.apply(obj.args)
    return result instanceof Object ? result : obj
}

function Person () {
    this.name = 'Jack';
}
var p = Person();
console.log(p) // undefined
console.log(name) // Jack
console.log(p.name)