### 2. 打包效率
* 开发环境采用增量构建，启用热更新
* 开发环境不做无意义的工作如提取css计算文件hash等
* 配置devtool
* 选择合适的loader，个别loader开启cache
* 第三方库采用引入方式
* 提取公共代码
* 优化构建时的搜索路径，指明需要构建目录以及不需要构建目录
* 模块化引入需要的部分

### 3. Loader
>loader是一个node模块，它输出了一个函数。当某种资源需要用这个loader转换时，这个函数会被调用。并且，这个函数可以通过提供给它this上下文访问Loader API

**编写一个loader**
```js
// 定义
module.exports = function(src) {
  //src是原文件内容（abcde），下面对内容进行处理，这里是反转
  var result = src.split('').reverse().join('');
  //返回JavaScript源码，必须是String或者Buffer
  return `module.exports = '${result}'`;
}
//使用
{
	test: /\.txt$/,
	use: [
		{
			'./path/reverse-txt-loader'
		}
	]
},
```
### 4.说一下webpack的plugin，对项目怎样优化
**构建与性能优化**
* 减少编译体积*
* 并行编译
* 缓存*
* 预编译
* 拆包*
