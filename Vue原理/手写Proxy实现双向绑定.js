Vue.prototype.observer = function (data) {
    const that = this;
    for (let key in data) {
        that.deps[key] = []
    }
    let handler = {
        get (target, property) {
            return target[property]
        },
        set (target, key, value) {
            let res = Reflect.set(target, key, value)
            var watcher = that.deps[key]
            watcher.map(item => {
                item.update();
            })
            return res
        }
    }
    this.$data = new Proxy(data, handler)
}
