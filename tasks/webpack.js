import path    from 'path'
import webpack from 'webpack'
import process from 'process'
import product from './_webpack/webpack_product'
import dev from './_webpack/webpack_dev'

const isProduction = (process.env.NODE_ENV === 'production')

let config = {
    entry: './vue/app.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    context: path.resolve(__dirname, '../src')
}


function scripts() {
    return new Promise(resolve => webpack(config, (err, stats) => {
        if(err) console.log('Webpack', err)
        console.log(stats.toString({ /* stats options */ }))
        resolve()
    }))
}

module.exports = { config, scripts }
