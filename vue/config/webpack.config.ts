import markdown from './markdown-util';
import baseConfig from '../../infra/webpack-config/base.config';
import merge from 'webpack-merge';
import type { Configuration } from 'webpack';
import path from 'path';
import { VueLoaderPlugin } from 'vue-loader';


const config: Configuration = merge(baseConfig, {
    entry: {
        app: path.resolve(__dirname, '../src/pages/main.ts')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
          "components": path.resolve(__dirname, "../src/components/"),
          "pages": path.resolve(__dirname, "../src/pages/"),
          "utils": path.resolve(__dirname, "../src/utils/"),
        }
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                  'vue-loader',
                  {
                    loader: 'markdown-to-vue-loader',
                    options: {
                        preset: 'markdown-it',
                        markdown: markdown
                    },
                  },
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.less$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'less-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  'css-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true,
                },
                exclude: /node_modules/,
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: { 
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true,
                }
            }
        ]
    },
    plugins: [ 
        new VueLoaderPlugin()
    ],
    devServer: {
        historyApiFallback: {
            index: '/index.html' 
        }
    }
});

export default config;