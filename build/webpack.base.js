const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: {
    index: './src/index.ts',
    datepicker: './src/demos/datepicker/datepicker.ts',
    'scroll-panel': './src/demos/scroll-panel/scroll-panel.ts',
    'tool-tip': './src/demos/tool-tip/tool-tip.ts',
    carousel: './src/demos/carousel/carousel-page.ts',
    slider: './src/demos/slider/slider-page.ts',
    'color-picker': './src/demos/color-picker/color-picker.ts',
    tree: './src/demos/tree/tree-page.ts',
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.(gif|jpg|jpeg|png|svg)$/,
      use: 'url-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tree',
      filename: 'demos/tree/tree-page.html',
      template: resolve(__dirname, '../src/demos/tree/tree-page.html')
    }),
    new HtmlWebpackPlugin({
      title: '取色器',
      filename: 'demos/color-picker/color-picker.html',
      template: resolve(__dirname, '../src/demos/color-picker/color-picker.html')
    }),
    new HtmlWebpackPlugin({
      title: 'Slider',
      filename: 'demos/slider/slider-page.html',
      template: resolve(__dirname, '../src/demos/slider/slider-page.html')
    }),
    new HtmlWebpackPlugin({
      title: 'Carousel',
      filename: 'demos/carousel/carousel-page.html',
      template: resolve(__dirname, '../src/demos/carousel/carousel-page.html')
    }),
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
