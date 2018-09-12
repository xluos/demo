const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const path = require('path');
const config = require('config-lite')(__dirname);
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // 热模块替换
    hot: true,
    // 文件目录
    contentBase: path.join(__dirname, "dist"),
    // 服务端口
    port: config.port,
    // 代理设置
    proxy: config.Proxy
  },
  plugins: [
    // 热替换相关插件
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        // 匹配 css 文件
        test: /\.css$/,

        /*
        先使用 css-loader 处理，返回的结果交给 style-loader 处理。
        css-loader 将 css 内容存为 js 字符串，并且会把 background, @font-face 等引用的图片，
        字体文件交给指定的 loader 打包，类似上面的 html-loader, 用什么 loader 同样在 loaders 对象中定义，等会下面就会看到。
        */
        use: ['style-loader', 'css-loader']
      }
    ]
  }
});