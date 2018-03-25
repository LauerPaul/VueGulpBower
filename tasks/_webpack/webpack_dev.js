import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import ExtractTextPlugin from "extract-text-webpack-plugin"
import autoprefixer from 'autoprefixer'

const dev = {
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
  plugins: [
    new ExtractTextPlugin("styles/style.css"),
    new ExtractTextPlugin('docs/docs.md')
  ]
}
