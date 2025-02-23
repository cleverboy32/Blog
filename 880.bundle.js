"use strict";(self.webpackChunkreact_wyz=self.webpackChunkreact_wyz||[]).push([[880],{8880:(n,e,o)=>{o.r(e),o.d(e,{default:()=>t});const t="### type 和 interface 的区别\n\n1. 基本语法\n\n```typescript\ntype User = {\n  name: string;\n  age: number;\n};\n\ninterface User {\n  name: string;\n  age: number;\n}\n\n\n```\n\n2. 主要区别\n\n<img src=\"assets/type-interface.jpg\" alt=\"type 和 interface 的区别\" width=\"80%\">\n\n\n**总结**\n\ntype 和 interface 在 TypeScript 中各有优势，选择哪个取决于具体的使用场景。如果你需要定义对象类型或扩展性，优先使用 interface；如果需要处理复杂的类型组合，使用 type。希望这些对比能帮助你更好地理解它们的区别！如果有更多问题，随时告诉我\n\n\n\n### JS 中的基本类型和引用类型的区别\n\n据类型分为 基本类型（Primitive Types） 和 引用类型（Reference Types）。它们的区别主要体现在存储方式、赋值行为、比较方式和内存管理等方面。以下是详细的对比：\n\n1. 基本类型（Primitive Types）\n\n包含类型: number string boolean null undefined symbol（ES6 新增）bigint（ES2020 新增\n\n存储方式：值直接存储在栈内存中。\n\n赋值行为：赋值时会复制值，两个变量互不影响\n\n内存管理：基本类型的值是不可变的（immutable），修改时会创建一个新值。\n\n\n引用类型（Reference Types）\n\n包含类型: object array function date regexp \n\n存储方式：值存储在堆内存中，栈内存中存储的是堆内存地址（引用）。\n\n赋值行为：赋值时复制的是引用（地址），两个变量指向同一个对象。\njavascript\n\n内存管理：引用类型的值是可变的（mutable），修改对象时不会创建新对象。\n\n比较方式：比较的是引用（地址），而不是值。\n\n\n\n\n\n### JS 中的事件循环\n\nJavaScript 是单线程的，但它通过事件循环实现了异步行为。事件循环的核心包括以下几个部分：\n\n调用栈（Call Stack）：用于存储函数的执行上下文，遵循先进后出（LIFO）的原则。\n\n任务队列（Task Queue）：用于存储待执行的回调函数（如 setTimeout、Promise 等）。\n\n微任务队列（Microtask Queue）：用于存储高优先级的回调函数（如 Promise 的 then、MutationObserver 等）。\n\n事件循环：不断检查调用栈和任务队列，将任务队列中的回调函数推入调用栈执行。\n\n**事件循环的执行顺序**\n\n同步代码：最先执行。\n\n微任务：在同步代码执行完后，立即执行所有微任务。\n\n宏任务：每次从任务队列中取出一个宏任务执行。\n\n重复：重复上述过程。\n\n**宏任务（Macrotasks）**\n\nsetTimeout\nsetInterval\nsetImmediate（Node.js）\nI/O 操作（如文件读写、网络请求）\nUI 渲染（浏览器）\n\n**微任务（Microtasks）**\n\nPromise 的 then 和 catch\nprocess.nextTick（Node.js）\nMutationObserver（浏览器）\n\n\n**浏览器和 Node.js 的事件循环差异**\n\n浏览器：\n事件循环包括宏任务和微任务。\n\n宏任务包括 setTimeout、setInterval、I/O、UI 渲染 等。\n\n微任务包括 Promise、MutationObserver 等。\n\nNode.js：\n\n事件循环分为多个阶段（如 timers、poll、check 等）。\n\n宏任务包括 setTimeout、setImmediate、I/O 等。\n\n微任务包括 Promise、process.nextTick 等。\n\n\n**为什么微任务优先于宏任务？**\n\n微任务通常用于处理高优先级的任务（如 Promise 的回调），确保它们能够尽快执行。\n\n**process.nextTick 和 Promise 的区别？**\n\n在 Node.js 中，process.nextTick 的优先级高于 Promise，会在当前阶段立即执行。\n\n**如何避免事件循环阻塞？**\n\n避免长时间运行的同步代码。\n将耗时操作放入异步任务中（如 setTimeout、Promise）。\n\n\n### 原型链的终点\n\n在 JavaScript 中，原型链（Prototype Chain） 是对象之间继承关系的基础。\n\n**1. 原型链的构成**\n\n每个对象都有一个内部属性 [[Prototype]]，指向其原型对象。\n原型对象也有自己的 [[Prototype]]，形成一条链。\n原型链的终点是 null，表示没有更多的原型。\n\n**2. 原型链的查找机制**\n\n当访问一个对象的属性或方法时，JavaScript 引擎会按照以下步骤查找：\n在对象自身查找。\n\n如果找不到，沿着原型链向上查找。\n如果找到原型链的终点（null），返回 undefined。\n\n\n**3. 原型链的终点**\n\nObject.prototype 是大多数对象的最终原型。\nObject.prototype.__proto__ 是 null，表示原型链的终点。\n\n**4. 示例**\n\n```javascript\nlet obj = { name: \"Alice\" };\n\nconsole.log(obj.__proto__ === Object.prototype); // true\nconsole.log(Object.prototype.__proto__); // null\n\n\n// Object.create(null)：创建一个没有原型的对象\nlet obj = Object.create(null);\nconsole.log(obj.__proto__); // undefined\n```\n\n### promise 常用的 API\n\nPromise.all() 等待所有 Promise 完成，返回一个包含所有结果的数组。如果有一个失败，立即返回失败。\n\nPromise.allSettled() 等待所有 Promise 完成，返回一个包含所有结果的对象数组，无论成功还是失败。\n\nPromise.race() 返回第一个完成的 Promise，无论成功还是失败。\n\nPromise.any() 返回第一个成功的 Promise。如果所有 Promise 都失败，返回一个 AggregateError。\n\n### ESM （es6 module）和 commonjs 的区别\n\nESM 和 CommonJS 是 JavaScript 中两种不同的模块化规范。它们在语法、加载方式和适用场景上有显著的区别。以下是它们的详细对比：\n\n```js\n\n//语法 CommonJS require 导入模块，module.exports 导出模块。\n// 导入\nconst fs = require('fs');\n\n// 导出\nmodule.exports = {\n  myFunction: () => console.log(\"Hello, CommonJS!\")\n};\n\n// ES6 (ESM) 使用 import 导入模块，export 导出模块。\n\n// 导入\nimport fs from 'fs';\n\n// 导出\nexport const myFunction = () => console.log(\"Hello, ES6!\");\n```\n\n\n**加载方式**\n\nCommonJS\n\n同步加载：模块在运行时加载，适用于服务器端（如 Node.js）。\n\n动态导入：支持运行时动态加载模块。\n\n```javascript\nconst moduleName = 'fs';\nconst fs = require(moduleName);\n```\n\nESM\n\n异步加载：模块在编译时加载，适用于浏览器和现代 JavaScript 环境。\n\n静态导入：导入语句必须在模块的顶层，不能动态加载。\n\n```javascript\n// 静态导入\nimport fs from 'fs';\n\n// 动态导入（需要支持的环境）\nconst moduleName = 'fs';\nimport(moduleName).then((fs) => {\n  // 使用 fs\n});\n```\n\n**适用场景**\n\nCommonJS 是 Node.js 的默认模块化规范。\n\n浏览器：ESM 模块化是浏览器的标准\n\n现代 JavaScript：适用于支持 ESM 的环境（如现代浏览器、Node.js 12+）。\n\nESM: 支持树摇（Tree Shaking），可以优化打包体积。\n\n\n\n### 浏览器的有几种缓存方式\n\n**强缓存**\n\n强缓存是指浏览器直接从本地缓存中加载资源，不会向服务器发送请求。\n\n实现方式\n\nExpires：HTTP/1.0 的字段，指定资源的过期时间（绝对时间）。\n\n\nCache-Control：HTTP/1.1 的字段，优先级高于 Expires，常用指令包括：\n\nmax-age：资源的最大缓存时间（秒）。\n\nno-cache：强制向服务器验证缓存。\n\nno-store：禁止缓存。\n\npublic：资源可以被所有用户缓存。\n\nprivate：资源只能被单个用户缓存。\n\n```\nCache-Control: max-age=3600\n```\n\n**特点**: 缓存有效期内，浏览器直接从本地加载资源，不会发送请求。\n缓存过期后，浏览器会向服务器发送请求验证缓存。\n\n**协商缓存**\n\n协商缓存是指浏览器向服务器发送请求验证缓存是否有效，如果有效则返回 304 状态码，浏览器使用本地缓存。\n\nLast-Modified / If-Modified-Since：\n服务器返回资源时，带上 Last-Modified 字段，表示资源的最后修改时间。\n浏览器再次请求时，带上 If-Modified-Since 字段，服务器根据时间判断资源是否变化。\n\nETag / If-None-Match：\n服务器返回资源时，带上 ETag 字段，表示资源的唯一标识。\n浏览器再次请求时，带上 If-None-Match 字段，服务器根据标识判断资源是否变化。\n\n\n**特点**\n\n浏览器每次都会发送请求，服务器根据缓存标识判断资源是否变化。\n\n如果缓存有效，返回 304 状态码，浏览器使用本地缓存。\n\n\n\n### 在浏览器的渲染过程中，什么情况下会阻塞渲染\n在浏览器的渲染过程中，有几种情况可能会导致渲染被阻塞：\n\n### 1. **JavaScript 执行**\n- **同步脚本**：如果在 HTML 中使用了 `script` 标签且没有 `async` 或 `defer` 属性，浏览器会在遇到该脚本时停止渲染，直到脚本执行完成。\n- **长时间运行的脚本**：如果 JavaScript 代码执行时间过长，渲染会被阻塞，导致用户体验下降。\n\n### 2. **CSS 加载**\n- **阻塞样式表**：在文档中，CSS 文件的加载是阻塞渲染的。如果 CSS 文件未加载完成，浏览器不会渲染页面，直到样式可用。\n- **内联样式**：如果内联样式存在，同样会阻塞渲染。\n\n### 3. **图片和媒体资源**\n- **大图片文件**：如果图片资源较大且未进行优化，加载时间可能会影响页面的整体渲染。\n- **延迟加载的资源**：未正确实现懒加载的图片或视频可能会影响首屏渲染。\n\n### 4. **网络请求**\n- **异步请求**：如果页面依赖于异步请求（如 AJAX），并且这些请求结果影响了页面的渲染，可能会导致渲染延迟。\n- **HTTP/2 优化**：在使用 HTTP/2 时，资源的加载可能会更高效，但仍然可能出现某些请求阻塞渲染。\n\n### 5. **重排和重绘**\n- **DOM 修改**：频繁的 DOM 操作可能导致重排和重绘，从而影响渲染性能。\n- **样式变化**：动态更改元素样式也会引发重排，影响渲染流畅度。\n\n\n### 总结\n为了提高页面渲染性能，建议使用异步加载的脚本、优化资源加载、减少重排和重绘，并合理使用 CSS 和 JavaScript。  \n\n\n\n\n### 简单说一下 plugin 和 loader 的区别\n在前端构建工具（如 Webpack）中，**plugin** 和 **loader** 的主要区别如下：\n\n### Loader\n- **功能**：用于转换文件类型。Loader 可以将不同类型的文件（如 CSS、Sass、TypeScript 等）转换为 JavaScript 模块。\n- **使用场景**：例如，将 Sass 文件编译为 CSS，或将 TypeScript 转换为 JavaScript。\n- **运行时机**：在构建过程中，Loader 在模块被解析时执行。\n\n### Plugin\n- **功能**：用于扩展构建工具的功能，通常用于执行更复杂的任务，例如优化输出、生成文件等。\n- **使用场景**：例如，压缩 JavaScript 代码、生成 HTML 文件、提取 CSS 等。\n- **运行时机**：在整个构建过程的不同阶段执行，可以在构建的开始或结束时工作。\n\n### 总结\n- **Loader** 是对文件进行转换的工具，专注于单个文件的处理。\n- **Plugin** 是用于增强构建过程的工具，可以在多种构建阶段执行更复杂的任务。 \n\n\n### react.memo\n\n\n`React.memo` 是一个高阶组件，用于优化函数组件的性能。它通过避免不必要的渲染来提升性能，特别是在组件的 props 没有变化时。\n\n### 主要特点\n\n1. **性能优化**：\n   - `React.memo` 只会在组件的 props 改变时重新渲染组件。如果 props 没有变化，React 会复用之前的渲染结果。\n\n2. **用法**：\n   - 你可以将一个函数组件包裹在 `React.memo` 中，以实现性能优化。\n\n   ```javascript\n   import React from 'react';\n\n   const MyComponent = React.memo(({ prop1, prop2 }) => {\n       // 组件逻辑\n       return <div>{prop1} - {prop2}</div>;\n   });\n   ```\n\n3. **自定义比较函数**：\n   - 默认情况下，`React.memo` 使用浅比较来判断 props 是否变化。你可以提供一个自定义的比较函数，以实现更复杂的比较逻辑。\n\n   ```javascript\n   const MyComponent = React.memo(\n       ({ prop1, prop2 }) => {\n           // 组件逻辑\n           return <div>{prop1} - {prop2}</div>;\n       },\n       (prevProps, nextProps) => {\n           // 自定义比较逻辑\n           return prevProps.prop1 === nextProps.prop1 && prevProps.prop2 === nextProps.prop2;\n       }\n   );\n   ```\n\n### 使用场景\n- 当你有一个性能敏感的组件，并且它的渲染依赖于 props 的变化时，使用 `React.memo` 可以提高性能。\n- 特别适合用于渲染列表或复杂组件，减少不必要的重渲染。\n\n### 注意事项\n- 如果组件的 props 经常变化，使用 `React.memo` 可能会适得其反，增加额外的开销。\n- 在使用 `React.memo` 时，确保你了解组件的渲染逻辑，以便做出合理的性能优化决策。\n\n### 总结\n`React.memo` 是一个简单而有效的性能优化工具，适用于需要减少不必要渲染的函数组件。通过合理使用，可以显著提升 React 应用的性能。\n"}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiODgwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoibUlBQUEsMHBPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3Rfd3l6Ly4uLy4uL2Jsb2dzL21hcmtkb3duL3lpLXF1YW4ubWQiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCIjIyMgdHlwZSDlkowgaW50ZXJmYWNlIOeahOWMuuWIq1xcblxcbjEuIOWfuuacrOivreazlVxcblxcbmBgYHR5cGVzY3JpcHRcXG50eXBlIFVzZXIgPSB7XFxuICBuYW1lOiBzdHJpbmc7XFxuICBhZ2U6IG51bWJlcjtcXG59O1xcblxcbmludGVyZmFjZSBVc2VyIHtcXG4gIG5hbWU6IHN0cmluZztcXG4gIGFnZTogbnVtYmVyO1xcbn1cXG5cXG5cXG5gYGBcXG5cXG4yLiDkuLvopoHljLrliKtcXG5cXG48aW1nIHNyYz1cXFwiYXNzZXRzL3R5cGUtaW50ZXJmYWNlLmpwZ1xcXCIgYWx0PVxcXCJ0eXBlIOWSjCBpbnRlcmZhY2Ug55qE5Yy65YirXFxcIiB3aWR0aD1cXFwiODAlXFxcIj5cXG5cXG5cXG4qKuaAu+e7kyoqXFxuXFxudHlwZSDlkowgaW50ZXJmYWNlIOWcqCBUeXBlU2NyaXB0IOS4reWQhOacieS8mOWKv++8jOmAieaLqeWTquS4quWPluWGs+S6juWFt+S9k+eahOS9v+eUqOWcuuaZr+OAguWmguaenOS9oOmcgOimgeWumuS5ieWvueixoeexu+Wei+aIluaJqeWxleaAp++8jOS8mOWFiOS9v+eUqCBpbnRlcmZhY2XvvJvlpoLmnpzpnIDopoHlpITnkIblpI3mnYLnmoTnsbvlnovnu4TlkIjvvIzkvb/nlKggdHlwZeOAguW4jOacm+i/meS6m+WvueavlOiDveW4ruWKqeS9oOabtOWlveWcsOeQhuino+Wug+S7rOeahOWMuuWIq++8geWmguaenOacieabtOWkmumXrumimO+8jOmaj+aXtuWRiuivieaIkVxcblxcblxcblxcbiMjIyBKUyDkuK3nmoTln7rmnKznsbvlnovlkozlvJXnlKjnsbvlnovnmoTljLrliKtcXG5cXG7mja7nsbvlnovliIbkuLog5Z+65pys57G75Z6L77yIUHJpbWl0aXZlIFR5cGVz77yJIOWSjCDlvJXnlKjnsbvlnovvvIhSZWZlcmVuY2UgVHlwZXPvvInjgILlroPku6znmoTljLrliKvkuLvopoHkvZPnjrDlnKjlrZjlgqjmlrnlvI/jgIHotYvlgLzooYzkuLrjgIHmr5TovoPmlrnlvI/lkozlhoXlrZjnrqHnkIbnrYnmlrnpnaLjgILku6XkuIvmmK/or6bnu4bnmoTlr7nmr5TvvJpcXG5cXG4xLiDln7rmnKznsbvlnovvvIhQcmltaXRpdmUgVHlwZXPvvIlcXG5cXG7ljIXlkKvnsbvlnos6IG51bWJlciBzdHJpbmcgYm9vbGVhbiBudWxsIHVuZGVmaW5lZCBzeW1ib2zvvIhFUzYg5paw5aKe77yJYmlnaW5077yIRVMyMDIwIOaWsOWinlxcblxcbuWtmOWCqOaWueW8j++8muWAvOebtOaOpeWtmOWCqOWcqOagiOWGheWtmOS4reOAglxcblxcbui1i+WAvOihjOS4uu+8mui1i+WAvOaXtuS8muWkjeWItuWAvO+8jOS4pOS4quWPmOmHj+S6kuS4jeW9seWTjVxcblxcbuWGheWtmOeuoeeQhu+8muWfuuacrOexu+Wei+eahOWAvOaYr+S4jeWPr+WPmOeahO+8iGltbXV0YWJsZe+8ie+8jOS/ruaUueaXtuS8muWIm+W7uuS4gOS4quaWsOWAvOOAglxcblxcblxcbuW8leeUqOexu+Wei++8iFJlZmVyZW5jZSBUeXBlc++8iVxcblxcbuWMheWQq+exu+Weizogb2JqZWN0IGFycmF5IGZ1bmN0aW9uIGRhdGUgcmVnZXhwIFxcblxcbuWtmOWCqOaWueW8j++8muWAvOWtmOWCqOWcqOWghuWGheWtmOS4re+8jOagiOWGheWtmOS4reWtmOWCqOeahOaYr+WghuWGheWtmOWcsOWdgO+8iOW8leeUqO+8ieOAglxcblxcbui1i+WAvOihjOS4uu+8mui1i+WAvOaXtuWkjeWItueahOaYr+W8leeUqO+8iOWcsOWdgO+8ie+8jOS4pOS4quWPmOmHj+aMh+WQkeWQjOS4gOS4quWvueixoeOAglxcbmphdmFzY3JpcHRcXG5cXG7lhoXlrZjnrqHnkIbvvJrlvJXnlKjnsbvlnovnmoTlgLzmmK/lj6/lj5jnmoTvvIhtdXRhYmxl77yJ77yM5L+u5pS55a+56LGh5pe25LiN5Lya5Yib5bu65paw5a+56LGh44CCXFxuXFxu5q+U6L6D5pa55byP77ya5q+U6L6D55qE5piv5byV55So77yI5Zyw5Z2A77yJ77yM6ICM5LiN5piv5YC844CCXFxuXFxuXFxuXFxuXFxuXFxuIyMjIEpTIOS4reeahOS6i+S7tuW+queOr1xcblxcbkphdmFTY3JpcHQg5piv5Y2V57q/56iL55qE77yM5L2G5a6D6YCa6L+H5LqL5Lu25b6q546v5a6e546w5LqG5byC5q2l6KGM5Li644CC5LqL5Lu25b6q546v55qE5qC45b+D5YyF5ous5Lul5LiL5Yeg5Liq6YOo5YiG77yaXFxuXFxu6LCD55So5qCI77yIQ2FsbCBTdGFja++8ie+8mueUqOS6juWtmOWCqOWHveaVsOeahOaJp+ihjOS4iuS4i+aWh++8jOmBteW+quWFiOi/m+WQjuWHuu+8iExJRk/vvInnmoTljp/liJnjgIJcXG5cXG7ku7vliqHpmJ/liJfvvIhUYXNrIFF1ZXVl77yJ77ya55So5LqO5a2Y5YKo5b6F5omn6KGM55qE5Zue6LCD5Ye95pWw77yI5aaCIHNldFRpbWVvdXTjgIFQcm9taXNlIOetie+8ieOAglxcblxcbuW+ruS7u+WKoemYn+WIl++8iE1pY3JvdGFzayBRdWV1Ze+8ie+8mueUqOS6juWtmOWCqOmrmOS8mOWFiOe6p+eahOWbnuiwg+WHveaVsO+8iOWmgiBQcm9taXNlIOeahCB0aGVu44CBTXV0YXRpb25PYnNlcnZlciDnrYnvvInjgIJcXG5cXG7kuovku7blvqrnjq/vvJrkuI3mlq3mo4Dmn6XosIPnlKjmoIjlkozku7vliqHpmJ/liJfvvIzlsIbku7vliqHpmJ/liJfkuK3nmoTlm57osIPlh73mlbDmjqjlhaXosIPnlKjmoIjmiafooYzjgIJcXG5cXG4qKuS6i+S7tuW+queOr+eahOaJp+ihjOmhuuW6jyoqXFxuXFxu5ZCM5q2l5Luj56CB77ya5pyA5YWI5omn6KGM44CCXFxuXFxu5b6u5Lu75Yqh77ya5Zyo5ZCM5q2l5Luj56CB5omn6KGM5a6M5ZCO77yM56uL5Y2z5omn6KGM5omA5pyJ5b6u5Lu75Yqh44CCXFxuXFxu5a6P5Lu75Yqh77ya5q+P5qyh5LuO5Lu75Yqh6Zif5YiX5Lit5Y+W5Ye65LiA5Liq5a6P5Lu75Yqh5omn6KGM44CCXFxuXFxu6YeN5aSN77ya6YeN5aSN5LiK6L+w6L+H56iL44CCXFxuXFxuKirlro/ku7vliqHvvIhNYWNyb3Rhc2tz77yJKipcXG5cXG5zZXRUaW1lb3V0XFxuc2V0SW50ZXJ2YWxcXG5zZXRJbW1lZGlhdGXvvIhOb2RlLmpz77yJXFxuSS9PIOaTjeS9nO+8iOWmguaWh+S7tuivu+WGmeOAgee9kee7nOivt+axgu+8iVxcblVJIOa4suafk++8iOa1j+iniOWZqO+8iVxcblxcbioq5b6u5Lu75Yqh77yITWljcm90YXNrc++8iSoqXFxuXFxuUHJvbWlzZSDnmoQgdGhlbiDlkowgY2F0Y2hcXG5wcm9jZXNzLm5leHRUaWNr77yITm9kZS5qc++8iVxcbk11dGF0aW9uT2JzZXJ2ZXLvvIjmtY/op4jlmajvvIlcXG5cXG5cXG4qKua1j+iniOWZqOWSjCBOb2RlLmpzIOeahOS6i+S7tuW+queOr+W3ruW8gioqXFxuXFxu5rWP6KeI5Zmo77yaXFxu5LqL5Lu25b6q546v5YyF5ous5a6P5Lu75Yqh5ZKM5b6u5Lu75Yqh44CCXFxuXFxu5a6P5Lu75Yqh5YyF5ousIHNldFRpbWVvdXTjgIFzZXRJbnRlcnZhbOOAgUkvT+OAgVVJIOa4suafkyDnrYnjgIJcXG5cXG7lvq7ku7vliqHljIXmi6wgUHJvbWlzZeOAgU11dGF0aW9uT2JzZXJ2ZXIg562J44CCXFxuXFxuTm9kZS5qc++8mlxcblxcbuS6i+S7tuW+queOr+WIhuS4uuWkmuS4qumYtuaute+8iOWmgiB0aW1lcnPjgIFwb2xs44CBY2hlY2sg562J77yJ44CCXFxuXFxu5a6P5Lu75Yqh5YyF5ousIHNldFRpbWVvdXTjgIFzZXRJbW1lZGlhdGXjgIFJL08g562J44CCXFxuXFxu5b6u5Lu75Yqh5YyF5ousIFByb21pc2XjgIFwcm9jZXNzLm5leHRUaWNrIOetieOAglxcblxcblxcbioq5Li65LuA5LmI5b6u5Lu75Yqh5LyY5YWI5LqO5a6P5Lu75Yqh77yfKipcXG5cXG7lvq7ku7vliqHpgJrluLjnlKjkuo7lpITnkIbpq5jkvJjlhYjnuqfnmoTku7vliqHvvIjlpoIgUHJvbWlzZSDnmoTlm57osIPvvInvvIznoa7kv53lroPku6zog73lpJ/lsL3lv6vmiafooYzjgIJcXG5cXG4qKnByb2Nlc3MubmV4dFRpY2sg5ZKMIFByb21pc2Ug55qE5Yy65Yir77yfKipcXG5cXG7lnKggTm9kZS5qcyDkuK3vvIxwcm9jZXNzLm5leHRUaWNrIOeahOS8mOWFiOe6p+mrmOS6jiBQcm9taXNl77yM5Lya5Zyo5b2T5YmN6Zi25q6156uL5Y2z5omn6KGM44CCXFxuXFxuKirlpoLkvZXpgb/lhY3kuovku7blvqrnjq/pmLvloZ7vvJ8qKlxcblxcbumBv+WFjemVv+aXtumXtOi/kOihjOeahOWQjOatpeS7o+eggeOAglxcbuWwhuiAl+aXtuaTjeS9nOaUvuWFpeW8guatpeS7u+WKoeS4re+8iOWmgiBzZXRUaW1lb3V044CBUHJvbWlzZe+8ieOAglxcblxcblxcbiMjIyDljp/lnovpk77nmoTnu4jngrlcXG5cXG7lnKggSmF2YVNjcmlwdCDkuK3vvIzljp/lnovpk77vvIhQcm90b3R5cGUgQ2hhaW7vvIkg5piv5a+56LGh5LmL6Ze057un5om/5YWz57O755qE5Z+656GA44CCXFxuXFxuKioxLiDljp/lnovpk77nmoTmnoTmiJAqKlxcblxcbuavj+S4quWvueixoemDveacieS4gOS4quWGhemDqOWxnuaApyBbW1Byb3RvdHlwZV1d77yM5oyH5ZCR5YW25Y6f5Z6L5a+56LGh44CCXFxu5Y6f5Z6L5a+56LGh5Lmf5pyJ6Ieq5bex55qEIFtbUHJvdG90eXBlXV3vvIzlvaLmiJDkuIDmnaHpk77jgIJcXG7ljp/lnovpk77nmoTnu4jngrnmmK8gbnVsbO+8jOihqOekuuayoeacieabtOWkmueahOWOn+Wei+OAglxcblxcbioqMi4g5Y6f5Z6L6ZO+55qE5p+l5om+5py65Yi2KipcXG5cXG7lvZPorr/pl67kuIDkuKrlr7nosaHnmoTlsZ7mgKfmiJbmlrnms5Xml7bvvIxKYXZhU2NyaXB0IOW8leaTjuS8muaMieeFp+S7peS4i+atpemqpOafpeaJvu+8mlxcbuWcqOWvueixoeiHqui6q+afpeaJvuOAglxcblxcbuWmguaenOaJvuS4jeWIsO+8jOayv+edgOWOn+Wei+mTvuWQkeS4iuafpeaJvuOAglxcbuWmguaenOaJvuWIsOWOn+Wei+mTvueahOe7iOeCue+8iG51bGzvvInvvIzov5Tlm54gdW5kZWZpbmVk44CCXFxuXFxuXFxuKiozLiDljp/lnovpk77nmoTnu4jngrkqKlxcblxcbk9iamVjdC5wcm90b3R5cGUg5piv5aSn5aSa5pWw5a+56LGh55qE5pyA57uI5Y6f5Z6L44CCXFxuT2JqZWN0LnByb3RvdHlwZS5fX3Byb3RvX18g5pivIG51bGzvvIzooajnpLrljp/lnovpk77nmoTnu4jngrnjgIJcXG5cXG4qKjQuIOekuuS+iyoqXFxuXFxuYGBgamF2YXNjcmlwdFxcbmxldCBvYmogPSB7IG5hbWU6IFxcXCJBbGljZVxcXCIgfTtcXG5cXG5jb25zb2xlLmxvZyhvYmouX19wcm90b19fID09PSBPYmplY3QucHJvdG90eXBlKTsgLy8gdHJ1ZVxcbmNvbnNvbGUubG9nKE9iamVjdC5wcm90b3R5cGUuX19wcm90b19fKTsgLy8gbnVsbFxcblxcblxcbi8vIE9iamVjdC5jcmVhdGUobnVsbCnvvJrliJvlu7rkuIDkuKrmsqHmnInljp/lnovnmoTlr7nosaFcXG5sZXQgb2JqID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcXG5jb25zb2xlLmxvZyhvYmouX19wcm90b19fKTsgLy8gdW5kZWZpbmVkXFxuYGBgXFxuXFxuIyMjIHByb21pc2Ug5bi455So55qEIEFQSVxcblxcblByb21pc2UuYWxsKCkg562J5b6F5omA5pyJIFByb21pc2Ug5a6M5oiQ77yM6L+U5Zue5LiA5Liq5YyF5ZCr5omA5pyJ57uT5p6c55qE5pWw57uE44CC5aaC5p6c5pyJ5LiA5Liq5aSx6LSl77yM56uL5Y2z6L+U5Zue5aSx6LSl44CCXFxuXFxuUHJvbWlzZS5hbGxTZXR0bGVkKCkg562J5b6F5omA5pyJIFByb21pc2Ug5a6M5oiQ77yM6L+U5Zue5LiA5Liq5YyF5ZCr5omA5pyJ57uT5p6c55qE5a+56LGh5pWw57uE77yM5peg6K665oiQ5Yqf6L+Y5piv5aSx6LSl44CCXFxuXFxuUHJvbWlzZS5yYWNlKCkg6L+U5Zue56ys5LiA5Liq5a6M5oiQ55qEIFByb21pc2XvvIzml6DorrrmiJDlip/ov5jmmK/lpLHotKXjgIJcXG5cXG5Qcm9taXNlLmFueSgpIOi/lOWbnuesrOS4gOS4quaIkOWKn+eahCBQcm9taXNl44CC5aaC5p6c5omA5pyJIFByb21pc2Ug6YO95aSx6LSl77yM6L+U5Zue5LiA5LiqIEFnZ3JlZ2F0ZUVycm9y44CCXFxuXFxuIyMjIEVTTSDvvIhlczYgbW9kdWxl77yJ5ZKMIGNvbW1vbmpzIOeahOWMuuWIq1xcblxcbkVTTSDlkowgQ29tbW9uSlMg5pivIEphdmFTY3JpcHQg5Lit5Lik56eN5LiN5ZCM55qE5qih5Z2X5YyW6KeE6IyD44CC5a6D5Lus5Zyo6K+t5rOV44CB5Yqg6L295pa55byP5ZKM6YCC55So5Zy65pmv5LiK5pyJ5pi+6JGX55qE5Yy65Yir44CC5Lul5LiL5piv5a6D5Lus55qE6K+m57uG5a+55q+U77yaXFxuXFxuYGBganNcXG5cXG4vL+ivreazlSBDb21tb25KUyByZXF1aXJlIOWvvOWFpeaooeWdl++8jG1vZHVsZS5leHBvcnRzIOWvvOWHuuaooeWdl+OAglxcbi8vIOWvvOWFpVxcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcXG5cXG4vLyDlr7zlh7pcXG5tb2R1bGUuZXhwb3J0cyA9IHtcXG4gIG15RnVuY3Rpb246ICgpID0+IGNvbnNvbGUubG9nKFxcXCJIZWxsbywgQ29tbW9uSlMhXFxcIilcXG59O1xcblxcbi8vIEVTNiAoRVNNKSDkvb/nlKggaW1wb3J0IOWvvOWFpeaooeWdl++8jGV4cG9ydCDlr7zlh7rmqKHlnZfjgIJcXG5cXG4vLyDlr7zlhaVcXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xcblxcbi8vIOWvvOWHulxcbmV4cG9ydCBjb25zdCBteUZ1bmN0aW9uID0gKCkgPT4gY29uc29sZS5sb2coXFxcIkhlbGxvLCBFUzYhXFxcIik7XFxuYGBgXFxuXFxuXFxuKirliqDovb3mlrnlvI8qKlxcblxcbkNvbW1vbkpTXFxuXFxu5ZCM5q2l5Yqg6L2977ya5qih5Z2X5Zyo6L+Q6KGM5pe25Yqg6L2977yM6YCC55So5LqO5pyN5Yqh5Zmo56uv77yI5aaCIE5vZGUuanPvvInjgIJcXG5cXG7liqjmgIHlr7zlhaXvvJrmlK/mjIHov5DooYzml7bliqjmgIHliqDovb3mqKHlnZfjgIJcXG5cXG5gYGBqYXZhc2NyaXB0XFxuY29uc3QgbW9kdWxlTmFtZSA9ICdmcyc7XFxuY29uc3QgZnMgPSByZXF1aXJlKG1vZHVsZU5hbWUpO1xcbmBgYFxcblxcbkVTTVxcblxcbuW8guatpeWKoOi9ve+8muaooeWdl+WcqOe8luivkeaXtuWKoOi9ve+8jOmAgueUqOS6jua1j+iniOWZqOWSjOeOsOS7oyBKYXZhU2NyaXB0IOeOr+Wig+OAglxcblxcbumdmeaAgeWvvOWFpe+8muWvvOWFpeivreWPpeW/hemhu+WcqOaooeWdl+eahOmhtuWxgu+8jOS4jeiDveWKqOaAgeWKoOi9veOAglxcblxcbmBgYGphdmFzY3JpcHRcXG4vLyDpnZnmgIHlr7zlhaVcXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xcblxcbi8vIOWKqOaAgeWvvOWFpe+8iOmcgOimgeaUr+aMgeeahOeOr+Wig++8iVxcbmNvbnN0IG1vZHVsZU5hbWUgPSAnZnMnO1xcbmltcG9ydChtb2R1bGVOYW1lKS50aGVuKChmcykgPT4ge1xcbiAgLy8g5L2/55SoIGZzXFxufSk7XFxuYGBgXFxuXFxuKirpgILnlKjlnLrmma8qKlxcblxcbkNvbW1vbkpTIOaYryBOb2RlLmpzIOeahOm7mOiupOaooeWdl+WMluinhOiMg+OAglxcblxcbua1j+iniOWZqO+8mkVTTSDmqKHlnZfljJbmmK/mtY/op4jlmajnmoTmoIflh4ZcXG5cXG7njrDku6MgSmF2YVNjcmlwdO+8mumAgueUqOS6juaUr+aMgSBFU00g55qE546v5aKD77yI5aaC546w5Luj5rWP6KeI5Zmo44CBTm9kZS5qcyAxMivvvInjgIJcXG5cXG5FU006IOaUr+aMgeagkeaRh++8iFRyZWUgU2hha2luZ++8ie+8jOWPr+S7peS8mOWMluaJk+WMheS9k+enr+OAglxcblxcblxcblxcbiMjIyDmtY/op4jlmajnmoTmnInlh6Dnp43nvJPlrZjmlrnlvI9cXG5cXG4qKuW8uue8k+WtmCoqXFxuXFxu5by657yT5a2Y5piv5oyH5rWP6KeI5Zmo55u05o6l5LuO5pys5Zyw57yT5a2Y5Lit5Yqg6L296LWE5rqQ77yM5LiN5Lya5ZCR5pyN5Yqh5Zmo5Y+R6YCB6K+35rGC44CCXFxuXFxu5a6e546w5pa55byPXFxuXFxuRXhwaXJlc++8mkhUVFAvMS4wIOeahOWtl+aute+8jOaMh+Wumui1hOa6kOeahOi/h+acn+aXtumXtO+8iOe7neWvueaXtumXtO+8ieOAglxcblxcblxcbkNhY2hlLUNvbnRyb2zvvJpIVFRQLzEuMSDnmoTlrZfmrrXvvIzkvJjlhYjnuqfpq5jkuo4gRXhwaXJlc++8jOW4uOeUqOaMh+S7pOWMheaLrO+8mlxcblxcbm1heC1hZ2XvvJrotYTmupDnmoTmnIDlpKfnvJPlrZjml7bpl7TvvIjnp5LvvInjgIJcXG5cXG5uby1jYWNoZe+8muW8uuWItuWQkeacjeWKoeWZqOmqjOivgee8k+WtmOOAglxcblxcbm5vLXN0b3Jl77ya56aB5q2i57yT5a2Y44CCXFxuXFxucHVibGlj77ya6LWE5rqQ5Y+v5Lul6KKr5omA5pyJ55So5oi357yT5a2Y44CCXFxuXFxucHJpdmF0Ze+8mui1hOa6kOWPquiDveiiq+WNleS4queUqOaIt+e8k+WtmOOAglxcblxcbmBgYFxcbkNhY2hlLUNvbnRyb2w6IG1heC1hZ2U9MzYwMFxcbmBgYFxcblxcbioq54m554K5Kio6IOe8k+WtmOacieaViOacn+WGhe+8jOa1j+iniOWZqOebtOaOpeS7juacrOWcsOWKoOi9vei1hOa6kO+8jOS4jeS8muWPkemAgeivt+axguOAglxcbue8k+WtmOi/h+acn+WQju+8jOa1j+iniOWZqOS8muWQkeacjeWKoeWZqOWPkemAgeivt+axgumqjOivgee8k+WtmOOAglxcblxcbioq5Y2P5ZWG57yT5a2YKipcXG5cXG7ljY/llYbnvJPlrZjmmK/mjIfmtY/op4jlmajlkJHmnI3liqHlmajlj5HpgIHor7fmsYLpqozor4HnvJPlrZjmmK/lkKbmnInmlYjvvIzlpoLmnpzmnInmlYjliJnov5Tlm54gMzA0IOeKtuaAgeegge+8jOa1j+iniOWZqOS9v+eUqOacrOWcsOe8k+WtmOOAglxcblxcbkxhc3QtTW9kaWZpZWQgLyBJZi1Nb2RpZmllZC1TaW5jZe+8mlxcbuacjeWKoeWZqOi/lOWbnui1hOa6kOaXtu+8jOW4puS4iiBMYXN0LU1vZGlmaWVkIOWtl+aute+8jOihqOekuui1hOa6kOeahOacgOWQjuS/ruaUueaXtumXtOOAglxcbua1j+iniOWZqOWGjeasoeivt+axguaXtu+8jOW4puS4iiBJZi1Nb2RpZmllZC1TaW5jZSDlrZfmrrXvvIzmnI3liqHlmajmoLnmja7ml7bpl7TliKTmlq3otYTmupDmmK/lkKblj5jljJbjgIJcXG5cXG5FVGFnIC8gSWYtTm9uZS1NYXRjaO+8mlxcbuacjeWKoeWZqOi/lOWbnui1hOa6kOaXtu+8jOW4puS4iiBFVGFnIOWtl+aute+8jOihqOekuui1hOa6kOeahOWUr+S4gOagh+ivhuOAglxcbua1j+iniOWZqOWGjeasoeivt+axguaXtu+8jOW4puS4iiBJZi1Ob25lLU1hdGNoIOWtl+aute+8jOacjeWKoeWZqOagueaNruagh+ivhuWIpOaWrei1hOa6kOaYr+WQpuWPmOWMluOAglxcblxcblxcbioq54m554K5KipcXG5cXG7mtY/op4jlmajmr4/mrKHpg73kvJrlj5HpgIHor7fmsYLvvIzmnI3liqHlmajmoLnmja7nvJPlrZjmoIfor4bliKTmlq3otYTmupDmmK/lkKblj5jljJbjgIJcXG5cXG7lpoLmnpznvJPlrZjmnInmlYjvvIzov5Tlm54gMzA0IOeKtuaAgeegge+8jOa1j+iniOWZqOS9v+eUqOacrOWcsOe8k+WtmOOAglxcblxcblxcblxcbiMjIyDlnKjmtY/op4jlmajnmoTmuLLmn5Pov4fnqIvkuK3vvIzku4DkuYjmg4XlhrXkuIvkvJrpmLvloZ7muLLmn5NcXG7lnKjmtY/op4jlmajnmoTmuLLmn5Pov4fnqIvkuK3vvIzmnInlh6Dnp43mg4XlhrXlj6/og73kvJrlr7zoh7TmuLLmn5PooqvpmLvloZ7vvJpcXG5cXG4jIyMgMS4gKipKYXZhU2NyaXB0IOaJp+ihjCoqXFxuLSAqKuWQjOatpeiEmuacrCoq77ya5aaC5p6c5ZyoIEhUTUwg5Lit5L2/55So5LqGIGBzY3JpcHRgIOagh+etvuS4lOayoeaciSBgYXN5bmNgIOaIliBgZGVmZXJgIOWxnuaAp++8jOa1j+iniOWZqOS8muWcqOmBh+WIsOivpeiEmuacrOaXtuWBnOatoua4suafk++8jOebtOWIsOiEmuacrOaJp+ihjOWujOaIkOOAglxcbi0gKirplb/ml7bpl7Tov5DooYznmoTohJrmnKwqKu+8muWmguaenCBKYXZhU2NyaXB0IOS7o+eggeaJp+ihjOaXtumXtOi/h+mVv++8jOa4suafk+S8muiiq+mYu+Whnu+8jOWvvOiHtOeUqOaIt+S9k+mqjOS4i+mZjeOAglxcblxcbiMjIyAyLiAqKkNTUyDliqDovb0qKlxcbi0gKirpmLvloZ7moLflvI/ooagqKu+8muWcqOaWh+aho+S4re+8jENTUyDmlofku7bnmoTliqDovb3mmK/pmLvloZ7muLLmn5PnmoTjgILlpoLmnpwgQ1NTIOaWh+S7tuacquWKoOi9veWujOaIkO+8jOa1j+iniOWZqOS4jeS8mua4suafk+mhtemdou+8jOebtOWIsOagt+W8j+WPr+eUqOOAglxcbi0gKirlhoXogZTmoLflvI8qKu+8muWmguaenOWGheiBlOagt+W8j+WtmOWcqO+8jOWQjOagt+S8mumYu+Whnua4suafk+OAglxcblxcbiMjIyAzLiAqKuWbvueJh+WSjOWqkuS9k+i1hOa6kCoqXFxuLSAqKuWkp+WbvueJh+aWh+S7tioq77ya5aaC5p6c5Zu+54mH6LWE5rqQ6L6D5aSn5LiU5pyq6L+b6KGM5LyY5YyW77yM5Yqg6L295pe26Ze05Y+v6IO95Lya5b2x5ZON6aG16Z2i55qE5pW05L2T5riy5p+T44CCXFxuLSAqKuW7tui/n+WKoOi9veeahOi1hOa6kCoq77ya5pyq5q2j56Gu5a6e546w5oeS5Yqg6L2955qE5Zu+54mH5oiW6KeG6aKR5Y+v6IO95Lya5b2x5ZON6aaW5bGP5riy5p+T44CCXFxuXFxuIyMjIDQuICoq572R57uc6K+35rGCKipcXG4tICoq5byC5q2l6K+35rGCKirvvJrlpoLmnpzpobXpnaLkvp3otZbkuo7lvILmraXor7fmsYLvvIjlpoIgQUpBWO+8ie+8jOW5tuS4lOi/meS6m+ivt+axgue7k+aenOW9seWTjeS6humhtemdoueahOa4suafk++8jOWPr+iDveS8muWvvOiHtOa4suafk+W7tui/n+OAglxcbi0gKipIVFRQLzIg5LyY5YyWKirvvJrlnKjkvb/nlKggSFRUUC8yIOaXtu+8jOi1hOa6kOeahOWKoOi9veWPr+iDveS8muabtOmrmOaViO+8jOS9huS7jeeEtuWPr+iDveWHuueOsOafkOS6m+ivt+axgumYu+Whnua4suafk+OAglxcblxcbiMjIyA1LiAqKumHjeaOkuWSjOmHjee7mCoqXFxuLSAqKkRPTSDkv67mlLkqKu+8mumikee5geeahCBET00g5pON5L2c5Y+v6IO95a+86Ie06YeN5o6S5ZKM6YeN57uY77yM5LuO6ICM5b2x5ZON5riy5p+T5oCn6IO944CCXFxuLSAqKuagt+W8j+WPmOWMlioq77ya5Yqo5oCB5pu05pS55YWD57Sg5qC35byP5Lmf5Lya5byV5Y+R6YeN5o6S77yM5b2x5ZON5riy5p+T5rWB55WF5bqm44CCXFxuXFxuXFxuIyMjIOaAu+e7k1xcbuS4uuS6huaPkOmrmOmhtemdoua4suafk+aAp+iDve+8jOW7uuiuruS9v+eUqOW8guatpeWKoOi9veeahOiEmuacrOOAgeS8mOWMlui1hOa6kOWKoOi9veOAgeWHj+WwkemHjeaOkuWSjOmHjee7mO+8jOW5tuWQiOeQhuS9v+eUqCBDU1Mg5ZKMIEphdmFTY3JpcHTjgIIgIFxcblxcblxcblxcblxcbiMjIyDnroDljZXor7TkuIDkuIsgcGx1Z2luIOWSjCBsb2FkZXIg55qE5Yy65YirXFxu5Zyo5YmN56uv5p6E5bu65bel5YW377yI5aaCIFdlYnBhY2vvvInkuK3vvIwqKnBsdWdpbioqIOWSjCAqKmxvYWRlcioqIOeahOS4u+imgeWMuuWIq+WmguS4i++8mlxcblxcbiMjIyBMb2FkZXJcXG4tICoq5Yqf6IO9KirvvJrnlKjkuo7ovazmjaLmlofku7bnsbvlnovjgIJMb2FkZXIg5Y+v5Lul5bCG5LiN5ZCM57G75Z6L55qE5paH5Lu277yI5aaCIENTU+OAgVNhc3PjgIFUeXBlU2NyaXB0IOetie+8iei9rOaNouS4uiBKYXZhU2NyaXB0IOaooeWdl+OAglxcbi0gKirkvb/nlKjlnLrmma8qKu+8muS+i+Wmgu+8jOWwhiBTYXNzIOaWh+S7tue8luivkeS4uiBDU1PvvIzmiJblsIYgVHlwZVNjcmlwdCDovazmjaLkuLogSmF2YVNjcmlwdOOAglxcbi0gKirov5DooYzml7bmnLoqKu+8muWcqOaehOW7uui/h+eoi+S4re+8jExvYWRlciDlnKjmqKHlnZfooqvop6PmnpDml7bmiafooYzjgIJcXG5cXG4jIyMgUGx1Z2luXFxuLSAqKuWKn+iDvSoq77ya55So5LqO5omp5bGV5p6E5bu65bel5YW355qE5Yqf6IO977yM6YCa5bi455So5LqO5omn6KGM5pu05aSN5p2C55qE5Lu75Yqh77yM5L6L5aaC5LyY5YyW6L6T5Ye644CB55Sf5oiQ5paH5Lu2562J44CCXFxuLSAqKuS9v+eUqOWcuuaZryoq77ya5L6L5aaC77yM5Y6L57ypIEphdmFTY3JpcHQg5Luj56CB44CB55Sf5oiQIEhUTUwg5paH5Lu244CB5o+Q5Y+WIENTUyDnrYnjgIJcXG4tICoq6L+Q6KGM5pe25py6KirvvJrlnKjmlbTkuKrmnoTlu7rov4fnqIvnmoTkuI3lkIzpmLbmrrXmiafooYzvvIzlj6/ku6XlnKjmnoTlu7rnmoTlvIDlp4vmiJbnu5PmnZ/ml7blt6XkvZzjgIJcXG5cXG4jIyMg5oC757uTXFxuLSAqKkxvYWRlcioqIOaYr+WvueaWh+S7tui/m+ihjOi9rOaNoueahOW3peWFt++8jOS4k+azqOS6juWNleS4quaWh+S7tueahOWkhOeQhuOAglxcbi0gKipQbHVnaW4qKiDmmK/nlKjkuo7lop7lvLrmnoTlu7rov4fnqIvnmoTlt6XlhbfvvIzlj6/ku6XlnKjlpJrnp43mnoTlu7rpmLbmrrXmiafooYzmm7TlpI3mnYLnmoTku7vliqHjgIIgXFxuXFxuXFxuIyMjIHJlYWN0Lm1lbW9cXG5cXG5cXG5gUmVhY3QubWVtb2Ag5piv5LiA5Liq6auY6Zi257uE5Lu277yM55So5LqO5LyY5YyW5Ye95pWw57uE5Lu255qE5oCn6IO944CC5a6D6YCa6L+H6YG/5YWN5LiN5b+F6KaB55qE5riy5p+T5p2l5o+Q5Y2H5oCn6IO977yM54m55Yir5piv5Zyo57uE5Lu255qEIHByb3BzIOayoeacieWPmOWMluaXtuOAglxcblxcbiMjIyDkuLvopoHnibnngrlcXG5cXG4xLiAqKuaAp+iDveS8mOWMlioq77yaXFxuICAgLSBgUmVhY3QubWVtb2Ag5Y+q5Lya5Zyo57uE5Lu255qEIHByb3BzIOaUueWPmOaXtumHjeaWsOa4suafk+e7hOS7tuOAguWmguaenCBwcm9wcyDmsqHmnInlj5jljJbvvIxSZWFjdCDkvJrlpI3nlKjkuYvliY3nmoTmuLLmn5Pnu5PmnpzjgIJcXG5cXG4yLiAqKueUqOazlSoq77yaXFxuICAgLSDkvaDlj6/ku6XlsIbkuIDkuKrlh73mlbDnu4Tku7bljIXoo7nlnKggYFJlYWN0Lm1lbW9gIOS4re+8jOS7peWunueOsOaAp+iDveS8mOWMluOAglxcblxcbiAgIGBgYGphdmFzY3JpcHRcXG4gICBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xcblxcbiAgIGNvbnN0IE15Q29tcG9uZW50ID0gUmVhY3QubWVtbygoeyBwcm9wMSwgcHJvcDIgfSkgPT4ge1xcbiAgICAgICAvLyDnu4Tku7bpgLvovpFcXG4gICAgICAgcmV0dXJuIDxkaXY+e3Byb3AxfSAtIHtwcm9wMn08L2Rpdj47XFxuICAgfSk7XFxuICAgYGBgXFxuXFxuMy4gKiroh6rlrprkuYnmr5TovoPlh73mlbAqKu+8mlxcbiAgIC0g6buY6K6k5oOF5Ya15LiL77yMYFJlYWN0Lm1lbW9gIOS9v+eUqOa1heavlOi+g+adpeWIpOaWrSBwcm9wcyDmmK/lkKblj5jljJbjgILkvaDlj6/ku6Xmj5DkvpvkuIDkuKroh6rlrprkuYnnmoTmr5TovoPlh73mlbDvvIzku6Xlrp7njrDmm7TlpI3mnYLnmoTmr5TovoPpgLvovpHjgIJcXG5cXG4gICBgYGBqYXZhc2NyaXB0XFxuICAgY29uc3QgTXlDb21wb25lbnQgPSBSZWFjdC5tZW1vKFxcbiAgICAgICAoeyBwcm9wMSwgcHJvcDIgfSkgPT4ge1xcbiAgICAgICAgICAgLy8g57uE5Lu26YC76L6RXFxuICAgICAgICAgICByZXR1cm4gPGRpdj57cHJvcDF9IC0ge3Byb3AyfTwvZGl2PjtcXG4gICAgICAgfSxcXG4gICAgICAgKHByZXZQcm9wcywgbmV4dFByb3BzKSA9PiB7XFxuICAgICAgICAgICAvLyDoh6rlrprkuYnmr5TovoPpgLvovpFcXG4gICAgICAgICAgIHJldHVybiBwcmV2UHJvcHMucHJvcDEgPT09IG5leHRQcm9wcy5wcm9wMSAmJiBwcmV2UHJvcHMucHJvcDIgPT09IG5leHRQcm9wcy5wcm9wMjtcXG4gICAgICAgfVxcbiAgICk7XFxuICAgYGBgXFxuXFxuIyMjIOS9v+eUqOWcuuaZr1xcbi0g5b2T5L2g5pyJ5LiA5Liq5oCn6IO95pWP5oSf55qE57uE5Lu277yM5bm25LiU5a6D55qE5riy5p+T5L6d6LWW5LqOIHByb3BzIOeahOWPmOWMluaXtu+8jOS9v+eUqCBgUmVhY3QubWVtb2Ag5Y+v5Lul5o+Q6auY5oCn6IO944CCXFxuLSDnibnliKvpgILlkIjnlKjkuo7muLLmn5PliJfooajmiJblpI3mnYLnu4Tku7bvvIzlh4/lsJHkuI3lv4XopoHnmoTph43muLLmn5PjgIJcXG5cXG4jIyMg5rOo5oSP5LqL6aG5XFxuLSDlpoLmnpznu4Tku7bnmoQgcHJvcHMg57uP5bi45Y+Y5YyW77yM5L2/55SoIGBSZWFjdC5tZW1vYCDlj6/og73kvJrpgILlvpflhbblj43vvIzlop7liqDpop3lpJbnmoTlvIDplIDjgIJcXG4tIOWcqOS9v+eUqCBgUmVhY3QubWVtb2Ag5pe277yM56Gu5L+d5L2g5LqG6Kej57uE5Lu255qE5riy5p+T6YC76L6R77yM5Lul5L6/5YGa5Ye65ZCI55CG55qE5oCn6IO95LyY5YyW5Yaz562W44CCXFxuXFxuIyMjIOaAu+e7k1xcbmBSZWFjdC5tZW1vYCDmmK/kuIDkuKrnroDljZXogIzmnInmlYjnmoTmgKfog73kvJjljJblt6XlhbfvvIzpgILnlKjkuo7pnIDopoHlh4/lsJHkuI3lv4XopoHmuLLmn5PnmoTlh73mlbDnu4Tku7bjgILpgJrov4flkIjnkIbkvb/nlKjvvIzlj6/ku6XmmL7okZfmj5DljYcgUmVhY3Qg5bqU55So55qE5oCn6IO944CCXFxuXCI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9