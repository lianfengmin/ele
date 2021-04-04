module.exports = {
    //指定不同的环境模式 不同的入口文件 
    chainWebpack: config => {
        //生产模式
        config.when(process.env.NODE_ENV === `production`,
            config => {
                config.entry(`app`)
                    .clear()
                    .add(`./src/main-prod.js`)

                config.set('externals', {//配置生产环境时  根据这里配置的资源名字
                    // 从html首页的link地址加载需要的资源 
                    // 以减小项目打包体积 此时对应的入口js中引入的包或样式可以省掉
                    vue: 'Vue',
                    'vue-router': 'VueRouter',
                    axios: 'axios',
                    echarts: 'echarts',
                    nprogress: 'NProgress',
                    'vue-quill-editor': 'VueQuillEditor',
                })
                //根据args[0].isProd的值配置html文件的头部信息文字
                config.plugin(`html`).tap(args => {
                    args[0].isProd = true
                    return args
                })
            })
        //开发模式
        config.when(process.env.NODE_ENV === `development`,
            config => {
                config.entry(`app`)
                    .clear()
                    .add(`./src/main-dev.js`)

                config.plugin(`html`).tap(args => {
                    args[0].isProd = false
                    return args
                })
            })

    }


}