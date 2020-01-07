##一、webpack 配置-resolve
resolve 配置项能设置模块如何被解析。webpack 提供合理的默认值，但是还是可能会修改一些解析的细节。

#####1.resolve.modules

> 配置 _webpack_ 去哪些目录下寻找第三方模块，默认是只会去 **node_modules** 目录下寻找

```
resolve: {
  modules: ['node_modules'],
}
```

#####2.resolve.alias

> 配置项通过别名来把原导入路径映射成一个新的导入路径。例如使用以下配置：

```
resolve: {
  alias:{
    '@assets': path.resolve('./src/assets'),
    '@common': path.resolve('./src/common'),
    '@images': path.resolve('./src/images'),
    '@style': path.resolve('./src/style'),
  }
}
```

#####3.resolve.extensions

> 在导入语句省略文件后缀时，_webpack_ 会自动带上后缀后去尝试访问文件是否存在。

```
resolve: {
  extensions: ['.js', '.jsx', '.scss', '.less', '.css', '.json'],
}
```

##二、webpack 配置-mode

> 控制是否生成，以及如何生成 source map。_mode_ 有以下三个可选值。1,_development_; 2,_production_, 3,_none_
#####1.配置文件中配置

```
module.exports = {
  mode: 'production'
};
```

#####2.文件中获取使用

```
const env = process.env.NODE_ENV;
// env 就是 mode 的值
```

#### 3.环境变量 _process.env.NODE_ENV_
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

##三、webpack 配置-devtool

> 控制是否生成，以及如何生成 source map。对于开发环境，通常希望更快速的 source map，需要添加到 bundle 中以增加体积为代价，但是对于生产环境，则希望更精准的 source map，需要从 bundle 中分离并独立存在。

开发环境推荐：`cheap-module-eval-source-map`
生产环境推荐：`cheap-module-source-map`

- cheap: 不包含列信息
- module: 简化 loader 的 sourcemap，支持 _babel_ 预编译
- eval: 提高持续构建效率

```
module.exports = {
  devtool: 'cheap-module-source-map'
};
```

##四、webpack 配置-plugins

> _plugins_ 选项用于以各种方式自定义 _webpack_ 构建过程。_webpack_ 附带了各种内置插件，可以通过 _webpack.[plugin-name]_ 访问这些插件。同样的 npm 中也有许多插件

简单示例：

```
module.exports = {
  plugins: [
    new CleanWebpackPlugin(),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ]
};
```

##五、webpack 配置-module

> _module_ 配置决定了如何处理项目中的不同类型的模块。
> ###module.rules (array)
> 创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。常用相关配置：

- test: 正则表达式，选择要命中的文件
- include: 引入需要匹配的文件
- exclude: 排除需要匹配的文件
- use: 指定要用什么 loader 及其相关 loader 配置

简单示例：

```
{
  test: /\.html$/,
  use: 'html-loader',
},
{
  loader: 'css-loader',
  options: {
    modules: true, // webpack3 为 module
    sourceMap: true,
    importLoaders: 2, //importLoaders代表import进来的资源；2代表css-loader后还需要使用几个loader
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
},
},
```

##六、综合配置打包

> 基于之前的 demo 下将以上配置利用上进行打包

配置完成之后目录结构
```
|- /node_modules
|- /src
  |- index.html
  |- index.js
|- package.json
|- webpack.config.js
```

####1.下载相关依赖

- babel(编译js、jsx，es6等)
  `npm i -D @babel/cli @babel/core @babel/preset-react @babel/preset-env @babel/plugin-transform-runtime babel-loader`
- react
  `npm install -S react react-dom`
- html-webpack-plugin (为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题,可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口)
  `npm i -D html-webpack-plugin`
- html-loader(解析html)
  `npm i -D html-loader`
- uglifyjs-webpack-plugin(用来缩小（压缩优化）js文件)
  `npm install -D uglifyjs-webpack-plugin`
- clean-webpack-plugin(清除原有打包文件)
  `npm install -D clean-webpack-plugin`


####2.package.json 中 scripts 配置
**注意相关依赖的版本，有些依赖等版本不对会导致打包报错**
```
{
  "name": "webpack4",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "clean": "rm -r dist/*"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/cli": "^7.5.5",
    "@babel/core": "^7.5.5",
    "@babel/plugin-transform-runtime": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "uglifyjs-webpack-plugin": "^2.2.0",
    "webpack": "^4.39.2",
    "webpack-cli": "^3.3.7",
    "webpack-merge": "^4.2.1"
  },
  "dependencies": {
    "react": "^16.9.0",
    "react-dom": "^16.9.0"
  }
}
```

####3.修改 src 中 index.js 和 index.html

- index.js

```
import React from 'react';
import ReactDom from 'react-dom';

const hello = 'hello webpack && react';
ReactDom.render(
  <div>
    <div>{hello}</div>
  </div>,
  document.getElementById('app'),
);
```

- index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>webpack demo</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

####4.webpack.config.js 中配置设置（重点）

```
const path = require('path'); // node 提供了一些用于处理文件路径
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // 用来缩小（压缩优化）js文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  // target: 'web',//告知 webpack 为目标(target)指定一个环境。默认web
  entry: {
    //配置页面入口
    index: ['./src/index.js'],
  },
  output: {
    //配置输出选项
    path: path.resolve(__dirname, './dist'), //输出路径为，当前路径下
    filename: '[name].[chunkhash:5].js', //输出后的文件名称
  },
  resolve: {
    // 设置模块导入规则，import/require时会直接在这些目录找文件
    modules: ['node_modules'],
    // import导入时省略后缀
    extensions: ['.js', '.jsx', '.scss', '.less', '.css', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin(),
      new UglifyJSPlugin({
      sourceMap: true,
    }),
    new HtmlWebpackPlugin({
      title: 'webpack & react',
      template: './src/index.html', //本地模板文件的位置，支持加载器(如handlebars、ejs、undersore、html等)，如比如 handlebars!src/index.hbs；
      filename: './index.html', //输出文件的文件名称，默认为index.html，不配置就是该文件名；此外，还可以为输出文件指定目录位置（例如'html/index.html'）
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3,
                    targets: {
                      chrome: '58',
                      ie: '8',
                    },
                  },
                ],
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
    ],
  },
};
```
> 运行npm run build，会生产一个dist目录，里面有index[hash].js,index[hash].js.map,index.html,浏览器打开index.html
