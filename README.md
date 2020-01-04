# 从零开始的 webpack4
## 前提条件
安装 node.js
当前 node.js 版本 ：v12.13.1
当前 npm 版本 ： 6.12.1
## 一、 简易打包

### 1.初始化项目 & 创建项目
```
mkdir webpack4-react && cd webpack4-react
npm init -y
```
### 2.安装webpack & webpack的cli
当前 webpack 版本：4.41.5
当前 webpack-cli 版本：3.3.10
```
npm install --save-dev webpack webpack-cli
```
或
```
yarn add webpack webpack-cli --dev
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
### 3.下载lodash依赖
```
npm install --save lodash
```
或
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
此时在 __dist__ 文件夹下已经生成一个 __main.js__ 文件
在浏览器中打开 dist下的index.html，如果一切访问都正常，你应该能看到以下文本：'Hello webpack'。

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
  entry: './src/index.js',
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

### 2. 添加NPM 脚本
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
npm run build
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
同样的, dist 文件夹下生成bundle.js文件

这样就实现了基本的webpack构建了

## 三、集成 React 

### 1. 下载 react 和 react-dom
`npm install --save-dev react react-dom`

### 2. 下载babel(编译js、jsx，es6等)
`npm install --save-dev @babel/cli @babel/core @babel/preset-react @babel/preset-env @babel/plugin-transform-runtime babel-loader`

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
> 为了使用babel解析 jsx
+ 1. webpack配置文件中
webpack.config.js
```
...
entry: './src/index.js',
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
+ 2. 添加babel配置文件
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
执行 npm run build
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

在浏览器中打开 dist下的index.html，如果一切访问都正常，你应该能看到以下文本：'Hello React'。

## 四、建立开发环境
### 1. webpack-dev-server
+ 1. 下载依赖
    ```
    npm install --save-dev webpack-dev-server
    ```
+ 2. webpack 配置文件中配置 webpack-dev-server
    webpack.config.js
    ```
    ...
    entry: './src/index.js',
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
+ 1. 下载依赖
    ```
    npm install --save-dev html-webpack-plugin
    ```
+ 2. webpack 配置文件中配置 webpack-dev-server
    webpack.config.js
    ```
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
### 4.执行脚本命令 `npm run dev`

> 执行 `npm run dev` 后会自动打开浏览器，此时修改 index.js 文件中内容，浏览器会实时更新

删除dist文件夹
> 执行 npm run build 打包依旧会在dist下生成打包文件

## 五、资源管理
### 1. 加载 CSS
> 为了从 JavaScript 模块中 import 一个 CSS 文件，你需要在 module 配置中 安装并添加 style-loader 和 css-loader：
+ 1. 下载 style-loader css-loader
    ```
    npm install --save-dev style-loader css-loader
    ```
+ 2. webpack.config.js 中配置 css 的 loader
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
+ 3. src/index.js 中引入css
    ```
    import './style/reset.css';
    ```
    执行 `npm run dev` ,会看到 reset.css 中的样式已经生效

### 2. CSS 预处理器 & 模块化 & 兼容性处理
+ 1. 下载依赖
    ```
    npm install --save-dev autoprefixer postcss-loader
    npm install --save-dev less-loader node-sass sass sass-loader
    ```
    > 这个过程中安装 node-sass 可能会很慢, 耐心等待
+ 2. 创建React组件
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
+ 3. 引入组件
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
+ 4. 新增 CSS 相关的 webpack 配置
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
+ 5. 新增 postcss-loader 配置文件
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

> 这时候执行 `npm run dev` 命令会报错，因为缺少一些babel依赖，下载一下就好了
```
npm install --save @babel/runtime core-js
```
执行 `npm run dev` ,自动打开浏览器，css 相关的配置构建完成

### 3. 图片处理
+ 1. 下载依赖
    ```
    npm install --save-dev file-loader url-loader
    ```
+ 2. webpack配置中添加规则
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
+ 3. React 组件中 引入图片
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
> 举个🌰

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

此时 执行 `npm run dev` 查看
