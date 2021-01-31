---
title: 搭建个人博客 hexo
date: 2021-01-31 00:24:25
tags: 
    - hexo
    - linux
categories: hexo
---

![](/搭建个人博客-hexo/225.webp)

<!-- more -->

## <sectionNumberC>壹 、</sectionNumberC> <hTtileC>安装</hTtileC>

```bash
# cnpm来安装 -g 全局安装
sudo cnpm install -g hexo-cli

# 设置软链
sudo ln -s /usr/local/node-v14.15.4-linux-x64/bin/hexo /usr/loacl/bin/hexo

# 查看版本
# hecan @ hecan-linux in ~ [20:33:46] 
$ hexo -v
hexo-cli: 4.2.0
os: Linux 5.10.7-3-MANJARO linux x64
node: 14.15.4
v8: 8.4.371.19-node.17
uv: 1.40.0
zlib: 1.2.11
brotli: 1.0.9
ares: 1.16.1
modules: 83
nghttp2: 1.41.0
napi: 7
llhttp: 2.1.3
openssl: 1.1.1i
cldr: 37.0
icu: 67.1
tz: 2020a
unicode: 13.0
```

## <sectionNumberC>贰 、</sectionNumberC> <hTtileC>搭建</hTtileC>

```bash
# 新建目录
mkdir blog

# cd到blog
cd blog

# 初始化
sudo hexo init

# 搭建完成之后会提示：INFO  Start blogging with Hexo!

# 在目录下会生成 
# hecan @ hecan-linux in ~/blog [20:38:27] 
$ ll 
总用量 80K
-rw-r--r--   1 root  root     0  1月 26 20:37 _config.landscape.yml
-rw-r--r--   1 root  root  2.4K  1月 26 20:37 _config.yml
drwxr-xr-x 165 hecan hecan 4.0K  1月 26 20:38 node_modules
-rw-r--r--   1 root  root   615  1月 26 20:37 package.json
-rw-r--r--   1 hecan hecan  56K  1月 26 20:38 package-lock.json
drwxr-xr-x   2 root  root  4.0K  1月 26 20:37 scaffolds
drwxr-xr-x   3 root  root  4.0K  1月 26 20:37 source
drwxr-xr-x   2 root  root  4.0K  1月 26 20:37 themes
```

## <sectionNumberC>叁 、</sectionNumberC> <hTtileC>启动</hTtileC>

```bash
sudo hexo s

# 会在本地的4000端口启动
INFO  Validating config
INFO  Start processing
INFO  Hexo is running at http://localhost:4000 . Press Ctrl+C to stop.
```

初始界面

![](/搭建个人博客-hexo/1.webp)

## <sectionNumberC>肆 、</sectionNumberC> <hTtileC>写文章</hTtileC>

```bash
# n => new 缩写
sudo hexo n "我的第一篇博客文章"
# 生成路径 source/_posts/  格式是markdown

# 清空
sudo hexo clean

# 生成 g => generate
sudo hexo g
```

## <sectionNumberC>伍 、</sectionNumberC> <hTtileC>部署到github</hTtileC>

**新建一个仓库**

![](/搭建个人博客-hexo/2.webp)

**配置git**

```
git config --global user.name "yourname"
git config --global user.email "youremail"
```

这里的yourname输入你的GitHub用户名，youremail输入你GitHub的邮箱。这样GitHub才能知道你是不是对应它的账户。

可以用以下两条，检查一下你有没有输对


```
git config user.name
git config user.email
```

这里如果没成功的话，可以

在`.git`目录下的config文件添加

```
[user]
        name = xxx
        email = xxxx@xx.com
```

然后创建SSH, 一路回车

```
ssh-keygen -t rsa -C "youremail"
```

这个时候它会告诉你已经生成了`.ssh`的文件夹。在你的电脑中找到这个文件夹。

![](/搭建个人博客-hexo/3.webp)

ssh，简单来讲，就是一个秘钥，其中，`id_rsa`是你这台电脑的私人秘钥，不能给别人看的，`id_rsa.pub`是公共秘钥，可以随便给别人看。
把这个公钥放在GitHub上，这样当你链接GitHub自己的账户时，它就会根据公钥匹配你的私钥，当能够相互匹配时，才能够顺利的通过git上传你的文件到GitHub上。

而后在GitHub的setting中，找到SSH keys的设置选项，点击`New SSH key`
把你的`id_rsa.pub`里面的信息复制进去。

![](/搭建个人博客-hexo/4.webp)

查看是否成功

```bash
ssh -T git@github.com
```

安装git部署的插件

```bash
sudo cnpm i hexo-deployer-git --save
```

**修改配置文件**    `_config.yml`

```yml
deploy:
    type: git
    # 这里用ssh地址 因为上面配置了ssh 不用输入账号密码
    repo: git@github.com:he-can/he-can.github.io.git
    branch: master
```

**部署到远端**

```bash
# 每次部署前都要先清除
sudo hexo cl

# 然后编译
sudo hexo s

# d => deploy 部署
sudo hexo d
```

## <sectionNumberC>陆 、</sectionNumberC> <hTtileC>修改主题</hTtileC>

**下载主题 放到themes下**

```
sudo  git clone https://github.com/theme-next/hexo-theme-next.git themes/next
```

**修改_config.yml**

```
theme: next
```

---

{% meting "1807537867" "netease" "song" "theme:#555" "mutex:true" "listmaxheight:340px" "preload:auto" %}