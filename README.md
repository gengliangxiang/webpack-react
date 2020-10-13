# 从零开始的 webpack4 教程

## 前提条件

安装 node.js
当前 node.js 版本 ：v12.13.1
当前 npm 版本 ： 6.12.1

> 本文从零开始搭建 webpack ，只需要按照步骤一步一步走，最后就可搭建成功 ，请放心食用，无毒

[完整源码](https://github.com/gengliangxiang/webpack-react)

## 一、 简易打包

### 1.初始化项目 & 创建项目

```
mkdir webpack4-react && cd webpack4-react
npm init -y
// yarn init
```

### 2.安装 webpack & webpack 的 cli

当前 webpack 版本：4.41.5
当前 webpack-cli 版本：3.3.10

```
npm install --save-dev webpack@4.41.5 webpack-cli@3.3.10
```

或

```
yarn add -D webpack@4.41.5 webpack-cli@3.3.10
```

> 调整 package.json 文件，以便确保我们安装包是私有的(private)，并且移除 main 入口。这可以防止意外发布你的代码。

package.json

```
{
  ...
  "description": "webpack4-react",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ...
}

```

### 3.下载 lodash 依赖

```
yarn add lodash
```

### 4.创建以下目录结构、文件和内容：

```
webpack4-react
|- package.json
|- /dist
  |- index.html
|- /src
  |- index.js
```

package.json

```
{
  "name": "webpack4-react",
  "version": "1.0.0",
  "description": "webpack4-react",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "lodash": "^4.17.15"
  },
  "devDependencies": {
    "webpack": "^4.41.5",
    "webpack-cli": "^3.3.10"
  }
}
```

dist/index.html

```
<!DOCTYPE html>
<html>
  <head>
    <title>webpack4-react</title>
  </head>
  <body>
    <script src="main.js"></script>
  </body>
</html>
```

src/index.js

```
import _ from 'lodash';
function component() {
  var element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

### 5. 执行打包命令

`npx webpack`
将看到以下输出：

```
Hash: 17a14a12467064d9d4dd
Version: webpack 4.41.5
Time: 1239ms
Built at: 2020-01-04 10:56:16
  Asset      Size  Chunks             Chunk Names
main.js  72.1 KiB       0  [emitted]  main
Entrypoint main = main.js
[1] ./src/index.js 210 bytes {0} [built]
[2] (webpack)/buildin/global.js 472 bytes {0} [built]
[3] (webpack)/buildin/module.js 497 bytes {0} [built]
    + 1 hidden module
```

此时在 **dist** 文件夹下已经生成一个 **main.js** 文件
在浏览器中打开 dist 下的 index.html，如果一切访问都正常，你应该能看到以下文本：'Hello webpack'。

简易打包已经完成

## 二、使用配置文件打包

### 1. 添加 webpack.config.js 配置文件

```
webpack4-react
|- package.json
|- webpack.config.js
|- /dist
  |- index.html
|- /src
  |- index.js
```

webpack.config.js

```
const path = require('path');

module.exports = {
  entry: {
    //配置页面入口
    index: ['./src/index.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

dist/index.html

```
...
<body>
  <script src="bundle.js"></script>
</body>
...
```

### 2. 添加 NPM 脚本

package.json

```
{
  "name": "webpack4-react",
  "version": "1.0.0",
  "description": "webpack4-react",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "lodash": "^4.17.15"
  },
  "devDependencies": {
    "webpack": "^4.41.5",
    "webpack-cli": "^3.3.10"
  }
}
```

### 3.执行脚本命令打包

```
yarn build
```

终端将输出：

```
Hash: 9cbb2fac6cc224bfe661
Version: webpack 4.41.5
Time: 1272ms
Built at: 2020-01-04 11:39:26
  Asset      Size  Chunks             Chunk Names
main.js  72.1 KiB       0  [emitted]  main
Entrypoint main = main.js
[1] ./src/index.js 213 bytes {0} [built]
[2] (webpack)/buildin/global.js 472 bytes {0} [built]
[3] (webpack)/buildin/module.js 497 bytes {0} [built]
    + 1 hidden module
```

同样的, dist 文件夹下生成 bundle.js 文件

这样就实现了基本的 webpack 构建了

## 三、集成 React

### 1. 下载 react 和 react-dom

`yarn add react@16.12.0 react-dom@16.12.0`

### 2. 下载 babel(编译 js、jsx，es6 等)

`yarn add -D @babel/cli@7.7.7 @babel/core@7.7.7 @babel/preset-react@7.7.4 @babel/preset-env@7.7.7 @babel/plugin-transform-runtime@7.7.6 babel-loader@8.0.6`

### 3. 修改 入口文件

src/index.js

```
import React from 'react';
import ReactDom from 'react-dom';

const hello = 'Hello React'
ReactDom.render(
	<div>
		<div>{hello}</div>
	</div>,
	document.getElementById('app'),
);
```

### 4. 添加 react 根元素

dist/index.html

```
...
<body>
  <div id="app"></div>
  <script src="bundle.js"></script>
</body>
...
```

### 5. 添加 babel 相关配置

> 为了使用 babel 解析 jsx

- 1. webpack 配置文件中

  webpack.config.js

  ```
  ...
  entry: {
    //配置页面入口
    index: ['./src/index.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
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
  }
  ...
  ```

- 2. 添加 babel 配置文件

  > 在根目录下新建 .babelrc 文件

  .babelrc

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
          "corejs": false,
          "helpers": true,
          "regenerator": true,
          "useESModules": false
        }
      ]
    ]
  }
  ```

  当前文件目录结构：

  ```
  webpack4-react
  |- /dist
    |- index.html
  |- /src
    |- index.js
  |- .babelrc
  |- package.json
  |- webpack.config.js
  ```

### 6. 打包

    执行 yarn build
    终端输出：
    ```
    $ webpack
    Hash: f4d46dd4732764195f93
    Version: webpack 4.41.5
    Time: 446ms
    Built at: 2020-01-04 13:28:48
        Asset     Size  Chunks             Chunk Names
    bundle.js  128 KiB       0  [emitted]  main
    Entrypoint main = bundle.js
    [3] ./src/index.js 211 bytes {0} [built]
        + 7 hidden modules
    ```

在浏览器中打开 dist 下的 index.html，如果一切访问都正常，你应该能看到以下文本：'Hello React'。

## 四、建立开发环境

### 文件结构

```
webpack4-react
|- /src
  |- index.js
  |- index.html
|- .babelrc
|- package.json
|- webpack.config.js
```

src/index.html

```
<!DOCTYPE html>
<html>
  <head>
    <title>webpack4-react</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

### 1. webpack-dev-server

- 1. 下载依赖
  ```
  yarn add -D webpack-dev-server@3.10.1
  ```
- 2. webpack 配置文件中配置 webpack-dev-server
     webpack.config.js
  ```
  ...
  entry: {
    //配置页面入口
    index: ['./src/index.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: '/src',
    hot: true,
  },
  ...
  ```

### 2. html-webpack-plugin

- 1. 下载依赖
  ```
  yarn add -D html-webpack-plugin@3.2.0
  ```
- 2. webpack 配置文件中配置 webpack-dev-server
     webpack.config.js
  ```
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  ...
  devServer: {
    contentBase: '/src',
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index'],
      inject: 'body',
    }),
  ],
  ...
  ```

### 3. 添加 NPM 脚本

package.json

```
{
  "name": "webpack4-react",
  "version": "1.0.0",
  "description": "webpack4-react",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --open --config webpack.config.js",
    "build": "webpack --config webpack.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "lodash": "^4.17.15",
    "react": "^16.12.0",
    "react-dom": "^16.12.0"
  },
  "devDependencies": {
    "@babel/cli": "^7.7.7",
    "@babel/core": "^7.7.7",
    "@babel/plugin-transform-runtime": "^7.7.6",
    "@babel/preset-env": "^7.7.7",
    "@babel/preset-react": "^7.7.4",
    "babel-loader": "^8.0.6",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.41.5",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.10.1"
  }
}
```

### 4.执行脚本命令 `yarn dev`

> 执行 `yarn dev` 后会自动打开浏览器，此时修改 index.js 文件中内容，浏览器会实时更新

删除 dist 文件夹

> 执行 yarn build 打包依旧会在 dist 下生成打包文件

## 五、资源管理

### 1. 加载 CSS

> 为了从 JavaScript 模块中 import 一个 CSS 文件，你需要在 module 配置中 安装并添加 style-loader 和 css-loader：

- 1. 下载 style-loader css-loader
  ```
  yarn add -D style-loader@1.1.2 css-loader@3.4.1
  ```
- 2. webpack.config.js 中配置 css 的 loader
  ```
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader',
            ]
          },
    ...
    }
  ```
- 3. src/index.js 中引入 css
     src 下新建 style/reset.css
     style/reset.css
  ```
  * {
    padding: 0;
    margin: 0;
  }
  div {
    font-size: 20px;
  }
  ```
  src/index.js
  ```
  import './style/reset.css';
  ```
  执行 `yarn dev` ,会看到 reset.css 中的样式已经生效

### 2. CSS 预处理器 & 模块化 & 兼容性处理

- 1. 下载依赖
  ```
  yarn add -D autoprefixer@9.7.3 postcss-loader@3.0.0
  yarn add -D less-loader@5.0.0 node-sass@4.13.0 sass@1.24.2 sass-loader@8.0.0
  ```
  > 这个过程中安装 node-sass 可能会很慢, 耐心等待
- 2. 创建 React 组件

  创建如下目录文件及内容：

  ```
  webpack4-react
  |- src
    |- components
      |- Date
        |- index.jsx
        |- style.scss
    |- style
      |- reset.scss
    |- index.js
  |- .babelrc
  |- package.json
  |- webpack.config.js
  ```

  src/components/Date/index.jsx

  ```
  import React from 'react';
  import style from './style.scss';

  class DateComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        date: new Date(),
      };
    }

    componentDidMount() {
      this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    tick() {
      this.setState({
        date: new Date(),
      });
    }

    render() {
      const { date } = this.state;
      return (
       <div>
          <div className={style.title}>时间</div>
          <div className={style.title}>
          {date.toLocaleTimeString()}
          </div>
        </div>
      );
    }
  }
  export default DateComponent;
  ```

  src/components/Date/style.scss

  ```
  .title {
    height: 50px;
    font: bold 20px '微软雅黑';
    text-align: center;
    color: #000;
  }
  ```

- 3. 引入组件

  src/index.js

  ```
  import React from 'react';
  import ReactDom from 'react-dom';
  import DateComponents from './components/Date/index.jsx';
  import './style/reset.scss';

  const hello = 'Hello React';
  ReactDom.render(
    <div>
      <div>{hello}</div>
      <DateComponents />
    </div>,
    document.getElementById('app')
  );
  ```

- 4. 新增 CSS 相关的 webpack 配置
     根目录下新建 tools/utils.js
  ```
  // css 配置
  const styleLoader = {
    loader: 'style-loader',
  };
  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: true, // webpack3 为 module
      sourceMap: true,
      importLoaders: 2,
    },
  };
  const postCssLoader = {
    loader: 'postcss-loader',
  };
  const sassLoader = {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  };
  const lessLoader = {
    loader: 'less-loader',
  };
  exports.loadersConfig = {
    styleLoader,
    cssLoader,
    postCssLoader,
    sassLoader,
    lessLoader,
  };
  // css 配置
  ```
  webpack.config.js
  ```
  ...
  const utils = require('./tools/utils.js');
  const {
    postCssLoader,
    styleLoader,
    sassLoader,
    cssLoader,
  } = utils.loadersConfig;
  ...
  module.exports = {
    ...
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [styleLoader, cssLoader, postCssLoader],
        },
        {
          test: /\.scss$/,
          include: [/pages/, /components/, /style/],
          use: [
            styleLoader,
            cssLoader,
            postCssLoader,
            sassLoader,
          ],
        },
      }
    ...
  };
  ```
- 5. 新增 postcss-loader 配置文件
     根目录下新增 postcss.config.js
  ```
  const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 8',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
  ];
  module.exports = {
    plugins: [require('autoprefixer')({overrideBrowserslist: ['> 0.15% in CN']})],
  };
  ```

> 这时候执行 `yarn dev` 命令会报错，因为缺少一些 babel 依赖，下载一下就好了

```
yarn add @babel/runtime@7.7.7 core-js@3.6.1
```

执行 `yarn dev` ,自动打开浏览器，css 相关的配置构建完成

### 3. 图片处理

- 1. 下载依赖
  ```
  yarn add -D file-loader@5.0.2 url-loader@3.0.0
  ```
- 2. webpack 配置中添加规则
  ```
  ...
  module: {
    rules: [
        ...
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[path][name].[ext]',
                limit: 1024 * 15,
                fallback: 'file-loader',
              },
            },
          ],
        },
        ...
    ]
  }
  ...
  ```
- 3. React 组件中 引入图片
     src/components/Date/index.jsx
  ```
  ...
  import reactLogo from './../../images/React.svg';
  import webpackLogo from './../../images/webpack.svg';
  ...
  render() {
    const { date } = this.state;
    return (
      <div>
        <div className={style.title}>时间</div>
        <div>
        <img className={style.logo} src={reactLogo} alt="" />
        <img className={style.logo} src={webpackLogo} alt="" />
        </div>
        <div className={style.title}>
        {date.toLocaleTimeString()}
        </div>
      </div>
    );
  }
  ...
  ```

### 4. 其他

> 字体、数据等参考 webpack 官网 [资源管理](https://www.webpackjs.com/guides/asset-management/)

## 六、 resolve 配置

> 在代码引入组件或图片时，我们来配置一些便捷的方式

### 1. 配置

webpack.config.js

```
// 引入 node 的 path 模块
const path = require('path');
...
module.exports = {
  ...
  resolve: {
    // 设置模块导入规则，import/require时会直接在这些目录找文件
    modules: ['node_modules'],
    // import导入时省略后缀
    extensions: ['.js', '.jsx', '.scss', '.less', '.css', '.json'],
    // import导入时别名
    alias: {
      '@components': path.resolve('./src/components'),
      '@images': path.resolve('./src/images'),
      '@style': path.resolve('./src/style'),
    },
  },
  ...
}

```

### 2. 使用

> 举个 🌰

src/index.js 中

```
import React from 'react';
import ReactDom from 'react-dom';
import DateComponents from '@components/Date/index.jsx';
import '@style/reset.scss';

const hello = 'Hello React';
ReactDom.render(
  <div>
    <div>{hello}</div>
    <DateComponents />
  </div>,
  document.getElementById('app')
);

```

此时 执行 `yarn dev` 查看

## 七、 环境配置构建

> 开发环境(development)和生产环境(production)的构建目标差异很大。在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。

### 1. 使用 `webpack-merge` 配置

- 1. 下载依赖
  ```
  yarn add -D webpack-merge@4.2.2 clean-webpack-plugin@3.0.0 uglifyjs-webpack-plugin@2.2.0
  ```
- 2. 拆分 webpack 配置

  根目录下创建 webpack 文件夹

  ```
  |- webpack
    |- webpack.common.js
    |- webpack.dev.js
    |- webpack.production.js
  ```

  webpack.common.js

  ```
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  const utils = require('./../tools/utils');
  const { postCssLoader, styleLoader, sassLoader, cssLoader } = utils.loadersConfig;

  module.exports = {
    entry: {
      //配置页面入口
      index: ['./src/index.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../dist'),
    },
    devServer: {
      contentBase: '/src',
      hot: true,
    },
    resolve: {
      // 设置模块导入规则，import/require时会直接在这些目录找文件
      modules: ['node_modules'],
      // import导入时省略后缀
      extensions: ['.js', '.jsx', '.scss', '.less', '.css', '.json'],
      // import导入时别名
      alias: {
      '@assets': path.resolve('./src/assets'),
      '@common': path.resolve('./src/common'),
      '@components': path.resolve('./src/components'),
      '@images': path.resolve('./src/images'),
      '@pages': path.resolve('./src/pages'),
      '@style': path.resolve('./src/style'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index'],
      inject: 'body',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [styleLoader, cssLoader, postCssLoader],
        },
        {
          test: /\.scss$/,
          include: [/pages/, /components/, /style/],
          use: [styleLoader, cssLoader, postCssLoader, sassLoader],
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[path][name].[ext]',
                limit: 1024 * 15,
                fallback: 'file-loader',
              },
            },
          ],
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

  webpack.dev.js

  ```
  const merge = require('webpack-merge');
  const common = require('./webpack.common.js');
  module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: '/src',
      hot: true,
    }
  });
  ```

  webpack.production.js

  ```
  const merge = require('webpack-merge');
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // 用来缩小（压缩优化）js文件
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const common = require('./webpack.common.js');
  module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true,
      }),
      new CleanWebpackPlugin(),
    ],
  });
  ```

- 3. npm 脚本命令更改
     package.json
  ```
  "dev": "webpack-dev-server --open --config webpack/webpack.dev.js",
  "build": "webpack --config webpack/webpack.production.js"
  ```
- 4. 设置环境变量
     下载依赖
  ```
  yarn add -D cross-env@6.0.3
  ```
  npm 脚本命令更改
  ```
  "dev": "cross-env NODE_ENV=development webpack-dev-server --open --config webpack/webpack.dev.js",
  "build": "cross-env NODE_ENV=production webpack --config webpack/webpack.production.js"
  ```

## 八、 其他优化

### 1. 配置中获取环境变量

> 在 npm 脚本执行的时候设置的环境变量通过 process.env.NODE_ENV 来获取，process.env.NODE_ENV 的值 在当前脚本下有两种： development , production , 借此可以根据不同环境设置不同的配置。

### 2. 添加 html-loader 及 html 优化

- 1. 下载依赖
  ```
  yarn add -D html-loader@0.5.5
  ```
- 2. 配置

  在根目录下添加一个 react.ico 的图片待用，用于在 HtmlWebpackPlugin 中配置网页的 ico 图片

  webpack.config.common.js

  ```
  ...
  entry: {
    //配置页面入口
    index: ['./src/index.js'],
  },
  output: {
    //配置输出选项
    path: path.resolve(__dirname, '../dist'), //输出路径为，当前路径下
    filename: '[name].[hash:5].js', //输出后的文件名称
  },
  ...
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack & react',
      template: './src/index.html', //本地模板文件的位置，支持加载器(如handlebars、ejs、undersore、html等)，如比如 handlebars!src/index.hbs；
      filename: './index.html', //输出文件的文件名称，默认为index.html，不配置就是该文件名；此外，还可以为输出文件指定目录位置（例如'html/index.html'）
      chunks: ['index'], // chunks主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
      inject: 'body', //1、true或者body：所有JavaScript资源插入到body元素的底部2、head: 所有JavaScript资源插入到head元素中3、false： 所有静态资源css和JavaScript都不会注入到模板文件中
      showErrors: true, //是否将错误信息输出到html页面中
      hash: false, //是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值
      favicon: 'react.ico', //添加特定的 favicon 路径到输出的 HTML 文件中。
      minify: {
        //是否对大小写敏感，默认false
        caseSensitive: true,
        //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
        collapseBooleanAttributes: true,
        //是否去除空格，默认false
        collapseWhitespace: true,
        //是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
        minifyCSS: true,
        //是否压缩html里的js（使用uglify-js进行的压缩）
        minifyJS: true,
        //Prevents the escaping of the values of attributes
        preventAttributesEscaping: true,
        //是否移除属性的引号 默认false
        removeAttributeQuotes: true,
        //是否移除注释 默认false
        removeComments: true,
        //从脚本和样式删除的注释 默认false
        removeCommentsFromCDATA: true,
        //是否删除空属性，默认false
        removeEmptyAttributes: true,
        //  若开启此项，生成的html中没有 body 和 head，html也未闭合
        removeOptionalTags: false,
        //删除多余的属性
        removeRedundantAttributes: true,
        //删除script的类型属性，在h5下面script的type默认值：text/javascript 默认值false
        removeScriptTypeAttributes: true,
        //删除style的类型属性， type="text/css" 同上
        removeStyleLinkTypeAttributes: true,
        //使用短的文档类型，默认false
        useShortDoctype: true,
      },
  }),
  ]
  ...
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ]
  }
  ```

### 3. 压缩 提取 CSS

- 1. 下载依赖
  ```
  yarn add -D mini-css-extract-plugin@0.9.0
  ```
- 2. 在生产环境中压缩 CSS, 开发环境中不压缩 scss

  webpack.config.common.js 其中 关于 \.scss\$ 的 rules 替换下

  ```
  ...
  const devMode = process.env.NODE_ENV !== 'production';
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  ...
  module.exports = {
    ...
    plugins: [
      ...
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name]_[hash:5].css',
        chunkFilename: devMode ? '[id].css' : '[id]_[hash:5].css',
        disable: false, //是否禁用此插件
        allChunks: true,
      }),
      ...
    ]
    ...
    module: {
      rules: [
        {
          test: /\.html$/,
          use: "html-loader"
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [styleLoader, cssLoader, postCssLoader]
        },
        {
          test: /\.scss$/,
          include: [/pages/, /components/, /style/],
          use: [
            devMode ? styleLoader : MiniCssExtractPlugin.loader,
            cssLoader,
            postCssLoader,
            sassLoader,
          ],
        },
      ],
    }
  ```

- 3. 再次执行 `yarn build` 会发现在 dist 文件夹里多了些 css，css.map 文件

### 4. 生产环境压缩 JS, 打包时清除 dist 文件夹

- 1. 下载依赖
  ```
  yarn add -D uglifyjs-webpack-plugin@2.2.0 clean-webpack-plugin@3.0.0
  ```
- 2. webpack 配置

  webpack.production.js

  ```
  ...
  const merge = require('webpack-merge');
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const common = require('./webpack.config.common.js');
  module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true,
      }),
      new CleanWebpackPlugin(),
    ],
  });
  ...
  ```

### 5. happypack 加快打包速度

- 1. 下载依赖
  ```
  yarn add -D happypack@5.0.1
  ```
- 2. 配置

  webpack.config.common.js

  ```
  ...
  const os = require('os');
  const HappyPack = require('happypack');
  const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
  ...
  plugins: [
    ...
    new HappyPack({
      id: 'babel', //用id来标识 happypack处理那里类文件
      threadPool: happyThreadPool, //共享进程池
      loaders: [
        {
          loader: 'babel-loader',
        },
      ],
    }),
    ...
  ],
  ...
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['happypack/loader?id=babel'],
        exclude: /node_modules/, //设置node_modules里的js文件不用解析
      },
    ]
  }
  ...
  ```

### 5. polyfill 编译 es6 的新语法

- 1. 下载依赖
  ```
  yarn add -D @babel/polyfill@7.7.0 @babel/plugin-transform-arrow-functions@7.7.4 @babel/preset-es2017@7.0.0-beta.53
  ```
- 2. 配置

  webpack.common.js

  ```
  entry: {
    //配置页面入口
    index: ['@babel/polyfill', './src/index.js'],
  },
  ```

- 3. 测试语法支持

  src/index.js

  ```
  async function f() {
    return 'hello world';
  }
  function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }
  const hw = helloWorldGenerator();
  console.log('Generator>>>>>>', hw.next());
  const arr = [1, 2, 3, 4, 5, 1, 2, 3, 5];
  const setArr = new Set(arr);
  console.log('setArr?>>>>>>', setArr);
  const m = new Map();
  console.log('Map>>>>>>>>', m);
  f().then(v => console.log('async>>>>', v));
  // IE 不支持 Symbol
  const helloSymbol = Symbol('www');
  console.log('Symbol>>>>>>', helloSymbol);
  console.log('flat>>>>>>', [1, [2, [3]]].flat(Infinity));

  console.log('---------------');
  console.log('Promise');
  new Promise(resolve => {
    setTimeout(() => {
      resolve('hello');
    }, 2000);
  }).then(value => {
    console.log(value);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('world');
      }, 2000);
    });
  }).then(value => {
    console.log(`${value} world`);
  });
  console.log('---------------');

  const target = {};
  const handler = {};
  const proxy = new Proxy(target, handler);
  proxy.a = 'b';
  console.log('proxy>>>>>', target.a);
  // 不支持
  // class A {
  // 	static name = 'name';
  // }
  // console.log('static class>>>>>', new A());
  ```

  打包 `yarn build` , 把 dist 文件的 index.html 用 IE 打开验证

## 九、 代码规范- eslint & stylelint

### 1. 添加编辑器配置文件以及插件

vs code 格式化插件 使用的是 `Prettier - Code formatter` 以及 `ESLint`

```
|- .vscode
	|- setting.json
```

setting.json

```
{
  "editor.tabSize": 4,
  "prettier.singleQuote": true,
  "editor.detectIndentation": false,
  "editor.renderControlCharacters": true,
  "editor.renderWhitespace": "all",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "prettier.trailingComma": "es5",
  "emmet.triggerExpansionOnTab": true,
  "javascript.implicitProjectConfig.experimentalDecorators": true,
  "workbench.colorTheme": "Solarized Light",
  "window.zoomLevel": 0,
  "prettier.useTabs": true,
  "editor.foldingStrategy": "indentation",
  "explorer.confirmDelete": false,
  "javascript.updateImportsOnFileMove.enabled": "never",
  "eslint.validate": [
    {
      "language": "javascript",
      "autoFix": true
    },
    {
      "language": "javascriptreact",
      "autoFix": true
    }
  ],
  "eslint.autoFixOnSave": true
}
```

### 2. eslint

- 1. 下载依赖
  ```
  yarn add -D babel-eslint@10.0.3 eslint@6.8.0 eslint-config-airbnb@18.0.1 eslint-config-react-app@5.1.0 eslint-friendly-formatter@4.0.1 eslint-loader@3.0.3 eslint-plugin-flowtype@4.5.3 eslint-plugin-html@6.0.0 eslint-plugin-import@2.19.1s eslint-plugin-jsx-a11y@6.2.3 eslint-plugin-react@7.17.0 autoprefixer@9.7.3
  ```
- 2. webpack 的 eslint 配置

  根目录下新建 .eslintrc.js 文件

  ```
  module.exports = {
    root: true,
    env: {
      browser: true,
      commonjs: true,
      es6: true,
    },
    extends: [
      'airbnb',
    ],
    globals: {
      $: true,
      process: true,
      __dirname: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
      //es6的module模式
      sourceType: 'module',
      ecmaFeatures: {
        experimentalObjectRestSpread: true,
        jsx: true,
      },
      ecmaVersion: 9,
    },
    settings: {
      'import/ignore': ['node_modules', '.s?css', '@w*'],
    },
    // "excludedFiles": "*.test.js",
    plugins: ['react', 'import', 'jsx-a11y'],
    rules: {
      'import/no-unresolved': 0,
      'import/extensions': 0,
      'import/prefer-default-export': 0,

      'react/prop-types': 0,
      'react/jsx-filename-extension': 0,
      'react/prefer-stateless-function': 0,
      'react/jsx-indent': [2, 'tab'],
      'react/jsx-indent-props': [2, 'tab'],
      'react/require-default-props': 0,
      // // @off 同构应用需要在 didMount 里写 setState
      'react/no-did-mount-set-state': 0,

      'jsx-a11y/anchor-is-valid': 0,
      'jsx-a11y/click-events-have-key-events': 0,
      'jsx-a11y/mouse-events-have-key-events': 0,
      'jsx-a11y/no-noninteractive-element-interactions': 0,
      'jsx-a11y/no-static-element-interactions': 0,

      'no-return-assign': 0,
      'no-console': 0,
      // 0、1、2分别表示不开启检查、警告、错误
      indent: [2, 'tab', { SwitchCase: 1 }], // tab缩进
      // 圈复杂度
      complexity: [2, 9],
      'max-params': [2, 7],
      'max-depth': [2, 4],
      'max-len': [
        'error',
        {
          code: 150,
          tabWidth: 4,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      'no-tabs': 0,
      'object-curly-newline': [
        0,
        {
          ObjectExpression: 'always',
          ObjectPattern: { multiline: true },
          ImportDeclaration: 'never',
          ExportDeclaration: {
            multiline: true,
          },
        },
      ],
      'object-curly-spacing': 0,

      'arrow-parens': [2, 'as-needed'],
      // 最大回调层数
      'max-nested-callbacks': [2, 3],
      'no-unused-vars': [
        2,
        {
          argsIgnorePattern: '^React',
          varsIgnorePattern: '[Rr]eact|[Ss]tyle',
        },
      ],
      'no-extra-boolean-cast': 0,
      'array-callback-return': 0,
      'no-param-reassign': 0,
      'jsx-quotes': [0, 'prefer-double'], //强制在JSX属性（jsx-quotes）中一致使用双引号
      'no-underscore-dangle': 0,
      'quote-props': 0,
      // "no-native-reassign": 2,//不能重写native对象
      // // if while function 后面的{必须与if在同一行，java风格。
      // "brace-style": [2, "1tbs", { "allowSingleLine": true }],
      // // 双峰驼命名格式
      // "camelcase": 2,
      // // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
      // "computed-property-spacing": [2,"never"],
      // //允许箭头函数可以省略小括号
      // 'arrow-parens': 0,
      // 'no-extra-semi': 2, // 不允许多余的分号
      // //允许使用async-await函数
      // 'generator-star-spacing': 0,
      // //在开发环境开启debugger功能,生产环境禁止使用debugger
      // 'no-debugger': process.env.NODE_ENV === 'development' ? 0 : 2,
      // "quotes": [2, "single"], //单引号
      // "no-var": 2, //对var警告
      // "semi": ["error", "always"], //不强制使用分号
      // "no-irregular-whitespace": 0, //不规则的空白不允许
      // "no-alert": 2, //禁止使用alert confirm prompt
      // "no-lone-blocks": 0, //禁止不必要的嵌套块
      // "no-class-assign": 2, //禁止给类赋值
      // "no-cond-assign": 2, //禁止在条件表达式中使用赋值语句
      // "no-const-assign": 2, //禁止修改const声明的变量
      // "no-delete-var": 2, //不能对var声明的变量使用delete操作符
      // "no-dupe-keys": 2, //在创建对象字面量时不允许键重复
      // "no-duplicate-case": 2, //switch中的case标签不能重复
      // "no-dupe-args": 2, //函数参数不能重复
      // "no-empty": 2, //块语句中的内容不能为空
      // "no-func-assign": 2, //禁止重复的函数声明
      // "no-invalid-this": 0, //禁止无效的this，只能用在构造器，类，对象字面量
      // "no-redeclare": 2, //禁止重复声明变量
      // "no-spaced-func": 2, //函数调用时 函数名与()之间不能有空格
      // "no-this-before-super": 0, //在调用super()之前不能使用this或super
      // "no-undef": 2, //不能有未定义的变量
      // "no-use-before-define": 2, //未定义前不能使用
      // // "camelcase": 0, //强制驼峰法命名
      // "no-mixed-spaces-and-tabs": 0, //禁止混用tab和空格
      // "prefer-arrow-callback": 0, //比较喜欢箭头回调
      // "arrow-spacing": 0, //=>的前/后括号
      //
      // // 禁止在 componentDidMount 里面使用 setState

      // // 禁止在 componentDidUpdate 里面使用 setState
      // 'react/no-did-update-set-state': 2,
      // // 禁止拼写错误

      // 'react/no-typos': 2,
      // // 禁止使用字符串 ref
      // 'react/no-string-refs': 2,
      // // @fixable 禁止出现 HTML 中的属性，如 class
      // 'react/no-unknown-property': 2,
      // // 禁止出现未使用的 propTypes
      // // @off 不强制要求写 propTypes
      // 'react/no-unused-prop-types': 2,
      // // 出现 jsx 的地方必须 import React
      // // @off 已经在 no-undef 中限制了
      // 'react/react-in-jsx-scope': 0,
      // // 非 required 的 prop 必须有 defaultProps
      // // @off 不强制要求写 propTypes
      // 'react/require-default-props': 0,
      // // render 方法中必须有返回值
      // 'react/require-render-return': 2,
      // // @fixable 组件内没有 children 时，必须使用自闭和写法
      // // @off 没必要限制
      // 'react/self-closing-comp': 0,
      // // style 属性的取值必须是 object
      // 'react/style-prop-object': 2,
      // // HTML 中的自闭和标签禁止有 children
      // 'react/void-dom-elements-no-children': 2,
      // // 数组中的 jsx 必须有 key
      // 'react/jsx-key': 2,
      // // 禁止在 jsx 中使用像注释的字符串
      // 'react/jsx-no-comment-textnodes': 2,
      // // 禁止出现重复的 props
      // 'react/jsx-no-duplicate-props': 2,
      // // 禁止使用未定义的 jsx elemet
      // 'react/jsx-no-undef': 2,
      // // jsx 文件必须 import React
      // 'react/jsx-uses-react': 2,
      // // 定义了的 jsx element 必须使用
      // 'react/jsx-uses-vars': 2,
      // // @fixable 多行的 jsx 必须有括号包起来
      // // @off 没必要限制
      // 'react/jsx-wrap-multilines': 2,
      // "react/no-array-index-key": 2, // 遍历出来的节点必须加key
      // "react/no-children-prop": 2, // 禁止使用children作为prop
      // "react/no-direct-mutation-state": 2, // 禁止直接this.state = 方式修改state 必须使用setState
    },
  };
  ```

  webpack.common.js

  ```
  ...
  module: {
    rules: [
      ...
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')], // 指定检查的目录
        options: {
          // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          formatter: require('eslint-friendly-formatter'), // 指定错误报告的格式规范
        },
      },
    ]
  }
  ...
  ```

  根目录下新建 .eslintignore 文件 用来制定忽略某些文件的 eslint 校验

  ```
  webpack
  ```

### 3. stylelint

- 1. 下载依赖
  ```
  yarn add -D stylelint@12.0.1 stylelint-config-recommended@3.0.0 stylelint-config-standard@19.0.0 stylelint-order@4.0.0 stylelint-webpack-plugin@1.1.2
  ```
- 2. stylelint 配置

  webpack.dev.js

  ```
  const merge = require("webpack-merge");
  const StyleLintPlugin = require("stylelint-webpack-plugin");
  const common = require("./webpack.common.js");
  module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      contentBase: "/src",
      hot: true
    },
    plugins: [
      new StyleLintPlugin({
        fix: true,
        files: ["src/**/*.scss"],
        failOnError: false,
        quiet: true,
        syntax: "scss",
        cache: true
      })
    ]
  });
  ```

  根目录下新建 .stylelintrc.js 文件

  ```
  module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-recommended'],
    plugins: ['stylelint-order'],
    rules: {
      'order/order': [
        // "at-rules",
        // "declarations",
        'custom-properties',
        'dollar-variables',
        'rules',
      ],
      'order/properties-order': [
        'position',
        'z-index',
        'top',
        'bottom',
        'left',
        'right',
        'float',
        'clear',
        'columns',
        'columns-width',
        'columns-count',
        'column-rule',
        'column-rule-width',
        'column-rule-style',
        'column-rule-color',
        'column-fill',
        'column-span',
        'column-gap',
        'display',
        'grid',
        'grid-template-rows',
        'grid-template-columns',
        'grid-template-areas',
        'grid-auto-rows',
        'grid-auto-columns',
        'grid-auto-flow',
        'grid-column-gap',
        'grid-row-gap',
        'grid-template',
        'grid-template-rows',
        'grid-template-columns',
        'grid-template-areas',
        'grid-gap',
        'grid-row-gap',
        'grid-column-gap',
        'grid-area',
        'grid-row-start',
        'grid-row-end',
        'grid-column-start',
        'grid-column-end',
        'grid-column',
        'grid-column-start',
        'grid-column-end',
        'grid-row',
        'grid-row-start',
        'grid-row-end',
        'flex',
        'flex-grow',
        'flex-shrink',
        'flex-basis',
        'flex-flow',
        'flex-direction',
        'flex-wrap',
        'justify-content',
        'align-content',
        'align-items',
        'align-self',
        'order',
        'table-layout',
        'empty-cells',
        'caption-side',
        'border-collapse',
        'border-spacing',
        'list-style',
        'list-style-type',
        'list-style-position',
        'list-style-image',
        'ruby-align',
        'ruby-merge',
        'ruby-position',
        'box-sizing',
        'width',
        'min-width',
        'max-width',
        'height',
        'min-height',
        'max-height',
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',
        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'border',
        'border-width',
        'border-top-width',
        'border-right-width',
        'border-bottom-width',
        'border-left-width',
        'border-style',
        'border-top-style',
        'border-right-style',
        'border-bottom-style',
        'border-left-style',
        'border-color',
        'border-top-color',
        'border-right-color',
        'border-bottom-color',
        'border-left-color',
        'border-image',
        'border-image-source',
        'border-image-slice',
        'border-image-width',
        'border-image-outset',
        'border-image-repeat',
        'border-top',
        'border-top-width',
        'border-top-style',
        'border-top-color',
        'border-top',
        'border-right-width',
        'border-right-style',
        'border-right-color',
        'border-bottom',
        'border-bottom-width',
        'border-bottom-style',
        'border-bottom-color',
        'border-left',
        'border-left-width',
        'border-left-style',
        'border-left-color',
        'border-radius',
        'border-top-right-radius',
        'border-bottom-right-radius',
        'border-bottom-left-radius',
        'border-top-left-radius',
        'outline',
        'outline-width',
        'outline-color',
        'outline-style',
        'outline-offset',
        'overflow',
        'overflow-x',
        'overflow-y',
        'resize',
        'visibility',
        'font',
        'font-style',
        'font-variant',
        'font-weight',
        'font-stretch',
        'font-size',
        'font-family',
        'font-synthesis',
        'font-size-adjust',
        'font-kerning',
        'line-height',
        'text-align',
        'text-align-last',
        'vertical-align',
        'text-overflow',
        'text-justify',
        'text-transform',
        'text-indent',
        'text-emphasis',
        'text-emphasis-style',
        'text-emphasis-color',
        'text-emphasis-position',
        'text-decoration',
        'text-decoration-color',
        'text-decoration-style',
        'text-decoration-line',
        'text-underline-position',
        'text-shadow',
        'white-space',
        'overflow-wrap',
        'word-wrap',
        'word-break',
        'line-break',
        'hyphens',
        'letter-spacing',
        'word-spacing',
        'quotes',
        'tab-size',
        'orphans',
        'writing-mode',
        'text-combine-upright',
        'unicode-bidi',
        'text-orientation',
        'direction',
        'text-rendering',
        'font-feature-settings',
        'font-language-override',
        'image-rendering',
        'image-orientation',
        'image-resolution',
        'shape-image-threshold',
        'shape-outside',
        'shape-margin',
        'color',
        'background',
        'background-image',
        'background-position',
        'background-size',
        'background-repeat',
        'background-origin',
        'background-clip',
        'background-attachment',
        'background-color',
        'background-blend-mode',
        'isolation',
        'clip-path',
        'mask',
        'mask-image',
        'mask-mode',
        'mask-position',
        'mask-size',
        'mask-repeat',
        'mask-origin',
        'mask-clip',
        'mask-composite',
        'mask-type',
        'filter',
        'box-shadow',
        'opacity',
        'transform-style',
        'transform',
        'transform-box',
        'transform-origin',
        'perspective',
        'perspective-origin',
        'backface-visibility',
        'transition',
        'transition-property',
        'transition-duration',
        'transition-timing-function',
        'transition-delay',
        'animation',
        'animation-name',
        'animation-duration',
        'animation-timing-function',
        'animation-delay',
        'animation-iteration-count',
        'animation-direction',
        'animation-fill-mode',
        'animation-play-state',
        'scroll-behavior',
        'scroll-snap-type',
        'scroll-snap-destination',
        'scroll-snap-coordinate',
        'cursor',
        'touch-action',
        'caret-color',
        'ime-mode',
        'object-fit',
        'object-position',
        'content',
        'counter-reset',
        'counter-increment',
        'will-change',
        'pointer-events',
        'all',
        'page-break-before',
        'page-break-after',
        'page-break-inside',
        'widows',
      ],
      indentation: 'tab',
      'color-no-invalid-hex': true,
      'font-family-no-missing-generic-family-keyword': null,
      'font-family-name-quotes': null,
      'function-url-quotes': 'always',
      'at-rule-no-unknown': null,
      'no-eol-whitespace': null,
      'selector-attribute-quotes': 'always',
      'string-quotes': 'single',
      'selector-pseudo-element-colon-notation': null,
      'at-rule-no-vendor-prefix': true,
      'media-feature-name-no-vendor-prefix': null,
      'media-feature-name-no-unknown': null,
      'property-no-vendor-prefix': null,
      'selector-no-vendor-prefix': true,
      'value-no-vendor-prefix': true,
      'selector-pseudo-class-no-unknown': null,
      'shorthand-property-no-redundant-values': null,
      'at-rule-empty-line-before': null,
      'at-rule-name-space-after': null,
      'comment-empty-line-before': null,
      'declaration-bang-space-before': null,
      'declaration-empty-line-before': null,
      'function-comma-newline-after': null,
      'function-name-case': null,
      'function-parentheses-newline-inside': null,
      'function-max-empty-lines': null,
      'function-whitespace-after': null,
      'number-leading-zero': null,
      'number-no-trailing-zeros': null,
      'rule-empty-line-before': null,
      'selector-combinator-space-after': null,
      'selector-list-comma-newline-after': null,
      // "selector-pseudo-element-colon-notation": null,
      'unit-no-unknown': null,
      'no-descending-specificity': null,
      'value-list-max-empty-lines': null,
    },
  };
  ```

## 十、 webpack DLL

> 在用 Webpack 打包的时候，对于一些不经常更新的第三方库，比如 react，lodash，我们并不希望每次打包都去编译他们，所以，应该只打包一次，然后多次使用,于是有了 DLL 的打包

下载依赖：

```
yarn add -D webpack-bundle-analyzer@3.6.0
```

- 1. 新建配置文件

  webpack 文件夹下新建文件 `webpack.dll.config.js`
  webpack.dll.config.js

  ```
  const webpack = require('webpack');
  const library = '[name]_lib';
  const path = require('path');
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  console.log('process.env.NODE_ENV>>>>', process.env.NODE_ENV)
  module.exports = {
    mode: 'production',
    entry: {
      vendors: [
        'react',
        '@babel/polyfill',
        'react-dom',
        'core-js',
        'classnames'
      ],
    },
    output: {
      filename: '[name].dll.js',
      path: path.resolve(__dirname, './../ools'),
      library,
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.join(__dirname, './../tools/[name]-manifest.json'),
        name: library,
      }),
      new BundleAnalyzerPlugin(),
    ],
  };
  ```

* 2 webpack.common.js 中配置
  ```
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./tools/vendors-manifest.json'),
    }),
  ]
  ```
* 3. 新建 dll 脚本命令
  ```
  "scripts": {
    ...
    "dll": "cross-env NODE_ENV=production webpack --config webpack/webpack.dll.config.js",
    ...
  },
  ```

执行 `yarn dll` 会在 tools 文件夹下生成对应的 dll 文件： `vendors-manifest.json` 和 `vendors.dll.js`,同时会自动打开浏览器查看到对应文件大小
