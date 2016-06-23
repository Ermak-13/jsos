var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    jshint = require('gulp-jshint');

gulp.task('default', ['dev']);
gulp.task('dev', ['watch', 'build']);
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
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.js', ['build']);
});
