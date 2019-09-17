const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
}

const commonConfig = merge([{
        entry: { 
            app: PATHS.app,
        },
        output: {
            path: PATHS.build,
            filename: '[name].js',
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack demo',
            }),
        ]
    }
]);

const productionConfig = merge([
    parts.extractCSS(),
]);

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
    }),
    parts.lintTypescript({
        options:  {
            emitErrors: true
        }
    }),
    parts.loadTypescript(),
    parts.loadCSS(),
]);


module.exports = (env) => {
    console.log('env', env);
    if(env === 'production') {
        return merge(commonConfig, productionConfig);
    } 
    return merge(commonConfig, developmentConfig);
}

