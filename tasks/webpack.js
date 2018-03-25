import fs from  'fs'
import path    from 'path'
import webpack from 'webpack'
import process from 'process'
import vueLoader from 'vue-loader'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from "extract-text-webpack-plugin"
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

const paths_ = JSON.parse(fs.readFileSync('./paths.json'))
const isProduction = (process.env.NODE_ENV === 'production')

let config = {
    stats: { colors: true },
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client?http://localhost:3000',
        'vue-hot-reload-api/dist/index',
        './vue/app.js'
    ],
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist/js/'),
        publicPath: '/dist/js/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("styles/style.css"),
        new ExtractTextPlugin('docs/docs.md')
    ],
    context: path.resolve(__dirname, '../src'),
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json'],
        modules: [path.resolve(__dirname, "src/vue"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
                sourceMap: true
            }
          },
          {
              loader: 'postcss-loader',
              options: {
                  plugins: [
                      autoprefixer({
                          browsers:['ie >= 8', 'last 4 version']
                      })
                  ],
                  sourceMap: true
              }
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              // resources: path.resolve(__dirname, '../src/styles/include/variables.scss')
            }
          }
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true,
          loaders: {
            // извлечь всё содержимое тегов <docs> как обычный текст
            'docs': ExtractTextPlugin.extract('raw-loader'),
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
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
          name: 'images/[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}


function scripts() {
    return new Promise(resolve => webpack(config, (err, stats) => {
        if(err) console.log('Webpack', err)
        console.log(stats.toString({ /* stats options */ }))
        resolve()
    }))
}

module.exports = { config, scripts }
