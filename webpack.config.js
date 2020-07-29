const path = require('path')
const Webpack = require('webpack')
const htmlPlugin = require('html-webpack-plugin') // 下载的包

const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制静态文件的包

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        exclude: /node_modules/ // 打包时排除依赖包排除
      },
      {
        test: /\.(jpg|png|jpeg|bmp|gif)$/,
        loader: ['url-loader?limit=5124&name=./dist/images/[name].[ext][hash]']
      },
      {
        test: /\.(jpg|png|jpeg|bmp|gif)$/,
        loader: ['file-loader?name=./dist/assets/images/[name].[ext][hash]']
      },
      {
        test: /\.(ttf|woff|woff2|eot|svg)$/,
        loader: ['file-loader?name=./dist/fonts/[name].[ext][hash]']
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    noInfo: true,
    // 设置反向代理
    proxy: {
      '/api/*': {
        target: 'http://api.botue.com',
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/api': '/' }
      }
    }
  },

  plugins: [
    new htmlPlugin({
      // 默认复制到 output.path所指定的路径
      template: './src/index.html', // 指定复制的html
      filename: 'index.html', // 指定复制后的html名字
      minify: { collapseWhitespace: true } // 压缩
    }),
    new CopyWebpackPlugin([{
      from: './src/assets',
      to: './assets' // 复制到dist/assets
    }])
  ]
}
// 环境变量为 production时 就使用压缩插件进行压缩
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new Webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ])
}