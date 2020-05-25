const merge = require("webpack-merge");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const common = require("./webpack.common.js");
module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		contentBase: "/dist",
		port: 8082,
		hot: true,
		proxy: {
			"/api": {
				target: "http://localhost:8090",
				// pathRewrite: { "^/api": "/aaa" },
				changeOrigin: true, // target是域名的话，需要这个参数，
				secure: false // 设置支持https协议的代理
			}
		}
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
