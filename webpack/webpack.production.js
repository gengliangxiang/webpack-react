const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin"); // 用来缩小（压缩优化）js文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const common = require("./webpack.common.js");
module.exports = merge(common, {
	mode: "production",
	devtool: "source-map",
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true
		}),
		new CleanWebpackPlugin()
	]
});
