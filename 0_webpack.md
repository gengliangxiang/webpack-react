##一、安装
#####1.创建一个目录，初始化 npm

```
mkdir webpack4 && cd webpack4
npm init -y
```

#####2.要安装最新版本或特定版本：

```
npm install --save-dev webpack
npm install --save-dev webpack@<version>
```

#####3.使用 webpack 4+ 版本，还需要安装 CLI

```
npm install --save-dev webpack-cli
```

> **不推荐全局安装 webpack。会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。**

##二、webpack 配置--1

#####1.入口 _entry_

> 配置入口文件的地址，可以是单一入口，也可以是多入口。有几个入口对应打包出几个文件

```
//入口文件的配置项
entry:{
  //里面的entery是可以随便写的
  entry:'./src/entry.js'
},
//多入口文件的配置项
entry:{
  entry:'./src/entry.js',
  //这里我们又引入了一个入口文件
  entry2:'./src/entry2.js'
},
```

- `name` 给当前文件加个别名（chunk Name），在输入的时候可以使用它
- `path` 打包的 js 路径

#####2.出口 _output_

> 指定文件输出的位置和输入文件名

```
output:{
  filename:'[name].js',
  path:'绝对路径'
}
```

- `filename` 为输出后的文件名称，name 是动态的，等于 entry 中配置的 name。除了[name]还可以是 [hash]、[id]、[chunkhash]，当然也可以写死 filename:'xx.js'
  **注：如需加版本 filename 值可以写成个函数**

- `path` 必须是绝对路径，而且 node 计算时/并非是项目根目录（而是盘根目录），实际路径计算方法如下：

```
//引入node的path模块
const path = require("path");
//配置文件所在的绝对路径
output:{
  filename: '[name].js',
  path: path.resolve(__dirname, './')
}

注：后面的 ./ 相对于当前文件所在路径计算的
```

##三、简单打包示例 
#####当前目录

```
webpack4
|- /dist
  |- index.html
|- /node_modules
|- /src
  |- index.js
|- package.json
|- webpack.config.js
```

#####package.json

```
...
"scripts": {
  "build": "webpack --config webpack.config.js",
  "clean": "rm -r dist/*"
  },
...
```

#####webpack.config.js

```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

加入 lodash
`npm install --save lodash`
#####src/index.js

```
import _ from 'lodash';

function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

#####dist/index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>webpack</title>
</head>
<body>
  <script src="./bundle.js"></script>
</body>
</html>
```

> 执行 npm run build
> dist 文件夹下会生成一个 bundle.js
> 打包完成

##四、webpack 配置--2
#####1. _loader_

> loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

>Loaders需要单独安装并且需要在webpack.config.js中的modules关键字下进行配置，Loaders的配置包括以下几方面：
+ test：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）

+ loader：loader的名称（必须）

+ include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；

+ query：为loaders提供额外的设置选项（可选


> 常用 loader 配置：

#####处理html

```
{
  test: /\.html$/,
  use: 'html-loader',
}
```
##### 处理css
```
{
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        modules: true,
        sourceMap: true,
        importLoaders: 1, //importLoaders代表import进来的资源；2代表css-loader后还需要使用几个loader
        localIdentName: '[path][name]__[local]--[hash:base64:5]',
      }
    },
    {
    //需在css-loader/style-loader后面，在其他预处理前面 添加浏览器兼容前缀
      loader: 'postcss-loader',
      options: {
        plugins: [require('autoprefixer')],
        browsers: [
          '> 1%',
          'last 5 versions',
          'not ie <= 9',
          'ios >= 8',
          'android >= 4.0',
        ],
      },
    },
  ]
}
```
##### 处理scss
```
{
  test: /\.(sa|sc|c)ss$/,
  use: [
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    }
  ]
}
```
##### 处理字体
```
{
  test: /\.(woff|woff2|eot|ttf|otf)$/, //字体处理
  use: ['url-loader'],
}
```
##### 处理图片
```
{
  test: /\.(png|jpg|jpeg|gif)$/, //图片处理
  use: [
  {
    loader: 'url-loader',
    options: {
    limit: 50, //图片不转base64，减少css的阻塞时间，开启http2，所以也不用雪碧图
    name: '[name].[hash:5].[ext]',
    url: false, //不处理css图片路径,
    outputPath: 'images',
    },
  },
  {
    loader: 'file-loader',
    options: {}
  }
  ],
}
```
##### babel-loader
>Babel其实是一个编译JavaScript的平台，它可以编译代码帮你达到以下目的：
+ 让你能使用最新的JavaScript代码（ES6，ES7...），而不用管新标准是否被当前使用的浏览器完全支持；
+ 让你能使用基于JavaScript进行了拓展的语言，比如React的JSX；

```
{
  //babel编译
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  exclude: /node_modules/, //设置node_modules里的js文件不用解析
}
```
另行配置.babelrc文件
```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3,
        "targets": {
          "chrome": "58",
          "ie": "8"
        }
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false,    // false > @babel/runtime, 2 > @babel/runtime-corejs2, 3 > @babel/runtime-corejs3
        "helpers": true,    // 切换内联的Babel helpers是否被对模块名的调用所取代
        "regenerator": true,    // 切换生成器函数是否转换为使用不会污染全局范围的再生器运行时。
        "useESModules": false
      }
    ]
  ]
}

```
[babel配置参链接1🔗](https://juejin.im/post/5ce693b45188252db303ff23)
[babel配置参链接2🔗](https://www.jianshu.com/p/d078b5f3036a)

#####2.插件 _plugins_
>插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。

常用插件配置：
```
HtmlWebpackPlugin
mini-css-extract-plugin
happypack
```
#####3. _devServer_
- hot

>hot配置是否启用模块的热替换功能，devServer的默认行为是在发现源代码被变更后，通过自动刷新整个页面来做到事实预览，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览。
```
devServer: {
  hot:true
},
plugins: [
  new webpack.HotModuleReplacementPlugin(), //热加载插件
],
```
- host
>写主机名的。默认 localhost
- prot
>端口号。默认 8080
- open
>true，则自动打开浏览器
- proxy
>当您有一个单独的API后端开发服务器，并且想要在同一个域上发送API请求时，则代理这些 url 。看例子好理解.

1.假设你主机名为 localhost:8080 , 请求 API 的 url 是 http：//your_api_server.com/user/list

2.'/proxy'：如果点击某个按钮，触发请求 API 事件，这时请求 url 是http：//localhost:8080/proxy/user/list 。

3.changeOrigin：如果 true ，那么 http：//localhost:8080/proxy/user/list 变为 http：//your_api_server.com/proxy/user/list 。但还不是我们要的 url 。

4.pathRewrite：重写路径。匹配 /proxy ，然后变为'' ，那么 url 最终为 http：//your_api_server.com/user/list 。
```
proxy: {
  '/proxy': {
    target: 'http://your_api_server.com',
    changeOrigin: true,
    pathRewrite: {
      '^/proxy': ''
    }
  }
```
#####4. _resolve_
>Webpack 在启动后会从配置的入口模块出发找出所有依赖的模块，Resolve 配置 Webpack 如何寻找模块所对应的文件。 Webpack 内置 JavaScript 模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，但你也可以根据自己的需要修改默认的规则
- alias
>配置项通过别名来把原导入路径映射成一个新的导入路径
```
// Webpack alias 配置
resolve:{
  alias:{
  @components': path.resolve('./src/components')
  }
}
```
- modules
>配置Webpack 去哪些目录下寻找第三方模块，默认是只会去  node_modules  目录下寻找。
```
resolve:{
  modules:{
  path.resolve('./src/common/components/business'),
  node_modules
  }
}
```
- extensions
> import导入时省略后缀
```
resolve:{
  extensions:['.js', '.jsx', '.react.js', '.scss', '.less', '.css', '.json']
}
```
#####5. 环境变量 _process.env.NODE_ENV_
>在node中，有全局变量process表示的是当前的node进程。process.env包含着关于系统环境的信息。但是process.env中并不存在NODE_ENV这个东西。NODE_ENV是用户一个自定义的变量，在webpack中它的用途是判断生产环境或开发环境的依据的。
- 通过 _DefinePlugin_ 设置环境变量信息
```
// 开发： development 生产： production
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
}),
```
- 直接设置环境变量信息
```
// 开发： development 生产： production
process.env.NODE_ENV = 'production'
```
- cross-env
>大多数情况下，在windows平台下使用类似于: NODE_ENV=production的命令行指令会卡住，windows平台与POSIX在使用命令行时有许多区别 cross-env让这一切变得简单，不同平台使用唯一指令，无需担心跨平台问题
```
npm i --save-dev cross-env
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```
#####6. _webpack-merge_
>用于提取webpack公共的配置再合并配置
```
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
process.env.NODE_ENV = 'development';
module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
});
```
#####7. 提取公共代码 _optimization_
```
splitChunks: {
  chunks: "async”,//默认作用于异步chunk，值为all/initial/async/function(chunk),值为function时第一个参数为遍历所有入口chunk时的chunk模块，chunk._modules为chunk所有依赖的模块，通过chunk的名字和所有依赖模块的resource可以自由配置,会抽取所有满足条件chunk的公有模块，以及模块的所有依赖模块，包括css
  minSize: 30000,  //表示在压缩前的最小模块大小,默认值是30kb
  minChunks: 1,  // 表示被引用次数，默认为1；
  maxAsyncRequests: 5,  //所有异步请求不得超过5个
  maxInitialRequests: 3,  //初始话并行请求不得超过3个
  automaticNameDelimiter:'~',//名称分隔符，默认是~
  name: true,  //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔
  cacheGroups: { //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
    common: {
      name: 'common',  //抽取的chunk的名字
      chunks(chunk) { //同外层的参数配置，覆盖外层的chunks，以chunk为维度进行抽取
      },
      test(module, chunks) {  //可以为字符串，正则表达式，函数，以module为维度进行抽取，只要是满足条件的module都会被抽取到该common的chunk中，为函数时第一个参数是遍历到的每一个模块，第二个参数是每一个引用到该模块的chunks数组。自己尝试过程中发现不能提取出css，待进一步验证。
      },
    priority: 10,  //优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
    minChunks: 2,  //最少被几个chunk引用
    reuseExistingChunk: true，//  如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
    enforce: true  // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
    }
  }
}
```
