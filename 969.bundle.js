"use strict";(self.webpackChunkcboy_blog=self.webpackChunkcboy_blog||[]).push([[969],{969:function(e,n,t){t.r(n),t.d(n,{default:function(){return p}});var o=t(358);const i={class:"component-vue"},r={};var p=(0,t(389).A)(r,[["render",function(e,n){return(0,o.uX)(),(0,o.CE)("div",i,n[0]||(n[0]=[(0,o.Fv)('<p>vue 是一个 js 框架，它实现了自己的模板，通过 .vue 文件可以经过编译成一个数据改变驱动视图改变的 js代码。 那么这其中又是经历了什么样的步骤呢？</p><hr><p>一个 vue 对象是通过 new Vue({options}) 来得到的，也就是构造函数了。我们来看这个函数</p><pre><code>function Vue (options) {\n  if (process.env.NODE_ENV !== &#39;production&#39; &amp;&amp;\n    !(this instanceof Vue)\n  ) {\n    warn(&#39;Vue is a constructor and should be called with the `new` keyword&#39;)\n  }\n  this._init(options)\n}\n\n// 这里是一系列对这个函数进行的继承\ninitMixin(Vue)\nstateMixin(Vue)\neventsMixin(Vue)\nlifecycleMixin(Vue)\nrenderMixin(Vue)\n\nexport default Vue\n</code></pre><p>可以看到这个 Vue 构造函数，它经历了 5 个系列的mixin，并在新创建时会运行 _init(options) 方法。 那么我们来看看, 这五个 mixin 分别做了啥。</p><h5>第一个 initMixin</h5><p>它只做了一件事， 定义了 _init 方法，那么你就知道创造一个Vue 实例，它执行的 _init 方法就是上面这个方法了。</p><pre><code>Vue.prototype._init = function (options?: Object) {\n....\n}\n</code></pre><h5>第二个 stateMixin</h5><pre><code>  Object.defineProperty(Vue.prototype, &#39;$data&#39;, dataDef)  // 能够返回 data\n  Object.defineProperty(Vue.prototype, &#39;$props&#39;, propsDef) // 能够返回 props\n  Vue.prototype.$set = set // 就是我们用的 this.$set(this.people, &#39;name&#39;, ‘clever&#39;)方法, 下同。\n  Vue.prototype.$delete = del\n  Vue.prototype.$watch = function (\n   ....\n  }\n</code></pre><h5>第三个 eventsMixin</h5><pre><code>Vue.prototype.$on = function (eventname, fn) {\n....\n}\nVue.prototype._$once = function (eventname, fn) {\n // 监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。\n}\nVue.prototype._off = function (event, fn) {\n// 移除自定义事件监听器。\n}\nVue.prototype.$emit = function (event) {\n// 触发一个事件\n}\n</code></pre><h5>第四个 lifecycleMixin<img src="https://i-blog.csdnimg.cn/blog_migrate/0227c8c15285fbd179573e7cd8cb4718.png" alt="在这里插入图片描述"></h5><h5>第五个 renderMixin<img src="https://i-blog.csdnimg.cn/blog_migrate/715399a9ac35cef7c3aca2d3242ca5a3.png" alt="在这里插入图片描述"></h5><hr><p>好， 这个 Vue 继承了这些方法，它已经是一个完整的 Vue 了，而新创建的时候要执行 _init 方法了, 现在我们来看看这个方法里面做了写啥</p><ul><li>vm._uid = uid++ 创建 uid</li><li>合并 options</li><li>initLifecycle initEvents(vm) initRender(vm) callHook(vm, ‘beforeCreate’) initInjections(vm) // resolve injections before data/props initState(vm) initProvide(vm) // resolve provide after data/props callHook(vm, ‘created’)</li></ul><pre><code>关于 initLifecycle\n  vm.$parent = parent\n  vm.$root = parent ? parent.$root : vm\n  vm.$children = []\n  vm.$refs = {}\n  vm._watcher = null\n  vm._inactive = null\n  vm._directInactive = false\n  vm._isMounted = false\n  vm._isDestroyed = false\n  vm._isBeingDestroyed = false\n</code></pre><ul><li>initEvents</li></ul><pre><code>  vm._events = Object.create(null)\n  vm._hasHookEvent = false\n  // init parent attached events\n  const listeners = vm.$options._parentListeners\n  if (listeners) {\n    updateComponentListeners(vm, listeners)\n  }\n  就是判断父级是否有事件监听，然后给父级进行监听事件\n</code></pre><ul><li>initRender</li></ul><pre><code>   vm._vnode = null  // the root of the child tree\n  vm._staticTrees = null  // v-once cached trees\n  const options = vm.$options\n  const parentVnode = vm.$vnode = options._parentVnode // the placeholder node in parent tree\n  const renderContext = parentVnode &amp;&amp; parentVnode.context\n  vm.$slots = resolveSlots(options._renderChildren, renderContext)\n  vm.$scopedSlots = emptyObject\n  // 实例绑定 createElement 方法，以便可以正常在内部渲染\n // 参数顺序   tag, data, children, normalizationType, alwaysNormalize\n  // 内部使用从模板编译而来的渲染函数\n  \n  vm._c = (a, b, c, d) =&gt; createElement(vm, a, b, c, d, false)\n  // 公共版本必须是 normalization 的渲染函数\n  vm.$createElement = (a, b, c, d) =&gt; createElement(vm, a, b, c, d, true)\n\n  // $attrs &amp; $listeners 应该被监听热更新\n  const parentData = parentVnode &amp;&amp; parentVnode.data\n\n  if (process.env.NODE_ENV !== &#39;production&#39;) {\n    defineReactive(vm, &#39;$attrs&#39;, parentData &amp;&amp; parentData.attrs || emptyObject, () =&gt; {\n      !isUpdatingChildComponent &amp;&amp; warn(`$attrs is readonly.`, vm)\n    }, true)\n    defineReactive(vm, &#39;$listeners&#39;, options._parentListeners || emptyObject, () =&gt; {\n      !isUpdatingChildComponent &amp;&amp; warn(`$listeners is readonly.`, vm)\n    }, true)\n  } else {\n    defineReactive(vm, &#39;$attrs&#39;, parentData &amp;&amp; parentData.attrs || emptyObject, null, true)\n    defineReactive(vm, &#39;$listeners&#39;, options._parentListeners || emptyObject, null, true)\n  }\n</code></pre><ul><li><p>callHook(vm, ‘beforeCreate’) 执行 beforeCreate 函数</p></li><li><p>initInjections(vm) 收集注入的依赖</p></li></ul><pre><code>  const result = resolveInject(vm.$options.inject, vm)\n  if (result) {\n    toggleObserving(false)\n    Object.keys(result).forEach(key =&gt; {\n      if (process.env.NODE_ENV !== &#39;production&#39;) {\n        defineReactive(vm, key, result[key], () =&gt; {\n          warn(\n          \t`避免直接改变注入的值，因为将会重新渲染所提供这个值的组件, \n          \t改变的值是: &quot;${key}&quot;,\n            vm\n          )\n        })\n      } else {\n        defineReactive(vm, key, result[key])\n      }\n    })\n    toggleObserving(true)\n</code></pre><ul><li>initState 监听值收集依赖</li></ul><pre><code>  vm._watchers = []\n  const opts = vm.$options\n  if (opts.props) initProps(vm, opts.props) // 赋值 props 数据并收集依赖\n  if (opts.methods) initMethods(vm, opts.methods) // 赋值 vue 的各个 method\n  if (opts.data) {\n    initData(vm) // 收集依赖\n  } else {\n    observe(vm._data = {}, true /* asRootData */)\n  }\n  if (opts.computed) initComputed(vm, opts.computed) // 收集依赖\n  if (opts.watch &amp;&amp; opts.watch !== nativeWatch) {\n    initWatch(vm, opts.watch) // 初始化你写的监听对象\n  }\n \n</code></pre><ul><li>initProvide</li></ul><pre><code>  const provide = vm.$options.provide\n  if (provide) {\n    vm._provided = typeof provide === &#39;function&#39;\n      ? provide.call(vm)\n      : provide\n  }\n</code></pre><ul><li>callHook(vm, ‘created’) 执行 created 函数</li></ul><blockquote><p>这就是 _init 中各个函数所做的了。 我们可以看到总结过来就是 1.初始化了生命状态 2.进行事件上的监听 3.渲染视图的初始化；收集所用到的父组件的数据或事件 4.调用你写的 beforeCreate 方法 5.initState, 处理了 vue 中的各种数据(props/data/methods…), 也在这一步针对这些数据进行了依赖收集，数据更新绑定 6.初始化了 provide 的值， 也可以看出它没有被收集依赖， 是不会影响视图改变的 7.调用了你写的 created 方法了。</p></blockquote><p>以上，就是你 let app = new Vue() 这一步所发生的所有事情了。</p><p>那通过平时的使用我们知道，我们是通过调用 $mounted 能把它挂载上页面。所以接下来我们就可以来看看 vue 自己的 $mount 都做了些什么?</p><p>答: 就是把 template 或直接写的 render 函数，进行指令、事件等vue 中的语法解析编译成一个 AST 树。通过这个树，通过之前 initRender 中的 $createElement 方法可以生成虚拟DOM, 然后添加到页面中出，不就渲染出来了么。 如果大家使用过 Vue 的 $createElement 方法，相信就知道这个 ast 是怎么一个结构了，拿示例的来说</p><pre><code>createElement(\n  &#39;div&#39;,\n  [\n    &#39;先写一些文字&#39;,\n    createElement(&#39;h1&#39;, &#39;一则头条&#39;),\n    createElement(MyComponent, {\n      props: {\n        someProp: &#39;foobar&#39;\n      }\n    })\n  ]\n)\n</code></pre><hr><p>说完了整个过程，现在还比较疑惑的就是它的收集依赖，然后数据改变引起的视图改变到底怎么做呢？</p><p>也就是说我们要实现一个模式，vm 可能 data 对象中的一个值，比如 name 改变了，然后就调用重新渲染的函数，这里为了性能，是生成了一个虚拟 Dom, 然后比较哪里改变了进行相应的替换。 把这个模式抽象出来，就是我们需要一个</p><p>先说具体实现： 我们视图更新依赖到的值收集起来，这里把每一个依赖到的值称作 dep。每个依赖订阅与它有关的 vue 的 watcher 中心， 这里把 dep 所订阅的 watcher 叫做 sub。 那么 dep 被改变的时候，获取它订阅了那些 watcher， 通知他们进行 update 视图啦。</p><p>可以看我画的简图 <img src="https://i-blog.csdnimg.cn/blog_migrate/417c23088cb0224c6a4464651452c604.png" alt="在这里插入图片描述"><img src="https://i-blog.csdnimg.cn/blog_migrate/59c0e76f684052df524761ee8f4f6942.png" alt="在这里插入图片描述"></p><p>这就是依赖对象 和 一个 watcher 对象所涉及到的处理了。 Vue 中又是怎么把一个个的属性，进行操作变成依赖的呢？ 对应它的源码就是 defineReactive 方法。源码如图：</p><pre><code>export function defineReactive (obj, key, val, customSetter, shallow) {\n  const dep = new Dep()\n  \n  // 迎合预定义的getter / setter\n  const getter = property &amp;&amp; property.get\n  const setter = property &amp;&amp; property.set\n  if ((!getter || setter) &amp;&amp; arguments.length === 2) {\n    val = obj[key]\n  }\n  \n  let childOb = !shallow &amp;&amp; observe(val)\n  Object.defineProperty(obj, key, {\n    enumerable: true,\n    configurable: true,\n    get: function reactiveGetter () {\n      const value = getter ? getter.call(obj) : val\n      if (Dep.target) {\n        dep.depend()\n        if (childOb) {\n          childOb.dep.depend()\n          if (Array.isArray(value)) {\n            dependArray(value)\n          }\n        }\n      }\n      return value\n    },\n    set: function reactiveSetter (newVal) {\n      const value = getter ? getter.call(obj) : val\n      if (newVal === value || (newVal !== newVal &amp;&amp; value !== value)) {\n        return\n      }\n      if (setter) {\n        setter.call(obj, newVal)\n      } else {\n        val = newVal\n      }\n      childOb = !shallow &amp;&amp; observe(newVal)\n      dep.notify()\n    }\n  })\n}\n</code></pre><p>这里就是用的 Object.defineProperty 方法，它可以重写对象的属性的 get 和 set 方法。 当这个属性在 Vue 中被获取的时候，就开始收集依赖，把它收集在这个 vm 的 watcher 中心，并且让它订阅这个 watcher 。当这个属性被重新设置时， 就通知它所订阅的对象去更新。</p><p>大致要知道的就是这些了。关于具体是怎么实现把 template 编译成 ast 树， 具体是怎么把事件绑定上去的，你可以尽情的去猜想和推测，或者去看看具体的实现方式。但是 VUE 框架总体来说所做的就是这些事情了, 如果有觉得本文写的不清楚的地方可以提哈 = =</p>',43)]))}]])}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOTY5LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiNktBQWVBLE1BQU0saUJDQ2ZDLEVBQVMsQ0FBQyxFQUtoQixPQUZpQyxFLE9BQUEsR0FBZ0JBLEVBQVEsQ0FBQyxDQUFDLFMsZ0NESmpEQyxFQUFBQSxFQUFBQSxJQXlRSixNQXpRSUMsRUF5UUpDLEVBQUEsS0FBQUEsRUFBQSxLQXpRTkMsRUFBQUEsRUFBQUEsSUFBQSxpbFIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYm95LWJsb2cvLi4vLi4vYmxvZ3MvbWFya2Rvd24vdnVlLm1kIiwid2VicGFjazovL2Nib3ktYmxvZy8uLi8uLi9ibG9ncy9tYXJrZG93bi92dWUubWQ/MjlmMiJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+PGRpdiBjbGFzcz1cImNvbXBvbmVudC12dWVcIj48cD52dWUg5piv5LiA5LiqIGpzIOahhuaetu+8jOWug+WunueOsOS6huiHquW3seeahOaooeadv++8jOmAmui/hyAudnVlIOaWh+S7tuWPr+S7pee7j+i/h+e8luivkeaIkOS4gOS4quaVsOaNruaUueWPmOmpseWKqOinhuWbvuaUueWPmOeahCBqc+S7o+eggeOAglxu6YKj5LmI6L+Z5YW25Lit5Y+I5piv57uP5Y6G5LqG5LuA5LmI5qC355qE5q2l6aqk5ZGi77yfPC9wPlxuPGhyPlxuPHA+5LiA5LiqIHZ1ZSDlr7nosaHmmK/pgJrov4cgbmV3IFZ1ZSh7b3B0aW9uc30pIOadpeW+l+WIsOeahO+8jOS5n+WwseaYr+aehOmAoOWHveaVsOS6huOAguaIkeS7rOadpeeci+i/meS4quWHveaVsDwvcD5cbjxwcmUgdi1wcmU9XCJcIj48Y29kZT5mdW5jdGlvbiBWdWUgKG9wdGlvbnMpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJmFtcDsmYW1wO1xuICAgICEodGhpcyBpbnN0YW5jZW9mIFZ1ZSlcbiAgKSB7XG4gICAgd2FybignVnVlIGlzIGEgY29uc3RydWN0b3IgYW5kIHNob3VsZCBiZSBjYWxsZWQgd2l0aCB0aGUgYG5ld2Aga2V5d29yZCcpXG4gIH1cbiAgdGhpcy5faW5pdChvcHRpb25zKVxufVxuXG4vLyDov5nph4zmmK/kuIDns7vliJflr7nov5nkuKrlh73mlbDov5vooYznmoTnu6fmib9cbmluaXRNaXhpbihWdWUpXG5zdGF0ZU1peGluKFZ1ZSlcbmV2ZW50c01peGluKFZ1ZSlcbmxpZmVjeWNsZU1peGluKFZ1ZSlcbnJlbmRlck1peGluKFZ1ZSlcblxuZXhwb3J0IGRlZmF1bHQgVnVlXG48L2NvZGU+PC9wcmU+XG48cD7lj6/ku6XnnIvliLDov5nkuKogVnVlIOaehOmAoOWHveaVsO+8jOWug+e7j+WOhuS6hiA1IOS4quezu+WIl+eahG1peGlu77yM5bm25Zyo5paw5Yib5bu65pe25Lya6L+Q6KGMIF9pbml0KG9wdGlvbnMpIOaWueazleOAglxu6YKj5LmI5oiR5Lus5p2l55yL55yLLCDov5nkupTkuKogbWl4aW4g5YiG5Yir5YGa5LqG5ZWl44CCPC9wPlxuPGg1PuesrOS4gOS4qiAgaW5pdE1peGluPC9oNT5cbjxwPuWug+WPquWBmuS6huS4gOS7tuS6i++8jCDlrprkuYnkuoYgX2luaXQg5pa55rOV77yM6YKj5LmI5L2g5bCx55+l6YGT5Yib6YCg5LiA5LiqVnVlIOWunuS+i++8jOWug+aJp+ihjOeahCBfaW5pdCDmlrnms5XlsLHmmK/kuIrpnaLov5nkuKrmlrnms5XkuobjgII8L3A+XG48cHJlIHYtcHJlPVwiXCI+PGNvZGU+VnVlLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zPzogT2JqZWN0KSB7XG4uLi4uXG59XG48L2NvZGU+PC9wcmU+XG48aDU+56ys5LqM5LiqIHN0YXRlTWl4aW48L2g1PlxuPHByZSB2LXByZT1cIlwiPjxjb2RlPiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZS5wcm90b3R5cGUsICckZGF0YScsIGRhdGFEZWYpICAvLyDog73lpJ/ov5Tlm54gZGF0YVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLnByb3RvdHlwZSwgJyRwcm9wcycsIHByb3BzRGVmKSAvLyDog73lpJ/ov5Tlm54gcHJvcHNcbiAgVnVlLnByb3RvdHlwZS4kc2V0ID0gc2V0IC8vIOWwseaYr+aIkeS7rOeUqOeahCB0aGlzLiRzZXQodGhpcy5wZW9wbGUsICduYW1lJywg4oCYY2xldmVyJynmlrnms5UsIOS4i+WQjOOAglxuICBWdWUucHJvdG90eXBlLiRkZWxldGUgPSBkZWxcbiAgVnVlLnByb3RvdHlwZS4kd2F0Y2ggPSBmdW5jdGlvbiAoXG4gICAuLi4uXG4gIH1cbjwvY29kZT48L3ByZT5cbjxoNT7nrKzkuInkuKogZXZlbnRzTWl4aW48L2g1PlxuPHByZSB2LXByZT1cIlwiPjxjb2RlPlZ1ZS5wcm90b3R5cGUuJG9uID0gZnVuY3Rpb24gKGV2ZW50bmFtZSwgZm4pIHtcbi4uLi5cbn1cblZ1ZS5wcm90b3R5cGUuXyRvbmNlID0gZnVuY3Rpb24gKGV2ZW50bmFtZSwgZm4pIHtcbiAvLyDnm5HlkKzkuIDkuKroh6rlrprkuYnkuovku7bvvIzkvYbmmK/lj6rop6blj5HkuIDmrKHvvIzlnKjnrKzkuIDmrKHop6blj5HkuYvlkI7np7vpmaTnm5HlkKzlmajjgIJcbn1cblZ1ZS5wcm90b3R5cGUuX29mZiA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbi8vIOenu+mZpOiHquWumuS5ieS6i+S7tuebkeWQrOWZqOOAglxufVxuVnVlLnByb3RvdHlwZS4kZW1pdCA9IGZ1bmN0aW9uIChldmVudCkge1xuLy8g6Kem5Y+R5LiA5Liq5LqL5Lu2XG59XG48L2NvZGU+PC9wcmU+XG48aDU+56ys5Zub5LiqIGxpZmVjeWNsZU1peGluPGltZyBzcmM9XCJodHRwczovL2ktYmxvZy5jc2RuaW1nLmNuL2Jsb2dfbWlncmF0ZS8wMjI3YzhjMTUyODVmYmQxNzk1NzNlN2NkOGNiNDcxOC5wbmdcIiBhbHQ9XCLlnKjov5nph4zmj5LlhaXlm77niYfmj4/ov7BcIj48L2g1PlxuPGg1PuesrOS6lOS4qiByZW5kZXJNaXhpbjxpbWcgc3JjPVwiaHR0cHM6Ly9pLWJsb2cuY3NkbmltZy5jbi9ibG9nX21pZ3JhdGUvNzE1Mzk5YTlhYzM1Y2VmN2MzYWNhMmQzMjQyY2E1YTMucG5nXCIgYWx0PVwi5Zyo6L+Z6YeM5o+S5YWl5Zu+54mH5o+P6L+wXCI+PC9oNT5cbjxocj5cbjxwPuWlve+8jCDov5nkuKogVnVlIOe7p+aJv+S6hui/meS6m+aWueazle+8jOWug+W3sue7j+aYr+S4gOS4quWujOaVtOeahCBWdWUg5LqG77yM6ICM5paw5Yib5bu655qE5pe25YCZ6KaB5omn6KGMIF9pbml0IOaWueazleS6hiwg546w5Zyo5oiR5Lus5p2l55yL55yL6L+Z5Liq5pa55rOV6YeM6Z2i5YGa5LqG5YaZ5ZWlPC9wPlxuPHVsPlxuPGxpPnZtLl91aWQgPSB1aWQrKyDliJvlu7ogdWlkPC9saT5cbjxsaT7lkIjlubYgb3B0aW9uczwvbGk+XG48bGk+aW5pdExpZmVjeWNsZVxuaW5pdEV2ZW50cyh2bSlcbmluaXRSZW5kZXIodm0pXG5jYWxsSG9vayh2bSwg4oCYYmVmb3JlQ3JlYXRl4oCZKVxuaW5pdEluamVjdGlvbnModm0pIC8vIHJlc29sdmUgaW5qZWN0aW9ucyBiZWZvcmUgZGF0YS9wcm9wc1xuaW5pdFN0YXRlKHZtKVxuaW5pdFByb3ZpZGUodm0pIC8vIHJlc29sdmUgcHJvdmlkZSBhZnRlciBkYXRhL3Byb3BzXG5jYWxsSG9vayh2bSwg4oCYY3JlYXRlZOKAmSk8L2xpPlxuPC91bD5cbjxwcmUgdi1wcmU9XCJcIj48Y29kZT7lhbPkuo4gaW5pdExpZmVjeWNsZVxuICB2bS4kcGFyZW50ID0gcGFyZW50XG4gIHZtLiRyb290ID0gcGFyZW50ID8gcGFyZW50LiRyb290IDogdm1cbiAgdm0uJGNoaWxkcmVuID0gW11cbiAgdm0uJHJlZnMgPSB7fVxuICB2bS5fd2F0Y2hlciA9IG51bGxcbiAgdm0uX2luYWN0aXZlID0gbnVsbFxuICB2bS5fZGlyZWN0SW5hY3RpdmUgPSBmYWxzZVxuICB2bS5faXNNb3VudGVkID0gZmFsc2VcbiAgdm0uX2lzRGVzdHJveWVkID0gZmFsc2VcbiAgdm0uX2lzQmVpbmdEZXN0cm95ZWQgPSBmYWxzZVxuPC9jb2RlPjwvcHJlPlxuPHVsPlxuPGxpPmluaXRFdmVudHM8L2xpPlxuPC91bD5cbjxwcmUgdi1wcmU9XCJcIj48Y29kZT4gIHZtLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gIHZtLl9oYXNIb29rRXZlbnQgPSBmYWxzZVxuICAvLyBpbml0IHBhcmVudCBhdHRhY2hlZCBldmVudHNcbiAgY29uc3QgbGlzdGVuZXJzID0gdm0uJG9wdGlvbnMuX3BhcmVudExpc3RlbmVyc1xuICBpZiAobGlzdGVuZXJzKSB7XG4gICAgdXBkYXRlQ29tcG9uZW50TGlzdGVuZXJzKHZtLCBsaXN0ZW5lcnMpXG4gIH1cbiAg5bCx5piv5Yik5pat54i257qn5piv5ZCm5pyJ5LqL5Lu255uR5ZCs77yM54S25ZCO57uZ54i257qn6L+b6KGM55uR5ZCs5LqL5Lu2XG48L2NvZGU+PC9wcmU+XG48dWw+XG48bGk+aW5pdFJlbmRlcjwvbGk+XG48L3VsPlxuPHByZSB2LXByZT1cIlwiPjxjb2RlPiAgIHZtLl92bm9kZSA9IG51bGwgIC8vIHRoZSByb290IG9mIHRoZSBjaGlsZCB0cmVlXG4gIHZtLl9zdGF0aWNUcmVlcyA9IG51bGwgIC8vIHYtb25jZSBjYWNoZWQgdHJlZXNcbiAgY29uc3Qgb3B0aW9ucyA9IHZtLiRvcHRpb25zXG4gIGNvbnN0IHBhcmVudFZub2RlID0gdm0uJHZub2RlID0gb3B0aW9ucy5fcGFyZW50Vm5vZGUgLy8gdGhlIHBsYWNlaG9sZGVyIG5vZGUgaW4gcGFyZW50IHRyZWVcbiAgY29uc3QgcmVuZGVyQ29udGV4dCA9IHBhcmVudFZub2RlICZhbXA7JmFtcDsgcGFyZW50Vm5vZGUuY29udGV4dFxuICB2bS4kc2xvdHMgPSByZXNvbHZlU2xvdHMob3B0aW9ucy5fcmVuZGVyQ2hpbGRyZW4sIHJlbmRlckNvbnRleHQpXG4gIHZtLiRzY29wZWRTbG90cyA9IGVtcHR5T2JqZWN0XG4gIC8vIOWunuS+i+e7keWumiBjcmVhdGVFbGVtZW50IOaWueazle+8jOS7peS+v+WPr+S7peato+W4uOWcqOWGhemDqOa4suafk1xuIC8vIOWPguaVsOmhuuW6jyAgIHRhZywgZGF0YSwgY2hpbGRyZW4sIG5vcm1hbGl6YXRpb25UeXBlLCBhbHdheXNOb3JtYWxpemVcbiAgLy8g5YaF6YOo5L2/55So5LuO5qih5p2/57yW6K+R6ICM5p2l55qE5riy5p+T5Ye95pWwXG4gIFxuICB2bS5fYyA9IChhLCBiLCBjLCBkKSA9Jmd0OyBjcmVhdGVFbGVtZW50KHZtLCBhLCBiLCBjLCBkLCBmYWxzZSlcbiAgLy8g5YWs5YWx54mI5pys5b+F6aG75pivIG5vcm1hbGl6YXRpb24g55qE5riy5p+T5Ye95pWwXG4gIHZtLiRjcmVhdGVFbGVtZW50ID0gKGEsIGIsIGMsIGQpID0mZ3Q7IGNyZWF0ZUVsZW1lbnQodm0sIGEsIGIsIGMsIGQsIHRydWUpXG5cbiAgLy8gJGF0dHJzICZhbXA7ICRsaXN0ZW5lcnMg5bqU6K+l6KKr55uR5ZCs54Ot5pu05pawXG4gIGNvbnN0IHBhcmVudERhdGEgPSBwYXJlbnRWbm9kZSAmYW1wOyZhbXA7IHBhcmVudFZub2RlLmRhdGFcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGRlZmluZVJlYWN0aXZlKHZtLCAnJGF0dHJzJywgcGFyZW50RGF0YSAmYW1wOyZhbXA7IHBhcmVudERhdGEuYXR0cnMgfHwgZW1wdHlPYmplY3QsICgpID0mZ3Q7IHtcbiAgICAgICFpc1VwZGF0aW5nQ2hpbGRDb21wb25lbnQgJmFtcDsmYW1wOyB3YXJuKGAkYXR0cnMgaXMgcmVhZG9ubHkuYCwgdm0pXG4gICAgfSwgdHJ1ZSlcbiAgICBkZWZpbmVSZWFjdGl2ZSh2bSwgJyRsaXN0ZW5lcnMnLCBvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnMgfHwgZW1wdHlPYmplY3QsICgpID0mZ3Q7IHtcbiAgICAgICFpc1VwZGF0aW5nQ2hpbGRDb21wb25lbnQgJmFtcDsmYW1wOyB3YXJuKGAkbGlzdGVuZXJzIGlzIHJlYWRvbmx5LmAsIHZtKVxuICAgIH0sIHRydWUpXG4gIH0gZWxzZSB7XG4gICAgZGVmaW5lUmVhY3RpdmUodm0sICckYXR0cnMnLCBwYXJlbnREYXRhICZhbXA7JmFtcDsgcGFyZW50RGF0YS5hdHRycyB8fCBlbXB0eU9iamVjdCwgbnVsbCwgdHJ1ZSlcbiAgICBkZWZpbmVSZWFjdGl2ZSh2bSwgJyRsaXN0ZW5lcnMnLCBvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnMgfHwgZW1wdHlPYmplY3QsIG51bGwsIHRydWUpXG4gIH1cbjwvY29kZT48L3ByZT5cbjx1bD5cbjxsaT5cbjxwPmNhbGxIb29rKHZtLCDigJhiZWZvcmVDcmVhdGXigJkpIOaJp+ihjCBiZWZvcmVDcmVhdGUg5Ye95pWwPC9wPlxuPC9saT5cbjxsaT5cbjxwPmluaXRJbmplY3Rpb25zKHZtKSDmlLbpm4bms6jlhaXnmoTkvp3otZY8L3A+XG48L2xpPlxuPC91bD5cbjxwcmUgdi1wcmU9XCJcIj48Y29kZT4gIGNvbnN0IHJlc3VsdCA9IHJlc29sdmVJbmplY3Qodm0uJG9wdGlvbnMuaW5qZWN0LCB2bSlcbiAgaWYgKHJlc3VsdCkge1xuICAgIHRvZ2dsZU9ic2VydmluZyhmYWxzZSlcbiAgICBPYmplY3Qua2V5cyhyZXN1bHQpLmZvckVhY2goa2V5ID0mZ3Q7IHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGRlZmluZVJlYWN0aXZlKHZtLCBrZXksIHJlc3VsdFtrZXldLCAoKSA9Jmd0OyB7XG4gICAgICAgICAgd2FybihcbiAgICAgICAgICBcdGDpgb/lhY3nm7TmjqXmlLnlj5jms6jlhaXnmoTlgLzvvIzlm6DkuLrlsIbkvJrph43mlrDmuLLmn5PmiYDmj5Dkvpvov5nkuKrlgLznmoTnu4Tku7YsIFxuICAgICAgICAgIFx05pS55Y+Y55qE5YC85pivOiBcIiR7a2V5fVwiLFxuICAgICAgICAgICAgdm1cbiAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWZpbmVSZWFjdGl2ZSh2bSwga2V5LCByZXN1bHRba2V5XSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHRvZ2dsZU9ic2VydmluZyh0cnVlKVxuPC9jb2RlPjwvcHJlPlxuPHVsPlxuPGxpPmluaXRTdGF0ZSDnm5HlkKzlgLzmlLbpm4bkvp3otZY8L2xpPlxuPC91bD5cbjxwcmUgdi1wcmU9XCJcIj48Y29kZT4gIHZtLl93YXRjaGVycyA9IFtdXG4gIGNvbnN0IG9wdHMgPSB2bS4kb3B0aW9uc1xuICBpZiAob3B0cy5wcm9wcykgaW5pdFByb3BzKHZtLCBvcHRzLnByb3BzKSAvLyDotYvlgLwgcHJvcHMg5pWw5o2u5bm25pS26ZuG5L6d6LWWXG4gIGlmIChvcHRzLm1ldGhvZHMpIGluaXRNZXRob2RzKHZtLCBvcHRzLm1ldGhvZHMpIC8vIOi1i+WAvCB2dWUg55qE5ZCE5LiqIG1ldGhvZFxuICBpZiAob3B0cy5kYXRhKSB7XG4gICAgaW5pdERhdGEodm0pIC8vIOaUtumbhuS+nei1llxuICB9IGVsc2Uge1xuICAgIG9ic2VydmUodm0uX2RhdGEgPSB7fSwgdHJ1ZSAvKiBhc1Jvb3REYXRhICovKVxuICB9XG4gIGlmIChvcHRzLmNvbXB1dGVkKSBpbml0Q29tcHV0ZWQodm0sIG9wdHMuY29tcHV0ZWQpIC8vIOaUtumbhuS+nei1llxuICBpZiAob3B0cy53YXRjaCAmYW1wOyZhbXA7IG9wdHMud2F0Y2ggIT09IG5hdGl2ZVdhdGNoKSB7XG4gICAgaW5pdFdhdGNoKHZtLCBvcHRzLndhdGNoKSAvLyDliJ3lp4vljJbkvaDlhpnnmoTnm5HlkKzlr7nosaFcbiAgfVxuIFxuPC9jb2RlPjwvcHJlPlxuPHVsPlxuPGxpPmluaXRQcm92aWRlPC9saT5cbjwvdWw+XG48cHJlIHYtcHJlPVwiXCI+PGNvZGU+ICBjb25zdCBwcm92aWRlID0gdm0uJG9wdGlvbnMucHJvdmlkZVxuICBpZiAocHJvdmlkZSkge1xuICAgIHZtLl9wcm92aWRlZCA9IHR5cGVvZiBwcm92aWRlID09PSAnZnVuY3Rpb24nXG4gICAgICA/IHByb3ZpZGUuY2FsbCh2bSlcbiAgICAgIDogcHJvdmlkZVxuICB9XG48L2NvZGU+PC9wcmU+XG48dWw+XG48bGk+Y2FsbEhvb2sodm0sIOKAmGNyZWF0ZWTigJkpIOaJp+ihjCBjcmVhdGVkIOWHveaVsDwvbGk+XG48L3VsPlxuPGJsb2NrcXVvdGU+XG48cD7ov5nlsLHmmK8gX2luaXQg5Lit5ZCE5Liq5Ye95pWw5omA5YGa55qE5LqG44CCIOaIkeS7rOWPr+S7peeci+WIsOaAu+e7k+i/h+adpeWwseaYr1xuMS7liJ3lp4vljJbkuobnlJ/lkb3nirbmgIFcbjIu6L+b6KGM5LqL5Lu25LiK55qE55uR5ZCsXG4zLua4suafk+inhuWbvueahOWIneWni+WMlu+8m+aUtumbhuaJgOeUqOWIsOeahOeItue7hOS7tueahOaVsOaNruaIluS6i+S7tlxuNC7osIPnlKjkvaDlhpnnmoQgYmVmb3JlQ3JlYXRlIOaWueazlVxuNS5pbml0U3RhdGUsIOWkhOeQhuS6hiB2dWUg5Lit55qE5ZCE56eN5pWw5o2uKHByb3BzL2RhdGEvbWV0aG9kc+KApiksIOS5n+WcqOi/meS4gOatpemSiOWvuei/meS6m+aVsOaNrui/m+ihjOS6huS+nei1luaUtumbhu+8jOaVsOaNruabtOaWsOe7keWumlxuNi7liJ3lp4vljJbkuoYgcHJvdmlkZSDnmoTlgLzvvIwg5Lmf5Y+v5Lul55yL5Ye65a6D5rKh5pyJ6KKr5pS26ZuG5L6d6LWW77yMIOaYr+S4jeS8muW9seWTjeinhuWbvuaUueWPmOeahFxuNy7osIPnlKjkuobkvaDlhpnnmoQgY3JlYXRlZCDmlrnms5XkuobjgII8L3A+XG48L2Jsb2NrcXVvdGU+XG48cD7ku6XkuIrvvIzlsLHmmK/kvaAgbGV0IGFwcCA9IG5ldyBWdWUoKSDov5nkuIDmraXmiYDlj5HnlJ/nmoTmiYDmnInkuovmg4XkuobjgII8L3A+XG48cD7pgqPpgJrov4flubPml7bnmoTkvb/nlKjmiJHku6znn6XpgZPvvIzmiJHku6zmmK/pgJrov4fosIPnlKggJG1vdW50ZWQg6IO95oqK5a6D5oyC6L295LiK6aG16Z2i44CC5omA5Lul5o6l5LiL5p2l5oiR5Lus5bCx5Y+v5Lul5p2l55yL55yLIHZ1ZSDoh6rlt7HnmoQgJG1vdW50IOmDveWBmuS6huS6m+S7gOS5iD88L3A+XG48cD7nrZQ6IOWwseaYr+aKiiB0ZW1wbGF0ZSDmiJbnm7TmjqXlhpnnmoQgcmVuZGVyIOWHveaVsO+8jOi/m+ihjOaMh+S7pOOAgeS6i+S7tuetiXZ1ZSDkuK3nmoTor63ms5Xop6PmnpDnvJbor5HmiJDkuIDkuKogQVNUIOagkeOAgumAmui/h+i/meS4quagke+8jOmAmui/h+S5i+WJjSBpbml0UmVuZGVyIOS4reeahCAkY3JlYXRlRWxlbWVudCDmlrnms5Xlj6/ku6XnlJ/miJDomZrmi59ET00sIOeEtuWQjua3u+WKoOWIsOmhtemdouS4reWHuu+8jOS4jeWwsea4suafk+WHuuadpeS6huS5iOOAgiDlpoLmnpzlpKflrrbkvb/nlKjov4cgVnVlIOeahCAkY3JlYXRlRWxlbWVudCDmlrnms5XvvIznm7jkv6HlsLHnn6XpgZPov5nkuKogYXN0IOaYr+aAjuS5iOS4gOS4que7k+aehOS6hu+8jOaLv+ekuuS+i+eahOadpeivtDwvcD5cbjxwcmUgdi1wcmU9XCJcIj48Y29kZT5jcmVhdGVFbGVtZW50KFxuICAnZGl2JyxcbiAgW1xuICAgICflhYjlhpnkuIDkupvmloflrZcnLFxuICAgIGNyZWF0ZUVsZW1lbnQoJ2gxJywgJ+S4gOWImeWktOadoScpLFxuICAgIGNyZWF0ZUVsZW1lbnQoTXlDb21wb25lbnQsIHtcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIHNvbWVQcm9wOiAnZm9vYmFyJ1xuICAgICAgfVxuICAgIH0pXG4gIF1cbilcbjwvY29kZT48L3ByZT5cbjxocj5cbjxwPuivtOWujOS6huaVtOS4qui/h+eoi++8jOeOsOWcqOi/mOavlOi+g+eWkeaDkeeahOWwseaYr+Wug+eahOaUtumbhuS+nei1lu+8jOeEtuWQjuaVsOaNruaUueWPmOW8lei1t+eahOinhuWbvuaUueWPmOWIsOW6leaAjuS5iOWBmuWRou+8nzwvcD5cbjxwPuS5n+WwseaYr+ivtOaIkeS7rOimgeWunueOsOS4gOS4quaooeW8j++8jHZtIOWPr+iDvSBkYXRhIOWvueixoeS4reeahOS4gOS4quWAvO+8jOavlOWmgiBuYW1lIOaUueWPmOS6hu+8jOeEtuWQjuWwseiwg+eUqOmHjeaWsOa4suafk+eahOWHveaVsO+8jOi/memHjOS4uuS6huaAp+iDve+8jOaYr+eUn+aIkOS6huS4gOS4quiZmuaLnyBEb20sIOeEtuWQjuavlOi+g+WTqumHjOaUueWPmOS6hui/m+ihjOebuOW6lOeahOabv+aNouOAglxu5oqK6L+Z5Liq5qih5byP5oq96LGh5Ye65p2l77yM5bCx5piv5oiR5Lus6ZyA6KaB5LiA5LiqPC9wPlxuPHA+5YWI6K+05YW35L2T5a6e546w77yaIOaIkeS7rOinhuWbvuabtOaWsOS+nei1luWIsOeahOWAvOaUtumbhui1t+adpe+8jOi/memHjOaKiuavj+S4gOS4quS+nei1luWIsOeahOWAvOensOS9nCBkZXDjgILmr4/kuKrkvp3otZborqLpmIXkuI7lroPmnInlhbPnmoQgdnVlIOeahCB3YXRjaGVyIOS4reW/g++8jCDov5nph4zmioogZGVwIOaJgOiuoumYheeahCB3YXRjaGVyIOWPq+WBmiBzdWLjgIIg6YKj5LmIIGRlcCDooqvmlLnlj5jnmoTml7blgJnvvIzojrflj5blroPorqLpmIXkuobpgqPkupsgd2F0Y2hlcu+8jCDpgJrnn6Xku5bku6zov5vooYwgdXBkYXRlIOinhuWbvuWVpuOAgjwvcD5cbjxwPuWPr+S7peeci+aIkeeUu+eahOeugOWbvlxuPGltZyBzcmM9XCJodHRwczovL2ktYmxvZy5jc2RuaW1nLmNuL2Jsb2dfbWlncmF0ZS80MTdjMjMwODhjYjAyMjRjNmE0NDY0NjUxNDUyYzYwNC5wbmdcIiBhbHQ9XCLlnKjov5nph4zmj5LlhaXlm77niYfmj4/ov7BcIj5cbjxpbWcgc3JjPVwiaHR0cHM6Ly9pLWJsb2cuY3NkbmltZy5jbi9ibG9nX21pZ3JhdGUvNTljMGU3NmY2ODQwNTJkZjUyNDc2MWVlOGY0ZjY5NDIucG5nXCIgYWx0PVwi5Zyo6L+Z6YeM5o+S5YWl5Zu+54mH5o+P6L+wXCI+PC9wPlxuPHA+6L+Z5bCx5piv5L6d6LWW5a+56LGhIOWSjCDkuIDkuKogd2F0Y2hlciDlr7nosaHmiYDmtonlj4rliLDnmoTlpITnkIbkuobjgIJcblZ1ZSDkuK3lj4jmmK/mgI7kuYjmiorkuIDkuKrkuKrnmoTlsZ7mgKfvvIzov5vooYzmk43kvZzlj5jmiJDkvp3otZbnmoTlkaLvvJ9cbuWvueW6lOWug+eahOa6kOeggeWwseaYryBkZWZpbmVSZWFjdGl2ZSDmlrnms5XjgILmupDnoIHlpoLlm77vvJo8L3A+XG48cHJlIHYtcHJlPVwiXCI+PGNvZGU+ZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVJlYWN0aXZlIChvYmosIGtleSwgdmFsLCBjdXN0b21TZXR0ZXIsIHNoYWxsb3cpIHtcbiAgY29uc3QgZGVwID0gbmV3IERlcCgpXG4gIFxuICAvLyDov47lkIjpooTlrprkuYnnmoRnZXR0ZXIgLyBzZXR0ZXJcbiAgY29uc3QgZ2V0dGVyID0gcHJvcGVydHkgJmFtcDsmYW1wOyBwcm9wZXJ0eS5nZXRcbiAgY29uc3Qgc2V0dGVyID0gcHJvcGVydHkgJmFtcDsmYW1wOyBwcm9wZXJ0eS5zZXRcbiAgaWYgKCghZ2V0dGVyIHx8IHNldHRlcikgJmFtcDsmYW1wOyBhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgdmFsID0gb2JqW2tleV1cbiAgfVxuICBcbiAgbGV0IGNoaWxkT2IgPSAhc2hhbGxvdyAmYW1wOyZhbXA7IG9ic2VydmUodmFsKVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIHJlYWN0aXZlR2V0dGVyICgpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbFxuICAgICAgaWYgKERlcC50YXJnZXQpIHtcbiAgICAgICAgZGVwLmRlcGVuZCgpXG4gICAgICAgIGlmIChjaGlsZE9iKSB7XG4gICAgICAgICAgY2hpbGRPYi5kZXAuZGVwZW5kKClcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGRlcGVuZEFycmF5KHZhbHVlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHJlYWN0aXZlU2V0dGVyIChuZXdWYWwpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbFxuICAgICAgaWYgKG5ld1ZhbCA9PT0gdmFsdWUgfHwgKG5ld1ZhbCAhPT0gbmV3VmFsICZhbXA7JmFtcDsgdmFsdWUgIT09IHZhbHVlKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmIChzZXR0ZXIpIHtcbiAgICAgICAgc2V0dGVyLmNhbGwob2JqLCBuZXdWYWwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBuZXdWYWxcbiAgICAgIH1cbiAgICAgIGNoaWxkT2IgPSAhc2hhbGxvdyAmYW1wOyZhbXA7IG9ic2VydmUobmV3VmFsKVxuICAgICAgZGVwLm5vdGlmeSgpXG4gICAgfVxuICB9KVxufVxuPC9jb2RlPjwvcHJlPlxuPHA+6L+Z6YeM5bCx5piv55So55qEIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSDmlrnms5XvvIzlroPlj6/ku6Xph43lhpnlr7nosaHnmoTlsZ7mgKfnmoQgZ2V0IOWSjCBzZXQg5pa55rOV44CCIOW9k+i/meS4quWxnuaAp+WcqCBWdWUg5Lit6KKr6I635Y+W55qE5pe25YCZ77yM5bCx5byA5aeL5pS26ZuG5L6d6LWW77yM5oqK5a6D5pS26ZuG5Zyo6L+Z5LiqIHZtIOeahCB3YXRjaGVyIOS4reW/g++8jOW5tuS4lOiuqeWug+iuoumYhei/meS4qiB3YXRjaGVyIOOAguW9k+i/meS4quWxnuaAp+iiq+mHjeaWsOiuvue9ruaXtu+8jCDlsLHpgJrnn6XlroPmiYDorqLpmIXnmoTlr7nosaHljrvmm7TmlrDjgII8L3A+XG48cD7lpKfoh7TopoHnn6XpgZPnmoTlsLHmmK/ov5nkupvkuobjgILlhbPkuo7lhbfkvZPmmK/mgI7kuYjlrp7njrDmioogdGVtcGxhdGUgIOe8luivkeaIkCBhc3Qg5qCR77yMIOWFt+S9k+aYr+aAjuS5iOaKiuS6i+S7tue7keWumuS4iuWOu+eahO+8jOS9oOWPr+S7peWwveaDheeahOWOu+eMnOaDs+WSjOaOqOa1i++8jOaIluiAheWOu+eci+eci+WFt+S9k+eahOWunueOsOaWueW8j+OAguS9huaYryBWVUUg5qGG5p625oC75L2T5p2l6K+05omA5YGa55qE5bCx5piv6L+Z5Lqb5LqL5oOF5LqGLCDlpoLmnpzmnInop4nlvpfmnKzmloflhpnnmoTkuI3muIXmpZrnmoTlnLDmlrnlj6/ku6Xmj5Dlk4ggPSA9PC9wPlxuPC9kaXY+PC90ZW1wbGF0ZT4iLCJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiLi92dWUubWQ/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9Mzg0YzEyOGZcIlxuY29uc3Qgc2NyaXB0ID0ge31cblxuaW1wb3J0IGV4cG9ydENvbXBvbmVudCBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Z1ZS1sb2FkZXJAMTcuNC4yX0B2dWUrY29tcGlsZXItc2ZjQDMuNS4zX3Z1ZUAzLjUuM190eXBlc2NyaXB0QDUuNS40X193ZWJwYWNrQDUuOTQuMF93ZWJwYWNrLV9mdXFrd2dncGxoZXkzb2l2dHdlMnN0ZG82ZS9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2V4cG9ydEhlbHBlci5qc1wiXG5jb25zdCBfX2V4cG9ydHNfXyA9IC8qI19fUFVSRV9fKi9leHBvcnRDb21wb25lbnQoc2NyaXB0LCBbWydyZW5kZXInLHJlbmRlcl1dKVxuXG5leHBvcnQgZGVmYXVsdCBfX2V4cG9ydHNfXyJdLCJuYW1lcyI6WyJjbGFzcyIsInNjcmlwdCIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfaG9pc3RlZF8xIiwiX2NhY2hlIiwiX2NyZWF0ZVN0YXRpY1ZOb2RlIl0sInNvdXJjZVJvb3QiOiIifQ==