module.exports = {
    extends: [
        '../.eslintrc.js',
        'plugin:react/recommended', // 如果使用 React
    ],
    settings: {
        react: {
            version: 'detect', // 自动检测 React 版本
        },
    }
};