const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'example/dist'),
    port: 9000
  },
  entry: path.resolve(__dirname, 'example/src/index.ts'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'example/dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // 将指定的 html 文件生成一个新的 html 文件
    new HtmlWebpackPlugin({
      template: 'example/public/index.html'
    }),
    new CleanWebpackPlugin()
  ]
};
