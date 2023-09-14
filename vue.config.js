const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
  ? '/dist/'
  : '/',
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'RAGIL KUNING',
    },
  },
  devServer: {
    proxy: 'https://192.168.99.100:4000'
  },
})
