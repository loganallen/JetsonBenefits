// http://geezhawk.github.io/using-react-with-django-rest-framework

const path = require('path')
const webpack = require('webpack')
const BundlerTracker = require('webpack-bundle-tracker')

const config = {
    context: __dirname,
    entry: './assets/js/index',
    output: {
        path: path.resolve('./assets/bundles/'),
        filename: '[name]-[hash].js'       
    },
    plugins: [
        new BundlerTracker({filename: './webpack-stats.json'}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
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
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx']
    }
};

module.exports = config