---
title: vscode中的vue项目eslint语法格式化
date: 2021-05-27 15:33:27
tags: 
    - vue
    - eslint
categories: vue
---

![](/vscode中的vue项目eslint语法格式化/34.png)

<!-- more -->

## <sectionNumberC></sectionNumberC> <hTtileC>安装插件</hTtileC>

- **ESlint：**JS代码检测工具
- **Vetur：**VUE项目基本插件,可以格式化html、标准css（有分号 、大括号的那种）、标准js（有分号 、双引号的那种）、vue文件，<strong class="ptys">但是！</strong>格式化的标准js文件不符合ESlint规范，会给你加上双引号、分号等
- **Prettier - Code formatter：**只关注格式化，并不具有eslint检查语法等能力，只关心格式化文件(最大长度、混合标签和空格、引用样式等)，包括JavaScript · Flow · TypeScript · CSS · SCSS · Less · JSX · Vue · GraphQL · JSON · Markdown

## <sectionNumberC></sectionNumberC> <hTtileC>修改配置</hTtileC>

**在VSCode的`文件`-`首选项`-`设置`里，添加如下代码即可**

```json
{
    "workbench.editor.enablePreview": false, //打开文件不覆盖
    "editor.minimap.enabled": false, //关闭快速预览
    "editor.formatOnSave": false, //每次保存自动格式化
    "editor.codeActionsOnSave": { // 每次保存的时候将代码按eslint格式进行修复
      "source.fixAll.eslint": true
    },
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true, //让函数(名)和后面的括号之间加个空格
    "vetur.format.defaultFormatterOptions": {
      "js-beautify-html": {
        "wrap_attributes": "force-aligned" //属性强制折行对齐
      }
    },
    "[vue]": {
      "editor.defaultFormatter": "octref.vetur"
    }
}
```
