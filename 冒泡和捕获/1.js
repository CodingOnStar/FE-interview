/*
捕获：自顶向下
冒泡：自底向上

问：window.addventListener('click', ()=>{})
答：true捕获阶段，false冒泡阶段
问：什么时候用到捕获冒泡机制
答：事件委托
问：一个历史页面，上面有若干按钮的点击逻辑，每个按钮有自己的click事件
新需求：给每一个访问的用户添加一个属性，banned=true，此用户点击页面上的任何按钮或者元素，都不可响应原来的函数，而是直接alert提示，你被封禁了
window.addEventListener('click', function(e) {
    if(banned === true) {
        e.stopPropagation();
    }
},true);
*/