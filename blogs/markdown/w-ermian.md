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

###  使用promise+async await 实现一个函数，运行这个函数 先输出1 然后3s之后输出2


```js
function sleep (time) {
	return new Promise((reslove) => {
		setTimeout(() => { reslove() }, time)
		
	});
}


async function  task () {
	console.log(1);
	await sleep(3000);
	console.log(2);
}
```



### 将两个递增数组合并成一个数组，且是递增的

```js
function mergeArray(array1, array2) {
    const result = [];
    let i = 0, j = 0;
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

- 使用 `lerna bootstrap` 安装依赖
- 使用 `lerna clean` 清理依赖
- 使用 `lerna changed` 查看修改的包
- 使用 `lerna diff` 查看具体改动
- 使用 `lerna version` 更新版本号
- 使用 `lerna publish` 发布包

6. **版本控制策略**

- Fixed/Locked mode (默认): 所有包使用同一版本号
- Independent mode: 每个包独立版本号管理

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

``` js
externals: [
  // 方法1：使用正则匹配所有本地包
  /^@my-scope\/.+$/,
]
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

    console.log(key, obj[key])
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
      ...defaultConfig
    };
  }

  async request(params) {
    const config = { ...this.defaultConfig, ...params };
    const { url, method = 'GET', headers = {}, timeout, retryTimes } = config;

    const executeRequest = async (attempt = 0) => {
      try {
        const controller = new AbortController();  // 创建一个 AbortController 实例
        const timeoutId = setTimeout(() => controller.abort(), timeout); // 设置超时

        const response = await fetch(url, {
          method,
          headers,
          signal: controller.signal, // 将 AbortController 的 signal 传递给 fetch  
          ...config
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new HttpError(`HTTP Error: ${response.statusText}`, response.status);
        }

        const data = await response.json(); // 解析响应数据
        return {
          data,
          status: response.status
        };

      } catch (error) {
        if (attempt < retryTimes - 1) {
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
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
      body: JSON.stringify(data)
    });
  }
}

// Hook implementation
function useRequest(requestFn, options = {}) {
  const {
    manual = false,
    defaultData = null,
    onSuccess,
    onError
  } = options;

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
    run
  };
}

// Usage example:
const client = new RequestClient({
  timeout: 5000,
  retryTimes: 3
});

// In component:
const { data, loading, error, run } = useRequest(
  () => client.get('https://api.example.com/data'),
  {
    manual: true,
    onSuccess: (result) => console.log('Success:', result),
    onError: (error) => console.error('Error:', error)
  }
);
```
