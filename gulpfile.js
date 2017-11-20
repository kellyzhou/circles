var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
	return gulp.src('scss/*.scss')
		.pipe(sass()) // use gulp-sass plugin
		.pipe(gulp.dest('css'))
});

gulp.task('watch', function() {
	gulp.watch('scss/*.scss', ['sass']);
});