vue 是一个 js 框架，它实现了自己的模板，通过 .vue 文件可以经过编译成一个数据改变驱动视图改变的 js代码。
那么这其中又是经历了什么样的步骤呢？

----- 
一个 vue 对象是通过 new Vue({options}) 来得到的，也就是构造函数了。我们来看这个函数
```
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

// 这里是一系列对这个函数进行的继承
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```
可以看到这个 Vue 构造函数，它经历了 5 个系列的mixin，并在新创建时会运行 _init(options) 方法。
那么我们来看看, 这五个 mixin 分别做了啥。

 ##### 第一个  initMixin
 它只做了一件事， 定义了 _init 方法，那么你就知道创造一个Vue 实例，它执行的 _init 方法就是上面这个方法了。
```
Vue.prototype._init = function (options?: Object) {
....
}
```



##### 第二个 stateMixin 
```
  Object.defineProperty(Vue.prototype, '$data', dataDef)  // 能够返回 data
  Object.defineProperty(Vue.prototype, '$props', propsDef) // 能够返回 props
  Vue.prototype.$set = set // 就是我们用的 this.$set(this.people, 'name', ‘clever')方法, 下同。
  Vue.prototype.$delete = del
  Vue.prototype.$watch = function (
   ....
  }
  ```

##### 第三个 eventsMixin
```
Vue.prototype.$on = function (eventname, fn) {
....
}
Vue.prototype._$once = function (eventname, fn) {
 // 监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。
}
Vue.prototype._off = function (event, fn) {
// 移除自定义事件监听器。
}
Vue.prototype.$emit = function (event) {
// 触发一个事件
}
```
##### 第四个 lifecycleMixin![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/0227c8c15285fbd179573e7cd8cb4718.png)
##### 第五个 renderMixin![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/715399a9ac35cef7c3aca2d3242ca5a3.png)
---

好， 这个 Vue 继承了这些方法，它已经是一个完整的 Vue 了，而新创建的时候要执行 _init 方法了, 现在我们来看看这个方法里面做了写啥
-  vm._uid = uid++ 创建 uid
-  合并 options
-   initLifecycle
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
```
关于 initLifecycle
  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm
  vm.$children = []
  vm.$refs = {}
  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
  ```

-  initEvents
```
  vm._events = Object.create(null)
  vm._hasHookEvent = false
  // init parent attached events
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
  就是判断父级是否有事件监听，然后给父级进行监听事件
  ```
- initRender
```
   vm._vnode = null  // the root of the child tree
  vm._staticTrees = null  // v-once cached trees
  const options = vm.$options
  const parentVnode = vm.$vnode = options._parentVnode // the placeholder node in parent tree
  const renderContext = parentVnode && parentVnode.context
  vm.$slots = resolveSlots(options._renderChildren, renderContext)
  vm.$scopedSlots = emptyObject
  // 实例绑定 createElement 方法，以便可以正常在内部渲染
 // 参数顺序   tag, data, children, normalizationType, alwaysNormalize
  // 内部使用从模板编译而来的渲染函数
  
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
  // 公共版本必须是 normalization 的渲染函数
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

  // $attrs & $listeners 应该被监听热更新
  const parentData = parentVnode && parentVnode.data

  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$attrs is readonly.`, vm)
    }, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$listeners is readonly.`, vm)
    }, true)
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
  }
  ```
-  callHook(vm, 'beforeCreate') 执行 beforeCreate 函数

-  initInjections(vm) 收集注入的依赖
```
  const result = resolveInject(vm.$options.inject, vm)
  if (result) {
    toggleObserving(false)
    Object.keys(result).forEach(key => {
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], () => {
          warn(
          	`避免直接改变注入的值，因为将会重新渲染所提供这个值的组件, 
          	改变的值是: "${key}",
            vm
          )
        })
      } else {
        defineReactive(vm, key, result[key])
      }
    })
    toggleObserving(true)
```
- initState 监听值收集依赖
```
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props) // 赋值 props 数据并收集依赖
  if (opts.methods) initMethods(vm, opts.methods) // 赋值 vue 的各个 method
  if (opts.data) {
    initData(vm) // 收集依赖
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed) // 收集依赖
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch) // 初始化你写的监听对象
  }
 
```
- initProvide
```
  const provide = vm.$options.provide
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide
  }
```
-  callHook(vm, 'created') 执行 created 函数

>这就是 _init 中各个函数所做的了。 我们可以看到总结过来就是
1.初始化了生命状态
2.进行事件上的监听
3.渲染视图的初始化；收集所用到的父组件的数据或事件
4.调用你写的 beforeCreate 方法
5.initState, 处理了 vue 中的各种数据(props/data/methods.....), 也在这一步针对这些数据进行了依赖收集，数据更新绑定
6.初始化了 provide 的值， 也可以看出它没有被收集依赖， 是不会影响视图改变的
7.调用了你写的 created 方法了。

以上，就是你 let app = new Vue() 这一步所发生的所有事情了。


那通过平时的使用我们知道，我们是通过调用 $mounted 能把它挂载上页面。所以接下来我们就可以来看看 vue 自己的 $mount 都做了些什么?

答: 就是把 template 或直接写的 render 函数，进行指令、事件等vue 中的语法解析编译成一个 AST 树。通过这个树，通过之前 initRender 中的 $createElement 方法可以生成虚拟DOM, 然后添加到页面中出，不就渲染出来了么。 如果大家使用过 Vue 的 $createElement 方法，相信就知道这个 ast 是怎么一个结构了，拿示例的来说
```
createElement(
  'div',
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

---
说完了整个过程，现在还比较疑惑的就是它的收集依赖，然后数据改变引起的视图改变到底怎么做呢？

也就是说我们要实现一个模式，vm 可能 data 对象中的一个值，比如 name 改变了，然后就调用重新渲染的函数，这里为了性能，是生成了一个虚拟 Dom, 然后比较哪里改变了进行相应的替换。 
把这个模式抽象出来，就是我们需要一个 

先说具体实现： 我们视图更新依赖到的值收集起来，这里把每一个依赖到的值称作 dep。每个依赖订阅与它有关的 vue 的 watcher 中心， 这里把 dep 所订阅的 watcher 叫做 sub。 那么 dep 被改变的时候，获取它订阅了那些 watcher， 通知他们进行 update 视图啦。

可以看我画的简图
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/417c23088cb0224c6a4464651452c604.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/59c0e76f684052df524761ee8f4f6942.png)

这就是依赖对象 和 一个 watcher 对象所涉及到的处理了。
Vue 中又是怎么把一个个的属性，进行操作变成依赖的呢？
对应它的源码就是 defineReactive 方法。源码如图：
```
export function defineReactive (obj, key, val, customSetter, shallow) {
  const dep = new Dep()
  
  // 迎合预定义的getter / setter
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }
  
  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}
```
这里就是用的 Object.defineProperty 方法，它可以重写对象的属性的 get 和 set 方法。 当这个属性在 Vue 中被获取的时候，就开始收集依赖，把它收集在这个 vm 的 watcher 中心，并且让它订阅这个 watcher 。当这个属性被重新设置时， 就通知它所订阅的对象去更新。

大致要知道的就是这些了。关于具体是怎么实现把 template  编译成 ast 树， 具体是怎么把事件绑定上去的，你可以尽情的去猜想和推测，或者去看看具体的实现方式。但是 VUE 框架总体来说所做的就是这些事情了, 如果有觉得本文写的不清楚的地方可以提哈 = =
