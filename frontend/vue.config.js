const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.API_PROXY_URL,
        changeOrigin: true
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: [
        path.resolve(__dirname, 'src/style/main.sass')
      ]
    }
  }
}
