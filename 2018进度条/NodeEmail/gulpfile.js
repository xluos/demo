var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css');
 
gulp.task('default', function() {
    return gulp.src('./*.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('./'));
});