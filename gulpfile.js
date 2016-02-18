'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var rimraf = require('gulp-rimraf');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var html2react = require('gulp-html2react');
var changed = require('gulp-changed');
var debowerify = require('debowerify');

gulp.task('clean', function() {
  return gulp.src('dist', {
    read: false
  })
    .pipe(rimraf({
  force: true
    }));
});

gulp.task('browserSync', function() {
  browserSync.init(['dist/**'], {
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('react', function() {
  return gulp.src('src/js/templates/**/*.html')
  .pipe(html2react())
  .pipe(gulp.dest('temp/js/templates'));
});

gulp.task('copy_js', function() {
  var files = ['src/js/**/*.js'];
  return gulp.src(files).pipe(gulp.dest('temp/js'));
});

gulp.task('copy', ['copy_js'], function() {
  var files = ['src/**/*', '!src/js', '!src/js/**/*'];
  var DEST = 'dist';

  return gulp.src(files).pipe(changed(DEST)).pipe(gulp.dest(DEST));
});

// using vinyl-source-stream:
gulp.task('browserify', ['copy', 'react'], function() {
  var bundleStream = browserify('./temp/js/app.js').transform(debowerify).bundle();
  bundleStream
  .pipe(source('./js/app.js'))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['browserify', 'browserSync'], function() {
  gulp.watch('src/*.html', ['copy']);
  gulp.watch('src/css/**/*', ['copy']);

  gulp.watch('src/js/**/*', ['browserify']);
});
