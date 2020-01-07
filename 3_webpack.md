##一、happypack配置
>在使用 Webpack 对项目进行构建时，会对大量文件进行解析和处理。当文件数量变多之后，Webpack 构件速度就会变慢。由于运行在 Node.js 之上的 Webpack 是单线程模型的，所以 Webpack 需要处理的任务要一个一个进行操作。
>而 Happypack 的作用就是将文件解析任务分解成多个子进程并发执行。子进程处理完任务后再将结果发送给主进程。所以可以大大提升 Webpack 的项目构件速度
>在测试 Demo 或者小型项目中，使用 happypack 对项目构建速度的提升不明显，甚至会增加项目的构建速度
>在比较复杂的大中型项目中，使用 happypack 才能看到比较明显的构建速度提升
>因此，在使用 happypack 时请根据具体情况进行选择，如果反而延长了项目的构建速度，就没有必要使用 
####1.下载依赖：
`npm install -D happypack`
####2.在 _webpack.config.js_ 中引入
> _os_ 模块是 _node_ 模块提供了一些基本的系统操作函数。例如：_os.cpus()_ 返回一个对象数组，包含所安装的每个 CPU/内核的信息：型号、速度（单位 MHz）、时间（一个包含 user、nice、sys、idle 和 irq 所使用 CPU/内核毫秒数的对象）
>_HappyPack.ThreadPool_ 利用 _os_ 模块获取的的操作系统的 _cpu_ 数量分成多个子进程
```
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
```
####2.在 _webpack.config.js_ 中使用
> happypack 在配置中需要结合 _babel_ 使用
```
module.exports = {
  plugins: [
    new HappyPack({
      id: 'babel', //用id来标识 happypack处理那里类文件， 同样可以处理css样式
      threadPool: happyThreadPool, //共享进程池
      loaders: [
        {
          loader: 'babel-loader',
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['happypack/loader?id=babel'],
        exclude: /node_modules/,
      }
    ]
  }
};
```

##二、babel配置参数提取
+ 1.babel配置参数从webpack配置 的 _module.rules_ 中提取出来,再根目录中新建一个 _.babelrc_ 文件,文件配置内容如下：

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
+ 2.babel编译es6语法
+ 下载相关依赖
`npm install -S @babel/polyfill @babel/runtime core-js`
>_polyfill_ 在webpack入口中配置，也可以直接在入口文件中 _import_
```
module.exports = {
  entry: {
    //配置页面入口
    index: ['@babel/polyfill', './src/index.js'],
	},
}
```
执行： npm run build 依旧打包完好，如果代码中用了es等一些语法会发现已经被编译成es5的语法

##三、webpack 配置拆分 开发环境&生产环境
+ 1.下载相关依赖
`npm install -D webpack-merge webpack-dev-server`
> webpack-merge 用于合并webpack配置，webpack-dev-server 用于开发环境热部署，代理等等
+ 2.拆分
>在根目录新建webpack文件夹，里面新建三个配置文件
```
webpack
  -webpack.config.common.js
  -webpack.config.dev.js
  -webpack.config.production.js
```
+ 3.webpack.config.dev.js
```
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: '/src',
    hot: true,
  }
});
```
+ 4.webpack.config.production.js
```
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // 用来缩小（压缩优化）js文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.config.common.js');
module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new CleanWebpackPlugin(),
  ],
});
```
+ 5.webpack.config.common.js
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: {
    //配置页面入口
    index: ['@babel/polyfill', './src/index.js'],
  },
  output: {
    //配置输出选项
    path: path.resolve(__dirname, '../dist'), //输出路径为，当前路径下
    filename: '[name].[hash:5].js', //输出后的文件名称
  },
  resolve: {
    // 设置模块导入规则，import/require时会直接在这些目录找文件
    modules: ['node_modules'],
    // import导入时省略后缀
    extensions: ['.js', '.jsx', '.scss', '.less', '.css', '.json'],
  },
  plugins: [
    new HappyPack({
      id: 'babel', //用id来标识 happypack处理那里类文件
      threadPool: happyThreadPool, //共享进程池
      loaders: [
        {
          loader: 'babel-loader',
        },
      ],
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
        use: ['happypack/loader?id=babel'],
        exclude: /node_modules/, //设置node_modules里的js文件不用解析
      },
    ],
  },
};
```
+ 5.package.json 执行命令修改
```
{
  "name": "webpack4",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "dev": "webpack-dev-server --open --mode=development --config webpack/webpack.config.dev.js",
    "build": "webpack --mode=production --config webpack/webpack.config.production.js",
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
    "happypack": "^5.0.1",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "uglifyjs-webpack-plugin": "^2.2.0",
    "webpack": "^4.39.2",
    "webpack-cli": "^3.3.7",
    "webpack-dev-server": "^3.8.0",
    "webpack-merge": "^4.2.1"
  },
  "dependencies": {
    "@babel/polyfill": "^7.4.4",
    "@babel/runtime": "^7.5.5",
    "core-js": "^3.2.1",
    "react": "^16.9.0",
    "react-dom": "^16.9.0"
  }
}
```
此时执行： npm run dev 会自动打开页面，如果修改src中文件内容，会实时更新
若执行 npm run build ，在根目录等build中会生成打包文件

##四、css/scss 样式打包及css模块化
+ 1.下载相关依赖
```
npm install -D css-loader less-loader node-sass sass sass-loader style-loader
```
+ 2. 处理css的loader配置
> webpack 目录下新建utils
```
webpack
  |-tools
    |-utils.js
  |-webpack.config.common.js
  |-webpack.config.dev.js
  |-webpack.config.production.js
```
utils.js
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
  },
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
  sassLoader,
  lessLoader,
};
// css 配置
```
> 在webpack配置中引入使用
```
const utils = require('./tools/utils');
const {
  styleLoader,
  sassLoader,
  lessLoader,
  cssLoader,
} = utils.loadersConfig;
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [styleLoader, cssLoader],
      },
      {
        test: /\.scss$/,
        include: [/pages/, /components/, /style/],
        use: [styleLoader, cssLoader, sassLoader],
      },
    ]
  }
}
```
+ 3.浏览器兼容样式处理 postcss
`npm install -D postcss postcss-loader autoprefixer`
>在utils中添加postcss
```
// ...
const postCssLoader = {
  loader: 'postcss-loader',
};
// ... 
exports.loadersConfig = {
  styleLoader,
  cssLoader,
  postCssLoader,
  sassLoader,
};
```
>webpack配置中添加postcss
```
const {
  postCssLoader,
  styleLoader,
  sassLoader,
  cssLoader,
} = utils.loadersConfig;
// ...
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
// ...
```
>在根目录新建 _postcss.config.js_ 配置文件
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
  plugins: [require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })],
};
```

##五、图片等文件处理
+ 1.下载相关依赖
`npm install -D url-loader file-loader`
+ 2. 处理css的loader配置
```
// ...
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        name: '[path][name].[ext]',
        limit: 1024 * 10,
        fallback: 'file-loader',
      },
    },
  ],
},
{
  test: /\.(woff|woff2|eot|ttf|otf)$/, //字体处理
  use: ['url-loader'],
},
// ...
```
##六、添加react组件，demo优化
+ 1.在src中新建目录及其文件
```
src
  |- components
    |- Count
      -Count.jsx
      -style.scss
    |- Date
      -Date.jsx
      -style.scss
  |- images
    -react.png
  |- pages
    |-Home
      index.jsx
  |- style
```
+ 2.index.js 文件中
```
import React from 'react';
import ReactDom from 'react-dom';
import Home from '@pages/Home/index';
import './style/reset.scss';

ReactDom.render(
  <div>
    <Home />
  </div>,
  document.getElementById('app')
);
```
+ 3.pages/Home/index.jsx 文件中
```
import React from 'react';
import Date from '@components/Date/Date';
import Count from '@components/Count/Count';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  addCount() {
    const { count } = this.state;
    this.setState({
      count: count + 1,
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <Date />
        <Count addCount={() => this.addCount()} count={count} />
      </div>
    );
  }
}
export default Home;
```
+ 4.components/Count/Count.jsx 文件中
```
import React from 'react';
import style from './style.scss';

class Count extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const { addCount, count } = this.props;
    return (
      <div className={style.box}>
        <span onClick={addCount} className={style.btn}>ADD</span>
        <span>{count}</span>
      </div>
    );
  }
}
export default Count;

```
+ 5.components/Count/style.scss 文件中
```
.box {
  display: flex;
  text-align: center;
}
.btn {
  width: 40px;
  height: 25px;
  margin-right: 10px;
  border: 1px solid #797979;
  border-radius: 5px;
  line-height: 20px;
  text-align: center;
}

```
+ 6.components/Date/Date.jsx 文件中
```
import React from 'react';
import reactLogo from '@images/react.png';
import style from './style.scss';

class DateComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      arr: [1, 2, 3, 45, 4],
    };
  }

  componentDidMount() {
    const {arr} = this.state;
    console.log(...arr);
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
    const { date, arr } = this.state;
    const arrStr = [...arr];
    const str = arrStr.join();
    return (
      <div>
        <div className={style.title}>时间</div>
        <div className={style.logo_box}>
        </div>
        <div className={style.react} />
        <div>{str}</div>
        <div className={style.title}>
          {date.toLocaleTimeString()}
        </div>
      </div>
    );
  }
}
export default DateComponent;
```
+ 7.components/Date/style.scss 文件中
```
.title {
  height: 50px;
  font: bold 20px '微软雅黑';
  text-align: center;
  color: #000;
}
.react {
  width: 100%;
  height: 35px;
  background: url('../../images/react.png');
}
.logo_box {
  background: #797979;
}
.logo {
  width: 300px;
  height: 55px;
}
```


 
