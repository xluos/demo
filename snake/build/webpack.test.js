const path = require('path');

module.exports =  {
  devtool: 'inline-source-map',
  mode: 'none',
  resolve: {
    extensions: ['.js', '.json'],
    alias:{
      "@": path.resolve(__dirname,'../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true }
        },
        enforce: 'post',
        exclude: /node_modules|lib|\.spec\.js$/,
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            // plugins: ['istanbul']
          }
        },
        exclude: /node_modules/
      }
    ]
  },
};