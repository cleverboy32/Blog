当我们要完成一个应用的时候，会根据对应的功能划分为许多不同的模块，就像一个论坛，有发帖的模块，评论的模块，js 中的模块也正是如此，一个具体功能的代码抽成一个文件，当你做一个东西的时候需要用到这个功能的时，可以直接使用这个文件，实现功能的分离，并能在多个需要的地方使用。就像是螺丝钉、螺丝帽、垫片一样的，通过组合使用实现出你的产品。

通过直白的描述，我们可以知道，模块化的好处就是，抽离代码，重复使用，如现在很直观的代表 npm 包。



那么模块化到底是怎么实现的呢？

先来了解一下历史，以前的 html 不知道大家还记不记的， 一个html 页面引入了多个 js 文件.
```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>So UI - A Component Library for Vue.js.</title>
</head>
<body>
    <div id="app"></div>
    <script src="a.js"></script>
    <script src="b.js"></script>
    <script src="c.js"></script>
    <script src="d.js"></script>
    <script src="e.js"></script>
</body>
</html>
```
如上，引入了 a/b/c/d/e 五个文件，这五个文件如果相互之间有依赖，还要注意引入的顺序，并且还需要注意它们里面的变量名，若是重复利用到其他的项目，其他项目也需要注意到以上两点问题。为了解决这一问题，就有了模块化的规范。

模块化的规范，有 [CMD](http://javascript.ruanyifeng.com/nodejs/module.html)  和 [AMD](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)

CMD (Common Module Definition), 是sea.js在推广过程中对模块定义的规范化产出，主要用于浏览器端。它主要特点是：对于依赖的模块是延迟执行，依赖可以就近书写，等到需要用这个依赖的时候再引入这个依赖，应用有sea.js.

AMD规范（Asynchronous Module Definition）：是 RequireJS 在推广过程中对模块定义的规范化产出，也是主要用于浏览器端。其特点是：依赖前置，需要在定义时就写好需要的依赖，提前执行依赖，应用有require.js

尽情的猜测，require.js 是怎么弄的呢？ 它需要依次的加载模块然后去进行相应的操作，加载模块就是要引入这个文件，那么这里也还是通过动态加载 script 的方法，并通过 onload 去执行后面的回调了。

我们知道现如今 es6 已经支持模块化了，它分为 export 和 import 两个命令。 export 导出你定义的模块变量， import 引入一个模块变量。

```
export { 
 	one, 
 	two
 }
 export default three;
 ```
 对应的引入代码
 ```
 import  { one, two }  three from 'a.js'
```
可以看到 export 可以导出一个默认的变量，也可以导出变量对象，这里引入的时候名字不要写错了。 那么 es6 的模块化通过babel 转码其实就是 umd 模块规范， 它是一个兼容 cmd 和 amd 的模块化规范, 同时还支持老式的“全局”变量规范
```
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    //    方法
    function myFunc(){};
 
    //    暴露公共方法
    return myFunc;
}));
```
那么浏览器是如何支持这种规范的呢？
其实是实现了根据这种规范定制出来的功能。这里我们就按照 实现了 AMD 规范的 require.js 来讲一下实现代码。

AMD 定义一个模块的方法是 define(id?, dependencies?, factory)。

参考define 的方法代码
```
 define = function (name, deps, callback) {
        var node, context;
        
        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps && isFunction(callback)) {
            deps = [];
            //移除注释
            //查找 require 语句，收集依赖到 deps 里面
            // but only if there are function args.
            if (callback.length) {
                callback
                    .toString()
                    .replace(commentRegExp, commentReplace)
                    .replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep);
                    });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        if (context) {
            context.defQueue.push([name, deps, callback]);
            context.defQueueMap[name] = true;
        } else {
            globalDefQueue.push([name, deps, callback]);
        }
    };

    define.amd = {
        jQuery: true
    };
    
	req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
```
可以知道，这一段代码是解析定义是模块所需的依赖放置 context 的模块定义队列中。然后我们就要通过 req 去执行加载依赖，我们来看看 req 的定义。
```
req = requirejs = function (deps, callback, errback, optional) {

        //Find the right context, use default
        var context, config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }
       
        if (config) {
            context.configure(config); // 完善配置
        }

        return context.require(deps, callback, errback); 
```
这里的代码把 依赖，回调， 错误处理和配置项都传进来了，进行了配置上的处理之后，我们可以看到最后再去根据配置加载。
我们再来看 context.require 方法
```
makeRequire: function (relMap, options) {
		options = options || {};
		function localRequire(deps, callback, errback) {
			.... 当前 require 的转换
      	 	return localRequire;
  		 }
		completeLoad: function (moduleName) {
			判断 context 的依赖队列，是继续加载还是执行回调
		}
		 nameToUrl: function (moduleName, ext, skipExt) {
		 	根据模块名和配置得到加载的路径
		 }
		 load: function (id, url) {
	               req.load(context, id, url);
	      },
	      execCb: function (name, callback, args, exports) {
	                return callback.apply(exports, args);
	        },
		onScriptLoad: function (evt) {
			脚本加载完成后得到数据，执行 context.completeLoad(data.id);
		}
		onScriptError: function (evt) {
			加载错误执行错误处理
		}
	};
   context.require = context.makeRequire();
```
那我们知道其实就是围着这语法的解析，进行一系列的脚本加载，然后执行回调。

