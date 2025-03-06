"use strict";(self.webpackChunkreact_wyz=self.webpackChunkreact_wyz||[]).push([[933],{3933:(n,e,t)=>{t.r(e),t.d(e,{default:()=>a});const a="### 你的优势\n\n### 如何设计一个项目\n\n\n### 如何排查 js 渲染卡段问题\n\n### 如何优化性能\n\n优化性能需要从 **加载速度**、**运行效率** 和 **用户体验** 三个维度入手。以下是分领域的性能优化方案，涵盖前端、后端和网络传输：\n\n---\n\n### **一、前端性能优化**\n\n#### **1. 减少资源体积**\n\n-   **代码压缩**：\n    ```bash\n    # 使用 Webpack 压缩 JS/CSS\n    npm install terser-webpack-plugin css-minimizer-webpack-plugin --save-dev\n    ```\n-   **Tree Shaking**：移除未使用的代码（仅限 ES Module）。\n-   **图片优化**：\n    -   使用 WebP 格式替代 PNG/JPG。\n    -   响应式图片：`<img srcset=\"small.jpg 500w, large.jpg 1000w\">`。\n\n#### **2. 加快加载速度**\n\n-   **CDN 加速静态资源**：\n    ```html\n    <script src=\"https://cdn.example.com/react.production.min.js\"><\/script>\n    ```\n-   **预加载关键资源**：\n    ```html\n    <link rel=\"preload\" href=\"font.woff2\" as=\"font\" type=\"font/woff2\" crossorigin />\n    ```\n-   **异步加载非关键资源**：\n    ```html\n    <script async src=\"analytics.js\"><\/script>\n    \x3c!-- 异步加载 --\x3e\n    <script defer src=\"vendor.js\"><\/script>\n    \x3c!-- 延迟执行 --\x3e\n    ```\n\n#### **3. 提升渲染性能**\n\n-   **避免强制同步布局（Layout Thrashing）**：\n\n    ```javascript\n    // 错误：读取和写入样式交替触发布局\n    element.style.width = '100px';\n    const height = element.offsetHeight;\n    element.style.height = `${height * 2}px`;\n\n    // 修复：批量读写\n    requestAnimationFrame(() => {\n        const height = element.offsetHeight;\n        element.style.width = '100px';\n        element.style.height = `${height * 2}px`;\n    });\n    ```\n\n-   **使用 CSS3 动画替代 JS 动画**：\n    ```css\n    .box {\n        transition: transform 0.3s ease;\n    }\n    .box:hover {\n        transform: scale(1.1);\n    }\n    ```\n\n---\n\n### **二、后端性能优化**\n\n#### **1. 数据库优化**\n\n-   **索引优化**：为高频查询字段添加索引。\n    ```sql\n    CREATE INDEX idx_user_email ON users(email);\n    ```\n-   **分页缓存**：缓存热点查询结果（如 Redis）。\n    ```javascript\n    app.get('/api/posts', cacheMiddleware(300), async (req, res) => {\n        const posts = await db.query('SELECT * FROM posts LIMIT 100');\n        res.json(posts);\n    });\n    ```\n\n#### **2. 计算优化**\n\n-   **异步任务队列**：将耗时操作（如邮件发送）移出主线程。\n    ```javascript\n    // 使用 BullMQ 队列\n    const queue = new Queue('emails');\n    queue.add('sendWelcomeEmail', { to: 'user@example.com' });\n    ```\n-   **算法优化**：将时间复杂度从 O(n²) 降低到 O(n log n)。\n\n#### **3. 水平扩展**\n\n-   **负载均衡**：使用 Nginx 分发请求到多台服务器。\n    ```nginx\n    upstream backend {\n      server backend1.example.com;\n      server backend2.example.com;\n    }\n    server {\n      location / { proxy_pass http://backend; }\n    }\n    ```\n\n---\n\n### **三、网络传输优化**\n\n#### **1. 减少请求次数**\n\n-   **HTTP/2 多路复用**：合并多个请求到一个 TCP 连接。\n    ```nginx\n    # Nginx 配置启用 HTTP/2\n    listen 443 ssl http2;\n    ```\n-   **雪碧图（CSS Sprites）**：合并小图标为一张大图。\n    ```css\n    .icon {\n        background-image: url('sprites.png');\n    }\n    .icon-home {\n        background-position: 0 0;\n    }\n    ```\n\n#### **2. 压缩传输数据**\n\n-   **Brotli/Gzip 压缩**：\n    ```nginx\n    gzip on;\n    gzip_types text/html text/css application/json;\n    ```\n-   **JSON 字段简写**：\n    ```json\n    {\"id\":1,\"n\":\"iPhone\"} → {\"i\":1,\"n\":\"iPhone\"}\n    ```\n\n#### **3. 缓存策略**\n\n-   **强缓存（Cache-Control）**：\n    ```http\n    Cache-Control: public, max-age=31536000\n    ```\n-   **协商缓存（ETag）**：\n    ```http\n    ETag: \"33a64df551425fcc55e4d42a148795d9f25f89d4\"\n    ```\n\n---\n\n### **四、性能分析工具**\n\n#### **1. 前端工具**\n\n-   **Lighthouse**：生成性能评分和优化建议。\n    ```bash\n    npm install -g lighthouse\n    lighthouse http://example.com --view\n    ```\n-   **Chrome DevTools**：\n    -   **Performance 面板**：分析运行时性能。\n    -   **Coverage 面板**：检测未使用的 CSS/JS 代码。\n\n#### **2. 后端工具**\n\n-   **Node.js 性能分析**：\n    ```bash\n    node --prof app.js         # 生成性能日志\n    node --prof-process isolate-0xXXXXX-v8.log > processed.txt\n    ```\n-   **APM（Application Performance Monitoring）**：\n    -   New Relic\n    -   Datadog\n\n---\n\n### **五、性能优化优先级**\n\n| 优化方向     | 高 ROI 策略                 | 效果预估             |\n| ------------ | --------------------------- | -------------------- |\n| **前端加载** | 压缩资源 + CDN + 异步加载   | 首屏速度提升 30%~50% |\n| **接口响应** | 数据库索引 + 缓存热点数据   | API 延迟降低 50%~80% |\n| **渲染性能** | 避免强制布局 + CSS 动画优化 | FPS 提升至 60 帧     |\n| **网络传输** | 启用 HTTP/2 + Brotli 压缩   | 传输体积减少 20%~40% |\n\n---\n\n### **总结**\n\n性能优化需遵循 **测量 → 分析 → 优化 → 监控** 的闭环，优先解决瓶颈问题（如长任务、大资源加载）。保持代码简洁、合理利用缓存、减少不必要的计算是关键。\n\n### 如何解决内存溢出\n\n在 JavaScript 中解决内存溢出（Memory Leak）或内存不足（Out of Memory）问题，需从代码设计、内存管理和工具分析入手。以下是具体解决方案：\n\n---\n\n### **一、常见内存泄漏场景与修复方案**\n\n#### **1. 意外的全局变量**\n\n-   **问题**：未使用 `var`/`let`/`const` 声明变量，导致变量挂载到 `window` 全局对象，无法被回收。\n-   **示例**：\n    ```javascript\n    function leak() {\n        globalVar = 'Leak!'; // 意外创建全局变量\n    }\n    ```\n-   **修复**：使用严格模式 `\"use strict\"`，强制声明变量：\n    ```javascript\n    'use strict';\n    function safe() {\n        let localVar = 'Safe!'; // 局部变量\n    }\n    ```\n\n#### **2. 未清除的定时器或事件监听**\n\n-   **问题**：未及时清理 `setInterval` 或事件监听，导致回调函数持续引用对象。\n-   **示例**：\n    ```javascript\n    const button = document.getElementById('myButton');\n    button.addEventListener('click', onClick); // 未移除监听\n    ```\n-   **修复**：在组件销毁或页面卸载时清理：\n\n    ```javascript\n    // 清除定时器\n    const timer = setInterval(() => {}, 1000);\n    clearInterval(timer);\n\n    // 移除事件监听\n    button.removeEventListener('click', onClick);\n    ```\n\n#### **3. 闭包中的循环引用**\n\n-   **问题**：闭包函数持有外部作用域的变量，导致变量无法释放。\n-   **示例**：\n    ```javascript\n    function createClosure() {\n        const bigData = new Array(1000000).fill('data');\n        return () => console.log(bigData.length); // 闭包引用 bigData\n    }\n    ```\n-   **修复**：在不再需要时手动解除引用：\n    ```javascript\n    let closure = createClosure();\n    closure(); // 使用后解除引用\n    closure = null;\n    ```\n\n#### **4. 游离的 DOM 引用**\n\n-   **问题**：JS 中保留了对已移除 DOM 元素的引用，导致元素无法被回收。\n-   **示例**：\n    ```javascript\n    const elements = {\n        button: document.getElementById('oldButton'),\n    };\n    document.body.removeChild(elements.button); // DOM 已移除，但 JS 仍引用\n    ```\n-   **修复**：移除 DOM 后删除 JS 引用：\n    ```javascript\n    elements.button = null; // 解除引用\n    ```\n\n---\n\n### **二、内存分析工具**\n\n#### **1. Chrome DevTools**\n\n-   **Memory 面板**：\n    -   **Heap Snapshot**：生成堆快照，对比两次快照查找未释放对象。\n    -   **Allocation Timeline**：追踪内存分配时间线，定位泄漏点。\n-   **Performance 面板**：录制内存变化，观察内存增长趋势。\n\n#### **2. Node.js 内存分析**\n\n-   **生成堆转储文件**：\n    ```bash\n    node --inspect app.js # 启用调试\n    ```\n-   使用 Chrome DevTools 或 `v8-profiler` 分析内存。\n\n---\n\n### **三、优化内存使用的编码技巧**\n\n#### **1. 使用弱引用（WeakMap/WeakSet）**\n\n```javascript\nconst weakMap = new WeakMap();\nlet key = { id: 1 };\nweakMap.set(key, 'data'); // key 被回收后，weakMap 自动删除条目\nkey = null;\n```\n\n#### **2. 避免内存密集操作**\n\n-   **分批处理数据**：\n    ```javascript\n    function processLargeData(data) {\n        const chunkSize = 1000;\n        for (let i = 0; i < data.length; i += chunkSize) {\n            const chunk = data.slice(i, i + chunkSize);\n            // 处理分块数据\n        }\n    }\n    ```\n-   **使用 `requestIdleCallback`**：在浏览器空闲时执行低优先级任务。\n\n#### **3. 释放资源**\n\n-   **手动解除引用**：\n    ```javascript\n    let heavyObject = new HeavyObject();\n    heavyObject.cleanup(); // 执行清理方法\n    heavyObject = null; // 解除引用\n    ```\n-   **Web Workers 处理大计算**：将 CPU 密集型任务移至子线程，避免阻塞主线程。\n\n---\n\n### **四、特殊场景优化**\n\n#### **2. 大量数据渲染（如表格、列表）**\n\n-   **虚拟滚动（Virtual Scrolling）**：仅渲染可视区域 DOM。\n-   **懒加载（Lazy Loading）**：分页或滚动加载数据。\n\n---\n\n### **五、预防措施**\n\n1. **代码规范**：强制使用 `let`/`const`，避免全局变量。\n2. **定期内存分析**：在开发阶段使用工具检查内存泄漏。\n3. **监控生产环境**：通过 `performance.memory`（浏览器）或 `process.memoryUsage()`（Node.js）监控内存使用。\n\n---\n\n### **示例：检测内存泄漏**\n\n```javascript\n// 在浏览器中检查内存增长\nfunction checkMemory() {\n    const initialMemory = performance.memory.usedJSHeapSize;\n    // 执行可疑操作...\n    setTimeout(() => {\n        const finalMemory = performance.memory.usedJSHeapSize;\n        console.log('内存变化:', finalMemory - initialMemory);\n    }, 1000);\n}\n```\n\n---\n\n通过以上方法，可有效解决和预防 JavaScript 中的内存溢出问题。核心思路是：**减少不必要的引用 + 及时释放资源 + 合理利用工具分析**。\n"}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOTMzLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoibUlBQUEsMHhQIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3Rfd3l6Ly4uLy4uL2Jsb2dzL21hcmtkb3duL3ctdGhpcmQubWQiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCIjIyMg5L2g55qE5LyY5Yq/XFxuXFxuIyMjIOWmguS9leiuvuiuoeS4gOS4qumhueebrlxcblxcblxcbiMjIyDlpoLkvZXmjpLmn6UganMg5riy5p+T5Y2h5q616Zeu6aKYXFxuXFxuIyMjIOWmguS9leS8mOWMluaAp+iDvVxcblxcbuS8mOWMluaAp+iDvemcgOimgeS7jiAqKuWKoOi9vemAn+W6pioq44CBKirov5DooYzmlYjnjocqKiDlkowgKirnlKjmiLfkvZPpqowqKiDkuInkuKrnu7TluqblhaXmiYvjgILku6XkuIvmmK/liIbpoobln5/nmoTmgKfog73kvJjljJbmlrnmoYjvvIzmtrXnm5bliY3nq6/jgIHlkI7nq6/lkoznvZHnu5zkvKDovpPvvJpcXG5cXG4tLS1cXG5cXG4jIyMgKirkuIDjgIHliY3nq6/mgKfog73kvJjljJYqKlxcblxcbiMjIyMgKioxLiDlh4/lsJHotYTmupDkvZPnp68qKlxcblxcbi0gICAqKuS7o+eggeWOi+e8qSoq77yaXFxuICAgIGBgYGJhc2hcXG4gICAgIyDkvb/nlKggV2VicGFjayDljovnvKkgSlMvQ1NTXFxuICAgIG5wbSBpbnN0YWxsIHRlcnNlci13ZWJwYWNrLXBsdWdpbiBjc3MtbWluaW1pemVyLXdlYnBhY2stcGx1Z2luIC0tc2F2ZS1kZXZcXG4gICAgYGBgXFxuLSAgICoqVHJlZSBTaGFraW5nKirvvJrnp7vpmaTmnKrkvb/nlKjnmoTku6PnoIHvvIjku4XpmZAgRVMgTW9kdWxl77yJ44CCXFxuLSAgICoq5Zu+54mH5LyY5YyWKirvvJpcXG4gICAgLSAgIOS9v+eUqCBXZWJQIOagvOW8j+abv+S7oyBQTkcvSlBH44CCXFxuICAgIC0gICDlk43lupTlvI/lm77niYfvvJpgPGltZyBzcmNzZXQ9XFxcInNtYWxsLmpwZyA1MDB3LCBsYXJnZS5qcGcgMTAwMHdcXFwiPmDjgIJcXG5cXG4jIyMjICoqMi4g5Yqg5b+r5Yqg6L296YCf5bqmKipcXG5cXG4tICAgKipDRE4g5Yqg6YCf6Z2Z5oCB6LWE5rqQKirvvJpcXG4gICAgYGBgaHRtbFxcbiAgICA8c2NyaXB0IHNyYz1cXFwiaHR0cHM6Ly9jZG4uZXhhbXBsZS5jb20vcmVhY3QucHJvZHVjdGlvbi5taW4uanNcXFwiPjwvc2NyaXB0PlxcbiAgICBgYGBcXG4tICAgKirpooTliqDovb3lhbPplK7otYTmupAqKu+8mlxcbiAgICBgYGBodG1sXFxuICAgIDxsaW5rIHJlbD1cXFwicHJlbG9hZFxcXCIgaHJlZj1cXFwiZm9udC53b2ZmMlxcXCIgYXM9XFxcImZvbnRcXFwiIHR5cGU9XFxcImZvbnQvd29mZjJcXFwiIGNyb3Nzb3JpZ2luIC8+XFxuICAgIGBgYFxcbi0gICAqKuW8guatpeWKoOi9vemdnuWFs+mUrui1hOa6kCoq77yaXFxuICAgIGBgYGh0bWxcXG4gICAgPHNjcmlwdCBhc3luYyBzcmM9XFxcImFuYWx5dGljcy5qc1xcXCI+PC9zY3JpcHQ+XFxuICAgIDwhLS0g5byC5q2l5Yqg6L29IC0tPlxcbiAgICA8c2NyaXB0IGRlZmVyIHNyYz1cXFwidmVuZG9yLmpzXFxcIj48L3NjcmlwdD5cXG4gICAgPCEtLSDlu7bov5/miafooYwgLS0+XFxuICAgIGBgYFxcblxcbiMjIyMgKiozLiDmj5DljYfmuLLmn5PmgKfog70qKlxcblxcbi0gICAqKumBv+WFjeW8uuWItuWQjOatpeW4g+WxgO+8iExheW91dCBUaHJhc2hpbmfvvIkqKu+8mlxcblxcbiAgICBgYGBqYXZhc2NyaXB0XFxuICAgIC8vIOmUmeivr++8muivu+WPluWSjOWGmeWFpeagt+W8j+S6pOabv+inpuWPkeW4g+WxgFxcbiAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gJzEwMHB4JztcXG4gICAgY29uc3QgaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XFxuICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0ICogMn1weGA7XFxuXFxuICAgIC8vIOS/ruWkje+8muaJuemHj+ivu+WGmVxcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XFxuICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gJzEwMHB4JztcXG4gICAgICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0ICogMn1weGA7XFxuICAgIH0pO1xcbiAgICBgYGBcXG5cXG4tICAgKirkvb/nlKggQ1NTMyDliqjnlLvmm7/ku6MgSlMg5Yqo55S7KirvvJpcXG4gICAgYGBgY3NzXFxuICAgIC5ib3gge1xcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcXG4gICAgfVxcbiAgICAuYm94OmhvdmVyIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG4gICAgfVxcbiAgICBgYGBcXG5cXG4tLS1cXG5cXG4jIyMgKirkuozjgIHlkI7nq6/mgKfog73kvJjljJYqKlxcblxcbiMjIyMgKioxLiDmlbDmja7lupPkvJjljJYqKlxcblxcbi0gICAqKue0ouW8leS8mOWMlioq77ya5Li66auY6aKR5p+l6K+i5a2X5q615re75Yqg57Si5byV44CCXFxuICAgIGBgYHNxbFxcbiAgICBDUkVBVEUgSU5ERVggaWR4X3VzZXJfZW1haWwgT04gdXNlcnMoZW1haWwpO1xcbiAgICBgYGBcXG4tICAgKirliIbpobXnvJPlrZgqKu+8mue8k+WtmOeDreeCueafpeivoue7k+aenO+8iOWmgiBSZWRpc++8ieOAglxcbiAgICBgYGBqYXZhc2NyaXB0XFxuICAgIGFwcC5nZXQoJy9hcGkvcG9zdHMnLCBjYWNoZU1pZGRsZXdhcmUoMzAwKSwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XFxuICAgICAgICBjb25zdCBwb3N0cyA9IGF3YWl0IGRiLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIHBvc3RzIExJTUlUIDEwMCcpO1xcbiAgICAgICAgcmVzLmpzb24ocG9zdHMpO1xcbiAgICB9KTtcXG4gICAgYGBgXFxuXFxuIyMjIyAqKjIuIOiuoeeul+S8mOWMlioqXFxuXFxuLSAgICoq5byC5q2l5Lu75Yqh6Zif5YiXKirvvJrlsIbogJfml7bmk43kvZzvvIjlpoLpgq7ku7blj5HpgIHvvInnp7vlh7rkuLvnur/nqIvjgIJcXG4gICAgYGBgamF2YXNjcmlwdFxcbiAgICAvLyDkvb/nlKggQnVsbE1RIOmYn+WIl1xcbiAgICBjb25zdCBxdWV1ZSA9IG5ldyBRdWV1ZSgnZW1haWxzJyk7XFxuICAgIHF1ZXVlLmFkZCgnc2VuZFdlbGNvbWVFbWFpbCcsIHsgdG86ICd1c2VyQGV4YW1wbGUuY29tJyB9KTtcXG4gICAgYGBgXFxuLSAgICoq566X5rOV5LyY5YyWKirvvJrlsIbml7bpl7TlpI3mnYLluqbku44gTyhuwrIpIOmZjeS9juWIsCBPKG4gbG9nIG4p44CCXFxuXFxuIyMjIyAqKjMuIOawtOW5s+aJqeWxlSoqXFxuXFxuLSAgICoq6LSf6L295Z2H6KGhKirvvJrkvb/nlKggTmdpbngg5YiG5Y+R6K+35rGC5Yiw5aSa5Y+w5pyN5Yqh5Zmo44CCXFxuICAgIGBgYG5naW54XFxuICAgIHVwc3RyZWFtIGJhY2tlbmQge1xcbiAgICAgIHNlcnZlciBiYWNrZW5kMS5leGFtcGxlLmNvbTtcXG4gICAgICBzZXJ2ZXIgYmFja2VuZDIuZXhhbXBsZS5jb207XFxuICAgIH1cXG4gICAgc2VydmVyIHtcXG4gICAgICBsb2NhdGlvbiAvIHsgcHJveHlfcGFzcyBodHRwOi8vYmFja2VuZDsgfVxcbiAgICB9XFxuICAgIGBgYFxcblxcbi0tLVxcblxcbiMjIyAqKuS4ieOAgee9kee7nOS8oOi+k+S8mOWMlioqXFxuXFxuIyMjIyAqKjEuIOWHj+Wwkeivt+axguasoeaVsCoqXFxuXFxuLSAgICoqSFRUUC8yIOWkmui3r+WkjeeUqCoq77ya5ZCI5bm25aSa5Liq6K+35rGC5Yiw5LiA5LiqIFRDUCDov57mjqXjgIJcXG4gICAgYGBgbmdpbnhcXG4gICAgIyBOZ2lueCDphY3nva7lkK/nlKggSFRUUC8yXFxuICAgIGxpc3RlbiA0NDMgc3NsIGh0dHAyO1xcbiAgICBgYGBcXG4tICAgKirpm6rnoqflm77vvIhDU1MgU3ByaXRlc++8iSoq77ya5ZCI5bm25bCP5Zu+5qCH5Li65LiA5byg5aSn5Zu+44CCXFxuICAgIGBgYGNzc1xcbiAgICAuaWNvbiB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ3Nwcml0ZXMucG5nJyk7XFxuICAgIH1cXG4gICAgLmljb24taG9tZSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIH1cXG4gICAgYGBgXFxuXFxuIyMjIyAqKjIuIOWOi+e8qeS8oOi+k+aVsOaNrioqXFxuXFxuLSAgICoqQnJvdGxpL0d6aXAg5Y6L57ypKirvvJpcXG4gICAgYGBgbmdpbnhcXG4gICAgZ3ppcCBvbjtcXG4gICAgZ3ppcF90eXBlcyB0ZXh0L2h0bWwgdGV4dC9jc3MgYXBwbGljYXRpb24vanNvbjtcXG4gICAgYGBgXFxuLSAgICoqSlNPTiDlrZfmrrXnroDlhpkqKu+8mlxcbiAgICBgYGBqc29uXFxuICAgIHtcXFwiaWRcXFwiOjEsXFxcIm5cXFwiOlxcXCJpUGhvbmVcXFwifSDihpIge1xcXCJpXFxcIjoxLFxcXCJuXFxcIjpcXFwiaVBob25lXFxcIn1cXG4gICAgYGBgXFxuXFxuIyMjIyAqKjMuIOe8k+WtmOetlueVpSoqXFxuXFxuLSAgICoq5by657yT5a2Y77yIQ2FjaGUtQ29udHJvbO+8iSoq77yaXFxuICAgIGBgYGh0dHBcXG4gICAgQ2FjaGUtQ29udHJvbDogcHVibGljLCBtYXgtYWdlPTMxNTM2MDAwXFxuICAgIGBgYFxcbi0gICAqKuWNj+WVhue8k+WtmO+8iEVUYWfvvIkqKu+8mlxcbiAgICBgYGBodHRwXFxuICAgIEVUYWc6IFxcXCIzM2E2NGRmNTUxNDI1ZmNjNTVlNGQ0MmExNDg3OTVkOWYyNWY4OWQ0XFxcIlxcbiAgICBgYGBcXG5cXG4tLS1cXG5cXG4jIyMgKirlm5vjgIHmgKfog73liIbmnpDlt6XlhbcqKlxcblxcbiMjIyMgKioxLiDliY3nq6/lt6XlhbcqKlxcblxcbi0gICAqKkxpZ2h0aG91c2UqKu+8mueUn+aIkOaAp+iDveivhOWIhuWSjOS8mOWMluW7uuiuruOAglxcbiAgICBgYGBiYXNoXFxuICAgIG5wbSBpbnN0YWxsIC1nIGxpZ2h0aG91c2VcXG4gICAgbGlnaHRob3VzZSBodHRwOi8vZXhhbXBsZS5jb20gLS12aWV3XFxuICAgIGBgYFxcbi0gICAqKkNocm9tZSBEZXZUb29scyoq77yaXFxuICAgIC0gICAqKlBlcmZvcm1hbmNlIOmdouadvyoq77ya5YiG5p6Q6L+Q6KGM5pe25oCn6IO944CCXFxuICAgIC0gICAqKkNvdmVyYWdlIOmdouadvyoq77ya5qOA5rWL5pyq5L2/55So55qEIENTUy9KUyDku6PnoIHjgIJcXG5cXG4jIyMjICoqMi4g5ZCO56uv5bel5YW3KipcXG5cXG4tICAgKipOb2RlLmpzIOaAp+iDveWIhuaekCoq77yaXFxuICAgIGBgYGJhc2hcXG4gICAgbm9kZSAtLXByb2YgYXBwLmpzICAgICAgICAgIyDnlJ/miJDmgKfog73ml6Xlv5dcXG4gICAgbm9kZSAtLXByb2YtcHJvY2VzcyBpc29sYXRlLTB4WFhYWFgtdjgubG9nID4gcHJvY2Vzc2VkLnR4dFxcbiAgICBgYGBcXG4tICAgKipBUE3vvIhBcHBsaWNhdGlvbiBQZXJmb3JtYW5jZSBNb25pdG9yaW5n77yJKirvvJpcXG4gICAgLSAgIE5ldyBSZWxpY1xcbiAgICAtICAgRGF0YWRvZ1xcblxcbi0tLVxcblxcbiMjIyAqKuS6lOOAgeaAp+iDveS8mOWMluS8mOWFiOe6pyoqXFxuXFxufCDkvJjljJbmlrnlkJEgICAgIHwg6auYIFJPSSDnrZbnlaUgICAgICAgICAgICAgICAgIHwg5pWI5p6c6aKE5LywICAgICAgICAgICAgIHxcXG58IC0tLS0tLS0tLS0tLSB8IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB8IC0tLS0tLS0tLS0tLS0tLS0tLS0tIHxcXG58ICoq5YmN56uv5Yqg6L29KiogfCDljovnvKnotYTmupAgKyBDRE4gKyDlvILmraXliqDovb0gICB8IOmmluWxj+mAn+W6puaPkOWNhyAzMCV+NTAlIHxcXG58ICoq5o6l5Y+j5ZON5bqUKiogfCDmlbDmja7lupPntKLlvJUgKyDnvJPlrZjng63ngrnmlbDmja4gICB8IEFQSSDlu7bov5/pmY3kvY4gNTAlfjgwJSB8XFxufCAqKua4suafk+aAp+iDvSoqIHwg6YG/5YWN5by65Yi25biD5bGAICsgQ1NTIOWKqOeUu+S8mOWMliB8IEZQUyDmj5DljYfoh7MgNjAg5binICAgICB8XFxufCAqKue9kee7nOS8oOi+kyoqIHwg5ZCv55SoIEhUVFAvMiArIEJyb3RsaSDljovnvKkgICB8IOS8oOi+k+S9k+enr+WHj+WwkSAyMCV+NDAlIHxcXG5cXG4tLS1cXG5cXG4jIyMgKirmgLvnu5MqKlxcblxcbuaAp+iDveS8mOWMlumcgOmBteW+qiAqKua1i+mHjyDihpIg5YiG5p6QIOKGkiDkvJjljJYg4oaSIOebkeaOpyoqIOeahOmXreeOr++8jOS8mOWFiOino+WGs+eTtumiiOmXrumimO+8iOWmgumVv+S7u+WKoeOAgeWkp+i1hOa6kOWKoOi9ve+8ieOAguS/neaMgeS7o+eggeeugOa0geOAgeWQiOeQhuWIqeeUqOe8k+WtmOOAgeWHj+WwkeS4jeW/heimgeeahOiuoeeul+aYr+WFs+mUruOAglxcblxcbiMjIyDlpoLkvZXop6PlhrPlhoXlrZjmuqLlh7pcXG5cXG7lnKggSmF2YVNjcmlwdCDkuK3op6PlhrPlhoXlrZjmuqLlh7rvvIhNZW1vcnkgTGVha++8ieaIluWGheWtmOS4jei2s++8iE91dCBvZiBNZW1vcnnvvInpl67popjvvIzpnIDku47ku6PnoIHorr7orqHjgIHlhoXlrZjnrqHnkIblkozlt6XlhbfliIbmnpDlhaXmiYvjgILku6XkuIvmmK/lhbfkvZPop6PlhrPmlrnmoYjvvJpcXG5cXG4tLS1cXG5cXG4jIyMgKirkuIDjgIHluLjop4HlhoXlrZjms4TmvI/lnLrmma/kuI7kv67lpI3mlrnmoYgqKlxcblxcbiMjIyMgKioxLiDmhI/lpJbnmoTlhajlsYDlj5jph48qKlxcblxcbi0gICAqKumXrumimCoq77ya5pyq5L2/55SoIGB2YXJgL2BsZXRgL2Bjb25zdGAg5aOw5piO5Y+Y6YeP77yM5a+86Ie05Y+Y6YeP5oyC6L295YiwIGB3aW5kb3dgIOWFqOWxgOWvueixoe+8jOaXoOazleiiq+WbnuaUtuOAglxcbi0gICAqKuekuuS+iyoq77yaXFxuICAgIGBgYGphdmFzY3JpcHRcXG4gICAgZnVuY3Rpb24gbGVhaygpIHtcXG4gICAgICAgIGdsb2JhbFZhciA9ICdMZWFrISc7IC8vIOaEj+WkluWIm+W7uuWFqOWxgOWPmOmHj1xcbiAgICB9XFxuICAgIGBgYFxcbi0gICAqKuS/ruWkjSoq77ya5L2/55So5Lil5qC85qih5byPIGBcXFwidXNlIHN0cmljdFxcXCJg77yM5by65Yi25aOw5piO5Y+Y6YeP77yaXFxuICAgIGBgYGphdmFzY3JpcHRcXG4gICAgJ3VzZSBzdHJpY3QnO1xcbiAgICBmdW5jdGlvbiBzYWZlKCkge1xcbiAgICAgICAgbGV0IGxvY2FsVmFyID0gJ1NhZmUhJzsgLy8g5bGA6YOo5Y+Y6YePXFxuICAgIH1cXG4gICAgYGBgXFxuXFxuIyMjIyAqKjIuIOacqua4hemZpOeahOWumuaXtuWZqOaIluS6i+S7tuebkeWQrCoqXFxuXFxuLSAgICoq6Zeu6aKYKirvvJrmnKrlj4rml7bmuIXnkIYgYHNldEludGVydmFsYCDmiJbkuovku7bnm5HlkKzvvIzlr7zoh7Tlm57osIPlh73mlbDmjIHnu63lvJXnlKjlr7nosaHjgIJcXG4tICAgKirnpLrkvosqKu+8mlxcbiAgICBgYGBqYXZhc2NyaXB0XFxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUJ1dHRvbicpO1xcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrKTsgLy8g5pyq56e76Zmk55uR5ZCsXFxuICAgIGBgYFxcbi0gICAqKuS/ruWkjSoq77ya5Zyo57uE5Lu26ZSA5q+B5oiW6aG16Z2i5Y246L295pe25riF55CG77yaXFxuXFxuICAgIGBgYGphdmFzY3JpcHRcXG4gICAgLy8g5riF6Zmk5a6a5pe25ZmoXFxuICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge30sIDEwMDApO1xcbiAgICBjbGVhckludGVydmFsKHRpbWVyKTtcXG5cXG4gICAgLy8g56e76Zmk5LqL5Lu255uR5ZCsXFxuICAgIGJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2spO1xcbiAgICBgYGBcXG5cXG4jIyMjICoqMy4g6Zet5YyF5Lit55qE5b6q546v5byV55SoKipcXG5cXG4tICAgKirpl67popgqKu+8mumXreWMheWHveaVsOaMgeacieWklumDqOS9nOeUqOWfn+eahOWPmOmHj++8jOWvvOiHtOWPmOmHj+aXoOazlemHiuaUvuOAglxcbi0gICAqKuekuuS+iyoq77yaXFxuICAgIGBgYGphdmFzY3JpcHRcXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xvc3VyZSgpIHtcXG4gICAgICAgIGNvbnN0IGJpZ0RhdGEgPSBuZXcgQXJyYXkoMTAwMDAwMCkuZmlsbCgnZGF0YScpO1xcbiAgICAgICAgcmV0dXJuICgpID0+IGNvbnNvbGUubG9nKGJpZ0RhdGEubGVuZ3RoKTsgLy8g6Zet5YyF5byV55SoIGJpZ0RhdGFcXG4gICAgfVxcbiAgICBgYGBcXG4tICAgKirkv67lpI0qKu+8muWcqOS4jeWGjemcgOimgeaXtuaJi+WKqOino+mZpOW8leeUqO+8mlxcbiAgICBgYGBqYXZhc2NyaXB0XFxuICAgIGxldCBjbG9zdXJlID0gY3JlYXRlQ2xvc3VyZSgpO1xcbiAgICBjbG9zdXJlKCk7IC8vIOS9v+eUqOWQjuino+mZpOW8leeUqFxcbiAgICBjbG9zdXJlID0gbnVsbDtcXG4gICAgYGBgXFxuXFxuIyMjIyAqKjQuIOa4uOemu+eahCBET00g5byV55SoKipcXG5cXG4tICAgKirpl67popgqKu+8mkpTIOS4reS/neeVmeS6huWvueW3suenu+mZpCBET00g5YWD57Sg55qE5byV55So77yM5a+86Ie05YWD57Sg5peg5rOV6KKr5Zue5pS244CCXFxuLSAgICoq56S65L6LKirvvJpcXG4gICAgYGBgamF2YXNjcmlwdFxcbiAgICBjb25zdCBlbGVtZW50cyA9IHtcXG4gICAgICAgIGJ1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29sZEJ1dHRvbicpLFxcbiAgICB9O1xcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnRzLmJ1dHRvbik7IC8vIERPTSDlt7Lnp7vpmaTvvIzkvYYgSlMg5LuN5byV55SoXFxuICAgIGBgYFxcbi0gICAqKuS/ruWkjSoq77ya56e76ZmkIERPTSDlkI7liKDpmaQgSlMg5byV55So77yaXFxuICAgIGBgYGphdmFzY3JpcHRcXG4gICAgZWxlbWVudHMuYnV0dG9uID0gbnVsbDsgLy8g6Kej6Zmk5byV55SoXFxuICAgIGBgYFxcblxcbi0tLVxcblxcbiMjIyAqKuS6jOOAgeWGheWtmOWIhuaekOW3peWFtyoqXFxuXFxuIyMjIyAqKjEuIENocm9tZSBEZXZUb29scyoqXFxuXFxuLSAgICoqTWVtb3J5IOmdouadvyoq77yaXFxuICAgIC0gICAqKkhlYXAgU25hcHNob3QqKu+8mueUn+aIkOWghuW/q+eFp++8jOWvueavlOS4pOasoeW/q+eFp+afpeaJvuacqumHiuaUvuWvueixoeOAglxcbiAgICAtICAgKipBbGxvY2F0aW9uIFRpbWVsaW5lKirvvJrov73ouKrlhoXlrZjliIbphY3ml7bpl7Tnur/vvIzlrprkvY3ms4TmvI/ngrnjgIJcXG4tICAgKipQZXJmb3JtYW5jZSDpnaLmnb8qKu+8muW9leWItuWGheWtmOWPmOWMlu+8jOinguWvn+WGheWtmOWinumVv+i2i+WKv+OAglxcblxcbiMjIyMgKioyLiBOb2RlLmpzIOWGheWtmOWIhuaekCoqXFxuXFxuLSAgICoq55Sf5oiQ5aCG6L2s5YKo5paH5Lu2KirvvJpcXG4gICAgYGBgYmFzaFxcbiAgICBub2RlIC0taW5zcGVjdCBhcHAuanMgIyDlkK/nlKjosIPor5VcXG4gICAgYGBgXFxuLSAgIOS9v+eUqCBDaHJvbWUgRGV2VG9vbHMg5oiWIGB2OC1wcm9maWxlcmAg5YiG5p6Q5YaF5a2Y44CCXFxuXFxuLS0tXFxuXFxuIyMjICoq5LiJ44CB5LyY5YyW5YaF5a2Y5L2/55So55qE57yW56CB5oqA5benKipcXG5cXG4jIyMjICoqMS4g5L2/55So5byx5byV55So77yIV2Vha01hcC9XZWFrU2V077yJKipcXG5cXG5gYGBqYXZhc2NyaXB0XFxuY29uc3Qgd2Vha01hcCA9IG5ldyBXZWFrTWFwKCk7XFxubGV0IGtleSA9IHsgaWQ6IDEgfTtcXG53ZWFrTWFwLnNldChrZXksICdkYXRhJyk7IC8vIGtleSDooqvlm57mlLblkI7vvIx3ZWFrTWFwIOiHquWKqOWIoOmZpOadoeebrlxcbmtleSA9IG51bGw7XFxuYGBgXFxuXFxuIyMjIyAqKjIuIOmBv+WFjeWGheWtmOWvhumbhuaTjeS9nCoqXFxuXFxuLSAgICoq5YiG5om55aSE55CG5pWw5o2uKirvvJpcXG4gICAgYGBgamF2YXNjcmlwdFxcbiAgICBmdW5jdGlvbiBwcm9jZXNzTGFyZ2VEYXRhKGRhdGEpIHtcXG4gICAgICAgIGNvbnN0IGNodW5rU2l6ZSA9IDEwMDA7XFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IGNodW5rU2l6ZSkge1xcbiAgICAgICAgICAgIGNvbnN0IGNodW5rID0gZGF0YS5zbGljZShpLCBpICsgY2h1bmtTaXplKTtcXG4gICAgICAgICAgICAvLyDlpITnkIbliIblnZfmlbDmja5cXG4gICAgICAgIH1cXG4gICAgfVxcbiAgICBgYGBcXG4tICAgKirkvb/nlKggYHJlcXVlc3RJZGxlQ2FsbGJhY2tgKirvvJrlnKjmtY/op4jlmajnqbrpl7Lml7bmiafooYzkvY7kvJjlhYjnuqfku7vliqHjgIJcXG5cXG4jIyMjICoqMy4g6YeK5pS+6LWE5rqQKipcXG5cXG4tICAgKirmiYvliqjop6PpmaTlvJXnlKgqKu+8mlxcbiAgICBgYGBqYXZhc2NyaXB0XFxuICAgIGxldCBoZWF2eU9iamVjdCA9IG5ldyBIZWF2eU9iamVjdCgpO1xcbiAgICBoZWF2eU9iamVjdC5jbGVhbnVwKCk7IC8vIOaJp+ihjOa4heeQhuaWueazlVxcbiAgICBoZWF2eU9iamVjdCA9IG51bGw7IC8vIOino+mZpOW8leeUqFxcbiAgICBgYGBcXG4tICAgKipXZWIgV29ya2VycyDlpITnkIblpKforqHnrpcqKu+8muWwhiBDUFUg5a+G6ZuG5Z6L5Lu75Yqh56e76Iez5a2Q57q/56iL77yM6YG/5YWN6Zi75aGe5Li757q/56iL44CCXFxuXFxuLS0tXFxuXFxuIyMjICoq5Zub44CB54m55q6K5Zy65pmv5LyY5YyWKipcXG5cXG4jIyMjICoqMi4g5aSn6YeP5pWw5o2u5riy5p+T77yI5aaC6KGo5qC844CB5YiX6KGo77yJKipcXG5cXG4tICAgKiromZrmi5/mu5rliqjvvIhWaXJ0dWFsIFNjcm9sbGluZ++8iSoq77ya5LuF5riy5p+T5Y+v6KeG5Yy65Z+fIERPTeOAglxcbi0gICAqKuaHkuWKoOi9ve+8iExhenkgTG9hZGluZ++8iSoq77ya5YiG6aG15oiW5rua5Yqo5Yqg6L295pWw5o2u44CCXFxuXFxuLS0tXFxuXFxuIyMjICoq5LqU44CB6aKE6Ziy5o6q5pa9KipcXG5cXG4xLiAqKuS7o+eggeinhOiMgyoq77ya5by65Yi25L2/55SoIGBsZXRgL2Bjb25zdGDvvIzpgb/lhY3lhajlsYDlj5jph4/jgIJcXG4yLiAqKuWumuacn+WGheWtmOWIhuaekCoq77ya5Zyo5byA5Y+R6Zi25q615L2/55So5bel5YW35qOA5p+l5YaF5a2Y5rOE5ryP44CCXFxuMy4gKirnm5HmjqfnlJ/kuqfnjq/looMqKu+8mumAmui/hyBgcGVyZm9ybWFuY2UubWVtb3J5YO+8iOa1j+iniOWZqO+8ieaIliBgcHJvY2Vzcy5tZW1vcnlVc2FnZSgpYO+8iE5vZGUuanPvvInnm5HmjqflhoXlrZjkvb/nlKjjgIJcXG5cXG4tLS1cXG5cXG4jIyMgKirnpLrkvovvvJrmo4DmtYvlhoXlrZjms4TmvI8qKlxcblxcbmBgYGphdmFzY3JpcHRcXG4vLyDlnKjmtY/op4jlmajkuK3mo4Dmn6XlhoXlrZjlop7plb9cXG5mdW5jdGlvbiBjaGVja01lbW9yeSgpIHtcXG4gICAgY29uc3QgaW5pdGlhbE1lbW9yeSA9IHBlcmZvcm1hbmNlLm1lbW9yeS51c2VkSlNIZWFwU2l6ZTtcXG4gICAgLy8g5omn6KGM5Y+v55aR5pON5L2cLi4uXFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xcbiAgICAgICAgY29uc3QgZmluYWxNZW1vcnkgPSBwZXJmb3JtYW5jZS5tZW1vcnkudXNlZEpTSGVhcFNpemU7XFxuICAgICAgICBjb25zb2xlLmxvZygn5YaF5a2Y5Y+Y5YyWOicsIGZpbmFsTWVtb3J5IC0gaW5pdGlhbE1lbW9yeSk7XFxuICAgIH0sIDEwMDApO1xcbn1cXG5gYGBcXG5cXG4tLS1cXG5cXG7pgJrov4fku6XkuIrmlrnms5XvvIzlj6/mnInmlYjop6PlhrPlkozpooTpmLIgSmF2YVNjcmlwdCDkuK3nmoTlhoXlrZjmuqLlh7rpl67popjjgILmoLjlv4PmgJ3ot6/mmK/vvJoqKuWHj+WwkeS4jeW/heimgeeahOW8leeUqCArIOWPiuaXtumHiuaUvui1hOa6kCArIOWQiOeQhuWIqeeUqOW3peWFt+WIhuaekCoq44CCXFxuXCI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9