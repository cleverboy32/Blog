import path from 'path';
import { Configuration } from 'webpack';
import 'webpack-dev-server';

import baseConfig from '../../../infra/webpack-config/base.config';
import merge from 'webpack-merge';

const config: Configuration = merge(baseConfig, {
    mode: process.env.NODE_ENV as Configuration['mode'],
    entry: 'pages/app.tsx',
    resolve: {
        alias: {
            components: path.resolve(__dirname, '../src/components/'),
            pages: path.resolve(__dirname, '../src/pages/'),
            utils: path.resolve(__dirname, '../src/utils/'),
            constant: path.resolve(__dirname, '../src/constant/'),
        },
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
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
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            auto: (resourcePath: string) => (/\.module/).test(resourcePath),
                            localIdentName: '[local]--[hash:base64:5]',
                        }
                    }
                }],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // 将样式添加到 DOM
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                auto: (resourcePath: string) => (/\.module/).test(resourcePath),
                                localIdentName: '[local]--[hash:base64:5]',
                            }
                        }
                    },
                    'sass-loader', // 编译 Sass 到 CSS
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
