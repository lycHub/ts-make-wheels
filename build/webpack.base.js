const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: {
    index: './src/index.ts',
    datepicker: './src/demos/datepicker/datepicker.ts',
    'scroll-panel': './src/demos/scroll-panel/scroll-panel.ts',
    'tool-tip': './src/demos/tool-tip/tool-tip.ts'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tooltip',
      filename: 'demos/tool-tip/tool-tip.html',
      template: resolve(__dirname, '../src/demos/tool-tip/tool-tip.html')
    }),
    new HtmlWebpackPlugin({
      title: '滚动条',
      filename: 'demos/scroll-panel/scroll-panel.html',
      template: resolve(__dirname, '../src/demos/scroll-panel/scroll-panel.html')
    }),
    new HtmlWebpackPlugin({
      title: 'datepicker',
      filename: 'demos/datepicker/datepicker.html',
      template: resolve(__dirname, '../src/demos/datepicker/datepicker.html')
    }),
    new HtmlWebpackPlugin({
      title: 'TypeScript',
      template: resolve(__dirname, '../src/index.html')
    })
  ]
};
