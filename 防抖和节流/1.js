/*
防抖：触发事件时，一定之间内没触发，才会执行事件
节流：触发事件时，一定时间内只调用一次事件

节流throttle：resize scroll
防抖debounce：input（搜索联想）
*/

//时间戳写法，第一次函数执行会立即执行,最后一次也会间隔执行，所以用以下方法，计算剩余时间
function throttle (fn, delay) {
    let timer = null;
    let startTime = Date.now();
    return function () {
        let currentTime = Date.now();
        let remaining = delay - (currentTime - startTime)
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        if (remaining <= 0) {
            fn.apply(context, args)
            startTime = Date.now();
        } else {
            timer = setTimeout(fn, remaining)
        }
    }
}
//防抖
function debounce (fn, delay) {
    let timer = 0;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}