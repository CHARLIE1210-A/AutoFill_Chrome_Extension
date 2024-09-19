const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Import the plugin

module.exports = {
  // Your main React entry point
  entry: {
    popup: './src/index.js',
    background: './src/background.js',
    content: './src/content.js',
    addDetails: './src/pages/AddDetails.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
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
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'], // Include PostCSS for Tailwind CSS
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/popup.html',
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: './public/add-details.html',
      filename: 'add-details.html',
      chunks: ['addDetails'], 
    }),
    // Copy manifest.json to dist folder
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: '' }, // Copy manifest.json
        { from: 'public', to: '', globOptions: { ignore: ['**/popup.html','**/add-details.html'] } },
        { from: 'assets/icons', to: 'assets/icons' }, // Copy manifest.json
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
