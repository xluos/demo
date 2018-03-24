var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css');
 
gulp.task('default', function() {
    return gulp.src('./email_template.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('./email_bar'));
});