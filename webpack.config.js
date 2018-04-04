var path = require('path')
var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main:'./src/main.js',
    main2:'./src/main2.js'
  },
  output: {
    // path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    // filename: 'build.js',
    path: path.resolve(__dirname, 'dist'),//输出的文件路径  
    filename: 'js/[name]-[hash].js'//输出的js文件名  
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins:[
    new htmlWebpackPlugin({  
      filename : 'index.html',//输出的html路径  
      template : 'index.html', //html模板路径  
      //inject : 'head',  //js文件在head中，若为body则在body中  
      inject : true,  
      title : 'this is a.html',  
      author : 'Kongwc',  
      //excludeChunks: ['main'],//打包时不打包main.js文件  
      chunks : ['main','vendor'], //打包时只打包main和a的js文件，见entry，注意使用chunks时模板index.html文件里面不允许有script标签，即使注释掉也会报错  
      date : new Date()/*, 
      minify : { 
          removeComments : true, //打包后删除参数 
          collapseWhitespace : true //打包后删除空格 
      }*/  

    }),  
    new htmlWebpackPlugin({  
      filename : 'index2.html',//输出的html路径  
      template : 'index2.html', //html模板路径  
      //inject : 'head',  //js文件在head中，若为body则在body中  
      inject : true,  
      title : 'this is b.html',  
      author : 'Kongwc',  
      date : new Date(),/*, 
       minify : { 
       removeComments : true, //打包后删除参数 
       collapseWhitespace : true //打包后删除空格 
       }*/  
      chunks : ['main2','vendor'],  
    }),  
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.output={
    // path: path.resolve(__dirname, './dist'),
    publicPath: './',
    // filename: 'build.js',
    path: path.resolve(__dirname, 'dist'),//输出的文件路径  
    filename: 'js/[name]-[hash].js'//输出的js文件名  
  }
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    })
  ])
}
