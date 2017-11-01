const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const babel = require('gulp-babel');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src(['src/scss/*.scss'])
		.pipe(sass())
		.pipe(gulp.dest("./dist/css"))
		.pipe(browserSync.stream());
	});

//Setup transpile of ES6 --> ES5
gulp.task('es6', function () {
    return gulp.src('src/js/*.js')
        .pipe(babel({
			presets: ['env'],
            ignore: ['./src/js/bootstrap.min.js','./src/js/popper.min.js','./src/js/jquery.min.js']
        }))
        .pipe(gulp.dest("./dist/js"))
        .pipe(browserSync.stream());
});

//Static Server + watching scss/html files
gulp.task('serve', ['sass', 'es6'], function() {
	browserSync.init({
		// Will not attempt to determine your network status, assumes you're OFFLINE
//		online: false,
		server: "./"
		});

	gulp.watch(['src/scss/*.scss'],['sass']);
	gulp.watch(['src/js/*.js'],['es6']);
	gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default',['serve']);

