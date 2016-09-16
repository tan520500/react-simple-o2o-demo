
# 搭建 webpack + React 开发环境

我在实际工作中用百度 [fis3](http://fis.baidu.com/) 搭建 React 开发环境，但是放在整个前端社区中，webpack 肯定更适合大家，这里就用 webpack。如果之前未听说或者未用过 webpack 的同学，一定此机会恶补一下，也可以查阅[官网](https://webpack.github.io/)



## 开始之前

 - 我目前使用的系统是 mac os 系统，使用 windows 的同学建议在执行本课程的命令行时，使用一个模拟 linux 命令的工具，例如 `xshell`
 - 能科学上网最好，否则就需要你在某些过程中耐心等待




## 初始化 npm 环境并安装插件

当前的 web 前端开发，基本使用 npm 管理第三方依赖（插件），不熟悉的同学这里抓紧补一下。

### 初始化 npm 环境

首先保证有 node 和 npm 环境，运行`node -v`和`npm -v`查看

进入项目目录，运行`npm init`按照步骤填写最终生成`package.json`文件，所有使用 npm 做依赖管理的项目，根目录下都会有一个这个文件，该文件描述了项目的基本信息以及一些第三方依赖项（插件）。详细的使用说明可查阅[官网文档](https://docs.npmjs.com/)，不过是英文的。

### 安装插件

已知我们将使用 webpack 作为构建工具，那么就需要安装相应插件，运行 `npm install webpack webpack-dev-server --save-dev` 来安装两个插件。

又已知我们将使用 React ，也需要安装相应插件，运行 `npm i react react-dom --save`来安装两个插件。其中`i`是`install`的简写形式。

安装完成之后，查看`package.json`可看到多了`devDependencies`和`dependencies`两项，根目录也多了一个`node_modules`文件夹。

### `--save` 和 `--save-dev` 的区别

`npm i`时使用`--save`和`--save-dev`，可分别将依赖（插件）记录到`package.json`中的`dependencies`和`devDependencies`下面。

`dependencies`下记录的是项目在运行时必须依赖的插件，常见的例如`react` `jquery`等，即及时项目打包好了、上线了，这些也是需要用的，否则程序无法正常执行。

`devDependencies`下记录的是项目在开发过程中使用的插件，例如这里我们开发过程中需要使用`webpack`打包，而我在工作中使用`fis3`打包，但是一旦项目打包发布、上线了之后，`webpack`和`fis3`就都没有用了，可卸磨杀驴。

延伸一下，我们的项目有`package.json`，其他我们用的项目如`webpack`也有`package.json`，见`./node_modules/webpack/package.json`，其中也有`devDependencies`和`dependencies`。当我们使用`npm i webpack`时，`./node_modules/webpack/package.json`中的`dependencies`会被 npm 安装上，而`devDependencies`也没必要安装。




## 配置 webpack.config.js

为了提高学习效率，webpack 最最基础的用法，就不再挨个演示了（推荐一个非常好的[入门文章](https://segmentfault.com/a/1190000006178770)，以及[更多资料](https://github.com/frontendmap/frontendmap/blob/master/source-env/build/pack.md)）这里我们把项目中的`webpack.config.js`这个配置文件详细的讲解一下，过程中也会照顾 0 基础的同学。

### 文件格式

webpack.config.js 就是一个普通的 js 文件，符合 commonJS 规范。最后输出一个对象，即`module.exports = {...}`

### 输入 & 输出

这个比较基础，不过需要新建`./app/index.jsx`作为入口文件，目前项目中只有这一个入口文件。不过 webpack 支持多个入口文件，可查阅文档。

输出就是一个`bundle.js`，js 和 css 都在里面，不过只有在开发环境下才用，发布代码的时候，肯定不能只有这么一个文件，接下来会讲到。

### module

针对不同类型的文件，使用不同的`loader`，当然使用之前要安装，例如`npm i style-loader css-loader --save-dev`。该项目代码中，我们用到的文件格式有：js/jsx 代码、css/less 代码、图片、字体文件。

less 是 css 的语法糖，可以更高效低冗余的写 css，不熟悉的朋友可去[官网](http://lesscss.cn/)看看，非常简单。

在加载 css/less 时用到了`postcss`，主要使用`autoprefixer`功能，帮助自动加 css3 的浏览器前缀，非常好用。

编译 es6 和 jsx 语法时，用到家喻户晓的`babel`，另外还需增加一个`.babelrc`的配置文件。

### plugins

使用 html 模板（需要`npm i html-webpack-plugin --save-dev`），这样可以将输出的文件名（如`./bundle.js`）自动注入到 html 中，不用我们自己手写。手写的话，一旦修改就需要改两个地方。

使用热加载和自动打开浏览器插件

### devServer

对 webpack-dev-server 的配置

### npm start

在 package.json 中，输入以下代码，将这一串命令封装为`npm start`，这样就可以运行项目代码了。

```
  "scripts": {
    "start": "NODE_ENV=dev webpack-dev-server --progress --colors"
  }
```

代码中`NODE_ENV=dev`代表当前是开发环境下，这里的`"dev"`可被构建工具得到并做一些其他处理。下文中会通过一个插件来讲解其用处。





## 配置 webpack.production.config.js


待续


## 版本管理 git

待续


