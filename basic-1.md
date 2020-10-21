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
* **原理**：html5的离线存储时基于一个新建的.appcache文件的缓存机制（不是存储技术），通过这个文件上的解析清单离线存储资源