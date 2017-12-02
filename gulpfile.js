// BUILD TASKS
//    sass: compile SCSS into single CSS file
//    lint: check JS and compile into single JS file
//    watch: do both sass and lint tasks

var gulp = require('gulp');
var sass = require('gulp-sass');      // Compile SCSS
var concat = require('gulp-concat');  // Join files
var jshint = require('gulp-jshint');  // Lint JS, installed with jshint-stylish and jshint

gulp.task('sass', function() {
	return gulp.src('scss/*.scss')
		.pipe(sass())   // Use gulp-sass plugin
		.pipe(concat('styles.css')) // Compile all styles
		.pipe(gulp.dest('css')) // Separate folder
});

gulp.task('lint', function() {
	return gulp.src('js/*.js')
		.pipe(jshint()) // Use gulp-jshint plugin
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('scripts.js')) // Compile JS
		.pipe(gulp.dest('js/compiled')) // Must be in a separate directory, otherwise final file will also get recompiled/concatenated with this structure (in line 14)
});

gulp.task('watch', function() {
	gulp.watch('scss/*.scss', ['sass']);
	gulp.watch('js/*.js', ['lint']);
});