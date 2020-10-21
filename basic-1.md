### 9.html5有哪些新的特性，移除了哪些元素？

* html5现在已经不是SGML的子集，主要是关于图像，位置，存储和多任务等功能的增加
    * 新增选择器：document.querySelector和document.querySelectorAll
    * 媒体播放：video和audio
    * 绘画: canvas
    * 本地存储: localStorage和sessionStorage
    * 离线应用: manifest
    * 语义化标签: article header footer nav section
    * 多任务: webworker
    * 全双工通信协议： websocket
    * 历史管理：history
    * 跨域资源共享(CORS): Access-Control-Allow-Origin

* 移除的元素：frame frameset noframes center big font tt
* 如何区分html和html5： DOCTYPE声明，新增的结构元素和功能元素

### 10.html5的离线存储怎么使用，工作原理能不能解释一下
* 当用户未连接因特网时，可以正常访问站点和应用；当用户连接因特网后，更新用户机器上的缓存文件
* **原理**：html5的离线存储时基于一个新建的.appcache文件的缓存机制（不是存储技术），通过这个文件上的解析清单离线存储资源，这些资源会像cookie一样被存储下来。之后当网络处于离线状态时，浏览器会通过离线存储的数据进行页面展示。
* **如何使用**：
    * 页面头部会加入一个manifest属性
    * 在cache.manifest文件中编写离线存储的资源
    * 在离线状态时，操作window.applicationCache进行需求实现
```HTML5
CACHE MANIFEST
#v0.11
CACHE:
js/app.js
css/style.css
NETWORK:
resourse/logo.png
FALLBACK:
/offline.html
```

### 11.浏览器是怎么对HTML5的离线存储资源进行管理和加载的呢
* 在线的情况下，浏览器发现html头部有manifest属性，它会请求manifest文件，如果是第一次访问app，那么浏览器就会根据manifest文件的内容下载相应的资源并且进行离线存储。如果已经访问过app并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的manifest文件与旧的manifest文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。
* 离线的情况下，浏览器就直接使用离线存储的资源。

### 12.请描述一下cookies，sessionStorage和localStorage的区别
* **cookie**是网站为了表示用户身份而存储在用户本地终端上的数据，通常经过加密。并且cookie始终在同源的http请求中携带，即会在浏览器和服务器间来回传递。
* **sessionStorage**和**localStorage**不会自动把数据发给服务器，仅在本地保存。
* 存储大小：cookie不会超过4k，而后者虽然也有限制，但可以达到5M或更大
* **过期时间**：
    * cookie在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭
    * sessionStorage数据在当前浏览器窗口关闭后自动删除
    * localStorage存储持久数据，浏览器关闭后数据不丢失除非主动删除数据

### 16.DOCTYPE的作用是什么？严格模式与混合模式如何区分？它们有何意义？
* `<!DOCTYPE>` 声明位于文档中的最前面，处于 `<html>` 标签之前。告知浏览器的解析器，用什么文档类型规范来解析这个文档
* 严格模式的排版和JS运作模式是以该浏览器支持的最高标准运行
* 在混杂模式中，页面以宽松的向后兼容的方式显示。模拟老式浏览器的行为以防止站点无法工作。`DOCTYPE`不存在或者格式不正确会导致文档以混杂模式呈现

### 17.行内元素，块级元素分别有哪些？二者有什么区别？void元素有哪些？
* 行内元素：a b span img input select strong
    * 行内元素不可以设置宽高，不独占一行
* 块级元素：div ul ol li dl dt dd h1 h2... p
    * 块级元素可以设置宽高，独占一行
* 空元素：```<br><hr><img><input><link><meta>```

### 23.viewport
```js
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    // width    设置viewport宽度，为一个正整数，或字符串‘device-width’
    // device-width  设备宽度
    // height   设置viewport高度，一般设置了宽度，会自动解析出高度，可以不用设置
    // initial-scale    默认缩放比例（初始缩放比例），为一个数字，可以带小数
    // minimum-scale    允许用户最小缩放比例，为一个数字，可以带小数
    // maximum-scale    允许用户最大缩放比例，为一个数字，可以带小数
    // user-scalable    是否允许手动缩放
```
* 延伸提问
    * 怎样处理移动端1px被渲染成2px的问题
        * 方案1：针对ios，使用`border:0.5px solid`
        * 方案2：使用边框图片，`border-image:url(...) 2 repeat`
        * 方案3：border-shadow:0 1px 1px 1px color
        * 方案4：伪元素：
            ```css
            .setOnePx{
                position:relative;
                &::after{
                    content:" ";
                    position:absolute;
                    display: block;
                    top:0;
                    left:0;
                    width:100%;
                    height:1px;
                    transform:scale(1,0.5)
                }
            }
            ```
