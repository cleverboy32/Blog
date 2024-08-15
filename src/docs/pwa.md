###**什么是PWA** 
先说一下全名，progressive web app： 渐进式网页应用。这是谷歌推出的，我是这样理解的：

- 我们一般写web应用，在 pc 上是没有缓存的，打开页面的时去请求数据。

-  第二个也没有像 app 一样的小图标放在桌面，一点开就进入了应用，而是通过打开浏览器输入网址， 

- 第三个就是，不能像 app 一样给用户推送消息，像微博会跟你推送说有谁评论了你的微博之类的功能。 

而谷歌推出的 pwa，就是具有这些了这些特点， 使我们的 web 应用，能够像一款 app 一样使用。并且对比与 app, 它不用复杂的安装，也不用下载更新包，刷新页面就可以了(注意到缓存的处理)。

####**那么这些功能分别是怎么实现的呢？** 
**关于缓存**

其实这个就是 我们平时做的 Session 啊、localStorage、CacheStorage 之类的。

这里用的就是 [cacheStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage) 缓存，它提供了一个ServiceWorker类型的工作者或window范围可以访问的所有命名缓存的主目录, 并维护字符串的映射名称到相应的 Cache 对象。
主要方法包括： 
![这里写图片描述](https://img-blog.csdn.net/20171112212302073?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFkYWRlZ2FuaHVv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
有了这些方法你可以对你的缓存进行操作。目前还在草案状态，仅火狐和谷歌浏览器支持此特性。

PWA是通过 ServiceWorker 访问 cache ,所以需要注册 ServiceWorker 工作者。在之前别忘记判断浏览器是否支持。

```
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register(sw.js) // 注册sw.js 文件中变成的服务对象，返回注册成功的对象
	.then(function(swReg){
          swRegistration = swReg;
     }).catch(function(error) {
          console.error('Service Worker Error', error);
     });
}
```
这个 [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) 服务工作者就厉害了，它相当于浏览器和网络之间的代理服务器，可以拦截网络请求，做一些你可能需要的处理(请求资源从缓存中获取等)。

-  它能够创建有效的离线体验，拦截网络请求，并根据网络是否可用判断是否使用缓存数据或者更新缓存数据。

-  它们还允许访问推送的通知和后台的API。

关于 sw.js 中具体的缓存的代码：

创建需要缓存的文件

```
'use strict'
let cacheName = 'pwa-demo-assets'; // 缓存名字
let imgCacheName = 'pwa-img';
let filesToCache;
filesToCache = [ // 所需缓存的文件
    '/',
    '/index.html',
    '/scripts/app.js',
    '/assets/imgs/48.png',
    '/assets/imgs/96.png',
    '/assets/imgs/192.png',
    '/dist/js/app.js',
    '/manifest.json'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
	    // 安装服务者时，对需要缓存的文件进行缓存
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});


self.addEventListener('fetch', (e) => {
    // 判断地址是不是需要实时去请求，是就继续发送请求
    if (e.request.url.indexOf('/api/400/200') > -1) {
        e.respondWith(
            caches.open(imgCacheName).then(function(cache){
                 return fetch(e.request).then(function (response){
                    cache.put(e.request.url, response.clone()); // 每请求一次缓存更新一次新加载的图片
                    return response;
                });
            })
        );
    } else {
        e.respondWith(
	        // 匹配到缓存资源，就从缓存中返回数据
            caches.match(e.request).then(function (response) {
                return response || fetch(e.request);
            })
        );
    }

});
```

**这里进而就引入到 pwa 的推送通知功能。这都是通过 ServiceWorker 去实现的。**

基本原理是，你的客户端要和推送服务进行绑定，会生成一个绑定后的推送服务API接口，服务端调用此接口，发送消息。同时，浏览器也要支持推送功能，在注册 sw 时, 加上推送功能的判断。

```
if ('serviceWorker' in navigator && 'PushManager' in window) {
	navigator.serviceWorker.register(sw.js)
	.then(function(swReg) {
        swRegistration = swReg;
    }).catch(function(error) {
        console.error('Service Worker Error', error);
        });
 } else {
     console.warn('Push messaging is not supported');
 }
```
PushManager 注册好之后， 那么要做的就是浏览器和服务器的绑定了。

![这里写图片描述](https://img-blog.csdn.net/20171112203347222?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFkYWRlZ2FuaHVv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
此图是用户订阅某个应用程序的推送服务。
客户端传入应用程序服务器公钥，向将生成端点的 `webpush 服务器`( 这是谷歌自己实现的一个推送功能的服务器)发出网络请求，将生成的端点(一个推送服务)与应用程序公钥关联，并将端点返回给应用程序。浏览器会将此端点添加到 PushSubscription，通过 promise异步成功时，可以将它的信息保存到你的数据库。

![这里写图片描述](https://img-blog.csdn.net/20171112203753820?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFkYWRlZ2FuaHVv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
服务器发送推送的时候,请求相关接口，验证成功后推送服务会发消息给客户端。

**最后关于桌面小图标**

这个可以说是非常简单了，就是一个manifest.json配置文件，然后在页面引入此文件就好了

```
<!-- 加载清单 -->
<link rel="manifest" href="./manifest.json">
```
关于[清单内容](https://developers.google.com/web/fundamentals/web-app-manifest/)这里简单介绍一下：

```
{
    "short_name": "pwa",
    "name": "pwa - demo", // 应用名称
    "icons": [ // 应用显示图标，根据容器大小适配
        {
            "src": "assets/imgs/48.png",
            "type": "image/png",
            "sizes": "48x48"
        },
        {
            "src": "assets/imgs/96.png",
            "type": "image/png",
            "sizes": "96x96"
        },
        {
            "src": "assets/imgs/192.png",
            "type": "image/png",
            "sizes": "192x192"
        }
    ],
    "background_color": "#2196F3", // 刚打开页面时的背景
    "theme_color": "#2196F3", // 主题颜色
    "display": "standalone", //独立显示
    "start_url": "index.html?launcher=true" // 启动的页面
}
```
好了， 如果感兴趣赶快上手吧。
可以查看[谷歌官方教程](https://developers.google.com/web/progressive-web-apps/)。

这里说一下坑的点，	PWA应用需要在本地localhost:8080 上运行或者 https 协议下， 要保证你的页面是安全页面。

添加桌面时，确保你的谷歌浏览器可以显示弹出通知。

如果你要自己实现推送，自己服务器要有公钥和私钥的获取， 这里可以通过 https://web-push-codelab.glitch.me 获取， 用 chrome 的 [webpush](https://github.com/zaru/webpush) 推送。

这里也可以看一下我的[ GitHub 项项目 ](https://github.com/cleverboy32/chorme-PwaDemo)，官方也有很多例子。