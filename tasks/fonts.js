import fs from  'fs'
import gulp    from 'gulp'
import filesize from 'gulp-filesize'
import browserSync from 'browser-sync'

const paths_ = JSON.parse(fs.readFileSync('./paths.json'));

export function fonts_export(){
	return gulp.src(paths_.app + paths_.fonts.path)
		        .pipe(gulp.dest(paths_.dist + paths_.fonts.out))
                .pipe(filesize())
		        .pipe(browserSync.reload({stream: true}));
}

export function fonts(cb) {
	fonts_export();
    if(typeof(cb) == 'function') cb();
}