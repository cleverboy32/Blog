import path from 'path';
import { Configuration } from 'webpack';
import 'webpack-dev-server';

import baseConfig from '../../infra/webpack-config/base.config';
import merge from 'webpack-merge';

const config: Configuration = merge(baseConfig, {
    entry: 'pages/app.tsx',
    resolve: {
        alias: {
            components: path.resolve(__dirname, '../src/components/'),
            pages: path.resolve(__dirname, '../src/pages/'),
            utils: path.resolve(__dirname, '../src/utils/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: path.resolve(__dirname, '../tsconfig.json'),
                },
            },
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // 将样式添加到 DOM
                    'css-loader', // 解析 CSS
                    'sass-loader', // 编译 Sass 到 CSS
                ],
            },
            {
                test: /\.module\.scss$/, // 只对以 .module.scss 结尾的文件启用 CSS Modules
                use: [
                    'style-loader', // 将样式添加到 DOM
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]', // 命名方式
                            },
                        },
                    },
                    'sass-loader', // 编译 SCSS 到 CSS
                ],
            },
            {
                test: /\.md$/,
                use: [
                  {
                    loader: "raw-loader",
                  },
                ],
            },
        ],
    },
    devtool: 'inline-source-map',
});

export default config;
