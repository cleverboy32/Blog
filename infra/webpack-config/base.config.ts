import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import 'webpack-dev-server';

const config: Configuration = {
    mode: (process.env.NODE_ENV || 'development') as Configuration['mode'] ,
    entry: 'pages/home/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
        // publicPath: 'https://github.com/cleverboy32/Blog/blob/gh-pages/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
        alias: {
          'assets': path.resolve(__dirname, '../../public/assets/'),
          'blogs': path.resolve(__dirname, '../../blogs/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                type: 'json',
            },
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[path][name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[path][name].[hash:8].[ext]',
                },
            },
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../../public/index.html'),
        }),
    ]
};

export default config;
