"use strict";(self.webpackChunkcboy_blog=self.webpackChunkcboy_blog||[]).push([[818],{818:function(s,e,c){c.r(e),c.d(e,{default:function(){return n}});var p=c(358);const o={class:"component-ssl"},t={};var n=(0,c(389).A)(t,[["render",function(s,e){return(0,p.uX)(),(0,p.CE)("div",o,e[0]||(e[0]=[(0,p.Fv)('<h3>什么是 SSL 证书</h3><p>SSL 证书是数字证书，是由证书认证机构（CA）对证书申请者真实身份验证之后，用CA的根证书对申请人的一些基本信息以及申请人的公钥进行签名（相当于加盖发证书机构的公章）后形成的一个数字文件。 通俗一点， 就是包含了所使用的服务器的信息和公钥，这些信息是公开的。 而私钥是由证书申请者自己保存的，是保密的。</p><h3>怎么配置呢</h3><p>要在服务器要发送SSL证书，那么在服务器上配置。首先你得有一个<code>证书</code>！ 证书如何获取，我也是百度了很多，也有很多免费的网站，ssl for free, <a href="http://freessl.org">freessl.org</a>, 但是发现证书没有.crt 文件，或者验证域名不方便。</p><p>######这里先讲一下 SSL 证书包含的几个文件： <code>.key</code> =&gt; 私钥 <code>.csr</code> =&gt; 公钥，让你的证书去认证的时，可以把它发送给权威机构认证。 <code>.crt </code> =&gt; 证书了</p><p>这里可以自己去体验一下用 OpenSSL 给自己生成一个证书。需自行安装 openssl 软件 <a href="https://www.cnblogs.com/yjmyzz/p/openssl-tutorial.html">openssl 给自己颁发证书的步骤</a></p><p>openssl 的证书既然是自己给自己颁发的，那么就不具有权威性，在连接时会向客户端提示不是安全的链接。也没有小绿锁。</p><p>最后我发现腾讯云有免费的证书可以用。 <img src="https://i-blog.csdnimg.cn/blog_migrate/6c5cab65c69586f9228ecf2896a12ad0.jpeg" alt="这里写图片描述"></p><p>申请好证书之后， 如图 <img src="https://i-blog.csdnimg.cn/blog_migrate/6aa539ccc93a564348a6b975a998cf80.jpeg" alt="这里写图片描述"> 点击详情可以看到 <a href="https://cloud.tencent.com/document/product/400/4143">指引文档</a>, 里面的服务器配置方法就很全面了, 不管你是不是用它的证书，都可以按照这样去配。</p><h3>了解一下 SSL 工作</h3><p>我们知道，在客户端和服务器之间的请求，就是来回发送数据，普通的 HTTP 协议是没有对数据进行加密的，那么可能被第三方截取到你的请求，改变你们的通信数据或者冒充身份发送信息给你。 哇，突然感觉这些很常见 = =</p><p>HTTPS 就是一种安全的通信了，它会加密你的数据， 使第三方无法获取，并在建立通信的握手阶段，互相确认身份， 使别人无法冒充身份。 SSL 证书就是使用在 握手阶段，通过证书的信息，确认服务器身份。 具体如下：</p><p><img src="https://i-blog.csdnimg.cn/blog_migrate/29104c17fe7cebb091ec79ad1714bc32.png" alt="这里写图片描述"></p><p>详细讲解每一步就是： 第一步：客户端 say hello, 向服务端发送自己生成的 random 数，和自己支持的加密方法。</p><p>第二步：服务端接收消息后，又向客户端发送自己生成的 random 数、SSL 证书，确定使用的加密方法。</p><p>第三步：客户端读取证书信息，确认证书有效，然后自己再生成一个 random 数，并使用证书的公钥进行加密，发送给服务端。</p><p>第四步：服务端使用自己本地的私钥，解密获取客户端的随机数。</p><p>第五步：客户端和服务端使用这三个随机数生成 <code>对话密钥</code>, 用来加密接下来的对话过程。</p><p>可以看到下面英文有提到 session。 因为如果每次建立连接都去进行这五步，那么会很浪费时间。 所以这里有 sessionID 和 session ticket 两种。</p><p>session ID，记录有本次的握手存在，再次发送信息时，客户端发送该ID，服务器确认该编号存在，双方就不再进行握手阶段剩余的步骤，而直接用已有的对话密钥进行加密通信。</p><p>session ID是目前所有浏览器都支持的方法，但是它的缺点在于session ID往往只保留在一台服务器上。所以，如果客户端的请求发到另一台服务器，就无法恢复对话。session ticket就是为了解决这个问题而诞生的，目前只有Firefox和Chrome浏览器支持。session ticket是加密的，只有服务器才能解密，其中包括本次对话的主要信息，比如对话密钥和加密方法。当服务器收到session ticket以后，解密后就不必重新生成对话密钥了。</p>',21)]))}]])}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiODE4LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiNktBQWVBLE1BQU0saUJDQ2ZDLEVBQVMsQ0FBQyxFQUtoQixPQUZpQyxFLE9BQUEsR0FBZ0JBLEVBQVEsQ0FBQyxDQUFDLFMsZ0NESmpEQyxFQUFBQSxFQUFBQSxJQWdDSixNQWhDSUMsRUFnQ0pDLEVBQUEsS0FBQUEsRUFBQSxLQWhDTkMsRUFBQUEsRUFBQUEsSUFBQSw0bUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYm95LWJsb2cvLi4vLi4vYmxvZ3MvbWFya2Rvd24vc3NsLm1kIiwid2VicGFjazovL2Nib3ktYmxvZy8uLi8uLi9ibG9ncy9tYXJrZG93bi9zc2wubWQ/ODBmOSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+PGRpdiBjbGFzcz1cImNvbXBvbmVudC1zc2xcIj48aDM+5LuA5LmI5pivIFNTTCDor4HkuaY8L2gzPlxuPHA+U1NMIOivgeS5puaYr+aVsOWtl+ivgeS5pu+8jOaYr+eUseivgeS5puiupOivgeacuuaehO+8iENB77yJ5a+56K+B5Lmm55Sz6K+36ICF55yf5a6e6Lqr5Lu96aqM6K+B5LmL5ZCO77yM55SoQ0HnmoTmoLnor4Hkuablr7nnlLPor7fkurrnmoTkuIDkupvln7rmnKzkv6Hmga/ku6Xlj4rnlLPor7fkurrnmoTlhazpkqXov5vooYznrb7lkI3vvIjnm7jlvZPkuo7liqDnm5blj5Hor4HkuabmnLrmnoTnmoTlhaznq6DvvInlkI7lvaLmiJDnmoTkuIDkuKrmlbDlrZfmlofku7bjgIJcbumAmuS/l+S4gOeCue+8jCDlsLHmmK/ljIXlkKvkuobmiYDkvb/nlKjnmoTmnI3liqHlmajnmoTkv6Hmga/lkozlhazpkqXvvIzov5nkupvkv6Hmga/mmK/lhazlvIDnmoTjgIIg6ICM56eB6ZKl5piv55Sx6K+B5Lmm55Sz6K+36ICF6Ieq5bex5L+d5a2Y55qE77yM5piv5L+d5a+G55qE44CCPC9wPlxuPGgzPuaAjuS5iOmFjee9ruWRojwvaDM+XG48cD7opoHlnKjmnI3liqHlmajopoHlj5HpgIFTU0zor4HkuabvvIzpgqPkuYjlnKjmnI3liqHlmajkuIrphY3nva7jgILpppblhYjkvaDlvpfmnInkuIDkuKo8Y29kZT7or4HkuaY8L2NvZGU+77yBXG7or4HkuablpoLkvZXojrflj5bvvIzmiJHkuZ/mmK/nmb7luqbkuoblvojlpJrvvIzkuZ/mnInlvojlpJrlhY3otLnnmoTnvZHnq5nvvIxzc2wgZm9yIGZyZWUsIDxhIGhyZWY9XCJodHRwOi8vZnJlZXNzbC5vcmdcIj5mcmVlc3NsLm9yZzwvYT4sIOS9huaYr+WPkeeOsOivgeS5puayoeaciS5jcnQg5paH5Lu277yM5oiW6ICF6aqM6K+B5Z+f5ZCN5LiN5pa55L6/44CCPC9wPlxuPHA+IyMjIyMj6L+Z6YeM5YWI6K6y5LiA5LiLIFNTTCDor4HkuabljIXlkKvnmoTlh6DkuKrmlofku7bvvJpcbjxjb2RlPi5rZXk8L2NvZGU+ICA9Jmd0OyAgICAg56eB6ZKlXG48Y29kZT4uY3NyPC9jb2RlPiAgID0mZ3Q7ICAgIOWFrOmSpe+8jOiuqeS9oOeahOivgeS5puWOu+iupOivgeeahOaXtu+8jOWPr+S7peaKiuWug+WPkemAgee7meadg+WogeacuuaehOiupOivgeOAglxuPGNvZGU+LmNydCA8L2NvZGU+ICA9Jmd0OyAgICDor4HkuabkuoY8L3A+XG48cD7ov5nph4zlj6/ku6Xoh6rlt7HljrvkvZPpqozkuIDkuIvnlKggT3BlblNTTCDnu5noh6rlt7HnlJ/miJDkuIDkuKror4HkuabjgILpnIDoh6rooYzlronoo4Ugb3BlbnNzbCDova/ku7ZcbjxhIGhyZWY9XCJodHRwczovL3d3dy5jbmJsb2dzLmNvbS95am15enovcC9vcGVuc3NsLXR1dG9yaWFsLmh0bWxcIj5vcGVuc3NsIOe7meiHquW3semigeWPkeivgeS5pueahOatpemqpDwvYT48L3A+XG48cD5vcGVuc3NsIOeahOivgeS5puaXoueEtuaYr+iHquW3see7meiHquW3semigeWPkeeahO+8jOmCo+S5iOWwseS4jeWFt+acieadg+WogeaAp++8jOWcqOi/nuaOpeaXtuS8muWQkeWuouaIt+err+aPkOekuuS4jeaYr+WuieWFqOeahOmTvuaOpeOAguS5n+ayoeacieWwj+e7v+mUgeOAgjwvcD5cbjxwPuacgOWQjuaIkeWPkeeOsOiFvuiur+S6keacieWFjei0ueeahOivgeS5puWPr+S7peeUqOOAglxuPGltZyBzcmM9XCJodHRwczovL2ktYmxvZy5jc2RuaW1nLmNuL2Jsb2dfbWlncmF0ZS82YzVjYWI2NWM2OTU4NmY5MjI4ZWNmMjg5NmExMmFkMC5qcGVnXCIgYWx0PVwi6L+Z6YeM5YaZ5Zu+54mH5o+P6L+wXCI+PC9wPlxuPHA+55Sz6K+35aW96K+B5Lmm5LmL5ZCO77yMIOWmguWbvlxuPGltZyBzcmM9XCJodHRwczovL2ktYmxvZy5jc2RuaW1nLmNuL2Jsb2dfbWlncmF0ZS82YWE1MzljY2M5M2E1NjQzNDhhNmI5NzVhOTk4Y2Y4MC5qcGVnXCIgYWx0PVwi6L+Z6YeM5YaZ5Zu+54mH5o+P6L+wXCI+XG7ngrnlh7vor6bmg4Xlj6/ku6XnnIvliLAgPGEgaHJlZj1cImh0dHBzOi8vY2xvdWQudGVuY2VudC5jb20vZG9jdW1lbnQvcHJvZHVjdC80MDAvNDE0M1wiPuaMh+W8leaWh+ahozwvYT4sIOmHjOmdoueahOacjeWKoeWZqOmFjee9ruaWueazleWwseW+iOWFqOmdouS6hiwg5LiN566h5L2g5piv5LiN5piv55So5a6D55qE6K+B5Lmm77yM6YO95Y+v5Lul5oyJ54Wn6L+Z5qC35Y676YWN44CCPC9wPlxuPGgzPuS6huino+S4gOS4iyBTU0wg5bel5L2cPC9oMz5cbjxwPuaIkeS7rOefpemBk++8jOWcqOWuouaIt+err+WSjOacjeWKoeWZqOS5i+mXtOeahOivt+axgu+8jOWwseaYr+adpeWbnuWPkemAgeaVsOaNru+8jOaZrumAmueahCBIVFRQIOWNj+iuruaYr+ayoeacieWvueaVsOaNrui/m+ihjOWKoOWvhueahO+8jOmCo+S5iOWPr+iDveiiq+esrOS4ieaWueaIquWPluWIsOS9oOeahOivt+axgu+8jOaUueWPmOS9oOS7rOeahOmAmuS/oeaVsOaNruaIluiAheWGkuWFhei6q+S7veWPkemAgeS/oeaBr+e7meS9oOOAgiDlk4fvvIznqoHnhLbmhJ/op4nov5nkupvlvojluLjop4EgPSA9PC9wPlxuPHA+SFRUUFMgIOWwseaYr+S4gOenjeWuieWFqOeahOmAmuS/oeS6hu+8jOWug+S8muWKoOWvhuS9oOeahOaVsOaNru+8jCDkvb/nrKzkuInmlrnml6Dms5Xojrflj5bvvIzlubblnKjlu7rnq4vpgJrkv6HnmoTmj6HmiYvpmLbmrrXvvIzkupLnm7jnoa7orqTouqvku73vvIwg5L2/5Yir5Lq65peg5rOV5YaS5YWF6Lqr5Lu944CCIFNTTCDor4HkuablsLHmmK/kvb/nlKjlnKgg5o+h5omL6Zi25q6177yM6YCa6L+H6K+B5Lmm55qE5L+h5oGv77yM56Gu6K6k5pyN5Yqh5Zmo6Lqr5Lu944CCXG7lhbfkvZPlpoLkuIvvvJo8L3A+XG48cD48aW1nIHNyYz1cImh0dHBzOi8vaS1ibG9nLmNzZG5pbWcuY24vYmxvZ19taWdyYXRlLzI5MTA0YzE3ZmU3Y2ViYjA5MWVjNzlhZDE3MTRiYzMyLnBuZ1wiIGFsdD1cIui/memHjOWGmeWbvueJh+aPj+i/sFwiPjwvcD5cbjxwPuivpue7huiusuino+avj+S4gOatpeWwseaYr++8mlxu56ys5LiA5q2l77ya5a6i5oi356uvIHNheSBoZWxsbywg5ZCR5pyN5Yqh56uv5Y+R6YCB6Ieq5bex55Sf5oiQ55qEIHJhbmRvbSDmlbDvvIzlkozoh6rlt7HmlK/mjIHnmoTliqDlr4bmlrnms5XjgII8L3A+XG48cD7nrKzkuozmraXvvJrmnI3liqHnq6/mjqXmlLbmtojmga/lkI7vvIzlj4jlkJHlrqLmiLfnq6/lj5HpgIHoh6rlt7HnlJ/miJDnmoQgcmFuZG9tIOaVsOOAgVNTTCDor4HkuabvvIznoa7lrprkvb/nlKjnmoTliqDlr4bmlrnms5XjgII8L3A+XG48cD7nrKzkuInmraXvvJrlrqLmiLfnq6/or7vlj5bor4Hkuabkv6Hmga/vvIznoa7orqTor4HkuabmnInmlYjvvIznhLblkI7oh6rlt7Hlho3nlJ/miJDkuIDkuKogcmFuZG9tIOaVsO+8jOW5tuS9v+eUqOivgeS5pueahOWFrOmSpei/m+ihjOWKoOWvhu+8jOWPkemAgee7meacjeWKoeerr+OAgjwvcD5cbjxwPuesrOWbm+atpe+8muacjeWKoeerr+S9v+eUqOiHquW3seacrOWcsOeahOengemSpe+8jOino+WvhuiOt+WPluWuouaIt+err+eahOmaj+acuuaVsOOAgjwvcD5cbjxwPuesrOS6lOatpe+8muWuouaIt+err+WSjOacjeWKoeerr+S9v+eUqOi/meS4ieS4qumaj+acuuaVsOeUn+aIkCA8Y29kZT7lr7nor53lr4bpkqU8L2NvZGU+LCDnlKjmnaXliqDlr4bmjqXkuIvmnaXnmoTlr7nor53ov4fnqIvjgII8L3A+XG48cD7lj6/ku6XnnIvliLDkuIvpnaLoi7HmlofmnInmj5DliLAgc2Vzc2lvbuOAgiDlm6DkuLrlpoLmnpzmr4/mrKHlu7rnq4vov57mjqXpg73ljrvov5vooYzov5nkupTmraXvvIzpgqPkuYjkvJrlvojmtarotLnml7bpl7TjgIIgIOaJgOS7pei/memHjOaciSBzZXNzaW9uSUQg5ZKMIHNlc3Npb24gdGlja2V0IOS4pOenjeOAgjwvcD5cbjxwPnNlc3Npb24gSUTvvIzorrDlvZXmnInmnKzmrKHnmoTmj6HmiYvlrZjlnKjvvIzlho3mrKHlj5HpgIHkv6Hmga/ml7bvvIzlrqLmiLfnq6/lj5HpgIHor6VJRO+8jOacjeWKoeWZqOehruiupOivpee8luWPt+WtmOWcqO+8jOWPjOaWueWwseS4jeWGjei/m+ihjOaPoeaJi+mYtuauteWJqeS9meeahOatpemqpO+8jOiAjOebtOaOpeeUqOW3suacieeahOWvueivneWvhumSpei/m+ihjOWKoOWvhumAmuS/oeOAgjwvcD5cbjxwPnNlc3Npb24gSUTmmK/nm67liY3miYDmnInmtY/op4jlmajpg73mlK/mjIHnmoTmlrnms5XvvIzkvYbmmK/lroPnmoTnvLrngrnlnKjkuo5zZXNzaW9uIElE5b6A5b6A5Y+q5L+d55WZ5Zyo5LiA5Y+w5pyN5Yqh5Zmo5LiK44CC5omA5Lul77yM5aaC5p6c5a6i5oi356uv55qE6K+35rGC5Y+R5Yiw5Y+m5LiA5Y+w5pyN5Yqh5Zmo77yM5bCx5peg5rOV5oGi5aSN5a+56K+d44CCc2Vzc2lvbiB0aWNrZXTlsLHmmK/kuLrkuobop6PlhrPov5nkuKrpl67popjogIzor57nlJ/nmoTvvIznm67liY3lj6rmnIlGaXJlZm945ZKMQ2hyb21l5rWP6KeI5Zmo5pSv5oyB44CCc2Vzc2lvbiB0aWNrZXTmmK/liqDlr4bnmoTvvIzlj6rmnInmnI3liqHlmajmiY3og73op6Plr4bvvIzlhbbkuK3ljIXmi6zmnKzmrKHlr7nor53nmoTkuLvopoHkv6Hmga/vvIzmr5TlpoLlr7nor53lr4bpkqXlkozliqDlr4bmlrnms5XjgILlvZPmnI3liqHlmajmlLbliLBzZXNzaW9uIHRpY2tldOS7peWQju+8jOino+WvhuWQjuWwseS4jeW/hemHjeaWsOeUn+aIkOWvueivneWvhumSpeS6huOAgjwvcD5cbjwvZGl2PjwvdGVtcGxhdGU+IiwiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIi4vc3NsLm1kP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNiMzk4NmMwXCJcbmNvbnN0IHNjcmlwdCA9IHt9XG5cbmltcG9ydCBleHBvcnRDb21wb25lbnQgZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS92dWUtbG9hZGVyQDE3LjQuMl9AdnVlK2NvbXBpbGVyLXNmY0AzLjUuM192dWVAMy41LjNfdHlwZXNjcmlwdEA1LjUuNF9fd2VicGFja0A1Ljk0LjBfd2VicGFjay1fZnVxa3dnZ3BsaGV5M29pdnR3ZTJzdGRvNmUvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9leHBvcnRIZWxwZXIuanNcIlxuY29uc3QgX19leHBvcnRzX18gPSAvKiNfX1BVUkVfXyovZXhwb3J0Q29tcG9uZW50KHNjcmlwdCwgW1sncmVuZGVyJyxyZW5kZXJdXSlcblxuZXhwb3J0IGRlZmF1bHQgX19leHBvcnRzX18iXSwibmFtZXMiOlsiY2xhc3MiLCJzY3JpcHQiLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2hvaXN0ZWRfMSIsIl9jYWNoZSIsIl9jcmVhdGVTdGF0aWNWTm9kZSJdLCJzb3VyY2VSb290IjoiIn0=