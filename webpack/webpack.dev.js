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
