# 前提条件
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

## 三、添加 React 

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
+ webpack配置文件中
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
+ 添加babel配置文件
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




