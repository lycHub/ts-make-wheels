const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
      index: './src/index.ts',
      datepicker: './src/demos/datepicker/datepicker.ts'
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {},
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'datepicker',
        // base: resolve(__dirname, 'src/index.html'),
        filename: 'demos/datepicker/datepicker.html',
        template: resolve(__dirname, 'src/demos/datepicker/datepicker.html')
      }),
      new HtmlWebpackPlugin({
        title: 'TypeScript',
        // base: resolve(__dirname, 'src/index.html'),
        template: resolve(__dirname, 'src/index.html')
      })
    ]
};
