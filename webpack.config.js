// http://geezhawk.github.io/using-react-with-django-rest-framework

const path = require('path')
const webpack = require('webpack')
const BundlerTracker = require('webpack-bundle-tracker')

const config = {
    context: __dirname,
    entry: {
        // add js modules here
        index: './assets/js/index'
    },
    output: {
        path: path.resolve('./static/js/'),
        filename: '[name].bundle.min.js'
    },
    plugins: [
        new BundlerTracker({filename: './webpack-stats.json'}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        // common holds all the common js code -- should be included on all pages
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        })
    ],
    module: {
        rules: [
            {
                test:  /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx']
    }
};

module.exports = config
