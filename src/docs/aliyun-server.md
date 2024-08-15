###购买服务器

学生购买可以使用阿里云优惠专享， 每个月只要9.9 就好了。这里我用的是学生优惠，机型内存什么都限定好了的。所以- - 没什么可以说的。关于国内外服务器的区别就是，如果你购买了国外的服务器，就可以在云服务器上搭梯子访问国外的网站，也就是翻墙了。

### 安装环境

因为服务器默认 linux 系统，所以这里讲怎么配置 linux 云服务环境。 
我第一次使用的时候，还以为是要去安装一个界面化桌面，以便我这个命令小白可以操作。但是，对于只有2G 的内存来说安装了之后将会很卡很卡。后来我问学长，他说不要安装界面化，使用命令就好了。

首先关于远程服务器的登录， 默认系统的用户名是 root, 然后登录密码可以在控制台进行修改。如下图点击重置密码。
![重置密码处](https://img-blog.csdn.net/20180107170054918?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFkYWRlZ2FuaHVv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast) 

重置之后，然后点击远程连接，就可以连接登录到你的服务器上了。这里要将一点，如果你是 mac 电脑的话，可以在你的电脑上通过 ssh 登录到你的服务器。 命令如下：
`ssh root@你的公网IP`，比如 `ssh root@120.78.32.12`
然后输入密码即可连接成功。

![登录成功图](https://img-blog.csdn.net/20180107170503333?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFkYWRlZ2FuaHVv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

接下来在终端中输入命令。配置环境。如果你是配置 java 环境，那么可以去谷歌一下如何在 linux 中配置 java 环境，这里我是配置的 node 环境，就讲一下如何配置 node 环境以及 npm。

这里我用的是源码安装。首先安装 node 编译依赖的第三方模块
`yum -y install gcc make gcc-c++ openssl-devel`

然后下载 node 的源码包
![这里写图片描述](https://img-blog.csdn.net/20180107171300036?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFkYWRlZ2FuaHVv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

node 官网的源码 包。
`wget https://nodejs.org/dist/v8.9.4/node-v8.9.4.tar.gz`

你下载的时候可以手动改成当前最新版本。下载后，进行解压 `tar -zxvf node-v8.9.4.tar.gz`, 然后进入解压后的文件夹 ` cd node-v8.9.4`, 依次
`  ./configure`
`  make`
`sudo make install`
这里编译时间会有点久，请耐心等待- -
查看安装成功
![这里写图片描述](https://img-blog.csdn.net/20180107172311684?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFkYWRlZ2FuaHVv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

安装 npm
同样下载 npm 包
`wget http://nodejs.org/dist/npm/npm-1.4.9.zip`
解压 `tar -zxvf npm-1.4.9.tgz`
查看是否安装成功 `npm -v`

这就是 node 环境配置了， 然后就是 mysql 数据库。
[http://blog.csdn.net/win7system/article/details/53579500](http://blog.csdn.net/win7system/article/details/53579500)

关于项目的上传，如果你本地编写了代码，想上传至服务器，第一个方式，可以是使用 ftp 上传文件。 第二个方式，就是在你的服务器上搭建一个 git 服务器，通过从服务器推送和克隆项目来获取文件。这里我使用的是第二种方法，参见教程：
[https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137583770360579bc4b458f044ce7afed3df579123eca000](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137583770360579bc4b458f044ce7afed3df579123eca000)
这里注意一下， 关于 设置 ssh 登录，一定要把创建的 .ssh 文件放到你创建的用户下，如我这里是 git 用户，路径就是
![这里写图片描述](https://img-blog.csdn.net/20180107174529969?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFkYWRlZ2FuaHVv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

放置在正确位置之后，还要注意项目的归属者也要是 git 用户，这样才会在 git 用户里匹配到对应的 ssh key。也就是下面这一个步骤
![这里写图片描述](https://img-blog.csdn.net/20180107174749168?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFkYWRlZ2FuaHVv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

还有一点要注意的就是，你再本地推送了代码上 git 服务器之后，想要在云服务器上获取到代码， 需要在服务器上再次克隆 `git clone git@server:/srv/sample.git` 项目，git pull 获取到代码。 这里也可以通过自己配置 git 服务器的钩子函数，使其自动更新代码，我还没配置，就先不说了 - -。

好了，现在现在基本环境配置好了就可以开始开发你的项目啦。

另外附： 
项目在服务器上启动了，发现在本地电脑无法通过 ip 访问，那么可能是你的端口号没有开放，需要去服务器上设置安全组。
具体添加方法 ，以及其他一些关于服务器的配置，都可以随时点击右侧的 **点我提问**，像云博士提问。 = =
![这里写图片描述](https://img-blog.csdn.net/20180107175548703?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFkYWRlZ2FuaHVv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)