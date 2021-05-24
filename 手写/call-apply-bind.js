//call
function myCall (context) {
    if (typeof this !== "function") {
        return new TypeError('Error')
    }
    context = context || window;
    let args = [...arguments].slice(1);
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn
    return result
}
//apply
function myApply (context) {
    if (typeof this !== "function") {
        return new TypeError('Error')
    }
    context = context || window
    let result;
    context.fn = this;
    if (arguments[1]) {
        context.fn(...arguments[1])
    } else {
        context.fn()
    }
    delete context.fn
    return result
}
//bind
function myBind (context) {
    if (typeof this !== "function") {
        return new TypeError('Error')
    }
    context = context || window
    const _this = this
    const args = [...arguments].slice(1)
    return function F () {
        if (this instanceof F) {
            return new _this(...args, ...arguments)
        } else {
            return _this.apply(context, ...args.concat(...arguments))
        }
    }
}