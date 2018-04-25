const path = require("path");
const htmlPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
// 启动环境所存的变量全部存在于 process.env里面
const isDev = process.env.NODE_ENV === 'development';
const config = {
    target: 'web',
    entry: path.join(__dirname, "src/index.js"),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            //定义后可以在js中进行引用
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new htmlPlugin()
    ]
}


// 配置环境 安装cross-env 为了解决环境变量的问题 
// Windows 需要 set NODE_ENV= production 所以使用这个包统一
// //"scripts": {
//     "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
//     "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
// },


if (isDev) {
    //w2后才添加的 0.0.0.0  便于访问  可以是localhost
    config.devTools = '#'
    config.devServer = {
        'port': '8899',
        'host': '0.0.0.0',
        overlay: {
            errors: true
        }, //类似路由重定向
        historyFailback: {

        },
        open: true,
        hot: true //需要新增下面plugins
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config;