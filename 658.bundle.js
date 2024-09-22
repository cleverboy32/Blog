"use strict";(self.webpackChunkcboy_blog=self.webpackChunkcboy_blog||[]).push([[658],{658:function(e,p,o){o.r(p),o.d(p,{default:function(){return d}});var c=o(358);const h={class:"component-safe"},s={};var d=(0,o(389).A)(s,[["render",function(e,p){return(0,c.uX)(),(0,c.CE)("div",h,p[0]||(p[0]=[(0,c.Fv)('<h1>安全意识</h1><p>你要离开家了, 所有的父母都会说，路上注意安全，可见安全是多么的重要！那么作为软件开发，有哪些危险使我们要知道并避免的呢？ 下面我说一些基本的需要知道的安全攻击, 以及应对方案。</p><blockquote><p>ps 作为一个安全小白，了解各种各样的防范方案真的太难了，我是真的水🤭。欢迎补充，以增长见识</p></blockquote><h2>XSS: 跨站脚本攻击</h2><p>在用户可以输入的地方，并且将作为代码编译时，攻击者可以通过输入一个脚本地址的方式进行对页面注入脚本攻击。解决方式: 任何用户输入的地方都不要相信，对用户输入内容进行转义，如 <code>&lt;</code> 使用转义字符串 <code>&amp;lt;</code> 代替。</p><h2>CSRF: 跨站伪装请求攻击</h2><p>在用户已登录的情况下，伪装用户的身份发起请求，进行相关攻击。解决方式，确认用户的身份。比较好理解的解决方式是: 二次确认，通过用户的二次确认确认请求方为真实用户。然后就是 X-Requested-With 请求标志，通过该请求头设置标志位 <code>ajax</code> 请求，可以一定程度阻止跨域的伪装。<code>Anti-CSRF TOKEN</code> 方案：通过服务端与客户端唯一的 token 值进行校验，可以看做一个暗号，让别人无法伪装！</p><h2>网络劫持</h2><h3>Jsonp 劫持</h3><p>我们都知道 <code>jsonp</code> 就是为了解决跨域的，如果传输信息设计到比较敏感的数据，那么别人可以很方便调用你的接口，获取你的数据，存储在自己的数据库中。解决方法，添加脚本可运行白名单，不要传输敏感信息。</p><h3>HTTP 劫持。</h3><p>HTTP 是明文传输，所以运营商可以知道你的代码是什么，然后在里面加一点小广告什么的，改变你的内容。解决方法就是使用 https 协议，可耻的运营商</p><h3>DNS 劫持</h3><p>通过域名解析我们才能找到对域名的服务器 ip 地址，劫持了 DNS 就可以给你返回一个错误的 ip 地址。在 dns 解析中，会先在本机搜索域名解析记录，无相关记录像 dns 服务商发起请求。所以要么你本地信息被篡改，要么服务商欺骗你。 <a href="https://juejin.im/post/5cff858a6fb9a07ed84238ec">转一篇 DNS 劫持详解链接</a></p><h2>接口安全</h2><h3>数据库</h3><p>数据库，插入数据库的参数，在执行 sql 的时候小心它把你整个数据库表给删了。这里的攻击类似 <code>xss</code> 攻击，通过传输、拼接一些字符串改变原本的 sql 语义</p><h3>推送消息</h3><p>比如短信发送消息，非常的有代表性。通过接口的参数传递，以及最后的发送内容，可以推测出你的推送内容的组合相关方式，就可以通过不良参数，很方便的发送的一些不合法的信息，或有毒链接给用户。解决方式就是不要相信用户传入的任何参数，对参数进行校验，发送内容尽量可选择匹配模式，如 code 值映射，对不合法的参数才有默认内容发送。</p><h2>DDOS：分布式拒绝服务</h2><p>就是很多请求大量涌入你的服务器，导致它们都没有空闲可以响应真正的用户请求。通过 TCP 连接，我们知道建立连接需要三次确认，一般攻击者可以伪造 ip, 发起大量连接请求，却又不确认 = = 导致服务器白白等待直到超时。其次可以借用别的用户，在一个大流量用户网站地方的某一个页面上了，通过 <code>xss</code> 默认发起对攻击网站的请求，并发送很大的数据，但每次发送很少的字节，这些用户就被当成了肉鸡，然后使其瘫痪。解决防范：增加机器， 对同一个ip 的过多请求进行防范。</p>',21)]))}]])}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNjU4LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiNktBQWVBLE1BQU0sa0JDQ2ZDLEVBQVMsQ0FBQyxFQUtoQixPQUZpQyxFLE9BQUEsR0FBZ0JBLEVBQVEsQ0FBQyxDQUFDLFMsZ0NESmpEQyxFQUFBQSxFQUFBQSxJQXlCSixNQXpCSUMsRUF5QkpDLEVBQUEsS0FBQUEsRUFBQSxLQXpCTkMsRUFBQUEsRUFBQUEsSUFBQSx3bkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYm95LWJsb2cvLi4vLi4vYmxvZ3MvbWFya2Rvd24vc2FmZS5tZCIsIndlYnBhY2s6Ly9jYm95LWJsb2cvLi4vLi4vYmxvZ3MvbWFya2Rvd24vc2FmZS5tZD85NDMxIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT48ZGl2IGNsYXNzPVwiY29tcG9uZW50LXNhZmVcIj48aDE+5a6J5YWo5oSP6K+GPC9oMT5cbjxwPuS9oOimgeemu+W8gOWutuS6hiwg5omA5pyJ55qE54i25q+N6YO95Lya6K+077yM6Lev5LiK5rOo5oSP5a6J5YWo77yM5Y+v6KeB5a6J5YWo5piv5aSa5LmI55qE6YeN6KaB77yB6YKj5LmI5L2c5Li66L2v5Lu25byA5Y+R77yM5pyJ5ZOq5Lqb5Y2x6Zmp5L2/5oiR5Lus6KaB55+l6YGT5bm26YG/5YWN55qE5ZGi77yfXG7kuIvpnaLmiJHor7TkuIDkupvln7rmnKznmoTpnIDopoHnn6XpgZPnmoTlronlhajmlLvlh7ssIOS7peWPiuW6lOWvueaWueahiOOAgjwvcD5cbjxibG9ja3F1b3RlPlxuPHA+cHMg5L2c5Li65LiA5Liq5a6J5YWo5bCP55m977yM5LqG6Kej5ZCE56eN5ZCE5qC355qE6Ziy6IyD5pa55qGI55yf55qE5aSq6Zq+5LqG77yM5oiR5piv55yf55qE5rC08J+kreOAguasoui/juihpeWFhe+8jOS7peWinumVv+ingeivhjwvcD5cbjwvYmxvY2txdW90ZT5cbjxoMj5YU1M6IOi3qOermeiEmuacrOaUu+WHuzwvaDI+XG48cD7lnKjnlKjmiLflj6/ku6XovpPlhaXnmoTlnLDmlrnvvIzlubbkuJTlsIbkvZzkuLrku6PnoIHnvJbor5Hml7bvvIzmlLvlh7vogIXlj6/ku6XpgJrov4fovpPlhaXkuIDkuKrohJrmnKzlnLDlnYDnmoTmlrnlvI/ov5vooYzlr7npobXpnaLms6jlhaXohJrmnKzmlLvlh7vjgILop6PlhrPmlrnlvI86IOS7u+S9leeUqOaIt+i+k+WFpeeahOWcsOaWuemDveS4jeimgeebuOS/oe+8jOWvueeUqOaIt+i+k+WFpeWGheWuuei/m+ihjOi9rOS5ie+8jOWmgiA8Y29kZT4mbHQ7PC9jb2RlPiDkvb/nlKjovazkuYnlrZfnrKbkuLIgPGNvZGU+JmFtcDtsdDs8L2NvZGU+IOS7o+abv+OAgjwvcD5cbjxoMj5DU1JGOiDot6jnq5nkvKroo4Xor7fmsYLmlLvlh7s8L2gyPlxuPHA+5Zyo55So5oi35bey55m75b2V55qE5oOF5Ya15LiL77yM5Lyq6KOF55So5oi355qE6Lqr5Lu95Y+R6LW36K+35rGC77yM6L+b6KGM55u45YWz5pS75Ye744CC6Kej5Yaz5pa55byP77yM56Gu6K6k55So5oi355qE6Lqr5Lu944CC5q+U6L6D5aW955CG6Kej55qE6Kej5Yaz5pa55byP5pivOiDkuozmrKHnoa7orqTvvIzpgJrov4fnlKjmiLfnmoTkuozmrKHnoa7orqTnoa7orqTor7fmsYLmlrnkuLrnnJ/lrp7nlKjmiLfjgILnhLblkI7lsLHmmK8gWC1SZXF1ZXN0ZWQtV2l0aCAg6K+35rGC5qCH5b+X77yM6YCa6L+H6K+l6K+35rGC5aS06K6+572u5qCH5b+X5L2NIDxjb2RlPmFqYXg8L2NvZGU+IOivt+axgu+8jOWPr+S7peS4gOWumueoi+W6pumYu+atoui3qOWfn+eahOS8quijheOAgjxjb2RlPkFudGktQ1NSRiBUT0tFTjwvY29kZT4g5pa55qGI77ya6YCa6L+H5pyN5Yqh56uv5LiO5a6i5oi356uv5ZSv5LiA55qEIHRva2VuIOWAvOi/m+ihjOagoemqjO+8jOWPr+S7peeci+WBmuS4gOS4quaal+WPt++8jOiuqeWIq+S6uuaXoOazleS8quijhe+8gTwvcD5cbjxoMj7nvZHnu5zliqvmjIE8L2gyPlxuPGgzPkpzb25wIOWKq+aMgTwvaDM+XG48cD7miJHku6zpg73nn6XpgZMgPGNvZGU+anNvbnA8L2NvZGU+IOWwseaYr+S4uuS6huino+WGs+i3qOWfn+eahO+8jOWmguaenOS8oOi+k+S/oeaBr+iuvuiuoeWIsOavlOi+g+aVj+aEn+eahOaVsOaNru+8jOmCo+S5iOWIq+S6uuWPr+S7peW+iOaWueS+v+iwg+eUqOS9oOeahOaOpeWPo++8jOiOt+WPluS9oOeahOaVsOaNru+8jOWtmOWCqOWcqOiHquW3seeahOaVsOaNruW6k+S4reOAguino+WGs+aWueazle+8jOa3u+WKoOiEmuacrOWPr+i/kOihjOeZveWQjeWNle+8jOS4jeimgeS8oOi+k+aVj+aEn+S/oeaBr+OAgjwvcD5cbjxoMz5IVFRQIOWKq+aMgeOAgjwvaDM+XG48cD5IVFRQIOaYr+aYjuaWh+S8oOi+k++8jOaJgOS7pei/kOiQpeWVhuWPr+S7peefpemBk+S9oOeahOS7o+eggeaYr+S7gOS5iO+8jOeEtuWQjuWcqOmHjOmdouWKoOS4gOeCueWwj+W5v+WRiuS7gOS5iOeahO+8jOaUueWPmOS9oOeahOWGheWuueOAguino+WGs+aWueazleWwseaYr+S9v+eUqCBodHRwcyDljY/orq7vvIzlj6/ogLvnmoTov5DokKXllYY8L3A+XG48aDM+RE5TIOWKq+aMgTwvaDM+XG48cD7pgJrov4fln5/lkI3op6PmnpDmiJHku6zmiY3og73mib7liLDlr7nln5/lkI3nmoTmnI3liqHlmaggaXAg5Zyw5Z2A77yM5Yqr5oyB5LqGIEROUyDlsLHlj6/ku6Xnu5nkvaDov5Tlm57kuIDkuKrplJnor6/nmoQgaXAg5Zyw5Z2A44CC5ZyoIGRucyDop6PmnpDkuK3vvIzkvJrlhYjlnKjmnKzmnLrmkJzntKLln5/lkI3op6PmnpDorrDlvZXvvIzml6Dnm7jlhbPorrDlvZXlg48gZG5zIOacjeWKoeWVhuWPkei1t+ivt+axguOAguaJgOS7peimgeS5iOS9oOacrOWcsOS/oeaBr+iiq+evoeaUue+8jOimgeS5iOacjeWKoeWVhuasuumql+S9oOOAglxuPGEgaHJlZj1cImh0dHBzOi8vanVlamluLmltL3Bvc3QvNWNmZjg1OGE2ZmI5YTA3ZWQ4NDIzOGVjXCI+6L2s5LiA56+HIEROUyDliqvmjIHor6bop6Ppk77mjqU8L2E+PC9wPlxuPGgyPuaOpeWPo+WuieWFqDwvaDI+XG48aDM+5pWw5o2u5bqTPC9oMz5cbjxwPuaVsOaNruW6k++8jOaPkuWFpeaVsOaNruW6k+eahOWPguaVsO+8jOWcqOaJp+ihjCBzcWwg55qE5pe25YCZ5bCP5b+D5a6D5oqK5L2g5pW05Liq5pWw5o2u5bqT6KGo57uZ5Yig5LqG44CC6L+Z6YeM55qE5pS75Ye757G75Ly8IDxjb2RlPnhzczwvY29kZT4g5pS75Ye777yM6YCa6L+H5Lyg6L6T44CB5ou85o6l5LiA5Lqb5a2X56ym5Liy5pS55Y+Y5Y6f5pys55qEIHNxbCDor63kuYk8L3A+XG48aDM+5o6o6YCB5raI5oGvPC9oMz5cbjxwPuavlOWmguefreS/oeWPkemAgea2iOaBr++8jOmdnuW4uOeahOacieS7o+ihqOaAp+OAgumAmui/h+aOpeWPo+eahOWPguaVsOS8oOmAku+8jOS7peWPiuacgOWQjueahOWPkemAgeWGheWuue+8jOWPr+S7peaOqOa1i+WHuuS9oOeahOaOqOmAgeWGheWuueeahOe7hOWQiOebuOWFs+aWueW8j++8jOWwseWPr+S7pemAmui/h+S4jeiJr+WPguaVsO+8jOW+iOaWueS+v+eahOWPkemAgeeahOS4gOS6m+S4jeWQiOazleeahOS/oeaBr++8jOaIluacieavkumTvuaOpee7meeUqOaIt+OAguino+WGs+aWueW8j+WwseaYr+S4jeimgeebuOS/oeeUqOaIt+S8oOWFpeeahOS7u+S9leWPguaVsO+8jOWvueWPguaVsOi/m+ihjOagoemqjO+8jOWPkemAgeWGheWuueWwvemHj+WPr+mAieaLqeWMuemFjeaooeW8j++8jOWmgiBjb2RlIOWAvOaYoOWwhO+8jOWvueS4jeWQiOazleeahOWPguaVsOaJjeaciem7mOiupOWGheWuueWPkemAgeOAgjwvcD5cbjxoMj5ERE9T77ya5YiG5biD5byP5ouS57ud5pyN5YqhPC9oMj5cbjxwPuWwseaYr+W+iOWkmuivt+axguWkp+mHj+a2jOWFpeS9oOeahOacjeWKoeWZqO+8jOWvvOiHtOWug+S7rOmDveayoeacieepuumXsuWPr+S7peWTjeW6lOecn+ato+eahOeUqOaIt+ivt+axguOAgumAmui/hyBUQ1Ag6L+e5o6l77yM5oiR5Lus55+l6YGT5bu656uL6L+e5o6l6ZyA6KaB5LiJ5qyh56Gu6K6k77yM5LiA6Iis5pS75Ye76ICF5Y+v5Lul5Lyq6YCgIGlwLCDlj5HotbflpKfph4/ov57mjqXor7fmsYLvvIzljbTlj4jkuI3noa7orqQgPSA9IOWvvOiHtOacjeWKoeWZqOeZveeZveetieW+heebtOWIsOi2heaXtuOAguWFtuasoeWPr+S7peWAn+eUqOWIq+eahOeUqOaIt++8jOWcqOS4gOS4quWkp+a1gemHj+eUqOaIt+e9keermeWcsOaWueeahOafkOS4gOS4qumhtemdouS4iuS6hu+8jOmAmui/hyA8Y29kZT54c3M8L2NvZGU+IOm7mOiupOWPkei1t+WvueaUu+WHu+e9keermeeahOivt+axgu+8jOW5tuWPkemAgeW+iOWkp+eahOaVsOaNru+8jOS9huavj+asoeWPkemAgeW+iOWwkeeahOWtl+iKgu+8jOi/meS6m+eUqOaIt+Wwseiiq+W9k+aIkOS6huiCiem4oe+8jOeEtuWQjuS9v+WFtueYq+eXquOAguino+WGs+mYsuiMg++8muWinuWKoOacuuWZqO+8jCDlr7nlkIzkuIDkuKppcCDnmoTov4flpJror7fmsYLov5vooYzpmLLojIPjgII8L3A+XG48L2Rpdj48L3RlbXBsYXRlPiIsImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCIuL3NhZmUubWQ/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MmIwODcyN2NcIlxuY29uc3Qgc2NyaXB0ID0ge31cblxuaW1wb3J0IGV4cG9ydENvbXBvbmVudCBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Z1ZS1sb2FkZXJAMTcuNC4yX0B2dWUrY29tcGlsZXItc2ZjQDMuNS4zX3Z1ZUAzLjUuM190eXBlc2NyaXB0QDUuNS40X193ZWJwYWNrQDUuOTQuMF93ZWJwYWNrLV9mdXFrd2dncGxoZXkzb2l2dHdlMnN0ZG82ZS9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2V4cG9ydEhlbHBlci5qc1wiXG5jb25zdCBfX2V4cG9ydHNfXyA9IC8qI19fUFVSRV9fKi9leHBvcnRDb21wb25lbnQoc2NyaXB0LCBbWydyZW5kZXInLHJlbmRlcl1dKVxuXG5leHBvcnQgZGVmYXVsdCBfX2V4cG9ydHNfXyJdLCJuYW1lcyI6WyJjbGFzcyIsInNjcmlwdCIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfaG9pc3RlZF8xIiwiX2NhY2hlIiwiX2NyZWF0ZVN0YXRpY1ZOb2RlIl0sInNvdXJjZVJvb3QiOiIifQ==