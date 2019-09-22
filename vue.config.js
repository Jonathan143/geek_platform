const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const isDevelopment = process.env.NODE_ENV !== 'production'
const isAnalyzer = process.env.npm_lifecycle_event === 'analyzer'

const path = require('path')
const resolve = function(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: isDevelopment ? '/' : '',
  lintOnSave: true, // 是否开启eslint保存检测
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  devServer: {
    hot: true,
    open: true,
    compress: true,
    port: 8666
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('views', resolve('src/views'))
      .set('api', resolve('src/api'))
    config.optimization.runtimeChunk('single')
  },
  configureWebpack: () => {
    const customConfig = {
      //警告 webpack 的性能提示
      performance: {
        hints: 'warning',
        //入口起点的最大体积
        maxEntrypointSize: 50000000,
        //生成文件的最大体积
        maxAssetSize: 30000000,
        //只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
          return assetFilename.endsWith('.js')
        }
      },
      plugins: [
        new webpack.BannerPlugin({
          banner: `Builder: Jonathan143\nBuild time: ${new Date()}`
        }),
        new webpack.ProvidePlugin({
          moment: 'moment',
          Cookies: 'js-cookie'
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
      ]
    }
    if (isAnalyzer) customConfig.plugins.push(new BundleAnalyzerPlugin())
    return customConfig
  }
}
