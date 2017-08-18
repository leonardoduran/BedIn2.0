module.exports = {
  entry: [
      'script-loader!jquery/dist/jquery.min.js',
      'bootstrap/dist/js/bootstrap.min.js',
      'bootstrap/dist/css/bootstrap.css',
      

      './src/index.js'
    ],
    module: {
      loaders: [
        {
          test: /(\.js|\.jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: { presets: ['es2015', 'react'] }
        },
        {
          test: /\.ncss$/,
          loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test:/\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'

        },
      ]
    },
    devtool: "source-map",
    output: {
      filename: "indexBundle.js",
      path: __dirname + '/dist'
    }
}
