var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var wrap = require("gulp-wrap");

gulp.task('concat', function() {
  return gulp.src([
        './lib/json-refactor.js',
        './src/jquery.seeAjax.js'
      ])
      .pipe(concat('jquery.seeAjax.js'))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('mini', ['concat'], function() {
  return gulp.src('./dist/jquery.seeAjax.js')
      .pipe(uglify())
      .pipe(rename('jquery.seeAjax.min.js'))
      .pipe(gulp.dest("./dist"));
});

gulp.task('default', ['mini']);