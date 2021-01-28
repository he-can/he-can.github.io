---
title: 搭建个人博客 hexo
date: 2021-01-28 21:05:22
tags:
---

# 搭建个人博客 hexo

#### 1. 安装

   ```
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

#### 2. 搭建

   ```
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

#### 3. 启动

   ```
   sudo hexo s
   
   # 会在本地的4000端口启动
   INFO  Validating config
   INFO  Start processing
   INFO  Hexo is running at http://localhost:4000 . Press Ctrl+C to stop.
   ```

   初始界面

   ![](/run/media/hecan/289c029d-1f84-4341-8214-a27800795e64/学习资料/博客/assets/2021-01-26_20-45.png)

#### 4. 写文章

   ```
   # n => new 缩写
   sudo hexo n "我的第一篇博客文章"
   # 生成路径 source/_posts/  格式是markdown
   
   # 清空
   sudo hexo clean
   
   # 生成 g => generate
   sudo hexo g
   ```

#### 5. 部署

   这里是部署到github上，毕竟免费嘛

   github.com登录

   新建一个仓库

   ![](/run/media/hecan/289c029d-1f84-4341-8214-a27800795e64/学习资料/博客/assets/2021-01-26_21-19.png)

   安装git部署的插件

    sudo cnpm i hexo-deployer-git --save

   修改配置文件 _config.yml	在文件最后添加

   ![](/run/media/hecan/289c029d-1f84-4341-8214-a27800795e64/学习资料/博客/assets/2021-01-26_21-28.png)

   然后部署到远端

   ```
   配置.git下的config
   # hecan @ hecan-linux in ~/blog/.deploy_git/.git on git:master o [21:39:33] 
   $ sudo code config
   
   # 添加这个
   [user]
       name = xxx
       email = xxxx@qq.com
   
   # d => deploy
   sudo hexo d
   ```

   访问 就是你的仓库名

   he-can.github.io 

6. 修改主题

   下载主题 放到themes下

   ```
   sudo  git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia
   ```

   修改_config.yml

   ```
   theme: yilia
   ```

   