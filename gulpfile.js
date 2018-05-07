const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babel = require('babelify');
const tsify = require('tsify');
const connect = require('gulp-connect');

const compile = (watch) => {
  const bundler = watchify(
    browserify('./src/js/front/app.tsx', { debug: true })
      .plugin(tsify, { target: 'es6' })
      .transform(babel, { presets: ['env'], extensions: ['.ts', '.tsx'] })
  );

  const rebundle = () => {
    bundler.bundle()
      .on('error', function (err) { console.error(err); this.emit('end'); })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      // .pipe(uglify())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./html/dist'));
  };

  if (watch) {
    bundler.on('update', () => {
      console.log('-> bundling...');
      rebundle();
      console.log('-> done');
    });
  }

  rebundle();
};

const watch = () => compile(true);

gulp.task('build', () => compile());
gulp.task('watch', () => watch());
gulp.task('webserver', () => connect.server({
  root: 'html',
  livereload: true
}));

gulp.task('default', ['webserver', 'watch']);
