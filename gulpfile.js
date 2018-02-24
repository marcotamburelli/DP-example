var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var tsify = require('tsify');
// var transformJsx = require('babel-plugin-transform-react-jsx');
// var jsxPragmatic = require('babel-plugin-jsx-pragmatic');
// var uglify = require('gulp-uglify');

function compile(watch) {
  var bundler = watchify(
    browserify('./src/js/renderer/app.tsx', { debug: true })
      .plugin(tsify, { target: 'es6' })
      // .plugin(transformJsx, { pragma: 'XLib.define' })
      // .plugin(jsxPragmatic, { module: 'hello', import: 'XLib' })
      .transform(babel, { presets: ['es2015'], extensions: ['.ts', '.tsx'] })
  );

  function rebundle() {
    bundler.bundle()
      .on('error', function (err) { console.error(err); this.emit('end'); })
      .pipe(source('renderer.js'))
      .pipe(buffer())
      // .pipe(uglify())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./html/dist'));
  }

  if (watch) {
    bundler.on('update', function () {
      console.log('-> bundling...');
      rebundle();
      console.log('-> done');
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
}

gulp.task('build', function () { return compile(); });
gulp.task('watch', function () { return watch(); });

gulp.task('default', ['watch']);
