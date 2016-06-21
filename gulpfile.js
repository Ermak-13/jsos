var gulp = require('gulp'),
    browserify = require('gulp-browserify');

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
