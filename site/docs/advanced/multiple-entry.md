---
title: 多应用入口
---

在[第一个应用](../app/quick-start.md)一文中，我们看到唯一的文件是`src/entries/index.tsx`，这个路径是一种约定。

我们将所有的入口放置到了`src/entries`中，这样带来的好处是可以支持一个应用有多个入口。

## 编写入口文件

`src/entries`是一个特殊的目录，这个目录下的JavaScript文件代表着应用系统的一个入口，在完成构建后会对应一份HTML文件，用户可以通过HTML进行访问。

可以尝试修改一下你现成的项目，再增加一个入口文件：

```
/my-app
    /src
        /entrise
            index.tsx
            hello.tsx
    reskript.config.js
```

然后使用`skr build`进行编译，可以看到它的编译产出：

```
/dist
    /assets
        hello.2e82f9ea88ad3b4a11ce.js
        hello.2e82f9ea88ad3b4a11ce.js.map
        index.24e7095a5771e54fb830.js
        index.24e7095a5771e54fb830.js.map
    hello-stable.html
    index-stable.html
```

在现在这个阶段可以看到，在不需要任何配置的情况下，2个入口文件分别生成了：

1. 与名称对应的JavaScript文件，包含hash并放置在`dist/assets`文件夹下。
2. 与名称对应的HTML文件，放置在`dist`文件夹下。

## 自定义HTML模板

我们接着看一下生成的HTML的内容，此处将生成的HTML进行了一下格式化：

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>My App</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="app-version" content="0000000/stable@2019-03-26T11:29:10.550Z">
</head>
<body>
    <script src="/assets/hello.2e82f9ea88ad3b4a11ce.js"></script>
</body>
</html>
```

可以看到这个HTML包含了基本的元素，包括`title`、`meta[charset]`、`meta[viewport]`等，构建会生成一个`meta[app-version]`的标签，它的值格式为`{git-version}/{target}@{build-time}`，它能告诉你这个文件是从哪一个git提交上进行构建，构建时使用的目标（后续介绍）是什么，在什么时间完成构建，便于发现问题时进行排查。除此之外，HTML中仅包含了所有对应的JavaScript文件的引用，并没有其它的内容。

当然很多时候，我们希望能够定制HTML的结构，比如加入一些系统加载的动画等。在这种情况下，我们在`src/entries`下放置一个与对应的JavaScript文件同名的`.ejs`文件，例如我们编写一个`src/entries/index.ejs`文件，写入以下内容：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
    <style>
        #loading {
            color: #0571bd;
            font-size: 64px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div id="loading">系统加载中……</div>
</body>
</html>
```

这个文件不需要单独写`meta[viewport]`和`meta[app-version]`，它们会自动生成，但是`meta[charset]`却是必须的。在构建后，我们看到的`dist/index-stable.html`将是以下内容（格式化后）：

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>My App</title>
    <style>
        #loading {
            color: #0571bd;
            font-size: 64px;
            font-weight: 700
        }
    </style>
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="app-version" content="0000000/stable@2019-03-26T11:40:25.631Z">
</head>
<body>
    <div id="loading">系统加载中……</div>
    <script src="/assets/index.24e7095a5771e54fb830.js"></script>
</body>
</html>
```

在无需配置`index.js`与`index.ejs`的关系的情况下，构建系统会自动识别它们的关联并通过指定的`.ejs`文件生成最终的HTML文件。

## 配置HTML生成

众所周知地，基于`webpack`的工具使用[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)生成HTML文件，这个插件有着众多的配置，我们同样可以对它进行自定义。

我们可以在`src/entries`下，放置一个与入口JavaScript文件同名的`.config.js`文件，如`src/entries/hello.config.js`文件，并放置以下内容：

```javascript
module.exports = {
    meta: {
        'X-UA-Compatible': {
            'http-equiv': 'X-UA-Compatible',
            content: 'IE=edge',
        },
    },
};
```

随后运行`skr build`，并查看`dist/hello-stable.html`（格式化后）：

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>My App</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body>
    <script src="/assets/hello.2e82f9ea88ad3b4a11ce.js"></script>
</body>
</html>
```

可以看到一个`X-UA-Compatible`已经加入到了`<head>`中。

总而言之，同名的`.config.js`将会提供一个用于`html-webpack-plugin`的配置，用于控制生成HTML的逻辑。
