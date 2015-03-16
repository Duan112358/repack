var webpack = require('webpack');

module.exports = {
    entry: {
        app: './js/app'
    },
    output: {
        path: 'static/js/',
        filename: 'app.js',
        publicPath: '.'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.js$/,
            loader: 'jsx?harmony',
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.(png|jpg|svg)$/,
            loader: 'url?limit=102400'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.less', '.css']
    },
    externals: {
        react: 'React'
    }
};
