const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
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
  },
};