"use strict";(self.webpackChunkcboy_blog=self.webpackChunkcboy_blog||[]).push([[520],{520:function(e,t,n){n.r(t),n.d(t,{default:function(){return p}});var o=n(358);const s={class:"component-pwa"},r={};var p=(0,n(389).A)(r,[["render",function(e,t){return(0,o.uX)(),(0,o.CE)("div",s,t[0]||(t[0]=[(0,o.Fv)('<h3><strong>什么是PWA</strong></h3><p>先说一下全名，progressive web app： 渐进式网页应用。这是谷歌推出的，我是这样理解的：</p><ul><li><p>我们一般写web应用，在 pc 上是没有缓存的，打开页面的时去请求数据。</p></li><li><p>第二个也没有像 app 一样的小图标放在桌面，一点开就进入了应用，而是通过打开浏览器输入网址，</p></li><li><p>第三个就是，不能像 app 一样给用户推送消息，像微博会跟你推送说有谁评论了你的微博之类的功能。</p></li></ul><p>而谷歌推出的 pwa，就是具有这些了这些特点， 使我们的 web 应用，能够像一款 app 一样使用。并且对比与 app, 它不用复杂的安装，也不用下载更新包，刷新页面就可以了(注意到缓存的处理)。</p><h4><strong>那么这些功能分别是怎么实现的呢？</strong></h4><p><strong>关于缓存</strong></p><p>其实这个就是 我们平时做的 Session 啊、localStorage、CacheStorage 之类的。</p><p>这里用的就是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage">cacheStorage</a> 缓存，它提供了一个ServiceWorker类型的工作者或window范围可以访问的所有命名缓存的主目录, 并维护字符串的映射名称到相应的 Cache 对象。 主要方法包括： <img src="https://img-blog.csdn.net/20171112212302073?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFkYWRlZ2FuaHVv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="这里写图片描述"> 有了这些方法你可以对你的缓存进行操作。目前还在草案状态，仅火狐和谷歌浏览器支持此特性。</p><p>PWA是通过 ServiceWorker 访问 cache ,所以需要注册 ServiceWorker 工作者。在之前别忘记判断浏览器是否支持。</p><pre><code>if (&#39;serviceWorker&#39; in navigator) {\n\tnavigator.serviceWorker.register(sw.js) // 注册sw.js 文件中变成的服务对象，返回注册成功的对象\n\t.then(function(swReg){\n          swRegistration = swReg;\n     }).catch(function(error) {\n          console.error(&#39;Service Worker Error&#39;, error);\n     });\n}\n</code></pre><p>这个 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API">Service Worker</a> 服务工作者就厉害了，它相当于浏览器和网络之间的代理服务器，可以拦截网络请求，做一些你可能需要的处理(请求资源从缓存中获取等)。</p><ul><li><p>它能够创建有效的离线体验，拦截网络请求，并根据网络是否可用判断是否使用缓存数据或者更新缓存数据。</p></li><li><p>它们还允许访问推送的通知和后台的API。</p></li></ul><p>关于 sw.js 中具体的缓存的代码：</p><p>创建需要缓存的文件</p><pre><code>&#39;use strict&#39;\nlet cacheName = &#39;pwa-demo-assets&#39;; // 缓存名字\nlet imgCacheName = &#39;pwa-img&#39;;\nlet filesToCache;\nfilesToCache = [ // 所需缓存的文件\n    &#39;/&#39;,\n    &#39;/index.html&#39;,\n    &#39;/scripts/app.js&#39;,\n    &#39;/assets/imgs/48.png&#39;,\n    &#39;/assets/imgs/96.png&#39;,\n    &#39;/assets/imgs/192.png&#39;,\n    &#39;/dist/js/app.js&#39;,\n    &#39;/manifest.json&#39;\n];\n\nself.addEventListener(&#39;install&#39;, function(e) {\n    e.waitUntil(\n\t    // 安装服务者时，对需要缓存的文件进行缓存\n        caches.open(cacheName).then(function(cache) {\n            return cache.addAll(filesToCache);\n        })\n    );\n});\n\n\nself.addEventListener(&#39;fetch&#39;, (e) =&gt; {\n    // 判断地址是不是需要实时去请求，是就继续发送请求\n    if (e.request.url.indexOf(&#39;/api/400/200&#39;) &gt; -1) {\n        e.respondWith(\n            caches.open(imgCacheName).then(function(cache){\n                 return fetch(e.request).then(function (response){\n                    cache.put(e.request.url, response.clone()); // 每请求一次缓存更新一次新加载的图片\n                    return response;\n                });\n            })\n        );\n    } else {\n        e.respondWith(\n\t        // 匹配到缓存资源，就从缓存中返回数据\n            caches.match(e.request).then(function (response) {\n                return response || fetch(e.request);\n            })\n        );\n    }\n\n});\n</code></pre><p><strong>这里进而就引入到 pwa 的推送通知功能。这都是通过 ServiceWorker 去实现的。</strong></p><p>基本原理是，你的客户端要和推送服务进行绑定，会生成一个绑定后的推送服务API接口，服务端调用此接口，发送消息。同时，浏览器也要支持推送功能，在注册 sw 时, 加上推送功能的判断。</p><pre><code>if (&#39;serviceWorker&#39; in navigator &amp;&amp; &#39;PushManager&#39; in window) {\n\tnavigator.serviceWorker.register(sw.js)\n\t.then(function(swReg) {\n        swRegistration = swReg;\n    }).catch(function(error) {\n        console.error(&#39;Service Worker Error&#39;, error);\n        });\n } else {\n     console.warn(&#39;Push messaging is not supported&#39;);\n }\n</code></pre><p>PushManager 注册好之后， 那么要做的就是浏览器和服务器的绑定了。</p><p><img src="https://img-blog.csdn.net/20171112203347222?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFkYWRlZ2FuaHVv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="这里写图片描述"> 此图是用户订阅某个应用程序的推送服务。 客户端传入应用程序服务器公钥，向将生成端点的 <code>webpush 服务器</code>( 这是谷歌自己实现的一个推送功能的服务器)发出网络请求，将生成的端点(一个推送服务)与应用程序公钥关联，并将端点返回给应用程序。浏览器会将此端点添加到 PushSubscription，通过 promise异步成功时，可以将它的信息保存到你的数据库。</p><p><img src="https://img-blog.csdn.net/20171112203753820?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFkYWRlZ2FuaHVv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="这里写图片描述"> 服务器发送推送的时候,请求相关接口，验证成功后推送服务会发消息给客户端。</p><p><strong>最后关于桌面小图标</strong></p><p>这个可以说是非常简单了，就是一个manifest.json配置文件，然后在页面引入此文件就好了</p><pre><code>&lt;!-- 加载清单 --&gt;\n&lt;link rel=&quot;manifest&quot; href=&quot;./manifest.json&quot;&gt;\n</code></pre><p>关于<a href="https://developers.google.com/web/fundamentals/web-app-manifest/">清单内容</a>这里简单介绍一下：</p><pre><code>{\n    &quot;short_name&quot;: &quot;pwa&quot;,\n    &quot;name&quot;: &quot;pwa - demo&quot;, // 应用名称\n    &quot;icons&quot;: [ // 应用显示图标，根据容器大小适配\n        {\n            &quot;src&quot;: &quot;assets/imgs/48.png&quot;,\n            &quot;type&quot;: &quot;image/png&quot;,\n            &quot;sizes&quot;: &quot;48x48&quot;\n        },\n        {\n            &quot;src&quot;: &quot;assets/imgs/96.png&quot;,\n            &quot;type&quot;: &quot;image/png&quot;,\n            &quot;sizes&quot;: &quot;96x96&quot;\n        },\n        {\n            &quot;src&quot;: &quot;assets/imgs/192.png&quot;,\n            &quot;type&quot;: &quot;image/png&quot;,\n            &quot;sizes&quot;: &quot;192x192&quot;\n        }\n    ],\n    &quot;background_color&quot;: &quot;#2196F3&quot;, // 刚打开页面时的背景\n    &quot;theme_color&quot;: &quot;#2196F3&quot;, // 主题颜色\n    &quot;display&quot;: &quot;standalone&quot;, //独立显示\n    &quot;start_url&quot;: &quot;index.html?launcher=true&quot; // 启动的页面\n}\n</code></pre><p>好了， 如果感兴趣赶快上手吧。 可以查看<a href="https://developers.google.com/web/progressive-web-apps/">谷歌官方教程</a>。</p><p>这里说一下坑的点， PWA应用需要在本地localhost:8080 上运行或者 https 协议下， 要保证你的页面是安全页面。</p><p>添加桌面时，确保你的谷歌浏览器可以显示弹出通知。</p><p>如果你要自己实现推送，自己服务器要有公钥和私钥的获取， 这里可以通过 <a href="https://web-push-codelab.glitch.me">https://web-push-codelab.glitch.me</a> 获取， 用 chrome 的 <a href="https://github.com/zaru/webpush">webpush</a> 推送。</p><p>这里也可以看一下我的<a href="https://github.com/cleverboy32/chorme-PwaDemo"> GitHub 项项目 </a>，官方也有很多例子。</p>',31)]))}]])}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTIwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiNktBQWVBLE1BQU0saUJDQ2ZDLEVBQVMsQ0FBQyxFQUtoQixPQUZpQyxFLE9BQUEsR0FBZ0JBLEVBQVEsQ0FBQyxDQUFDLFMsZ0NESmpEQyxFQUFBQSxFQUFBQSxJQWtKSixNQWxKSUMsRUFrSkpDLEVBQUEsS0FBQUEsRUFBQSxLQWxKTkMsRUFBQUEsRUFBQUEsSUFBQSwyZ00iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYm95LWJsb2cvLi4vLi4vYmxvZ3MvbWFya2Rvd24vcHdhLm1kIiwid2VicGFjazovL2Nib3ktYmxvZy8uLi8uLi9ibG9ncy9tYXJrZG93bi9wd2EubWQ/NTNiNCJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+PGRpdiBjbGFzcz1cImNvbXBvbmVudC1wd2FcIj48aDM+PHN0cm9uZz7ku4DkuYjmmK9QV0E8L3N0cm9uZz48L2gzPlxuPHA+5YWI6K+05LiA5LiL5YWo5ZCN77yMcHJvZ3Jlc3NpdmUgd2ViIGFwcO+8miDmuJDov5vlvI/nvZHpobXlupTnlKjjgILov5nmmK/osLfmrYzmjqjlh7rnmoTvvIzmiJHmmK/ov5nmoLfnkIbop6PnmoTvvJo8L3A+XG48dWw+XG48bGk+XG48cD7miJHku6zkuIDoiKzlhpl3ZWLlupTnlKjvvIzlnKggcGMg5LiK5piv5rKh5pyJ57yT5a2Y55qE77yM5omT5byA6aG16Z2i55qE5pe25Y676K+35rGC5pWw5o2u44CCPC9wPlxuPC9saT5cbjxsaT5cbjxwPuesrOS6jOS4quS5n+ayoeacieWDjyBhcHAg5LiA5qC355qE5bCP5Zu+5qCH5pS+5Zyo5qGM6Z2i77yM5LiA54K55byA5bCx6L+b5YWl5LqG5bqU55So77yM6ICM5piv6YCa6L+H5omT5byA5rWP6KeI5Zmo6L6T5YWl572R5Z2A77yMPC9wPlxuPC9saT5cbjxsaT5cbjxwPuesrOS4ieS4quWwseaYr++8jOS4jeiDveWDjyBhcHAg5LiA5qC357uZ55So5oi35o6o6YCB5raI5oGv77yM5YOP5b6u5Y2a5Lya6Lef5L2g5o6o6YCB6K+05pyJ6LCB6K+E6K665LqG5L2g55qE5b6u5Y2a5LmL57G755qE5Yqf6IO944CCPC9wPlxuPC9saT5cbjwvdWw+XG48cD7ogIzosLfmrYzmjqjlh7rnmoQgcHdh77yM5bCx5piv5YW35pyJ6L+Z5Lqb5LqG6L+Z5Lqb54m554K577yMIOS9v+aIkeS7rOeahCB3ZWIg5bqU55So77yM6IO95aSf5YOP5LiA5qy+IGFwcCDkuIDmoLfkvb/nlKjjgILlubbkuJTlr7nmr5TkuI4gYXBwLCDlroPkuI3nlKjlpI3mnYLnmoTlronoo4XvvIzkuZ/kuI3nlKjkuIvovb3mm7TmlrDljIXvvIzliLfmlrDpobXpnaLlsLHlj6/ku6XkuoYo5rOo5oSP5Yiw57yT5a2Y55qE5aSE55CGKeOAgjwvcD5cbjxoND48c3Ryb25nPumCo+S5iOi/meS6m+WKn+iDveWIhuWIq+aYr+aAjuS5iOWunueOsOeahOWRou+8nzwvc3Ryb25nPjwvaDQ+XG48cD48c3Ryb25nPuWFs+S6jue8k+WtmDwvc3Ryb25nPjwvcD5cbjxwPuWFtuWunui/meS4quWwseaYryDmiJHku6zlubPml7blgZrnmoQgU2Vzc2lvbiDllYrjgIFsb2NhbFN0b3JhZ2XjgIFDYWNoZVN0b3JhZ2Ug5LmL57G755qE44CCPC9wPlxuPHA+6L+Z6YeM55So55qE5bCx5pivIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy96aC1DTi9kb2NzL1dlYi9BUEkvQ2FjaGVTdG9yYWdlXCI+Y2FjaGVTdG9yYWdlPC9hPiDnvJPlrZjvvIzlroPmj5DkvpvkuobkuIDkuKpTZXJ2aWNlV29ya2Vy57G75Z6L55qE5bel5L2c6ICF5oiWd2luZG936IyD5Zu05Y+v5Lul6K6/6Zeu55qE5omA5pyJ5ZG95ZCN57yT5a2Y55qE5Li755uu5b2VLCDlubbnu7TmiqTlrZfnrKbkuLLnmoTmmKDlsITlkI3np7DliLDnm7jlupTnmoQgQ2FjaGUg5a+56LGh44CCXG7kuLvopoHmlrnms5XljIXmi6zvvJpcbjxpbWcgc3JjPVwiaHR0cHM6Ly9pbWctYmxvZy5jc2RuLm5ldC8yMDE3MTExMjIxMjMwMjA3Mz93YXRlcm1hcmsvMi90ZXh0L2FIUjBjRG92TDJKc2IyY3VZM05rYmk1dVpYUXZaR0ZrWVdSbFoyRnVhSFZ2L2ZvbnQvNWE2TDVMMlQvZm9udHNpemUvNDAwL2ZpbGwvSTBKQlFrRkNNQT09L2Rpc3NvbHZlLzcwL2dyYXZpdHkvU291dGhFYXN0XCIgYWx0PVwi6L+Z6YeM5YaZ5Zu+54mH5o+P6L+wXCI+XG7mnInkuobov5nkupvmlrnms5XkvaDlj6/ku6Xlr7nkvaDnmoTnvJPlrZjov5vooYzmk43kvZzjgILnm67liY3ov5jlnKjojYnmoYjnirbmgIHvvIzku4Xngavni5DlkozosLfmrYzmtY/op4jlmajmlK/mjIHmraTnibnmgKfjgII8L3A+XG48cD5QV0HmmK/pgJrov4cgU2VydmljZVdvcmtlciDorr/pl64gY2FjaGUgLOaJgOS7pemcgOimgeazqOWGjCBTZXJ2aWNlV29ya2VyIOW3peS9nOiAheOAguWcqOS5i+WJjeWIq+W/mOiusOWIpOaWrea1j+iniOWZqOaYr+WQpuaUr+aMgeOAgjwvcD5cbjxwcmUgdi1wcmU9XCJcIj48Y29kZT5pZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuXHRuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3Rlcihzdy5qcykgLy8g5rOo5YaMc3cuanMg5paH5Lu25Lit5Y+Y5oiQ55qE5pyN5Yqh5a+56LGh77yM6L+U5Zue5rOo5YaM5oiQ5Yqf55qE5a+56LGhXG5cdC50aGVuKGZ1bmN0aW9uKHN3UmVnKXtcbiAgICAgICAgICBzd1JlZ2lzdHJhdGlvbiA9IHN3UmVnO1xuICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NlcnZpY2UgV29ya2VyIEVycm9yJywgZXJyb3IpO1xuICAgICB9KTtcbn1cbjwvY29kZT48L3ByZT5cbjxwPui/meS4qiA8YSBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1NlcnZpY2VfV29ya2VyX0FQSVwiPlNlcnZpY2UgV29ya2VyPC9hPiDmnI3liqHlt6XkvZzogIXlsLHljonlrrPkuobvvIzlroPnm7jlvZPkuo7mtY/op4jlmajlkoznvZHnu5zkuYvpl7TnmoTku6PnkIbmnI3liqHlmajvvIzlj6/ku6Xmi6bmiKrnvZHnu5zor7fmsYLvvIzlgZrkuIDkupvkvaDlj6/og73pnIDopoHnmoTlpITnkIYo6K+35rGC6LWE5rqQ5LuO57yT5a2Y5Lit6I635Y+W562JKeOAgjwvcD5cbjx1bD5cbjxsaT5cbjxwPuWug+iDveWkn+WIm+W7uuacieaViOeahOemu+e6v+S9k+mqjO+8jOaLpuaIque9kee7nOivt+axgu+8jOW5tuagueaNrue9kee7nOaYr+WQpuWPr+eUqOWIpOaWreaYr+WQpuS9v+eUqOe8k+WtmOaVsOaNruaIluiAheabtOaWsOe8k+WtmOaVsOaNruOAgjwvcD5cbjwvbGk+XG48bGk+XG48cD7lroPku6zov5jlhYHorrjorr/pl67mjqjpgIHnmoTpgJrnn6XlkozlkI7lj7DnmoRBUEnjgII8L3A+XG48L2xpPlxuPC91bD5cbjxwPuWFs+S6jiBzdy5qcyDkuK3lhbfkvZPnmoTnvJPlrZjnmoTku6PnoIHvvJo8L3A+XG48cD7liJvlu7rpnIDopoHnvJPlrZjnmoTmlofku7Y8L3A+XG48cHJlIHYtcHJlPVwiXCI+PGNvZGU+J3VzZSBzdHJpY3QnXG5sZXQgY2FjaGVOYW1lID0gJ3B3YS1kZW1vLWFzc2V0cyc7IC8vIOe8k+WtmOWQjeWtl1xubGV0IGltZ0NhY2hlTmFtZSA9ICdwd2EtaW1nJztcbmxldCBmaWxlc1RvQ2FjaGU7XG5maWxlc1RvQ2FjaGUgPSBbIC8vIOaJgOmcgOe8k+WtmOeahOaWh+S7tlxuICAgICcvJyxcbiAgICAnL2luZGV4Lmh0bWwnLFxuICAgICcvc2NyaXB0cy9hcHAuanMnLFxuICAgICcvYXNzZXRzL2ltZ3MvNDgucG5nJyxcbiAgICAnL2Fzc2V0cy9pbWdzLzk2LnBuZycsXG4gICAgJy9hc3NldHMvaW1ncy8xOTIucG5nJyxcbiAgICAnL2Rpc3QvanMvYXBwLmpzJyxcbiAgICAnL21hbmlmZXN0Lmpzb24nXG5dO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCBmdW5jdGlvbihlKSB7XG4gICAgZS53YWl0VW50aWwoXG5cdCAgICAvLyDlronoo4XmnI3liqHogIXml7bvvIzlr7npnIDopoHnvJPlrZjnmoTmlofku7bov5vooYznvJPlrZhcbiAgICAgICAgY2FjaGVzLm9wZW4oY2FjaGVOYW1lKS50aGVuKGZ1bmN0aW9uKGNhY2hlKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FjaGUuYWRkQWxsKGZpbGVzVG9DYWNoZSk7XG4gICAgICAgIH0pXG4gICAgKTtcbn0pO1xuXG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignZmV0Y2gnLCAoZSkgPSZndDsge1xuICAgIC8vIOWIpOaWreWcsOWdgOaYr+S4jeaYr+mcgOimgeWunuaXtuWOu+ivt+axgu+8jOaYr+Wwsee7p+e7reWPkemAgeivt+axglxuICAgIGlmIChlLnJlcXVlc3QudXJsLmluZGV4T2YoJy9hcGkvNDAwLzIwMCcpICZndDsgLTEpIHtcbiAgICAgICAgZS5yZXNwb25kV2l0aChcbiAgICAgICAgICAgIGNhY2hlcy5vcGVuKGltZ0NhY2hlTmFtZSkudGhlbihmdW5jdGlvbihjYWNoZSl7XG4gICAgICAgICAgICAgICAgIHJldHVybiBmZXRjaChlLnJlcXVlc3QpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKXtcbiAgICAgICAgICAgICAgICAgICAgY2FjaGUucHV0KGUucmVxdWVzdC51cmwsIHJlc3BvbnNlLmNsb25lKCkpOyAvLyDmr4/or7fmsYLkuIDmrKHnvJPlrZjmm7TmlrDkuIDmrKHmlrDliqDovb3nmoTlm77niYdcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlLnJlc3BvbmRXaXRoKFxuXHQgICAgICAgIC8vIOWMuemFjeWIsOe8k+WtmOi1hOa6kO+8jOWwseS7jue8k+WtmOS4rei/lOWbnuaVsOaNrlxuICAgICAgICAgICAgY2FjaGVzLm1hdGNoKGUucmVxdWVzdCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UgfHwgZmV0Y2goZS5yZXF1ZXN0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG59KTtcbjwvY29kZT48L3ByZT5cbjxwPjxzdHJvbmc+6L+Z6YeM6L+b6ICM5bCx5byV5YWl5YiwIHB3YSDnmoTmjqjpgIHpgJrnn6Xlip/og73jgILov5npg73mmK/pgJrov4cgU2VydmljZVdvcmtlciDljrvlrp7njrDnmoTjgII8L3N0cm9uZz48L3A+XG48cD7ln7rmnKzljp/nkIbmmK/vvIzkvaDnmoTlrqLmiLfnq6/opoHlkozmjqjpgIHmnI3liqHov5vooYznu5HlrprvvIzkvJrnlJ/miJDkuIDkuKrnu5HlrprlkI7nmoTmjqjpgIHmnI3liqFBUEnmjqXlj6PvvIzmnI3liqHnq6/osIPnlKjmraTmjqXlj6PvvIzlj5HpgIHmtojmga/jgILlkIzml7bvvIzmtY/op4jlmajkuZ/opoHmlK/mjIHmjqjpgIHlip/og73vvIzlnKjms6jlhowgc3cg5pe2LCDliqDkuIrmjqjpgIHlip/og73nmoTliKTmlq3jgII8L3A+XG48cHJlIHYtcHJlPVwiXCI+PGNvZGU+aWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IgJmFtcDsmYW1wOyAnUHVzaE1hbmFnZXInIGluIHdpbmRvdykge1xuXHRuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3Rlcihzdy5qcylcblx0LnRoZW4oZnVuY3Rpb24oc3dSZWcpIHtcbiAgICAgICAgc3dSZWdpc3RyYXRpb24gPSBzd1JlZztcbiAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdTZXJ2aWNlIFdvcmtlciBFcnJvcicsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gfSBlbHNlIHtcbiAgICAgY29uc29sZS53YXJuKCdQdXNoIG1lc3NhZ2luZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gfVxuPC9jb2RlPjwvcHJlPlxuPHA+UHVzaE1hbmFnZXIg5rOo5YaM5aW95LmL5ZCO77yMIOmCo+S5iOimgeWBmueahOWwseaYr+a1j+iniOWZqOWSjOacjeWKoeWZqOeahOe7keWumuS6huOAgjwvcD5cbjxwPjxpbWcgc3JjPVwiaHR0cHM6Ly9pbWctYmxvZy5jc2RuLm5ldC8yMDE3MTExMjIwMzM0NzIyMj93YXRlcm1hcmsvMi90ZXh0L2FIUjBjRG92TDJKc2IyY3VZM05rYmk1dVpYUXZaR0ZrWVdSbFoyRnVhSFZ2L2ZvbnQvNWE2TDVMMlQvZm9udHNpemUvNDAwL2ZpbGwvSTBKQlFrRkNNQT09L2Rpc3NvbHZlLzcwL2dyYXZpdHkvU291dGhFYXN0XCIgYWx0PVwi6L+Z6YeM5YaZ5Zu+54mH5o+P6L+wXCI+XG7mraTlm77mmK/nlKjmiLforqLpmIXmn5DkuKrlupTnlKjnqIvluo/nmoTmjqjpgIHmnI3liqHjgIJcbuWuouaIt+err+S8oOWFpeW6lOeUqOeoi+W6j+acjeWKoeWZqOWFrOmSpe+8jOWQkeWwhueUn+aIkOerr+eCueeahCA8Y29kZT53ZWJwdXNoIOacjeWKoeWZqDwvY29kZT4oIOi/meaYr+iwt+atjOiHquW3seWunueOsOeahOS4gOS4quaOqOmAgeWKn+iDveeahOacjeWKoeWZqCnlj5Hlh7rnvZHnu5zor7fmsYLvvIzlsIbnlJ/miJDnmoTnq6/ngrko5LiA5Liq5o6o6YCB5pyN5YqhKeS4juW6lOeUqOeoi+W6j+WFrOmSpeWFs+iBlO+8jOW5tuWwhuerr+eCuei/lOWbnue7meW6lOeUqOeoi+W6j+OAgua1j+iniOWZqOS8muWwhuatpOerr+eCuea3u+WKoOWIsCBQdXNoU3Vic2NyaXB0aW9u77yM6YCa6L+HIHByb21pc2XlvILmraXmiJDlip/ml7bvvIzlj6/ku6XlsIblroPnmoTkv6Hmga/kv53lrZjliLDkvaDnmoTmlbDmja7lupPjgII8L3A+XG48cD48aW1nIHNyYz1cImh0dHBzOi8vaW1nLWJsb2cuY3Nkbi5uZXQvMjAxNzExMTIyMDM3NTM4MjA/d2F0ZXJtYXJrLzIvdGV4dC9hSFIwY0RvdkwySnNiMmN1WTNOa2JpNXVaWFF2WkdGa1lXUmxaMkZ1YUhWdi9mb250LzVhNkw1TDJUL2ZvbnRzaXplLzQwMC9maWxsL0kwSkJRa0ZDTUE9PS9kaXNzb2x2ZS83MC9ncmF2aXR5L1NvdXRoRWFzdFwiIGFsdD1cIui/memHjOWGmeWbvueJh+aPj+i/sFwiPlxu5pyN5Yqh5Zmo5Y+R6YCB5o6o6YCB55qE5pe25YCZLOivt+axguebuOWFs+aOpeWPo++8jOmqjOivgeaIkOWKn+WQjuaOqOmAgeacjeWKoeS8muWPkea2iOaBr+e7meWuouaIt+err+OAgjwvcD5cbjxwPjxzdHJvbmc+5pyA5ZCO5YWz5LqO5qGM6Z2i5bCP5Zu+5qCHPC9zdHJvbmc+PC9wPlxuPHA+6L+Z5Liq5Y+v5Lul6K+05piv6Z2e5bi4566A5Y2V5LqG77yM5bCx5piv5LiA5LiqbWFuaWZlc3QuanNvbumFjee9ruaWh+S7tu+8jOeEtuWQjuWcqOmhtemdouW8leWFpeatpOaWh+S7tuWwseWlveS6hjwvcD5cbjxwcmUgdi1wcmU9XCJcIj48Y29kZT4mbHQ7IS0tIOWKoOi9vea4heWNlSAtLSZndDtcbiZsdDtsaW5rIHJlbD1cIm1hbmlmZXN0XCIgaHJlZj1cIi4vbWFuaWZlc3QuanNvblwiJmd0O1xuPC9jb2RlPjwvcHJlPlxuPHA+5YWz5LqOPGEgaHJlZj1cImh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi9mdW5kYW1lbnRhbHMvd2ViLWFwcC1tYW5pZmVzdC9cIj7muIXljZXlhoXlrrk8L2E+6L+Z6YeM566A5Y2V5LuL57uN5LiA5LiL77yaPC9wPlxuPHByZSB2LXByZT1cIlwiPjxjb2RlPntcbiAgICBcInNob3J0X25hbWVcIjogXCJwd2FcIixcbiAgICBcIm5hbWVcIjogXCJwd2EgLSBkZW1vXCIsIC8vIOW6lOeUqOWQjeensFxuICAgIFwiaWNvbnNcIjogWyAvLyDlupTnlKjmmL7npLrlm77moIfvvIzmoLnmja7lrrnlmajlpKflsI/pgILphY1cbiAgICAgICAge1xuICAgICAgICAgICAgXCJzcmNcIjogXCJhc3NldHMvaW1ncy80OC5wbmdcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgXCJzaXplc1wiOiBcIjQ4eDQ4XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJzcmNcIjogXCJhc3NldHMvaW1ncy85Ni5wbmdcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgXCJzaXplc1wiOiBcIjk2eDk2XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJzcmNcIjogXCJhc3NldHMvaW1ncy8xOTIucG5nXCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICAgIFwic2l6ZXNcIjogXCIxOTJ4MTkyXCJcbiAgICAgICAgfVxuICAgIF0sXG4gICAgXCJiYWNrZ3JvdW5kX2NvbG9yXCI6IFwiIzIxOTZGM1wiLCAvLyDliJrmiZPlvIDpobXpnaLml7bnmoTog4zmma9cbiAgICBcInRoZW1lX2NvbG9yXCI6IFwiIzIxOTZGM1wiLCAvLyDkuLvpopjpopzoibJcbiAgICBcImRpc3BsYXlcIjogXCJzdGFuZGFsb25lXCIsIC8v54us56uL5pi+56S6XG4gICAgXCJzdGFydF91cmxcIjogXCJpbmRleC5odG1sP2xhdW5jaGVyPXRydWVcIiAvLyDlkK/liqjnmoTpobXpnaJcbn1cbjwvY29kZT48L3ByZT5cbjxwPuWlveS6hu+8jCDlpoLmnpzmhJ/lhbTotqPotbblv6vkuIrmiYvlkKfjgIJcbuWPr+S7peafpeecizxhIGhyZWY9XCJodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS93ZWIvcHJvZ3Jlc3NpdmUtd2ViLWFwcHMvXCI+6LC35q2M5a6Y5pa55pWZ56iLPC9hPuOAgjwvcD5cbjxwPui/memHjOivtOS4gOS4i+WdkeeahOeCue+8jFx0UFdB5bqU55So6ZyA6KaB5Zyo5pys5ZywbG9jYWxob3N0OjgwODAg5LiK6L+Q6KGM5oiW6ICFIGh0dHBzIOWNj+iuruS4i++8jCDopoHkv53or4HkvaDnmoTpobXpnaLmmK/lronlhajpobXpnaLjgII8L3A+XG48cD7mt7vliqDmoYzpnaLml7bvvIznoa7kv53kvaDnmoTosLfmrYzmtY/op4jlmajlj6/ku6XmmL7npLrlvLnlh7rpgJrnn6XjgII8L3A+XG48cD7lpoLmnpzkvaDopoHoh6rlt7Hlrp7njrDmjqjpgIHvvIzoh6rlt7HmnI3liqHlmajopoHmnInlhazpkqXlkoznp4HpkqXnmoTojrflj5bvvIwg6L+Z6YeM5Y+v5Lul6YCa6L+HIDxhIGhyZWY9XCJodHRwczovL3dlYi1wdXNoLWNvZGVsYWIuZ2xpdGNoLm1lXCI+aHR0cHM6Ly93ZWItcHVzaC1jb2RlbGFiLmdsaXRjaC5tZTwvYT4g6I635Y+W77yMIOeUqCBjaHJvbWUg55qEIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vemFydS93ZWJwdXNoXCI+d2VicHVzaDwvYT4g5o6o6YCB44CCPC9wPlxuPHA+6L+Z6YeM5Lmf5Y+v5Lul55yL5LiA5LiL5oiR55qEPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9jbGV2ZXJib3kzMi9jaG9ybWUtUHdhRGVtb1wiPiBHaXRIdWIg6aG56aG555uuIDwvYT7vvIzlrpjmlrnkuZ/mnInlvojlpJrkvovlrZDjgII8L3A+XG48L2Rpdj48L3RlbXBsYXRlPiIsImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCIuL3B3YS5tZD92dWUmdHlwZT10ZW1wbGF0ZSZpZD03OGJiYjdkYlwiXG5jb25zdCBzY3JpcHQgPSB7fVxuXG5pbXBvcnQgZXhwb3J0Q29tcG9uZW50IGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vdnVlLWxvYWRlckAxNy40LjJfQHZ1ZStjb21waWxlci1zZmNAMy41LjNfdnVlQDMuNS4zX3R5cGVzY3JpcHRANS41LjRfX3dlYnBhY2tANS45NC4wX3dlYnBhY2stX2Z1cWt3Z2dwbGhleTNvaXZ0d2Uyc3RkbzZlL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvZXhwb3J0SGVscGVyLmpzXCJcbmNvbnN0IF9fZXhwb3J0c19fID0gLyojX19QVVJFX18qL2V4cG9ydENvbXBvbmVudChzY3JpcHQsIFtbJ3JlbmRlcicscmVuZGVyXV0pXG5cbmV4cG9ydCBkZWZhdWx0IF9fZXhwb3J0c19fIl0sIm5hbWVzIjpbImNsYXNzIiwic2NyaXB0IiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9ob2lzdGVkXzEiLCJfY2FjaGUiLCJfY3JlYXRlU3RhdGljVk5vZGUiXSwic291cmNlUm9vdCI6IiJ9