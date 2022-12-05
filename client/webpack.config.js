const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');

//  Add and configure workbox plugins for a service worker and manifest file.
//  Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename:'[name][ext]',
      clean:true,
    },
    plugins:[
      new HtmlWebpackPlugin({
        title:"Just Another Text Editor",
        filename:"index.html",
        template:"./index.html",
        favicon:"./favicon.ico",
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest:'src-sw.js',
      }),
      new WebpackPwaManifest({
        filename:"manifest.json",
        fingerprints:false,
        inject:true,
        name:'Just Another Text Editor',
        short_name:'JATE',
        description:'Just Another Text Editor',
        background_color:'#225ca3',
        theme_color:'#225ca3',
        start_url:'.',
        publicPath:'/',
        icons:[
          {
            src:path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination:path.join('images'),
          },
        ],
      }),
      
    ],

    module:{
      rules:[
        {
          test:/\.css$/i,
          use:[MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use:{
            loader:'babel-loader',
            options:{
              presets:['@babel/preset-env']
            }
          }
        }
      ],
    },
  };
};
