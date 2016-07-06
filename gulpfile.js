var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint');

gulp.task('default', ['dev']);
gulp.task('dev', ['build', 'sass', 'watch']);
gulp.task('release', ['build']);

gulp.task('build', function () {
  gulp.src('./src/newtab.js')
    .pipe(browserify({
      transform: ['reactify'],
      extensions: ['.js'],
      shim: {
        microevent: {
          path: './src/microevent.js',
          exports: 'MicroEvent'
        },
        os: {
          path: './src/os.js',
          exports: 'OS',
        }
      }
    }))
    .on('error', console.log)
    .pipe(gulp.dest('./dist'));
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
  gulp.watch('./src/**/*.js', ['build']);
  gulp.watch('./stylesheets/**/*.scss', ['sass']);
});
