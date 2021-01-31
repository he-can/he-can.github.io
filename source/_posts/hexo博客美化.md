---
title: hexo博客美化
date: 2021-01-31 09:00:09
tags: 
    - hexo
    - 美化
categories: hexo
---

![](/hexo博客美化/62.webp)

<!-- more -->

## <sectionNumberC>壹 、</sectionNumberC> <hTtileC>Hexo 页面自动刷新</hTtileC>

> **本节参考自**　[**千灵**](https://qianling.pw/hexo-optimization/)

**安装**

```bash
npm install -g browser-sync
npm install hexo-browsersync --save
```

安装后像往常一样执行 `hexo s` 开启本地服务器，当相关文件被修改或者保存时，关联的浏览器页面会自带刷新

**不足**

- 变动后将重新加载整个页面，不能局部刷新
- 使用 Hexo 自带服务器时，无法在移动端调试
- md 文件过大时界面无法加载

## <sectionNumberC>贰 、</sectionNumberC> <hTtileC>添加背景图片</hTtileC>

**打开**  `next/source/js`

**新建**  `script.js`

**添加**

```javascript
// 后面要用到
import("./jquery.min.js")

// background-images
let body_c = document.getElementsByClassName('container use-motion')[0];
let div_c = document.createElement('div');
div_c.classList.add("backgroundImages_c");
body_c.prepend(div_c);
```

**打开**  `next/source`

**新建文件夹和css文件**  `style/style.css`

**添加**

```css
// 背景图片
.backgroundImages_c {
    background-image: url(/images/background.png);
    width: 100%;
    height: 100vh;
    position: fixed;
    opacity: 0.3;
}
```

**打开**  `next/layout/_partials/footer.swig`

**添加**

```html
<link href="/style/style.css" rel="stylesheet"/>
<script src="/js/script.js"></script>
```

## <sectionNumberC>叁 、</sectionNumberC> <hTtileC>浏览器网页标题恶搞</hTtileC>

> **本节参考自**　[TRHX'S BLOG](https://www.itrhx.com/2018/08/27/A04-Hexo-blog-topic-personalization/)

当用户访问你的博客时点击到了其他网页，我们可以恶搞一下网页标题，呼唤用户回来

**打开**  `next/source/js/script.js`

**添加**

```js
// 浏览器搞笑标题
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "/funny.ico");
        document.title = '╭(°A°`)╮ 页面崩溃啦 ~';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "/favicon.ico");
        document.title = '(ฅ>ω<*ฅ) 噫又好啦 ~' + OriginTitle;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});
```

<strong class='ptys'>其中`funny.ico`和`favicon.ico`放你的图标</strong>

## <sectionNumberC>肆 、</sectionNumberC> <hTtileC>Aplayer</hTtileC> 

### 1. 安装

```bash
npm install --save hexo-tag-aplayer
```

**打开**  `blog/_config.yml`

**添加**

```yml
# aplayer插件
aplayer:
  meting: true
```

### 2. 使用：

  **{}**

  ```php
  # "3986040" 就是你的歌的uid 
  # "netease" 平台
  # "song" type 类型	
  # 其他的不用管
  {% meting "3986040" "netease" "song" "theme:#555" "mutex:true" "listmaxheight:340px" "preload:auto" %}
  ```

  **外链**

  ```html
  <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width="750" height="110" loading="lazy" sandbox="allow-popups allow-scripts allow-same-origin" src="https://www.xiami.com/webapp/embed-player?autoPlay=1&id=1792609930"></iframe>
  ```

  **本地文件**

  ```html
  <div id="aplayer"></div>

  <script>
  const ap = new APlayer({
      container: document.getElementById('aplayer'),
      audio: [{
          name: 'name',
          artist: 'artist',
          url: 'url.mp3',
          cover: 'cover.jpg'
      }]
  });
  </script>
  ```

更多请查看[Aplayer](https://aplayer.js.org/#/home)官网

### 3. 自动播放

**打开**  `next/source/js/script.js`

**添加**

```js
// aplayer延迟三秒播放
setTimeout(function () {
    $("div.aplayer-button.aplayer-play").click();
}, 3000);
```

## <sectionNumberC>伍 、</sectionNumberC> <hTtileC>文末结束标记</hTtileC>

> **本节参考自**　[千灵](https://qianling.pw/hexo-optimization/)

**打开**  `next/layout/_macro`

**新建**  `passage-end-tag.swig`

**添加**

```php
{% if theme.passage_end_tag.enabled %}
<div style="text-align:center;color: black;font-size:15px;">
    <br/><br/><br/>
    -------------文章结束啦 ~\(≧▽≦)/~ 感谢您的阅读-------------
</div>
<br/>
{% endif %}
```

**打开**  `next/layout/_macro/post.swig`

**添加**

```php
    # 在这个后添加
    {#####################}
    {### END POST BODY ###}
    {#####################}

   <div>
      {% if not is_index %}
      {% include 'passage-end-tag.swig' %}
      {% endif %}
    </div>
```

**打开**  `next/_config.yml`

**添加**

```yml
# 文章末尾添加“本文结束”标记
passage_end_tag:
  enabled: true
```

## <sectionNumberC>陆 、</sectionNumberC> <hTtileC>图片hover动画</hTtileC>

**打开**  `next/source/style/style.css`

**添加**

```css
/* md的图片的动画 */
.post-body {
    overflow: hidden;
}

.post-body img {
    transition: all 0.6s;
    border-radius: 6px;
    display: block;
    cursor: pointer;
}

.post-body img:hover {
    border-radius: 0px;
    -webkit-transform: scale(1.03);
    -ms-transform: scale(1.03);
    transform: scale(1.03);
}
```

## <sectionNumberC>柒 、</sectionNumberC> <hTtileC>图片点击全屏预览</hTtileC>

**安装**

```bash
cd theme/next/source/lib

git clone https://github.com/theme-next/theme-next-fancybox3 fancybox
```

**打开**  `_config.yml`

**查找**  `fancybox:`

**修改** 

```yml
# FancyBox is a tool that offers a nice and elegant way to add zooming functionality for images.
# For more information: https://fancyapps.com/fancybox
fancybox: true
```

## <sectionNumberC>捌 、</sectionNumberC> <hTtileC>添加分类，标签，关于菜单项</hTtileC>

**打开**  `next/_config.yml`

**修改** 

```yml
# Usage: `Key: /link/ || icon`
# Key is the name of menu item. If the translation for this item is available, the translated text will be loaded, otherwise the Key name will be used. Key is case-senstive.
# Value before `||` delimiter is the target link, value after `||` delimiter is the name of Font Awesome icon.
# When running the site in a subdirectory (e.g. yoursite.com/blog), remove the leading slash from link value (/archives -> archives).
# External url should start with http:// or https://
menu:
  home: / || fa fa-home
  about: /about/ || fa fa-user
  tags: /tags/ || fa fa-tags
  categories: /categories/ || fa fa-th
  archives: /archives/ || fa fa-archive
  #schedule: /schedule/ || fa fa-calendar
  #sitemap: /sitemap.xml || fa fa-sitemap
  #commonweal: /404/ || fa fa-heartbeat
```

**新建页面**

```bash
hexo new page "about"
hexo new page "tags"
hexo new page "categories"
```

**打开各页面对应的index.md文件**

**修改**
```md
---
title: about
date: 2021-01-30 10:47:40
type: "about"
---
 
---
title: tags
date: 2021-01-30 10:47:40
type: "tags"
---
 
---
title: categories
date: 2021-01-30 10:47:40
type: "categories"
---
```

## <sectionNumberC>玖 、</sectionNumberC> <hTtileC>彩色标签页</hTtileC>

> **本节参考自**　[leaface](https://www.liaofuzhan.com/posts/2114475547.html#%E5%BD%A9%E8%89%B2%E6%A0%87%E7%AD%BE%E9%A1%B5)

**打开**  `next/layout/`

**新建**  `tag-color.swig`

**添加**

```html
<script type="text/javascript">
     var alltags = document.getElementsByClassName('tag-cloud-tags');
     var tags = alltags[0].getElementsByTagName('a');
     for (var i = tags.length - 1; i >= 0; i--) {
       var r=Math.floor(Math.random()*75+130);
       var g=Math.floor(Math.random()*75+100);
       var b=Math.floor(Math.random()*75+80);
       tags[i].style.background = "rgb("+r+","+g+","+b+")";
     }
</script>

<style>
  .tag-cloud-tags{
    /*font-family: Helvetica, Tahoma, Arial;*/
    /*font-weight: 100;*/
    text-align: center;
    counter-reset: tags;
  }
  .tag-cloud-tags a{
    border-radius: 6px;
    padding-right: 5px;
    padding-left: 5px;
    margin: 8px 5px 0px 0px;
  }
  .tag-cloud-tags a:before{
    content: "🔖";
  }

  .tag-cloud-tags a:hover{
     box-shadow: 0px 5px 15px 0px rgba(0,0,0,.4);
     transform: scale(1.1);
     /*box-shadow: 10px 10px 15px 2px rgba(0,0,0,.12), 0 0 6px 0 rgba(104, 104, 105, 0.1);*/
     transition-duration: 0.4s;
  }
</style>
```

**打开**  `next/layout/page.swig`

**添加**

```php
<div class="post-body{%- if page.direction and page.direction.toLowerCase() === 'rtl' %} rtl{%- endif %}">
  {%- if page.type === 'tags' %}
    <div class="tag-cloud">
      <div class="tag-cloud-title">
        {{ _p('counter.tag_cloud', site.tags.length) }}
      </div>
      <div class="tag-cloud-tags">
        {{ tagcloud({
          min_font   : theme.tagcloud.min,
          max_font   : theme.tagcloud.max,
          amount     : theme.tagcloud.amount,
          color      : true,
          start_color: theme.tagcloud.start,
          end_color  : theme.tagcloud.end})
        }}
      </div>
    </div>

    {### 这里 ###}
    {% include 'tag-color.swig' %}

  {% elif page.type === 'categories' %}
```

**补充：文章底部标签**

**打开**  `next/source/css/main.styl`

**添加**

```css
/*文章底部标签样式*/
.posts-expand .post-tags a {
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
  box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
  font-family: 'Comic Sans MS', sans-serif;
  transition: .2s ease-out;
  padding: 3px 5px;
  margin: 5px;
  background: #f5f5f5;
  border-bottom: none;
  border-radius: 15px;

  +mobile(){
    padding: 1px 3px;
    font-size: 8px;
  }

  &:hover {
    background: rgba(100,154,182,0.902);
    color: #fff;
    -webkit-box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    -moz-box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  }
}
```

## <sectionNumberC>拾 、</sectionNumberC> <hTtileC>归档页美化</hTtileC>

> **本节参考自**　[leaface](https://www.liaofuzhan.com/posts/2114475547.html#%E5%BD%A9%E8%89%B2%E6%A0%87%E7%AD%BE%E9%A1%B5)

**打开**  `/next/layout/_macro/post-collapse.swig`

**修改**

```php
{% macro render(posts) %}
{%- set current_year = '1970' %}
{%- for post in posts.toArray() %}

  {%- set year = date(post.date, 'YYYY') %}

  {%- if year !== current_year %}
    {%- set current_year = year %}
    <div class="collection-year">
      <span class="collection-header">{{ current_year }}</span>
    </div>
  {%- endif %}

  <article class="my-post post-type-{{ post.type | default('normal') }}" itemscope itemtype="http://schema.org/Article">
    <header class="my-post-header">

      <div class="my-post-meta">
        <time class="my-post-time" itemprop="dateCreated"
              datetime="{{ moment(post.date).format() }}"
              content="{{ date(post.date, config.date_format) }}" >
          {{ date(post.date, 'MM-DD') }}
        </time>
      </div>

      <{% if theme.seo %}h3{% else %}h2{% endif %} class="my-post-title">
        {% if post.link %}{# Link posts #}
          <a class="my-post-title-link post-title-link-external" target="_blank" href="{{ url_for(post.link) }}" itemprop="url">
            {{ post.title or post.link }}
            <i class="fa fa-external-link"></i>
          </a>
        {% else %}
            <a class="my-post-title-link" href="{{ url_for(post.path) }}" itemprop="url">
              {% if post.type === 'picture' %}
                {{ post.content }}
              {% else %}
                <span itemprop="name">{{ post.title | default(__('post.untitled')) }}</span>
              {% endif %}
            </a>
        {% endif %}
      </{% if theme.seo %}h3{% else %}h2{% endif %}>

    </header>
  </article>

{%- endfor %}
{% endmacro %}}
```

**打开**  `next/source/css/main.styl`

**添加**

```css
/* 归档页样式 began */
.page-archive .archive-page-counter {
  font-size: 18px;
  background-color: #49b1f5;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 8px;
  color: #fff;
  +mobile() {
    font-size: 16px;
  }
}
.my-post-time{
  font-size: 11px;
  position: absolute;
  color: #fff;
  background-color: #49b1f5;
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 15px;
}
.mypost{
  position: relative;
  margin-bottom: 1rem;
  -webkit-transition: all .2s ease-in-out;
  -moz-transition: all .2s ease-in-out;
  -o-transition: all .2s ease-in-out;
  -ms-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
}
a.my-post-title-link:before{
  top: 10px;
  width: 18px;
  height: 18px;
  /*📚*/
  content: "🐱‍💻🐱‍🐉🐱‍👓🐱‍🚀🔫";
  margin-right: 5px;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: 15px;
  line-height: 18px;
}
.my-post:hover{
  transform: scale(1.1);
  box-shadow: 10px 10px 15px 2px rgba(0,0,0,.12), 0 0 6px 0 rgba(104, 104, 105, 0.1);
  border-radius: 30px;
  width: 400px;
  padding: 1px 10px;
  margin-left: 25px;
  font-size: 16px;
  transition-duration: 0.15s;
  +mobile(){
    width: 260px;
    margin-left: 18px;
  }
  //display:flex;
  color: rgba(0,0,0,0.1); /* transparent IE 不支持 */
  animation: hue 1.5s linear infinite;
  background-image: linear-gradient(to right bottom, rgb(255,0,0), rgb(255,128,0), rgb(255,255,0), rgb(0,255,0), rgb(0,255,128), rgb(0,255,255), rgb(0,128,255), rgb(0,0,255), rgb(128,0,255), rgb(255,0,255), rgb(255,0,128));
  -webkit-background-clip: text;
  background: #ff00ff26;
}
@keyframes hue {
  from {
      filter: hue-rotate(0);
  }
  to {
      filter: hue-rotate(-360deg);
  }
}
a.my-post-title-link{
  text-decoration: none;
  font-size: 15px;
  font-weight: 400;
  +mobile() {
    font-size: 14px;
  }
}
.my-post-title{
  display: block;
  margin-left: 4.5rem;
  color: #4c4948;
  text-decoration: none;
  font-size: .8rem;
  cursor: pointer;
  +mobile() {
    //margin-left: 4rem;
  }
}
.my-post-header{
  position: top;
  margin-bottom: 1rem;
  -webkit-transition: all .2s ease-in-out;
  -moz-transition: all .2s ease-in-out;
  -o-transition: all .2s ease-in-out;
  -ms-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
}
//.my-post-title-link{
//  font-size: 16px;
//  font-weight: 500;
//}
.my-post-meta{
  position: absolute;
  color: #99a9bf;
  width: 80px;
  color: #114142;
}
div.post-block.tag .collection-title h2 {
  border-width: 1px;
  border-style: solid;
  border-color: #3f3f3f;
  border-radius: 20px;
  font-size: 22px;
  background-color: #b4e8fa;
  padding: 2px 15px;
  letter-spacing: 1.5px;
  box-sizing: border-box;
  color: #3f3f3f;
  display: inline-block;
  margin: 10px 0 10px;
  text-align: center;
  +mobile(){
    font-size: 18px;
  }
}
/* 归档页样式 end */
```

## <sectionNumberC>拾壹 、</sectionNumberC> <hTtileC>分类页美化（凑活一下）</hTtileC>

**打开**  `next/source/css/main.styl`

**添加**

```css
/* 分类样式 */
.category-list{
    position: relative;
    margin-bottom: 1rem;
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    -ms-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
}

.category-list-item:hover{
    transform: scale(1.1);
    box-shadow: 10px 10px 15px 2px rgba(0,0,0,.12), 0 0 6px 0 rgba(104, 104, 105, 0.1);
    border-radius: 30px;
    width: 400px;
    padding: 1px 10px;
    margin-left: 25px;
    font-size: 16px;
    transition-duration: 0.15s;
    +mobile(){
      width: 260px;
      margin-left: 18px;
    }
    //display:flex;
    color: rgba(0,0,0,0.1); /* transparent IE 不支持 */
    animation: hue 1.5s linear infinite;
    background-image: linear-gradient(to right bottom, rgb(255,0,0), rgb(255,128,0), rgb(255,255,0), rgb(0,255,0), rgb(0,255,128), rgb(0,255,255), rgb(0,128,255), rgb(0,0,255), rgb(128,0,255), rgb(255,0,255), rgb(255,0,128));
    -webkit-background-clip: text;
    background: #ff00ff26;
  }
  @keyframes hue {
    from {
        filter: hue-rotate(0);
    }
    to {
        filter: hue-rotate(-360deg);
    }
  }

  a.category-list-link{
    text-decoration: none;
    font-size: 15px;
    font-weight: 400;
    +mobile() {
      font-size: 14px;
    }
    color: black;
  }

a.category-list-link:before{
    top: 10px;
    width: 18px;
    height: 18px;
    content: "🐱‍💻🐱‍🐉🐱‍👓🐱‍🚀🔫";
    margin-right: 5px;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: 15px;
    line-height: 18px;
  }

  .category-list-item{
    display: block;
    margin-left: 4.5rem;
    color: #4c4948;
    text-decoration: none;
    font-size: .8rem;
    cursor: pointer;
    +mobile() {
      //margin-left: 4rem;
    }
  }

.category-all-page .category-list-count {
   color: black;
}
/* 分类样式end */
```

## <sectionNumberC>拾贰 、</sectionNumberC> <hTtileC>把评论去掉</hTtileC>

**打开**  `next/source/js/script.js`

**添加**

```js
// 将 关于/标签/分类里的评论删掉 等网页加载完毕执行，不然jQuery还没加载就执行会报错
document.onreadystatechange = function(){
    if (document.readyState == 'complete') {
        // 页面加载完毕
        if (document.URL.indexOf("categories") != -1) {
            $(".comments.v").remove();
        } else if (document.URL.indexOf("tags") != -1) {
            $(".comments.v").remove();
        } else if (document.URL.indexOf("about") != -1) {
            $(".comments.v").remove();
        }
    }
}
```

## <sectionNumberC>拾叁 、</sectionNumberC> <hTtileC>个性化回到顶部</hTtileC>

**打开**  `next/source/css/main.styl`

**添加**

```css
/* 个性化回到顶部 */
.back-to-top {
  //right: 60px;
  width: 70px;  //图片素材宽度
  height: 900px;  //图片素材高度
  top: -900px;
  bottom: unset;
  transition: all .5s ease-in-out;
  background: url("/images/scroll.jpg");
  //隐藏箭头图标
  > i {
    display: none;
  }
  &.back-to-top-on {
    bottom: unset;
    top: 100vh < (900px + 200px) ? calc( 100vh - 900px - 200px ) : 0px;
  }
}
/* 个性化回到顶部end */
```

**效果就是边上那只猫**

**图片**  [scroll.jpg](/images/scroll.jpg)



## <sectionNumberC>拾肆 、</sectionNumberC> <hTtileC>鼠标点击特效</hTtileC>

> **本节参考自**  [leaface](https://www.liaofuzhan.com/posts/2114475547.html#%E5%BD%A9%E8%89%B2%E6%A0%87%E7%AD%BE%E9%A1%B5)

**打开**  `next/_config.yml`

**添加** 

```yml
cursor_effect:
  enabled: true
  type: fireworks  # fireworks：礼花 | explosion：爆炸 | love：浮出爱心 | text：浮出文字
```

**打开**  `next/layout`

**新建文件夹和文件**  `_custom/custom.swig`

**添加** 

```php
{% if theme.cursor_effect %}
  {% if theme.cursor_effect.type == "fireworks" %}
    <script src="/js/cursor/fireworks.js"></script>
  {% elseif theme.cursor_effect.type == "explosion" %}
    <canvas class="fireworks" style="position: fixed;left: 0;top: 0;z-index: 1; pointer-events: none;" ></canvas>
    <script src="//cdn.bootcss.com/animejs/2.2.0/anime.min.js"></script>
    <script src="/js/cursor/explosion.min.js"></script>
  {% elseif theme.cursor_effect.type == "love" %}
    <script src="/js/cursor/love.min.js"></script>
  {% elseif theme.cursor_effect.type == "text" %}
    <script src="/js/cursor/text.js"></script>
  {% endif %}
{% endif %}
```

**打开**  `next/layout/_layout.swig`

**添加**

```php
{% include '_custom/custom.swig' %}
```

**打开**  `next/source/js`

**新建文件夹**  `cursor`

**添加**

[fireworks.js](/js/cursor/fireworks.js)
[explosion.min.js](/js/cursor/explosion.min.js)
[love.min.js](/js/cursor/love.min.js)
[text.js](/js/cursor/text.js)

## <sectionNumberC>拾伍 、</sectionNumberC> <hTtileC>canvas粒子时钟</hTtileC>

> **本节参考自**  [leaface](https://www.liaofuzhan.com/posts/2114475547.html#%E5%BD%A9%E8%89%B2%E6%A0%87%E7%AD%BE%E9%A1%B5)

**打开**  `next/layout/_custom/`

**新建**  `clock.swig`

**添加**
```html
<div id="zzsc"></div>
<div style="text-align:center;clear:both;margin-top:20px">
<script>
    setTimeout(clock, 200);
    function clock(){
        $('#zzsc').html('<canvas id="canvas"></canvas>');
        var WINDOW_WIDTH = 920;
		var WINDOW_HEIGHT = 400;
		var RADIUS = 7; //球半径
		var NUMBER_GAP = 10; //数字之间的间隙
		var u=0.65; //碰撞能量损耗系数
		var context; //Canvas绘制上下文
		var balls = []; //存储彩色的小球
		const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]; //彩色小球的颜色
		var currentNums = []; //屏幕显示的8个字符
		var digit =
                [
                    [
                        [0,0,1,1,1,0,0],
                        [0,1,1,0,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,0,1,1,0],
                        [0,0,1,1,1,0,0]
                    ],//0
                    [
                        [0,0,0,1,1,0,0],
                        [0,1,1,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [1,1,1,1,1,1,1]
                    ],//1
                    [
                        [0,1,1,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,0,0],
                        [0,0,1,1,0,0,0],
                        [0,1,1,0,0,0,0],
                        [1,1,0,0,0,0,0],
                        [1,1,0,0,0,1,1],
                        [1,1,1,1,1,1,1]
                    ],//2
                    [
                        [1,1,1,1,1,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,0,0],
                        [0,0,1,1,1,0,0],
                        [0,0,0,0,1,1,0],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0]
                    ],//3
                    [
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,1,0],
                        [0,0,1,1,1,1,0],
                        [0,1,1,0,1,1,0],
                        [1,1,0,0,1,1,0],
                        [1,1,1,1,1,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,0,1,1,0],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,1,1]
                    ],//4
                    [
                        [1,1,1,1,1,1,1],
                        [1,1,0,0,0,0,0],
                        [1,1,0,0,0,0,0],
                        [1,1,1,1,1,1,0],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0]
                    ],//5
                    [
                        [0,0,0,0,1,1,0],
                        [0,0,1,1,0,0,0],
                        [0,1,1,0,0,0,0],
                        [1,1,0,0,0,0,0],
                        [1,1,0,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0]
                    ],//6
                    [
                        [1,1,1,1,1,1,1],
                        [1,1,0,0,0,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,1,1,0,0,0],
                        [0,0,1,1,0,0,0],
                        [0,0,1,1,0,0,0],
                        [0,0,1,1,0,0,0]
                    ],//7
                    [
                        [0,1,1,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0]
                    ],//8
                    [
                        [0,1,1,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,0,0],
                        [0,1,1,0,0,0,0]
                    ],//9
                    [
                        [0,0,0,0],
                        [0,0,0,0],
                        [0,1,1,0],
                        [0,1,1,0],
                        [0,0,0,0],
                        [0,0,0,0],
                        [0,1,1,0],
                        [0,1,1,0],
                        [0,0,0,0],
                        [0,0,0,0]
                    ]//:
                ];

		function drawDatetime(cxt){
			var nums = [];

			context.fillStyle="#005eac"
			var date = new Date();
			var offsetX = 70, offsetY = 30;
			var hours = date.getHours();
			var num1 = Math.floor(hours/10);
			var num2 = hours%10;
			nums.push({num: num1});
			nums.push({num: num2});
			nums.push({num: 10}); //冒号
			var minutes = date.getMinutes();
			var num1 = Math.floor(minutes/10);
			var num2 = minutes%10;
			nums.push({num: num1});
			nums.push({num: num2});
			nums.push({num: 10}); //冒号
			var seconds = date.getSeconds();
			var num1 = Math.floor(seconds/10);
			var num2 = seconds%10;
			nums.push({num: num1});
			nums.push({num: num2});

			for(var x = 0;x<nums.length;x++){
				nums[x].offsetX = offsetX;
				offsetX = drawSingleNumber(offsetX,offsetY, nums[x].num,cxt);
				//两个数字连一块，应该间隔一些距离
				if(x<nums.length-1){
					if((nums[x].num!=10) &&(nums[x+1].num!=10)){
						offsetX+=NUMBER_GAP;
					}
				}
			}

			//说明这是初始化
			if(currentNums.length ==0){
				currentNums = nums;
			}else{
				//进行比较
				for(var index = 0;index<currentNums.length;index++){
					if(currentNums[index].num!=nums[index].num){
						//不一样时，添加彩色小球
						addBalls(nums[index]);
						currentNums[index].num=nums[index].num;
					}
				}
			}
			renderBalls(cxt);
			updateBalls();

			return date;
		}

		function addBalls (item) {
			var num = item.num;
			var numMatrix = digit[num];
			for(var y = 0;y<numMatrix.length;y++){
				for(var x = 0;x<numMatrix[y].length;x++){
					if(numMatrix[y][x]==1){
						var ball={
							offsetX:item.offsetX+RADIUS+RADIUS*2*x,
							offsetY:30+RADIUS+RADIUS*2*y,
							color:colors[Math.floor(Math.random()*colors.length)],
							g:1.5+Math.random(),
							vx:Math.pow(-1, Math.ceil(Math.random()*10))*4+Math.random(),
							vy:-5
						}
						balls.push(ball);
					}
				}
			}
		}

		function renderBalls(cxt){
			for(var index = 0;index<balls.length;index++){
				cxt.beginPath();
				cxt.fillStyle=balls[index].color;
				cxt.arc(balls[index].offsetX, balls[index].offsetY, RADIUS, 0, 2*Math.PI);
				cxt.fill();
			}
		}

		function updateBalls () {
			var i =0;
			for(var index = 0;index<balls.length;index++){
				var ball = balls[index];
				ball.offsetX += ball.vx;
				ball.offsetY += ball.vy;
				ball.vy+=ball.g;
				if(ball.offsetY > (WINDOW_HEIGHT-RADIUS)){
					ball.offsetY= WINDOW_HEIGHT-RADIUS;
					ball.vy=-ball.vy*u;
				}
				if(ball.offsetX>RADIUS&&ball.offsetX<(WINDOW_WIDTH-RADIUS)){

					balls[i]=balls[index];
					i++;
				}
			}
			//去除出边界的球
			for(;i<balls.length;i++){
				balls.pop();
			}
		}
		function drawSingleNumber(offsetX, offsetY, num, cxt){
			var numMatrix = digit[num];
			for(var y = 0;y<numMatrix.length;y++){
				for(var x = 0;x<numMatrix[y].length;x++){
					if(numMatrix[y][x]==1){
						cxt.beginPath();
						cxt.arc(offsetX+RADIUS+RADIUS*2*x,offsetY+RADIUS+RADIUS*2*y,RADIUS,0,2*Math.PI);
						cxt.fill();
					}
				}
			}
			cxt.beginPath();
			offsetX += numMatrix[0].length*RADIUS*2;
			return offsetX;
		}

		var canvas = document.getElementById("canvas");
		canvas.width=WINDOW_WIDTH;
		canvas.height=WINDOW_HEIGHT;
		context = canvas.getContext("2d");

		//记录当前绘制的时刻
		var currentDate = new Date();

		setInterval(function(){
			//清空整个Canvas，重新绘制内容
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);
			drawDatetime(context);
		}, 50)
}
</script>

<style>
#canvas {
    width: 60%
}

#zzsc {
    position: relative;
    top: 20px;
}
</style>
```

**打开**  `next/layout/_macro/sidebar.swig`

**添加**

```
{% include '../_custom/clock.swig' %}
```

可根据自己的偏好来设置具体位置，我是加在了侧栏的末尾

## <sectionNumberC>拾陆 、</sectionNumberC> <hTtileC>文章按更新时间排序</hTtileC>

> **本节转载自**  [千灵](https://qianling.pw/hexo-optimization/)

**打开**  `\blog\_config.yml`

**查找**  `order_by: -date`

**将**  `-date`

**改为**  `-updated`

## <sectionNumberC>拾柒 、</sectionNumberC> <hTtileC>侧边栏按钮</hTtileC>

**打开**  `next/source/style/style.css`

**添加**

```css
/* 侧边栏按钮 */
.sidebar-toggle {
    top: 150px;
    left: 110px;
    -webkit-transform: scale(5);
    -moz-transform: scale(5);
    -o-transform: scale(5);
    opacity: 0.9;
    box-shadow: 0 0 0 0.1em rgb(0 0 0 / 10%) inset;
    border-radius: 100%;
    box-sizing: inherit;
    background: transparent;
    color: rgba(255,255,255,0.8);
    cursor: pointer;
}

.sidebar-toggle span {
    cursor: pointer;
}
```

## <sectionNumberC>拾捌 、</sectionNumberC> <hTtileC>live2d</hTtileC>

**安装**

```bash
npm install --save hexo-helper-live2d

npm install live2d-widget-model-haruto
```

**打开**  `blog/_config.yml`

**添加**

```yml
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  log: false
  model:
    # use: live2d-widget-model-koharu
    use: live2d-widget-model-haruto
  display:
    position: left
    width: 250
    height: 500
  mobile:
    show: true
  react:
    opacity: 0.7
```

**更多请查看：**  https://github.com/EYHN/hexo-helper-live2d

## <sectionNumberC>拾玖 、</sectionNumberC> <hTtileC>去除next主题目录自带序号</hTtileC>

**打开**  `_config.yml`

**查找**  `toc`

**修改**  `number: false`

## <sectionNumberC>贰拾 、</sectionNumberC> <hTtileC>图片懒加载</hTtileC>

> **本节转载自**  [千灵](https://qianling.pw/hexo-optimization/)

**安装**  `npm install hexo-lazyload-image --save`

**打开**  `\blog\_config.yml`

**添加**

```yml
# LazyLoad
lazyload:
  enable: true
  onlypost: false
  loadingImg: /images/loading.gif
```
<strong class="ptys">onlypost</strong> - 是否仅文章中的图片做懒加载, 如果为 false， 则主题中的其他图片，也会做懒加载，如头像、logo 等任何图片

<strong class="ptys">loadingImg</strong> - 图片未加载时的代替图

---

{% meting "1438690700" "netease" "song" "theme:#555" "mutex:true" "listmaxheight:340px" "preload:auto" %}