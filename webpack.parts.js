const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

exports.devServer = ({host, port} = {}) => ({
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only',
        host,
        port,
        overlay: {
            errors: true,
            warnings: true
        }
    }
});

exports.lintTypescript = ({options}) => ({
    module: {
        rules: [{
            test: /\.ts$/,
            enforce: 'pre',
            use: [
                {
                    loader: 'tslint-loader',
                    options
                }
            ]
        }
    ]
    }
});

exports.loadTypescript = () => ({
    module: {
        rules: [{ 
            test: /\.ts?$/, 
            loader: "ts-loader" },
    ]
    }
});


exports.loadCSS = ({include, exclude} = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: ['style-loader', 'css-loader'],
            }
        ]
    }
});

exports.extractCSS = () => {
    return {
        plugins: [
            new MiniCssExtractPlugin({
              // Options similar to the same options in webpackOptions.output
              // both options are optional
              filename: devMode ? '[name].css' : '[name].[hash].css',
              chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            }),
          ],
          module: {
            rules: [
              {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // hmr: process.env.NODE_ENV === 'development',
                    },
                  },
                  'css-loader',
                  'postcss-loader'
                ],
              },
            ],
          },
    };
}
