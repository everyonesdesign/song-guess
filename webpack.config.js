module.exports = {
  entry: './src/index.jsx',
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
};
