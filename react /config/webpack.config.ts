import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack'
import 'webpack-dev-server';

import baseConfig from '../../infra/webpack-config/base.config';
import merge from 'webpack-merge';

const config: Configuration = merge(baseConfig, {
  mode: 'development',
  entry: 'pages/home/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
});


console.log(config, 'react config');

export default config;