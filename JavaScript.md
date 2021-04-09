# Javascript
### 1.闭包
* 闭包就是能够读取其他函数内部变量的函数。最常见的创建方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量，突破作用域链。

**特性**
1. 函数内嵌套函数
2. 内部函数可以引用外层的参数和变量
3. 参数和变量不会被垃圾回收机制回收

**对闭包的理解**
* 使用闭包主要是为了设计私有方法和变量。使用闭包的优点是可以避免全局变量的污染，缺点是常驻内存，增加内存的使用量。在JS中，函数即闭包，只有函数才会产生作用域的概念。

**好处**：实现封装和缓存
**坏处**：消耗内存，可能会造成内存溢出(解决办法：在退出函数前，将不使用的局部变量全部删除)
**用处**：
1. 实现公有变量（累加器）
```js
var add = function(){
    var num = 0;
    return function (a){
        return num = num + a;
    }
}
add()(1)
add()(2)
```
2. 可以做缓存（外部不可见）
* cache不可以是Map数据结构，因为Map的键是通过=\==比较的，即[1]!==[1]，因此即使传入相同的数组或者对象，还是会被存为不同的键
```js
const memorize = function(fn){
    const = cache= {} // 存储缓存数据的对象
    return function(...args){
        const _args = JSON.stringify(args) // 将参数作为cache的key
        return cache[_args] || cache[_args] = fn.apply(fn,args) 
        // 如果已经缓存过，直接取值。否则重新计算并且缓存
    }
}
const add(a,b){
    console.log('开始缓存')
    return a + b
}
const adder = memorize(add)
console.log(adder(2, 6))    // 输出结果: 开始缓存 8 // cache: {[2,6]': 8 }
console.log(adder(2, 6))    // 输出结果: 8   //cache: { '[2, 6]': 8 }
console.log(adder(10, 10))  // 输出结果: 开始缓存 20 // cache: { '[2, 6]': 8, '[10, 10]': 20 }
```
3.封装对象的私有属性和私有方法
```js
//圣杯模式继承
var inherit = (function(){
    var F = function(){}
    return function(origin,target){
        F.prototype = origin.prototype
        target.prototype = new F()
        target.prototype.constructor = target
    }
}())
```
4.模块化开发，防止污染变量
### 2.说说你对作用域链的理解
* 作用域链的作用就是保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能向上访问，最终到window对象为止，不可以向下访问。
* 简单来说，作用域就是变量和函数的可访问范围，即作用域控制着函数与变量的可见性和生命周期。
### 3.原型、原型链
* 原型：
    * JavaScript的所有对象中都包含了一个 [\_\_proto__] 内部属性，这个属性所对应的就是该对象的原型
    * JavaScript的函数对象，除了原型[\_\_proto__] 之外，还预置了 prototype 属性
    * 当函数对象作为构造函数创建实例时，该 prototype 属性值将被作为实例对象的原型 [\_\_proto__]。
* 原型链
    * 当一个对象调用的属性/方法自身不存在时，就会去自己 [\_\_proto__]  关联的前辈 prototype 对象上去找如果没找到，就会去该 prototype 原型 [\_\_proto__]  关联的前辈 prototype 去找。依次类推，直到找到属性/方法或 undefined 为止。从而形成了所谓的“原型链”
* 原型特点
    * JavaScript对象是通过引用来传递的，当修改原型时，与之相关的对象也会继承这一改变
### 4.请解释什么是事件代理
* 又称事件委托，即把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。**原理是DOM元素的事件冒泡**。使用事件代理可以提高性能
    * 节省内存占用，减少事件注册（比如在table上代理所有td的click事件）
    * 可以实现当新增子元素时无需再次对其绑定
### 7.事件模型
W3C中定义事件的发生经历有三个阶段：捕获，目标阶段，冒泡
* 冒泡型事件：子元素先触发，父级元素后触发(stopPropagation()方法进行阻止冒泡)
* 捕获型事件：父元素先触发，子元素后触发(preventDefault()方法阻止捕获)
* DOM流事件：同时支持两种事件模型
### 6.谈谈this的理解
* this总是指向**直接调用者**
* 在事件中，this指向触发这个事件的对象，特殊的是IE中attachEvent中的this指向window对象
### 8.new操作符具体干了什么
* 创建一个空对象，this变量引用该对象，同时继承了该函数的原型(object.create())
* 属性和方法被加入到this引用的对象中
* 隐式的返回this
### 9.AJAX原理
* AJAX是在客户端与服务器之间增加了一个中间层(AJAX引擎)，通过XmlHttpRequest对象来向服务器发送异步请求，获得数据后，JavaScript操作DOM进行更新页面。
* AJAX的过程只包含JavaScript、DOM和XmlHttpRequest(和新机制)，使用户操作和服务器响应异步化，其中最关键的一步就是从服务器获得请求数据。

**优点**
* 通过异步模式，提升了用户体验
* 优化了浏览器与服务器之间的传输，减少了不必要的数据往返，减少了带宽占用
* AJAX在客户端运行，承担了一部分服务器承担的工作，减少了大用户量下的服务器负载
* 可以实现动态不刷新，即局部刷新

**缺点**
* 暴露了与服务器交互的细节
* 对搜索引擎支持比较弱
* 不易调试
### 10.如何解决跨域问题
<table><tr><td bgcolor=yellow>
同源策略：SOP(Same Origin Policy)是一种约定，指<strong>协议+域名+端口三者相同</strong>由Netscape引入浏览器，它是浏览器最核心也最基本的安全功能，若缺少了同源策略，浏览器易受到XSS和CSFR等攻击。
</td></tr></table>
### 5.JavaScript如何实现继承

