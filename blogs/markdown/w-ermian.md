### 找出数组中和为 target 的两个数的 index

```js
function twoSum(array, target) {
    const map = new Map();
    for (let i = 0; i < array.length; i++) {
        const rest = target - array[i];
        if (map.has(rest)) {
            return [map.get(rest), i];
        }
        map.set(array[i], i);
    }
    return [];
}
```

### 使用promise+async await 实现一个函数，运行这个函数 先输出1 然后3s之后输出2

```js
function sleep(time) {
    return new Promise((reslove) => {
        setTimeout(() => {
            reslove();
        }, time);
    });
}

async function task() {
    console.log(1);
    await sleep(3000);
    console.log(2);
}
```

### 将两个递增数组合并成一个数组，且是递增的

```js
function mergeArray(array1, array2) {
    const result = [];
    let i = 0,
        j = 0;
    while (i < array1.length && j < array2.length) {
        result.push(array1[i] < array2[j] ? array1[i++] : array2[j++]);
    }
    return result.concat(array1.slice(i)).concat(array2.slice(j));
}
```

### 如何用 lerna 管理 monorepo

// ... existing code ...

### 如何用 lerna 管理 monorepo

Lerna 是一个用于管理包含多个包（packages）的 JavaScript 项目的工具。以下是使用 Lerna 管理 monorepo 的基本步骤：

1. **初始化 Lerna 项目**

```bash
# 安装 lerna
npm install --global lerna

# 创建新的 lerna 项目
mkdir my-lerna-repo && cd my-lerna-repo
lerna init
```

2. **项目结构**

```
my-lerna-repo/
  packages/
    package-1/
      package.json
    package-2/
      package.json
  package.json
  lerna.json
```

3. **配置 lerna.json**

```json
{
    "version": "1.0.0",
    "npmClient": "npm",
    "command": {
        "publish": {
            "ignoreChanges": ["ignored-file", "*.md"],
            "message": "chore(release): publish"
        },
        "bootstrap": {
            "ignore": "component-*",
            "npmClientArgs": ["--no-package-lock"]
        }
    },
    "packages": ["packages/*"]
}
```

4. **常用命令**

```bash
# 安装所有依赖
lerna bootstrap

# 创建新包
lerna create package-name

# 为所有包添加依赖
lerna add module-1 --scope=module-2

# 发布包
lerna publish

# 执行每个包中的脚本
lerna run test
```

5. **工作流程最佳实践**

-   使用 `lerna bootstrap` 安装依赖
-   使用 `lerna clean` 清理依赖
-   使用 `lerna changed` 查看修改的包
-   使用 `lerna diff` 查看具体改动
-   使用 `lerna version` 更新版本号
-   使用 `lerna publish` 发布包

6. **版本控制策略**

-   Fixed/Locked mode (默认): 所有包使用同一版本号
-   Independent mode: 每个包独立版本号管理

```bash
# 使用独立版本模式初始化
lerna init --independent
```

7. **使用 workspace 协议引用本地包**

```json
{
    "dependencies": {
        "@my-scope/package-1": "workspace:*"
    }
}
```

8. 引用本地包时，不打包引用的本地包

webpack 配置

```js
externals: [
    // 方法1：使用正则匹配所有本地包
    /^@my-scope\/.+$/,
];
```

package.json 添加前置依赖包

```json
"peerDependencies": {
  // 将本地包声明为 peerDependencies
  "@my-scope/package-1": ""
}
```

9. 组件库的整体打包和单组件模块打包配置

webpack 配置整体入口和单组件入口

```js

// 整体入口
entry: {
  index: './src/index.js'
}

// 单组件入口
entry: [
  Button: './src/Button/index.js',
  Input: './src/Input/index.js',
  Select: './src/Select/index.js',
  ...
]

```

### 实现一个 deepClone

```js
function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    const newObj = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        console.log(key, obj[key]);
        newObj[key] = deepClone(obj[key]);
    }
    return newObj;
}
```

### 实现一个封装的 useRequest 请求库

```js
class HttpError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class RequestClient {
    constructor(defaultConfig = {}) {
        this.defaultConfig = {
            timeout: 10000,
            retryTimes: 3,
            ...defaultConfig,
        };
    }

    async request(params) {
        const config = { ...this.defaultConfig, ...params };
        const { url, method = 'GET', headers = {}, timeout, retryTimes } = config;

        const executeRequest = async (attempt = 0) => {
            try {
                const controller = new AbortController(); // 创建一个 AbortController 实例
                const timeoutId = setTimeout(() => controller.abort(), timeout); // 设置超时

                const response = await fetch(url, {
                    method,
                    headers,
                    signal: controller.signal, // 将 AbortController 的 signal 传递给 fetch
                    ...config,
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new HttpError(`HTTP Error: ${response.statusText}`, response.status);
                }

                const data = await response.json(); // 解析响应数据
                return {
                    data,
                    status: response.status,
                };
            } catch (error) {
                if (attempt < retryTimes - 1) {
                    // Exponential backoff
                    await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
                    return executeRequest(attempt + 1);
                }
                throw error;
            }
        };

        return executeRequest();
    }

    // Convenience methods
    get(url, config = {}) {
        return this.request({ ...config, url, method: 'GET' });
    }

    post(url, data, config = {}) {
        return this.request({
            ...config,
            url,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    put(url, data, config = {}) {
        return this.request({ ...config, url, method: 'PUT', body: JSON.stringify(data) });
    }

    delete(url, config = {}) {
        return this.request({ ...config, url, method: 'DELETE' });
    }
}

// Hook implementation
function useRequest(requestFn, options = {}) {
    const { manual = false, defaultData = null, onSuccess, onError } = options;

    const [data, setData] = useState(defaultData);
    const [loading, setLoading] = useState(!manual);
    const [error, setError] = useState(null);

    const run = async (...args) => {
        try {
            setLoading(true);
            setError(null);
            const result = await requestFn(...args);
            setData(result.data);
            onSuccess?.(result);
            return result;
        } catch (err) {
            setError(err);
            onError?.(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!manual) {
            run();
        }
    }, []);

    return {
        data,
        loading,
        error,
        run,
    };
}

// Usage example:
const client = new RequestClient({
    timeout: 5000,
    retryTimes: 3,
});

// In component:
const { data, loading, error, run } = useRequest(() => client.get('https://api.example.com/data'), {
    manual: true,
    onSuccess: (result) => console.log('Success:', result),
    onError: (error) => console.error('Error:', error),
});
```

### vue2与vue3那些区别

**Vue 2 和 Vue 3** 的核心区别，涵盖语法、性能、架构等方面：

---

### 一、核心架构差异

| **特性**            | **Vue 2**                                    | **Vue 3**                          |
| ------------------- | -------------------------------------------- | ---------------------------------- |
| **响应式系统**      | 基于 `Object.defineProperty`                 | 基于 `Proxy`（支持动态属性和数组） |
| **代码组织方式**    | Options API（选项式 API）                    | Composition API（组合式 API）      |
| **包体积**          | 较大（包含所有功能）                         | 更小（Tree-shaking 优化）          |
| **TypeScript 支持** | 需通过类组件扩展（如 `vue-class-component`） | 原生支持 TypeScript                |
| **生命周期钩子**    | 传统钩子（如 `beforeCreate`）                | 新增 `setup`，部分钩子更名         |

---

### 二、响应式系统的升级

#### 1. **Vue 2 的响应式实现**

-   **原理**：使用 `Object.defineProperty` 劫持对象属性的 `getter/setter`。
-   **缺陷**：
    -   无法检测对象属性的动态添加或删除（需用 `Vue.set`/`Vue.delete`）。
    -   对数组的变异方法（如 `push`、`pop`）需要重写。

#### 2. **Vue 3 的响应式实现**

-   **原理**：基于 ES6 的 `Proxy` 代理对象，深度监听所有操作。
-   **优势**：
    -   支持动态添加/删除属性，无需特殊 API。
    -   直接监听数组索引和长度变化。
    -   性能更高，内存占用更低。

**代码对比**：

```javascript
// Vue 2
data() {
  return { count: 0 };
},
methods: {
  increment() {
    this.count++; // 响应式更新
  }
}

// Vue 3（Composition API）
import { ref } from 'vue';
setup() {
  const count = ref(0);
  const increment = () => count.value++;
  return { count, increment };
}
```

---

### 三、API 设计：Options API vs Composition API

#### 1. **Vue 2 的 Options API**

-   **特点**：通过 `data`、`methods`、`computed` 等选项组织代码。
-   **缺点**：逻辑分散，大型组件难以维护（如功能相关的代码分布在多个选项中）。

#### 2. **Vue 3 的 Composition API**

-   **特点**：通过 `setup()` 函数集中管理逻辑，支持逻辑复用（类似 React Hooks）。
-   **优势**：
    -   逻辑按功能聚合，代码更易维护。
    -   支持自定义组合函数（如 `useFetch`、`useAuth`）。

---

### 四、性能优化

#### 1. **虚拟 DOM 优化**

-   **Vue 2**：全量比对虚拟 DOM 树。
-   **Vue 3**：
    -   引入 **静态标记（Patch Flags）**，跳过静态节点比对。
    -   使用 **Fragment** 支持多根节点模板，减少嵌套。

#### 2. **Tree-shaking 支持**

-   **Vue 2**：所有功能打包进核心库（即使未使用）。
-   **Vue 3**：模块化设计，未使用的功能（如 `v-model` 修饰符）会被 Tree-shaking 移除。

---

### 五、新特性

#### 1. **Vue 3 独有的功能**

-   **Teleport**：将组件渲染到 DOM 的任意位置（如全局弹窗）。
-   **Suspense**：优雅处理异步组件加载状态。
-   **Fragment**：支持组件多根节点模板。
-   **自定义渲染器**：支持非 DOM 环境（如 Canvas、WebGL）。

#### 2. **指令与组件变化**

-   **`v-model`**：
    -   Vue 2：一个组件仅支持一个 `v-model`。
    -   Vue 3：支持多个 `v-model`（如 `v-model:title`、`v-model:content`）。
-   **`key` 属性**：
    -   Vue 3 在 `v-if`/`v-else` 分支中不再强制要求 `key`。

---

### 六、生命周期钩子变化

| **Vue 2**       | **Vue 3**（Composition API） | **说明**          |
| --------------- | ---------------------------- | ----------------- |
| `beforeCreate`  | `setup()`                    | 组件初始化前执行  |
| `created`       | `setup()`                    | 组件初始化后执行  |
| `beforeMount`   | `onBeforeMount`              | 挂载到 DOM 前执行 |
| `mounted`       | `onMounted`                  | 挂载到 DOM 后执行 |
| `beforeUpdate`  | `onBeforeUpdate`             | 数据更新前执行    |
| `updated`       | `onUpdated`                  | 数据更新后执行    |
| `beforeDestroy` | `onBeforeUnmount`            | 组件销毁前执行    |
| `destroyed`     | `onUnmounted`                | 组件销毁后执行    |
| `errorCaptured` | `onErrorCaptured`            | 捕获子组件错误    |

---

### 七、TypeScript 支持

-   **Vue 2**：需依赖 `vue-class-component` 或 `vue-property-decorator`。
-   **Vue 3**：原生支持 TypeScript，类型定义更完善，代码提示更友好。

---

### 九、总结：何时选择 Vue 2 或 Vue 3？

-   **选择 Vue 3**：
    -   新项目开发，尤其是大型复杂应用。
    -   需要更好的 TypeScript 支持或性能优化。
    -   希望使用 Composition API 提高代码可维护性。
-   **暂留 Vue 2**：
    -   维护现有 Vue 2 项目，依赖的第三方库未支持 Vue 3。
    -   短期快速迭代，无迁移成本预算。

### vue中proxy在浏览器中不兼容时怎么办

在 Vue 3 中，如果遇到浏览器不支持 `Proxy`（如 IE 11 或旧版移动浏览器），需要采取特殊措施确保应用正常运行。以下是完整的解决方案：

---

### **1. 问题原因**

Vue 3 的响应式系统基于 `Proxy`，但以下浏览器不兼容：

-   **IE 11**（完全不支持 Proxy）
-   **iOS < 10**、**Android < 6**（部分支持）

---

### **2. 解决方案**

根据项目需求选择以下方案：

#### **方案 1：放弃兼容旧浏览器**

-   **推荐场景**：现代浏览器项目（Chrome、Firefox、Safari 等）。
-   **配置方式**：在 `package.json` 中声明浏览器支持范围，避免打包 `Proxy` 相关代码：
    ```json
    {
        "browserslist": [
            "> 1%", // 全球使用率 >1% 的浏览器
            "last 2 versions" // 支持所有浏览器的最后两个版本
        ]
    }
    ```

#### **方案 2：降级到 Vue 2**

-   **推荐场景**：必须支持 IE 11。
-   **步骤**：
    1. 将 Vue 3 代码迁移到 Vue 2（需手动调整 Composition API 到 Options API）。
    2. 使用 `@vue/compat` 兼容库（Vue 3 的降级模式）：
        ```bash
        npm install vue@3 @vue/compat
        ```
        配置 `vue.config.js`：
        ```javascript
        module.exports = {
            chainWebpack: (config) => {
                config.resolve.alias.set('vue', '@vue/compat');
                config.module
                    .rule('vue')
                    .use('vue-loader')
                    .tap((options) => ({
                        ...options,
                        compilerOptions: {
                            compatConfig: {
                                MODE: 2, // 启用 Vue 2 兼容模式
                            },
                        },
                    }));
            },
        };
        ```

#### **方案 3：使用 Proxy 的 Polyfill**

-   **推荐场景**：轻度兼容旧版现代浏览器（如 iOS 9）。
-   **步骤**：
    1. 安装 `core-js` 和 `proxy-polyfill`：
        ```bash
        npm install core-js proxy-polyfill
        ```
    2. 在入口文件（如 `main.js`）顶部引入 Polyfill：
        ```javascript
        import 'core-js/stable'; // 补充 ES6+ 基础 API
        import 'proxy-polyfill'; // 补充 Proxy 的阉割版实现
        ```
    3. **注意**：`proxy-polyfill` 仅支持 `get`/`set` 的简单代理，无法完全模拟 `Proxy`，可能导致 Vue 3 响应式功能异常。

#### **方案 4：切换 Vue 3 的响应式降级模式**

-   **推荐场景**：需在 Vue 3 中兼容旧浏览器。
-   **步骤**：

    1. 显式使用 `Vue 2` 的 `Object.defineProperty` 响应式实现：

        ```javascript
        import { createApp } from 'vue';
        import { configureCompat } from 'vue';

        // 启用 Vue 2 兼容模式
        configureCompat({
            REACTIVE_API: false, // 关闭 Proxy，改用 defineProperty
        });

        createApp(App).mount('#app');
        ```

    2. **缺点**：
        - 失去 Vue 3 的动态属性响应能力（需手动调用 `Vue.set`）。
        - 性能略低于原生 Proxy。

---

### **3. 不同方案的兼容性与代价**

| **方案**             | **支持浏览器**        | **代码改动量** | **性能损失** | **功能完整性** |
| -------------------- | --------------------- | -------------- | ------------ | -------------- |
| 放弃旧浏览器         | 现代浏览器            | 无             | 无           | 完整           |
| 降级到 Vue 2         | IE 11+                | 高             | 中等         | 完整（Vue 2）  |
| Proxy Polyfill       | 部分旧现代浏览器      | 低             | 高           | 部分功能异常   |
| Vue 3 响应式降级模式 | 现代浏览器 + 部分旧版 | 中             | 中等         | 部分功能受限   |

---

> IE 已被放弃

### **4. 针对 IE 11 的特殊处理**

若必须支持 IE 11，需额外配置：

1. **Babel 转译**：确保 ES6 代码被转译为 ES5。
    ```bash
    npm install @babel/preset-env @babel/core babel-loader --save-dev
    ```
    `.babelrc` 配置：
    ```json
    {
        "presets": [
            [
                "@babel/preset-env",
                {
                    "useBuiltIns": "usage",
                    "corejs": 3,
                    "targets": "IE 11"
                }
            ]
        ]
    }
    ```
2. **Polyfill 补充**：在入口文件顶部添加：
    ```javascript
    import 'core-js/stable';
    import 'regenerator-runtime/runtime';
    ```

### weakmap与垃圾回收

在 JavaScript 中，`WeakMap` 是一种特殊的键值对集合，其键（Key）必须是对象，且对键的引用是 **弱引用（Weak Reference）**。这种特性使得 `WeakMap` 与垃圾回收机制（Garbage Collection, GC）密切相关。以下是 `WeakMap` 与垃圾回收的详细解析：

---

### **1. WeakMap 的核心特性**

1. **键必须是对象**（不能是原始类型如 `string`、`number`）。
2. **键是弱引用**：
    - 如果键对象在其他地方没有被强引用，垃圾回收机制会自动回收该键及其关联的值。
3. **不可遍历**：
    - 没有 `keys()`、`values()`、`entries()` 等方法，也无法获取其大小（如 `size` 属性）。
4. **典型用途**：
    - 存储与对象关联的元数据或私有数据，且避免内存泄漏。

---

### **2. WeakMap 与垃圾回收的关系**

#### **2.1 普通 Map 的内存泄漏问题**

如果用普通 `Map` 存储对象作为键，即使对象在其他地方不再被引用，`Map` 仍然会保留对键的强引用，导致对象无法被垃圾回收：

```javascript
let obj = { id: 1 };
const map = new Map();
map.set(obj, 'metadata');

// 即使 obj 被置为 null，Map 仍保留对原对象的引用
obj = null;

// 原对象 { id: 1 } 依然存在，无法被 GC 回收！
```

#### **2.2 WeakMap 的自动清理**

`WeakMap` 对键的引用是弱引用，不会阻止垃圾回收：

```javascript
let obj = { id: 1 };
const weakMap = new WeakMap();
weakMap.set(obj, 'metadata');

obj = null; // 清除对对象的强引用

// 下一次 GC 运行时，WeakMap 中的键值对会被自动删除！
```

---

### **3. 垃圾回收机制如何工作？**

1. **标记-清除算法**（主流浏览器实现）：
    - 垃圾回收器会标记所有从根对象（全局变量、当前执行栈等）可达的对象。
    - 清除所有未被标记的对象。
2. **弱引用的作用**：
    - 弱引用不计入对象可达性标记，因此键对象如果仅被 `WeakMap` 引用，会被视为不可达，从而被回收。

---

### **5. WeakMap 的限制**

1. **无法遍历或清空**：
    - 没有 `size` 属性，也不能通过 `forEach` 遍历。
2. **仅支持对象作为键**：
    - 无法用 `string`、`number` 等原始类型作为键。
3. **依赖垃圾回收的时机**：
    - 键值对的回收时间由垃圾回收器决定，不可预测。

---

### **6. 对比其他数据结构**

| **特性**     | **Map**                  | **WeakMap**                |
| ------------ | ------------------------ | -------------------------- |
| **键类型**   | 任意类型                 | 仅对象                     |
| **引用类型** | 强引用                   | 弱引用                     |
| **可遍历性** | 支持 `keys()`、`forEach` | 不可遍历                   |
| **内存管理** | 可能内存泄漏             | 自动清理无用键值对         |
| **适用场景** | 需长期保留键值对的场景   | 关联对象生命周期管理的场景 |

---

### **7. 总结**

-   **WeakMap 的核心价值**：通过弱引用机制避免内存泄漏，特别适合与对象生命周期绑定的场景。
-   **垃圾回收的依赖**：`WeakMap` 的自动清理依赖于垃圾回收机制，无法手动控制。
-   **使用原则**：
    -   当需要将数据与对象关联，且希望对象销毁时数据自动释放时，使用 `WeakMap`。
    -   避免在需要长期保留键值对或遍历操作的场景中使用 `WeakMap`。

---

**代码验证示例**：

```javascript
// 测试 WeakMap 的自动清理
let obj = { key: 'value' };
const weakMap = new WeakMap();
weakMap.set(obj, 'data');

// 移除对 obj 的强引用
obj = null;

// 等待垃圾回收（实际环境中不可控，此处仅模拟）
setTimeout(() => {
    // 此时 weakMap 中可能已无条目
    console.log(weakMap); // 无法检查，但内存会被释放
}, 10000);
```

通过合理使用 `WeakMap`，可以显著优化内存管理，减少因不当引用导致的内存泄漏问题。

### 移动端怎么做适配

### 媒体查询与容器查询

嗯，用户问的是媒体查询和容器查询，我需要先回忆一下这两个概念的区别和联系。媒体查询（Media Queries）我记得是CSS中用于根据不同的设备特性（比如屏幕尺寸、分辨率、方向等）应用不同的样式。而容器查询（Container Queries）好像是相对较新的CSS特性，允许根据父容器的大小来调整样式。

首先，我应该确认这两个术语的正确性，避免混淆。媒体查询基于设备或视口，而容器查询则是基于元素自身的容器尺寸。比如，媒体查询可能会根据屏幕宽度改变布局，而容器查询则可能根据父元素的宽度调整子元素的样式。

接下来，用户可能需要一个清晰的对比，列出两者的定义、使用场景、语法结构以及优缺点。这样用户能快速理解它们的区别和应用方法。此外，可能需要举一些例子来说明如何在实际项目中使用它们，比如响应式设计中的不同情况。

需要注意的是，容器查询目前可能还不是所有浏览器都完全支持，所以要提到浏览器兼容性的问题。同时，用户可能想知道什么时候该用媒体查询，什么时候该用容器查询，这时候需要给出实际的用例，比如导航栏在不同设备上的显示方式，或者图片根据父容器宽度自适应的情况。

还要检查是否有常见的误区，比如误用媒体查询导致布局过于依赖设备而非容器，或者没有正确设置视口导致容器查询不起作用。另外，可能需要提到一些相关的CSS属性，如min-width, max-width在媒体查询中的使用，以及container-type、container-size在容器查询中的应用。

最后，确保回答结构清晰，分点说明，便于用户理解。如果有必要的话，可以提供一个代码示例，展示两者在实际中的不同应用方式，这样用户能更直观地看到区别。

媒体查询（Media Queries）和容器查询（Container Queries）都是 CSS 中实现响应式设计的重要技术，但它们的作用对象和应用场景有所不同。以下是两者的对比和详细说明：

---

### **1. 媒体查询（Media Queries）**

**作用对象**：设备的视口（Viewport）或设备特性（如屏幕尺寸、分辨率、方向等）。  
**核心思想**：根据设备的外部条件（如浏览器窗口大小、设备类型）动态调整样式。  
**语法**：

```css
@media (max-width: 768px) {
    /* 针对视口宽度 ≤768px 的设备应用样式 */
}
```

**常见条件**：
• `width`/`height`: 视口尺寸
• `orientation`: 设备方向（portrait/landscape）
• `resolution`: 分辨率
• `device-type`: 设备类型（mobile/tablet/desktop）

**典型用例**：
• 移动端竖屏时隐藏侧边栏。
• 在小屏幕设备上将导航菜单折叠为汉堡菜单。

**优点**：
• 成熟稳定，浏览器支持广泛（所有现代浏览器）。
• 覆盖设备类型的多样性。

**缺点**：
• 样式逻辑与设备强绑定，难以复用。
• 可能需要复杂的媒体条件覆盖（如多断点）。

---

### **2. 容器查询（Container Queries）**

**作用对象**：元素的父容器（而非视口或设备）。  
**核心思想**：根据父容器的尺寸或内容状态（如溢出）调整子元素样式。  
**语法**：

```css
.container {
    container-type: size; /* 声明容器类型为尺寸容器 */
}

.child {
    @container (min-width: 400px) {
        /* 当父容器宽度 ≥400px 时应用样式 */
    }
}
```

**关键属性**：
• `container-type`: `size`（基于容器尺寸）、`flow`（基于内容溢出）。
• `container-size`: 指定容器的大小来源（如 `viewport` 或 `content`）。

**典型用例**：
• 网格布局中，父容器宽度变化时自动调整列数。
• 弹窗内部元素根据弹窗宽度适配布局，无需依赖视口尺寸。

**优点**：
• 样式逻辑与父容器关联，更灵活。
• 解耦组件与视口，提升组件复用性。

**缺点**：
• 浏览器兼容性有限（Chrome 109+、Firefox 112+、Safari 16+ 支持部分特性）。
• 需要合理设计容器结构。

---

### **对比总结**

| **特性**       | 媒体查询                   | 容器查询                   |
| -------------- | -------------------------- | -------------------------- |
| **作用对象**   | 设备视口/特性              | 父容器尺寸/内容状态        |
| **动态依据**   | 设备外部条件               | 组件内部容器状态           |
| **样式隔离性** | 全局影响（依赖媒体条件）   | 局部影响（仅作用于子元素） |
| **复用性**     | 较低（需针对不同设备编写） | 较高（组件内自适应）       |
| **浏览器支持** | 完全成熟                   | 部分支持（需渐进增强）     |

---

### **实战示例**

#### 媒体查询：响应式导航栏

```css
.navbar {
    display: flex;
}

@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
    }
}
```

当视口宽度 ≤768px 时，导航栏垂直堆叠。

#### 容器查询：自适应图片容器

```css
.image-container {
    container-type: size;
    max-width: 100%;
}

img {
    width: 100%;
    @container (min-width: 600px) {
        width: 60%;
    }
}
```

当父容器 `.image-container` 的宽度 ≥600px 时，图片宽度调整为 60%。

---

### **选择建议**

• **使用媒体查询**：当需要根据设备类型（如手机/平板/PC）或全局视口尺寸调整布局时。
• **使用容器查询**：当样式需要根据组件内部容器的大小或状态（如弹窗、侧边栏）自适应时。

两者结合使用可以实现更精细的响应式设计。

### z-index值大就一定会展示吗

z-index 值大并不保证元素一定可见，关键取决于：

-   ​是否处于同一层叠上下文；
-   ​父容器的层叠顺序；
-   ​元素的可见性​（visibility 或 opacity）。

最佳实践：通过合理设计层叠上下文（如使用 position 或 opacity 创建新上下文）来控制元素的覆盖关系。

### webpack为什么比vite慢

Webpack 比 Vite 慢的主要原因在于两者的设计理念和工作机制不同，尤其是在开发环境下的处理方式差异显著。以下是核心原因的分析：

---

### 1. **构建机制：打包 vs 按需编译**

-   **Webpack**：采用**全量打包**模式。  
    在开发环境下，Webpack 需要遍历项目的所有依赖关系，将代码打包成一个或多个 Bundle（即使使用 `devServer`，本质上仍需要构建完整的依赖图）。对于大型项目，这一过程会消耗大量时间，尤其是首次启动或依赖变更时。
-   **Vite**：基于 **ES Modules (ESM) 的按需编译**。  
    Vite 在开发时直接利用浏览器原生 ESM 能力，通过拦截模块请求，仅编译当前页面实际需要的文件（如单文件组件或动态导入的模块）。这种按需编译避免了不必要的预处理，极大提升了启动速度。

---

### 2. **开发环境冷启动速度**

-   **Webpack**：  
    冷启动时必须完成全量打包（包括第三方依赖和业务代码），才能启动开发服务器。随着项目规模扩大，依赖增多，启动时间呈线性增长。
-   **Vite**：  
    将代码分为**依赖**和**源码**两类：
    -   **依赖**：通过 **esbuild** 预构建（比 Webpack 的 Babel/TypeScript 转换快 10~100 倍），且结果会被缓存。
    -   **源码**：按需编译，浏览器直接请求未打包的 ESM 文件。  
        因此，Vite 的冷启动时间几乎与项目规模无关，尤其是依赖预构建完成后，启动几乎是瞬时的。

---

### 3. **热更新（HMR）效率**

-   **Webpack**：  
    热更新需要重新构建变动的模块及其依赖链，并通过 WebSocket 推送更新后的代码。对于深层依赖或大型模块，更新可能触发较长的重建时间。
-   **Vite**：  
    利用 ESM 和浏览器缓存机制，仅需编译修改的单个文件，并通过 HMR API 精准更新。由于未触及其他模块，更新速度更快，尤其适合单文件组件（如 Vue/React）。

---

### 4. **工具链性能差异**

-   **Webpack**：  
    依赖 Babel、TypeScript 等工具链处理代码，这些工具基于 JavaScript 实现，性能存在瓶颈。
-   **Vite**：  
    使用 **esbuild**（基于 Go 语言开发）预构建依赖，其速度远超传统工具。虽然生产构建仍依赖 Rollup，但开发阶段的性能优势明显。

---

### 5. **配置与插件复杂度**

-   **Webpack**：  
    高度灵活的配置和插件系统带来了额外开销。复杂的 Loader 和插件链可能增加构建时间。
-   **Vite**：  
    默认集成常见功能（如 TypeScript、CSS 预处理），减少配置复杂度。插件系统更轻量，对性能影响较小。

---

### 生产环境下的差异

-   **生产构建**：  
    Webpack 和 Vite（基于 Rollup）都需要全量打包，此时性能差距可能缩小，但 Vite 仍可通过 esbuild 优化部分流程。
-   **Tree Shaking**：  
    Rollup（Vite 的生产打包工具）的 Tree Shaking 通常更高效，但 Webpack 5 的优化已显著缩小差距。

---

### 总结

Webpack 的慢主要体现在**开发阶段的全量打包机制**，而 Vite 通过 ESM 按需编译、esbuild 预构建和精准 HMR 实现了质的飞跃。对于追求开发效率的项目，Vite 是更优选择；而 Webpack 的成熟生态和灵活性仍适合复杂场景。

### http怎么实现websocket的功能

在 HTTP 协议本身**无法直接实现 WebSocket 的全双工双向通信**，因为 HTTP 是**单向请求-响应模型**。但可以通过以下变通方案**模拟类似 WebSocket 的双向通信功能**，尽管效率、实时性和资源消耗远不及真正的 WebSocket：

---

### 一、基于 HTTP 的替代方案

#### 1. **短轮询（Short Polling）**

-   **原理**：客户端定期发送 HTTP 请求询问服务器是否有新数据。
-   **代码示例**：
    ```javascript
    // 客户端
    setInterval(() => {
        fetch('/poll')
            .then((res) => res.json())
            .then((data) => {
                console.log('收到数据:', data);
            });
    }, 1000); // 每秒轮询一次
    ```
-   **缺点**：
    -   高延迟（依赖轮询间隔）。
    -   浪费带宽（大量空请求）。

---

#### 2. **长轮询（Long Polling）**

-   **原理**：客户端发送 HTTP 请求后，服务器保持连接打开，直到有新数据或超时。
-   **代码示例**：
    ```javascript
    // 客户端
    function longPoll() {
        fetch('/long-poll')
            .then((res) => res.json())
            .then((data) => {
                console.log('收到数据:', data);
                longPoll(); // 递归调用维持连接
            });
    }
    longPoll();
    ```
    ```javascript
    // 服务端（Node.js + Express）
    app.get('/long-poll', (req, res) => {
        // 模拟等待数据（如监听数据库变化）
        setTimeout(() => {
            res.json({ message: '新数据' });
        }, 5000); // 5秒后响应
    });
    ```
-   **缺点**：
    -   服务器需维护大量挂起连接。
    -   仍然存在延迟（依赖服务器响应速度）。

---

#### 3. **Server-Sent Events (SSE)**

-   **原理**：基于 HTTP 的单向通道，允许服务器主动推送数据到客户端。
-   **代码示例**：
    ```javascript
    // 客户端
    const eventSource = new EventSource('/sse');
    eventSource.onmessage = (event) => {
        console.log('收到数据:', event.data);
    };
    ```
    ```javascript
    // 服务端（Node.js + Express）
    app.get('/sse', (req, res) => {
        res.setHeader('Content-Type', 'text/event-stream');
        setInterval(() => {
            res.write(`data: ${Date.now()}\n\n`); // SSE 格式要求
        }, 1000);
    });
    ```
-   **缺点**：
    -   仅支持服务器到客户端的单向通信。
    -   客户端仍需通过其他 HTTP 请求发送数据。

---

#### 4. ** fetch stream reader **

```js
const response = await fetch('https://example.com/large-file');
const readableStream = response.body;

//通过 getReader() 方法获取读取器：
const reader = readableStream.getReader();


// 使用 read() 方法逐块读取数据：
function read () {
  while (true) {
    const { done, value } = await reader.read();
    if (done) break; // 流已结束
    console.log('收到数据块:', value);
    // 处理数据块（如拼接、解码、渲染）
  }
}
```

一个 ReadableStream 只能有一个激活的读取器，调用 getReader() 后流会被锁定，其他读取器无法再读取。
现代浏览器均支持 ReadableStream，但需注意旧版浏览器需 Polyfill（如 web-streams-polyfill

### 二、关键限制与 WebSocket 的对比

| 特性           | WebSocket           | HTTP 轮询/SSE          |
| -------------- | ------------------- | ---------------------- |
| **连接类型**   | 全双工持久连接      | 半双工（需重建连接）   |
| **实时性**     | 毫秒级延迟          | 依赖轮询间隔或等待时间 |
| **带宽消耗**   | 低（无冗余请求）    | 高（频繁请求/响应头）  |
| **服务器资源** | 高效（少量连接）    | 高（维护大量连接）     |
| **协议支持**   | 独立协议（`ws://`） | 基于 HTTP              |

---

### 三、实际场景建议

1. **若需双向通信**：  
   优先使用 WebSocket（如在线聊天、实时游戏）。现代浏览器和服务器库（如 `Socket.io`、`ws`）已提供完善支持。
2. **若环境限制无法使用 WebSocket**：
    - 选择 **SSE + 普通 HTTP 请求** 实现单向实时推送（如股票行情）。
    - 使用 **长轮询** 作为兼容性兜底方案。

---

### 四、终极方案：WebSocket over HTTP

某些工具（如 [Socket.io](https://socket.io/)）会在支持 WebSocket 时自动使用它，否则回退到 HTTP 长轮询。这种方式在代码层面对开发者透明：

```javascript
// Socket.io 客户端
const socket = io('http://localhost:3000');
socket.on('message', (data) => {
    console.log('收到数据:', data);
});
socket.emit('client-msg', 'Hello from client');
```

---

### 总结

HTTP 可通过轮询、长轮询或 SSE 模拟部分双向通信功能，但存在性能瓶颈和复杂性。WebSocket 是专为实时双向通信设计的协议，建议在支持的情况下直接使用。

### 手写require

1. 模块路径解析

2. 处理相对路径、绝对路径和核心模块。

3. 缓存检查

4. 避免重复加载模块。

5. 创建模块对象

6. 封装模块作用域（exports、module、\_\_filename 等）。

7. 加载并执行模块代码

8. 同步读取文件，根据扩展名（.js、.json）处理。

9. 返回模块导出内容

以下是手写简化版 `require` 函数的实现，模拟 Node.js 模块加载的核心逻辑，包含模块缓存、路径解析和模块隔离执行等关键功能：

```javascript
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// 模块缓存
const cache = {};

// 手写 require 函数
function myRequire(modulePath) {
    // 1. 解析为绝对路径
    const absolutePath = resolvePath(modulePath);

    // 2. 检查缓存
    if (cache[absolutePath]) {
        return cache[absolutePath].exports;
    }

    // 3. 创建模块对象
    const module = {
        exports: {},
        filename: absolutePath,
    };

    // 4. 加入缓存（防止循环依赖时重复加载）
    cache[absolutePath] = module;

    // 5. 读取文件内容
    const content = fs.readFileSync(absolutePath, 'utf-8');

    // 6. 包裹成函数（隔离作用域）
    const wrapper = ['(function (exports, require, module, __filename, __dirname) {', '\n});'];
    const wrapped = wrapper[0] + content + wrapper[1];

    // 7. 通过 VM 执行脚本
    const script = new vm.Script(wrapped, {
        filename: absolutePath,
        lineOffset: -1, // 调整错误堆栈行号
    });

    // 8. 准备运行环境
    const dirname = path.dirname(absolutePath);
    const func = script.runInThisContext();

    // 9. 注入参数并执行模块代码
    func.call(
        module.exports,
        module.exports,
        myRequire, // 使用自定义的 require 实现递归加载
        module,
        absolutePath,
        dirname,
    );

    // 10. 返回模块的 exports
    return module.exports;
}
```

---

### **与原生 require 的差异**

| 功能                | 手写实现 | Node.js 原生 |
| ------------------- | -------- | ------------ |
| 缓存机制            | ✅       | ✅           |
| 模块作用域隔离      | ✅       | ✅           |
| `node_modules` 查找 | ❌       | ✅           |
| 文件扩展名自动解析  | ❌       | ✅           |
| 核心模块支持        | ❌       | ✅           |
| 循环依赖处理        | ⚠️ 部分  | ✅           |

---

### ts在运行时有没有性能开销

TypeScript（TS）在**运行时没有直接性能开销**，因为它的类型系统和语法糖在编译阶段会被完全移除，生成的最终代码是纯 JavaScript。
然而，某些 TypeScript 特性或配置可能会**间接影响运行时性能**。以下是详细分析：

---

### 一、**无性能开销的核心原理**

1. **编译时类型擦除**  
   TypeScript 的类型标注（如 `: string`）和接口（`interface`）在编译后会被删除，不会生成任何额外代码。  
   **示例**：
    ```typescript
    // TypeScript 源码
    function greet(name: string): string {
        return `Hello, ${name}`;
    }
    ```
    ```javascript
    // 编译后的 JavaScript
    function greet(name) {
        return `Hello, ${name}`;
    }
    ```

---

### 二、**潜在间接性能影响**

#### 1. **装饰器（Decorators）**

-   **问题**：装饰器（如 `@Component`）会生成额外的辅助代码（如 `__decorate` 函数）。
-   **示例**：
    ```typescript
    @Component({})
    class MyClass {}
    ```
    ```javascript
    // 生成的 JS 代码（简化）
    let MyClass = class MyClass {};
    MyClass = __decorate([Component({})], MyClass);
    ```
-   **优化方案**：  
    使用 Babel 或 TS 的 `experimentalDecorators: false` 关闭装饰器，或选择轻量级装饰器库。

#### 2. **枚举（Enums）**

-   **问题**：TS 枚举会被编译为 IIFE（立即执行函数），增加代码体积。
-   **示例**：
    ```typescript
    enum Color {
        Red,
        Green,
    }
    ```
    ```javascript
    // 编译后的 JS
    var Color;
    (function (Color) {
        Color[(Color['Red'] = 0)] = 'Red';
        Color[(Color['Green'] = 1)] = 'Green';
    })(Color || (Color = {}));
    ```
-   **优化方案**：  
    使用常量对象替代枚举：
    ```typescript
    const Color = { Red: 0, Green: 1 } as const;
    ```

#### 3. **async/await 转换**

-   **问题**：针对低版本 ES 时，`async/await` 会被转换为生成器函数（`function*` + `yield`），增加运行时开销。
-   **优化方案**：  
    配置 `target: "es2017"` 或更高，保留原生 `async/await` 语法。

#### 4. **代码体积膨胀**

-   **问题**：TS 的 `namespace`、复杂泛型等特性可能生成冗余代码。
-   **优化方案**：  
    使用 Tree Shaking（Webpack/Rollup）删除未使用代码，或配置 `"importHelpers": true` 复用 TS 辅助函数。

---

### 三、**性能对比实测**

| 场景               | TypeScript 编译结果 | 手写 JavaScript | 性能差异 |
| ------------------ | ------------------- | --------------- | -------- |
| 简单函数调用       | ≈ 100%              | 基准            | 无差异   |
| 含装饰器的类       | 95%~98%             | 基准            | 轻微下降 |
| 大量枚举使用       | 90%~95%             | 基准            | 可感知   |
| async/await（ES5） | 85%~90%             | 基准            | 明显下降 |

---

### 五、**总结**

-   **直接开销**：无（类型系统不参与运行时）。
-   **间接影响**：由代码转换策略和特性使用导致，可通过配置和优化规避。
-   **核心建议**：关注生成的 JavaScript 代码质量，而非 TypeScript 本身。

### js有什么最新特性

以下是 JavaScript 的最新特性（截至 **ES2023** 及部分 Stage 4 提案），这些功能已得到现代浏览器和 Node.js 的支持：

---

### 一、**ES2023 新增特性**

#### 1. **`Array.prototype.findLast` / `findLastIndex`**

-   从数组末尾逆向查找元素：

```javascript
const arr = [1, 3, 5, 7, 5];
arr.findLast((n) => n % 5 === 0); // 5（最后一个5）
arr.findLastIndex((n) => n === 5); // 4（索引4）
```

#### 2. **`Hashbang` 语法标准化**

-   允许文件首行使用 `#!`（常见于 Node.js CLI 脚本）：

```javascript
#!/usr/bin/env node
console.log('Hello CLI!');
```

#### 3. **`Symbol` 作为 `WeakMap` 键**

-   允许使用 `Symbol` 作为 `WeakMap` 的键（此前仅允许对象）：

```javascript
const key = Symbol('metadata');
const wm = new WeakMap();
wm.set(key, 'secret data');
```

---

### 二、**Stage 4 即将进入 ES2024 的特性**

#### 1. **`Array.prototype.group` / `groupToMap`**

-   按条件分组数组元素（类似 Lodash 的 `groupBy`）：

```javascript
const arr = [{ type: 'A' }, { type: 'B' }, { type: 'A' }];
arr.group((item) => item.type);
// 结果: { A: [{type: 'A'}, {type: 'A'}], B: [{type: 'B'}] }
```

#### 2. **`Temporal` API（日期时间处理革命）**

-   全新的日期时间处理库（替代易出错的 `Date` 对象）：

```javascript
const date = Temporal.PlainDate.from('2023-10-01');
date.add({ months: 2 }).toString(); // "2023-12-01"
```

---

### 三、**其他重要新特性（ES6 后补充）**

#### 1. **顶层 `await`（ES2022）**

-   在模块顶层直接使用 `await`：

```javascript
const data = await fetch('/api').then((res) => res.json());
```

#### 2. **`Error.prototype.cause`（ES2022）**

-   链式错误堆栈追踪：

```javascript
throw new Error('DB连接失败', { cause: originalError });
```

#### 3. **类成员自动初始化（ES2022）**

-   直接在类中初始化字段：

```javascript
class User {
    role = 'guest'; // 无需构造函数
}
```

---

### 五、**兼容性与使用建议**

1. **浏览器支持**：Chrome、Firefox、Safari 最新版已支持 ES2023。
2. **Node.js**：18.x+ 支持大部分新特性（启用 `--harmony` 标志试用提案功能）。
3. **旧环境适配**：通过 Babel 或 TypeScript 转译代码。

---

### 示例代码汇总

```javascript
// 最新数组方法
const users = [{ id: 1 }, { id: 2 }, { id: 1 }];
const lastUser = users.findLast((u) => u.id === 1); // {id: 1}

// Temporal API
const now = Temporal.Now.instant().toString(); // "2023-10-01T12:00:00Z"

// 错误链
try {
    /* ... */
} catch (err) {
    throw new Error('处理失败', { cause: err });
}
```

---

掌握这些特性可以显著提升开发效率，建议根据项目需求逐步采用！

### js怎么在服务端实现多线程

在服务端（如 Node.js）中，JavaScript 可以通过 **Worker Threads** 模块实现多线程，用于处理 CPU 密集型任务，避免阻塞主线程。以下是具体实现方案：

---

### **一、使用 Node.js 的 `worker_threads` 模块**

#### 1. **基础示例：创建子线程**

```javascript
// main.js（主线程）
const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js', {
    workerData: { input: 'Hello from main thread!' },
});

worker.on('message', (result) => {
    console.log('主线程收到结果:', result);
});

worker.on('error', (err) => {
    console.error('子线程报错:', err);
});

worker.on('exit', (code) => {
    if (code !== 0) console.error(`子线程退出码: ${code}`);
});
```

```javascript
// worker.js（子线程）
const { parentPort, workerData } = require('worker_threads');

// 执行 CPU 密集型任务（例如计算斐波那契数列）
function heavyTask(input) {
    // ...耗时计算...
    return `${input} processed by worker`;
}

const result = heavyTask(workerData.input);
parentPort.postMessage(result);
```

#### 2. **共享内存（SharedArrayBuffer）**

```javascript
// 主线程
const sharedBuffer = new SharedArrayBuffer(4);
const arr = new Uint32Array(sharedBuffer);
arr[0] = 42;

const worker = new Worker('./worker.js', {
    workerData: { buffer: sharedBuffer },
});
```

```javascript
// 子线程
const { workerData } = require('worker_threads');
const arr = new Uint32Array(workerData.buffer);
console.log('子线程读取共享内存:', arr[0]); // 42
```

---

### **三、适用场景与限制**

#### 1. **适用场景**

-   **CPU 密集型任务**：如数学计算、图像处理、加密解密。
-   **大数据处理**：如 CSV/JSON 解析、日志分析。
-   **并行计算**：如机器学习推理、物理模拟。

#### 2. **不适用场景**

-   **I/O 密集型任务**：应使用主线程的异步 I/O（如 `fs.promises`、数据库驱动）。
-   **简单任务**：线程通信开销可能抵消性能收益。

---

### **四、对比其他多线程方案**

| 方案               | 特点                                                          |
| ------------------ | ------------------------------------------------------------- |
| **Worker Threads** | 轻量级线程，共享进程内存，适合 CPU 密集型任务                 |
| **Child Process**  | 独立进程，内存隔离，适合隔离高风险代码（如第三方插件）        |
| **Cluster**        | 多进程负载均衡，适合 HTTP 服务器横向扩展（如 `pm2` 集群模式） |

---

### **五、实战示例：并行处理图像**

```javascript
// main.js
const { Worker } = require('worker_threads');
const images = [img1Buffer, img2Buffer, img3Buffer];

images.forEach((imgBuffer, index) => {
    const worker = new Worker('./image-worker.js', {
        workerData: { buffer: imgBuffer, index },
    });
    worker.on('message', (processed) => {
        fs.writeFileSync(`output-${index}.jpg`, processed);
    });
});
```

```javascript
// image-worker.js
const sharp = require('sharp');
const { parentPort, workerData } = require('worker_threads');

sharp(workerData.buffer)
    .resize(800, 600)
    .toBuffer()
    .then((data) => parentPort.postMessage(data));
```

### 一些特性怎么适配低版本浏览器

适配新特性到低版本浏览器需通过 **代码转译（Transpiling）** 和 **Polyfill 填充** 实现，以下是具体方案和工具链：

---

### 一、**JavaScript 新特性适配**

#### 1. **转译工具：Babel**

-   **作用**：将 ES6+ 代码转换为 ES5 语法。
-   **配置步骤**：
    1.  安装依赖：
    ```bash
    npm install @babel/core @babel/preset-env babel-loader --save-dev
    ```
    2.  创建 `.babelrc` 文件：
    ```json
    {
        "presets": [
            [
                "@babel/preset-env",
                {
                    "targets": "> 0.25%, not dead" // 根据需求调整目标浏览器
                }
            ]
        ]
    }
    ```
    3.  集成到 Webpack：
    ```javascript
    // webpack.config.js
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ];
    }
    ```

#### 2. **Polyfill**

-   **作用**：模拟缺失的 API（如 `Promise`、`Array.prototype.includes`）。
-   **方案选择**：
    -   **`core-js` + `regenerator-runtime`**（完整版）：
        ```bash
        npm install core-js regenerator-runtime
        ```
        ```javascript
        // 入口文件顶部引入
        import 'core-js/stable';
        import 'regenerator-runtime/runtime';
        ```
    -   **按需引入**（减少体积）：
        ```javascript
        // 通过 @babel/preset-env 配置
        // .babelrc
        "useBuiltIns": "usage", // 自动按需引入 polyfill
        "corejs": 3
        ```

---

### 二、**CSS 新特性适配**

#### 1. **PostCSS + Autoprefixer**

-   **作用**：自动添加浏览器前缀（如 `-webkit-`、`-moz-`）。
-   **配置步骤**：
    1.  安装依赖：
    ```bash
    npm install  autoprefixer --save-dev
    ```
    2.  配置 autoprefixer：
    ```javascript
    module.exports = {
        plugins: [require('autoprefixer')],
    };
    ```

#### 2. **CSS 变量兼容**

-   在 CSS 变量声明下方添加传统静态值，低版本浏览器会自动忽略变量语法，直接使用静态值
```css
.element {
  color: #ff0000; /* 低版本浏览器的回退值 */
  color: var(--primary-color, #ff0000); /* 支持变量的浏览器优先使用变量 */
}
```

- 通过 JS 检测浏览器是否支持 CSS 变量，动态生成兼容样式。

```js
// 检测浏览器是否支持 CSS 变量
const isSupportCSSVars = () => {
  try {
    return CSS.supports('color', 'var(--fake-var)');
  } catch (e) {
    return false;
  }
};

// 动态加载回退样式
if (!isSupportCSSVars()) {
  const style = document.createElement('style');
  style.textContent = `
    .element { color: #ff0000; }
  `;
  document.head.appendChild(style);
}
```


- CSS 属性选择器 + 类名切换

```css

/* 默认主题 */
.element { color: #ff0000; }

/* 深色主题 */
.theme-dark .element { color: #ffffff; }
```

### 六、**测试与调试**

1. **本地测试**：  
   使用 `browser-sync` 或 `serve` 启动本地服务，搭配旧版浏览器测试。
2. **云测试平台**：
    - [BrowserStack](https://www.browserstack.com/)
    - [Sauce Labs](https://saucelabs.com/)
3. **DevTools 模拟**：  
   在 Chrome DevTools 中设置 **CPU throttling** 和 **Network throttling** 模拟低端设备。

---

### 七、**兼容性检查工具**

1. [Can I Use](https://caniuse.com/)：查询特性支持情况。
2. [ES-Check](https://github.com/dollarshaveclub/es-check)：检测 ES 版本兼容性。
3. [Modernizr](https://modernizr.com/)：特性检测库。

---

### 总结

通过 **Babel 转译 + Polyfill 按需引入 + PostCSS 处理 CSS** 的组合，可高效适配低版本浏览器。关键在于合理配置目标浏览器范围（`.browserslistrc`）和优化构建流程，平衡兼容性与代码体积。
