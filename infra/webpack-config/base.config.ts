import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import 'webpack-dev-server';
import CopyPlugin from 'copy-webpack-plugin';

const config: Configuration = {
    mode: (process.env.NODE_ENV || 'development') as Configuration['mode'] ,
    entry: 'pages/home/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json', '.jpeg', '.jpg', '.png', '.gif', '.svg'],
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
                    limit: 8192,
                    name: '[path][name].[hash:8].[ext]',
                    outputPath: 'assets/',
                    publicPath: '/assets/',
                    esModule: false,
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
        new CopyPlugin({
            patterns: [
                { from: '../../public/assets', to: 'assets' }, // 将 public 文件夹复制到 dist/public 目录下
            ],
        }),
    ]
};

export default config;
