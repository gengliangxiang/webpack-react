const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const utils = require('./tools/utils.js');
const {
	postCssLoader,
	styleLoader,
	sassLoader,
	cssLoader,
} = utils.loadersConfig;

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