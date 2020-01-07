##一、环境变量 _process.env.NODE_ENV_
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
    "dev": "cross-env NODE_ENV=development webpack --config webpack/webpack.config.js"
    "build": "cross-env NODE_ENV=production webpack --config webpack/webpack.config.js"
  }
}
```
##二、提取css
+ 1.安装相关依赖
`npm i -D mini-css-extract-plugin@0.8.0`
+ 2.在webpack中引入及使用
> 引入 _mini-css-extract-plugin_，在webpack的plugins中添加根据环境变量 _devMode_ 不同做不同处理
```
// ...
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
// ...
module.exports = {
  plugins:[
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name]_[hash:5].css',
      chunkFilename: devMode ? '[id].css' : '[id]_[hash:5].css',
      disable: false, //是否禁用此插件
      allChunks: true,
    }),
  ]
};
```
> 在webpack的module中添加根据环境变量 _devMode_ 不同做不同处理
```
module.exports = {
  module:{
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          devMode ? styleLoader : MiniCssExtractPlugin.loader,
          cssLoader,
          postCssLoader,
        ],
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
    ]
  }
};
```
+ 3.执行 _npm run build_ 在dist文件夹中生产打包文件会比之前多出1个css文件和一个css.map文件，css抽离成功

##三、提取公共模块
> 有些模块会被重复使用，这样在打包时也会被重复打包，导致最后的代码包有多余代码，webpack自身提供了避免打包重复模块的方案。
> 在webpack3.x中使用的是 _webpack.optimize.CommonsChunkPlugin_,在webpack4.x中已经被废弃，添加了一个新的处理方式 _webpack.optimization_
```
module.exports = {
    optimization: {
      splitChunks: {
        chunks: 'async', //默认作用于异步chunk，值为all/initial/async/function(chunk),值为function时第一个参数为遍历所有入口chunk时的chunk模块，chunk._modules为chunk所有依赖的模块，通过chunk的名字和所有依赖模块的resource可以自由配置,会抽取所有满足条件chunk的公有模块，以及模块的所有依赖模块，包括css
        minSize: 30000, //表示在压缩前的最小模块大小,默认值是30kb
        minChunks: 1, // 表示被引用次数，默认为1；
        maxAsyncRequests: 5, //所有异步请求不得超过5个
        maxInitialRequests: 3, //初始话并行请求不得超过3个
        automaticNameDelimiter: '~', //名称分隔符，默认是~
        name: true, //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔
        cacheGroups: {
          //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
          common: {
            name: 'common', //抽取的chunk的名字
            chunks: "initial",
            chunks(chunk) {
              //同外层的参数配置，覆盖外层的chunks，以chunk为维度进行抽取
            },
            test(module, chunks) {
              //可以为字符串，正则表达式，函数，以module为维度进行抽取，只要是满足条件的module都会被抽取到该common的chunk中，为函数时第一个参数是遍历到的每一个模块，第二个参数是每一个引用到该模块的chunks数组。
            },
            priority: 10, //优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
            minChunks: 2, //最少被几个chunk引用
            reuseExistingChunk: true, //  如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
            enforce: true, // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
          },
        },
      },
    },
}
```
##四、添加eslint
+ 1. 下载相关依赖
```
npm i -D eslint@6.2.2 eslint-config-airbnb@18.0.1 eslint-config-react-app@5.0.1 eslint-friendly-formatter@4.0.1 eslint-loader@3.0.0 eslint-plugin-flowtype@4.2.0 eslint-plugin-html@6.0.0 eslint-plugin-import@2.18.2 eslint-plugin-jsx-a11y@6.2.3 eslint-plugin-react@7.14.3 pre-commit@1.2.2 babel-eslint@8.2.2
```
+ 2. eslint配置文件
> 在根目录中新建 _.eslintrc.js_、_.eslintignore_、_.editorconfig_ 三个配置文件
eslintrc.js 文件
```
module.exports = {
	root: true,
	env: {
		browser: true,
		commonjs: true,
		es6: true,
	},
	extends: [
		// "eslint:recommended",
		// "plugin:react/recommended"
		'airbnb',
	],
	// extends: "eslint:recommended",
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
		'quote-props': 0,setState
	},
};
```
.eslintignore 文件
```
webpack
```
.editorconfig 文件
```
# http://editorconfig.org
root = true

[*]
indent_style = tab
indent_size = 4
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab

```
##五、添加stylelint
+ 1. 下载相关依赖
```
npm i -D stylelint stylelint-config-recommended stylelint-config-standard stylelint-order stylelint-webpack-plugin
```



