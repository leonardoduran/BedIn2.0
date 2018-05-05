const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index.js', './style/style.css'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.ncss$/,
        loader:
          'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'index.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{ from: 'public/**/*', flatten: true, to: '' }], {})
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
