module.exports = {
  output: {
    path: __dirname + '/dist',
    chunkFilename: 'chunk-[id].js',
    publicPath: __dirname + '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[name]__[local]',
              modules: true,
            },
          },
          'postcss-loader'
        ]
      }
    ]
  }
}
