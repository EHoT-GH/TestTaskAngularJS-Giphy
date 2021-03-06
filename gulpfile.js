var gulp = require('gulp'),
    server = require('gulp-server-livereload'),
    sass = require('gulp-sass'),
    autoPrefixer = require('gulp-autoprefixer'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-csso');

//server
gulp.task('start', function() {
  gulp.src('./src')
      .pipe(server({
        livereload: true,
        open: true
      }));
});

//styles
gulp.task('style', function() {
  return gulp.src('src/sass/**/*.sass')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoPrefixer({
        browsers: ['last 15 version']
      }))
      .pipe(gulp.dest('src/css'));
});

//build
gulp.task('build', function() {
  return gulp.src('src/*.html')
      .pipe(useref())
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulpIf('*.css', minifyCss()))
      .pipe(gulp.dest('dist'));
});

//watch
gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.sass', ['style']);
});

gulp.task('default', ['start', 'watch']);