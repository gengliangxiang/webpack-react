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
