var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint');

gulp.task('default', ['dev']);
gulp.task('dev', ['js', 'sass', 'watch']);
gulp.task('release', ['js']);

gulp.task('js', function () {
  gulp.src('./javascripts/index.js')
    .pipe(browserify({
      transform: ['reactify'],
      extensions: ['.js'],
      shim: {
        microevent: {
          path: './javascripts/microevent.js',
          exports: 'MicroEvent'
        },
        os: {
          path: './javascripts/os.js',
          exports: 'OS',
        }
      }
    }))
    .on('error', console.log)
    .pipe(rename('jsos.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('sass', function () {
  gulp.src('./stylesheets/index.scss')
    .pipe(rename('jsos.scss'))
    .pipe(
      sass().on('error', sass.logError)
    )
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.js', ['js']);
  gulp.watch('./stylesheets/**/*.scss', ['sass']);
});
