import fs from  'fs'
import gulp    from 'gulp'
import Browser from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import log from 'gutil-color-log'

import { config as webpackConfig } from './webpack'
import { dev as devConfig } from './webpack'

import { pug_compile as html }  from './pug'
import { css_compile as css }  from './scss'
import { css_compile_min as css_min }  from './scss'
import { img_export as images }  from './image'
import { fonts_export as fonts }  from './fonts'

const paths_ = JSON.parse(fs.readFileSync('./paths.json'));
const cnf = JSON.parse(fs.readFileSync('./config.json'));
const browser = Browser.create()
const bundler = webpack(webpackConfig)

export function server(cb) {
    let config = {
        server: paths_.dist,
        open: cnf.server.open_browser,
        middleware: [
            webpackDevMiddleware(bundler, devConfig)
        ],
    }
    browser.init(config)

    /* Vue */
    gulp.watch(paths_.app + '/vue/*')
    .on('change', function(path, stats) {
        log('green', path); 
        browser.reload();
    }).on('unlink', function(path, stats) {log('green', path);});

    /* Pug */
    if(cnf.pug.watch) {
        gulp.watch(paths_.app + paths_.pug.watch, { passthrough: true, deep: true })
        .on('change', function(path, stats) {
            console.log(' ');
            console.log('-----------------------------------------------------------------------------------');
            log('green', '->>>>>>> ✅ Watch [pug]: ' + path);
            console.log('-----------------------------------------------------------------------------------');
            html();
            browser.reload();
        }).on('unlink', function(path, stats) {log('green', path);});
    }

    /* Scss */
    if(cnf.scss.watch) {
        gulp.watch(paths_.app + paths_.scss.watch, { passthrough: true, deep: true })
        .on('change', function(path, stats) {
            console.log(' ');
            console.log('-----------------------------------------------------------------------------------');
            log('green', '->>>>>>> ✅ Watch [scss]: ' + path);
            console.log('-----------------------------------------------------------------------------------');
            if(cnf.scss.min) css_min();
            css();
            browser.reload();
        }).on('unlink', function(path, stats) {log('green', path);});
    }


    /* Images */
    if(cnf.img.watch) {
        gulp.watch(paths_.app + paths_.img.watch, { passthrough: true, deep: true })
        .on('change', function(path, stats) {
            console.log(' ');
            console.log('-----------------------------------------------------------------------------------');
            log('green', '->>>>>>> ✅ Watch [images]: ' + path);
            console.log('-----------------------------------------------------------------------------------');
            images();
        }).on('unlink', function(path, stats) {log('green', path);});
    }


    /* Fonts */
    if(cnf.fonts.watch) {
        gulp.watch(paths_.app + paths_.fonts.watch, { passthrough: true, deep: true })
        .on('change', function(path, stats) {
            console.log(' ');
            console.log('-----------------------------------------------------------------------------------');
            log('green', '->>>>>>> ✅ Watch [fonts]: ' + path);
            console.log('-----------------------------------------------------------------------------------');
            fonts();
        }).on('unlink', function(path, stats) {log('green', path);});
    }


    if(typeof(cb) == 'function') cb();
}
