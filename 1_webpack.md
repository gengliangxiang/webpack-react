##一、安装
#####1.创建一个目录，初始化 npm

```
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