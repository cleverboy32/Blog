作为一个程序员，工作到现在，也将近半年了。公司对员工的代码提交也会有 review 流程。代码的 review 来讲，一般就是看格式、命名、逻辑是否有错，代码是否还有可以抽象的地方，这里总结一下自己遇到的代码规范方面的问题，大家一起写规范的代码，做一个看上去专业码农吧。
***
####**js规范**
- 代码的缩进了，一般是两格或四格，我司采用的是四格，这里可以根据自己喜好和公司要求了。

- 中英文之间有空格间隔，像这样: `我专业引用 English 单词`

- 命名规范，命名的驼峰式不用再说了。这里具体情况具体分析一下
   - 变量的命名：小驼峰式
   - 函数的命名：小驼峰式
   - 常量：全部大写
   - 构造函数： 大驼峰式
   - 类的成员： 公共属性和方法就是小驼峰式， 私有属性和方法加上`-`前缀,然后是小驼峰式，如 `_nameFrist
  
  ---
   
####**css规范**
- css 的基本命名,  自己刚写的时候以为也是写小驼峰式，后来就呵呵了。css 当中就是用 `-` 连接了， 如 `search-button`，在定义 id 的时候是用小驼峰了。

- css 名字意思定义。这里有一个 BEM 的命名法则参考，可以看看我之前写的一篇博客[了解BEM](http://blog.csdn.net/dadadeganhuo/article/details/76600264)
- css 命名的统一前缀， 在一个项目中，约定好同一个前缀，可避免样式的覆盖。

- css 样式书写顺序：
	- 显示属性：display/list-style/position/float/clear …
	- 自身属性（盒模型）：width/height/margin/padding/border
	- 背景：background
	- 行高：line-height
	- 文本属性：color/font/text-decoration/text-align/...
	- 其他：cursor/z-index/zoom/overflow
	- CSS3属性：transform/transition/animation/box-shadow/border-radius
	- 如果使用CSS3的属性，如果有必要加入浏览器前缀，则按照 -webkit- / -moz- / -ms- / -o- /
std的顺序进行添加，标准属性写在最后。
	- 链接的样式请严格按照如下顺序添加： a:link -> a:visited -> a:hover -> a:active

- 代码优化，能合并的属性就合并写，没用的属性也删掉，避免重复样式，避免使用 `!important`

---

####**git commit log 规则**

- 首先就是commit 内容的分类了，如图片所示：
![这里写图片描述](https://img-blog.csdn.net/20170830144139403?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFkYWRlZ2FuaHVv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)定好分类，分类后面可以加你本次修改具体文件，然后组织本次修改的内容，就写好了 commit log啦。比如：`feat(login): 新增登录验证功能`,这表达出了你再login文件上新增了一个验证的功能。编写正确的 log 信息，能够清楚的表述你写的代码目的。

- commit 次数，这里我们每完成一个小点的时候，都可以 commit 一下，因为commit 是记录你完成一个项目的具体过程。

---
= = 之前没好好总结，今天写总结的时候，也去搜了搜别的文章，发现这样的文章其实挺多，自己以前都没怎么好好看看 = = 。
欢迎补充啊~

####参考 
> [前端人员必看的CSS规范](https://www.douban.com/note/499976405/?type=like)
> [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
