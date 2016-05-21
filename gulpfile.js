var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  plumber = require('gulp-plumber'),
  reload = browserSync.reload,
  clean = require('gulp-clean'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css');

//dev css
gulp.task('stylesDev', function () {
  return gulp.src('./GCSS.sass')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'companded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./test'));
});

//start browser
gulp.task('browser-sync', function () {
  browserSync({
    port: 9201,
    server: {
      baseDir: "test"
    }
  });
});

gulp.task('clean', function(){
  return gulp.src('dist/',{read: false})
    .pipe(clean());
});

gulp.task('copy', ['clean'], function(){
  return gulp.src(['test/*.css'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('minifyCss', ['copy'], function() {
  return gulp.src('dist/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
});

gulp.task('doStyleDev', function () {
  /* watch .sass|.scss files */
  gulp.watch('*.+(sass|scss)', ['stylesDev']);
});
gulp.task('dev', ['doStyleDev', 'browser-sync'], function () {
  gulp.watch(['test/*.+(html|css)']).on('change', reload);
});

gulp.task('build',['minifyCss'], function() {
});