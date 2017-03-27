var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('default', function() {
  return gulp.src('./jquery.seeAjax.js')
    .pipe(uglify())
    .pipe(rename("jquery.seeAjax.min.js"))
    .pipe(gulp.dest('./'));
});