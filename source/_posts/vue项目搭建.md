---
title: vue项目搭建
date: 2021-05-13 16:47:19
tags: 
    - vue
    - npm
categories: vue
---

![](/vue项目搭建/76.jpg)

<!-- more -->

## <sectionNumberC></sectionNumberC> <hTtileC>安装</hTtileC>

**安装淘宝镜像**

```bash
npm i -g cnpm --registry=https://registry.npm.taobao.org
```

**安装vue-cli**

```bash
npm i @vue/cli
```

## 二、搭建项目

**创建项目**

```bash
vue create 项目名
```

**选择安装 vuex和router组件**

**安装element-ui和axios**

```bash
npm install axios
npm install element-ui -S
```

**在main.js添加**

```javascript
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

// 把axios挂在到vue的实例原型上
Vue.prototype.$http = axios
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8001/'
Vue.use(ElementUI)

// 默认路由地址
// Eslint禁止下一行的undef
// eslint-disable-next-line no-undef
// vue.$router.replace({
//   path: '/'
// })
```

**`npm run serve`运行**

