const path = require('path');
const os = require('os');
const webpack = require('webpack');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const devMode = process.env.NODE_ENV !== 'production';

const utils = require('./../tools/utils');
const { postCssLoader, styleLoader, sassLoader, cssLoader } = utils.loadersConfig;

module.exports = {
	entry: {
		//配置页面入口
		index: ['./src/index.js'],
	},
	output: {
		//配置输出选项
		path: path.resolve(__dirname, '../dist'), //输出路径为，当前路径下
		filename: '[name].[hash:5].js', //输出后的文件名称
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
					chunks: 'initial',
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
	plugins: [
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name]_[hash:5].css',
			chunkFilename: devMode ? '[id].css' : '[id]_[hash:5].css',
			disable: false, //是否禁用此插件
			allChunks: true,
        }),
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
	],
	module: {
		rules: [
			{
				test: /\.html$/,
				use: 'html-loader',
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [styleLoader, cssLoader, postCssLoader],
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
