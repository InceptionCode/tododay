/*global require, module,__dirname: true*/
/*eslint no-undef: "error"*/
const autoprefixer =require( 'autoprefixer' ),
  precss =require( 'precss' ),
  utilities =require( 'postcss-utilities' ),
  flexbox =require( 'postcss-flexbox' );

module.exports ={
  entry: './index.jsx',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devServer: { inline: true ,historyApiFallback: true},
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [ 'latest', 'react' ]
        }
      }
    ]
  },
  postcss: [
    precss( {} ),
    autoprefixer( { browsers: [ 'last 2 versions' ] } ),
    utilities( {} ),
    flexbox( {} )
  ],
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
