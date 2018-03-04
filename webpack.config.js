// http://geezhawk.github.io/using-react-with-django-rest-framework

let path = require('path')
let webpack = require('webpack')
let BundlerTracker = require('webpack-bundle-tracker')

module.exports = {
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
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    }
}