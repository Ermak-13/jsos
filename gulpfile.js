var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    browserify = require('gulp-browserify'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify');

gulp.task('default', ['dev']);
gulp.task('dev', ['watch', 'js', 'sass']);
gulp.task('release', ['prod-env', 'js', 'sass', 'build']);
gulp.task('server', ['webserver']);

gulp.task('webserver', function () {
  gulp.src('./')
    .pipe(webserver({
      host: 'localhost',
      port: 9990,
      fallback: 'index.html'
    }));
});

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
  gulp.watch('./javascripts/**/*.js', ['js']);
  gulp.watch('./stylesheets/**/*.scss', ['sass']);
});

gulp.task('prod-env', function () {
  process.env.NODE_ENV = 'production';
});

gulp.task('build', function () {
  gulp.src('./bootstrap-3.3.6/**/*')
    .pipe(gulp.dest('./release/bootstrap-3.3.6'));

  gulp.src('./font-awesome-4.6.3/**/*')
    .pipe(gulp.dest('./release/font-awesome-4.6.3'));

  gulp.src('./images/**/*')
    .pipe(gulp.dest('./release/images'));

  gulp.src('./jsos.js')
    .pipe(minify({
      ext: {
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest('./release'));

  var files = [
    './COPYING',
    './jquery-2.2.4.min.js',
    './newtab.js',
    './jsos.css',
    './manifest.json',
    './newtab.html',
    './README.md'
  ];

  gulp.src(files)
    .pipe(gulp.dest('./release'));
});
