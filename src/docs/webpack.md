#### 一  webpack 是什么？
它是一个打包工具。 噗，完啦？

来，我们看官方概念:  webpack 是一个现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个 依赖图(dependency graph)，此依赖图会映射项目所需的每个模块，并生成一个或多个 bundle。

内部如何构建一个依赖图，我们知道 webpack 会配置一个入口，这就是从这入口文件开始， 找到所有被依赖到的文件，比如其他 js / image / json 文件等，然后通过 loader 对这些文件进行处理、编译、打包、优化，生成一个 bundle 或者多个 bundle。

#### 它的原理
通过以上，主要就是找依赖, 通过配置处理相应环境，根据你的需要配置插件进行优化（如 profill、babel、 miniSize etc) 打包出文件，可以放到服务器上运行。 

关于找依赖，可以想到关于模块化的语法: import 、require、@import etc， 通过解析对应的语法寻找相应的依赖。然后通过读取依赖到的文件，根据对应的 loader 进行处理文件，最后根据你的插件配置，分割，压缩或注入等，根据 output config输出到对应的文件夹。

这里推荐一篇 [webpack原理](https://juejin.im/entry/5b0e3eba5188251534379615) 文章, 下面就提一提我最近遇到的一个很神奇的问题吧

#### 关于 [tree shaking](https://webpack.docschina.org/guides/tree-shaking/)
想象抖一抖树，枯萎的叶子就会脱落。 这里指的是把没有用到的代码删除掉，从而减小文件的大小。通过这一优化，在引用多个第三方库时，能够大大的减少你的文件大小，但请确定这个包是没有副作用的。
>什么是副作用?
就是在导入时会自行运行一段函数，从而改变了 window 变量啊或者其他的变量以供导入的包能正常运行， 而不是只单单 export 了变量。

它是依赖于 es2015 的 `静态导入导出( import / export)`。在打包时就会通过 import 确定引用包的 export 导出的某一个变量之一， 在告知没有副作用的情况下，删除掉没有用到的其他的导出代码。 
> 静态导入是指一开始就默认加载这个文件，而不是一步一步执行代码判断逻辑，去导入对应文件

webpack 在生成环境下，默认打开树抖动配置, 如下配置。
```
optimization： {
	providedExports: true,
	usedExports: true,
	sideEffects: true,
	concatenateModules: true,
 }
 ```
 
 `providedExports` 开启 export 导出收集；
` usedExportts` 告诉webpack确定每个模块的已使用导出；
` concatenateModules`  告诉webpack查找模块图的各个部分，这些部分可以安全地连接成一个模块；
`sideEffects` 告诉webpack识别 sideEffects 标志的 package.json 或规则以跳过模块，这些模块在未使用导出时被标记为不包含副作用， 则可以把无副作用的未使用的导出进行删除。

所以如果你的包无副作用，推荐在 package.json 设置 `sideEffects: false` 开启树抖动。
注意, 它会删掉样式文件，因为样式文件是没有 export 的。所以我们需要声明样式文件是有副作用的。
在 package.json 中设置：
```
sideEffects: [
	'*.css'
]
```
>总结，为了利用树木摇晃，你必须：
> 1 使用ES2015模块语法 (配置 babel 禁止转义 es6 模块语义）
> 2 将"sideEffects"属性添加到项目的 package.json文件中。
>  3 配合压缩工具一起使用


[demo](https://github.com/cleverboy32/tree-shaking-css)
通过配置  `webpack.prod.js` sideEffects 值， 你可以看到 build 时 main.js 文件的大小发生改变。