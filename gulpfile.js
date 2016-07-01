var gulp = require('gulp');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
var minifyCss = require('gulp-cssnano');
var concatCss = require('gulp-concat-css');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');

var paths = {
  css: ['app/**/*.scss'],
  html: ['app/**/*.html'],
  img: ['app/img/*'],
  js: ['app/**/*.js'],
  test: ['test/testRoutes.js']
};

gulp.task('build:css', function() {
  gulp.src('app/scss/application.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(gulp.dest('app/css/'))
    .pipe(concatCss('style.min.css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});

gulp.task('build:html', function() {
  gulp.src(paths.html)
  .pipe(gulp.dest('build/'));
});

gulp.task('build:img', function() {
  gulp.src(paths.img)
  .pipe(imagemin())
  .pipe(gulp.dest('build/'));
})

gulp.task('build:js', function() {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('watch:css', function() {
	gulp.watch(paths.css, ['build:css']);
});

gulp.task('watch:html', function() {
	gulp.watch(paths.html, ['build:html']);
});

gulp.task('watch:img', function() {
  gulp.watch(paths.img, ['build:img']);
})

gulp.task('watch:js', function() {
	gulp.watch(paths.js, ['build:js']);
});

gulp.task('build:all', ['build:css', 'build:html', 'build:js', 'build:img']);
gulp.task('test:all', ['test:mocha']);
gulp.task('watch:all', ['watch:css', 'watch:html', 'watch:js', 'watch:img']);
gulp.task('default', ['build:all', 'watch:all']);
