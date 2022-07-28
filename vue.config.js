const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // 更换ip
    host: '127.0.0.1',

    // 更换端口号
    port: 8080,

    // 代理访问
    
  }

})
