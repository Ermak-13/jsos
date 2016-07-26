var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    browserify = require('gulp-browserify'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint');

gulp.task('default', ['dev']);
gulp.task('dev', ['watch', 'js', 'sass']);
gulp.task('release', ['js', 'sass', 'build']);
gulp.task('server', ['webserver']);

gulp.task('webserver', function () {
  gulp.src('./')
    .pipe(webserver({
      host: 'localhost',
      port: 8008,
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

gulp.task('build', function () {
  gulp.src('./bootstrap-3.3.6/**/*')
    .pipe(gulp.dest('./release/bootstrap-3.3.6'));

  gulp.src('./font-awesome-4.6.3/**/*')
    .pipe(gulp.dest('./release/font-awesome-4.6.3'));

  gulp.src('./images/**/*')
    .pipe(gulp.dest('./release/images'));

  var files = [
    './COPYING',
    './jsos.css',
    './jsos.js',
    './manifest.json',
    './newtab.html',
    './README.md'
  ];

  gulp.src(files)
    .pipe(gulp.dest('./release'));
});

//TODO: move to JSOS Module repository
gulp.task('module', ['watch-module', 'module-js']);
gulp.task('watch-module', function () {
  gulp.watch('./module/**/*.js', ['module-js']);
});

gulp.task('module-js', function () {
  gulp.src('./module/index.js')
    .pipe(browserify({
      transform: ['reactify'],
      extensions: ['.js'],
    }))
    .on('error', console.log)
    .pipe(rename('module.js'))
    .pipe(gulp.dest('.'));
});

