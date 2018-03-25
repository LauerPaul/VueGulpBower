import fs from  'fs'
import gulp    from 'gulp'
import pug from 'gulp-pug'
import plumber from 'gulp-plumber';
import gulpPugBeautify from 'gulp-pug-beautify'
import browserSync from 'browser-sync'

const paths_ = JSON.parse(fs.readFileSync('./paths.json'));

export function pug_compile (){
	const beautify = gulpPugBeautify({omit_empty: true})
	const pug_ = pug({pretty: true})

	return gulp.src(paths_.app + '/*.pug', { passthrough: true, deep: true })
	   		     .pipe(plumber())
	   		     .pipe(beautify.on('error', () => {console.log('->>> error beautify <<<-')}))
	       		 .pipe(pug_.on('error', console.log))
	   		     .pipe(plumber.stop())
	       		 .pipe(gulp.dest(paths_.dist))
				 .pipe(browserSync.reload({stream: true}));
}

export function html(cb) {
	pug_compile();
    if(typeof(cb) == 'function') cb();
}