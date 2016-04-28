var gulp = require('gulp');

var del = require('del');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');


var browserSync = require('browser-sync').create(),
  bsReload = browserSync.reload,
  nodemon = require('gulp-nodemon');

var dev = {
  css: '.tmp/styles',
  dir: 'app',
  images: 'app/images/**/*',
  index: 'app/index.html',
  scripts: 'app/scripts/**/*.js',
  styles: 'app/styles/**/*.scss',
  templates: 'app/views/**/*.html',
  tmp: '.tmp'
};

var prod = {
  dir: 'dist',
  images: 'dist/images',
  scripts: 'dist/scripts',
  styles: 'dist/styles',
  templates: 'dist/views'
};

var options = {
  htmlmin: { collapseWhitespace: true },
  imagemin: { interlaced: true, optimizationLevel: 3, progressive: true },
  sass: { compass: true, errLogToConsole: true, style: 'compressed' },
  uglify: { mangle: false }
};

gulp.task('serve', ['styles'], function() {
  nodemon({ script: 'api/index.js', execMap: { js: 'node --harmony' } })
    .on('restart', bsReload)
  browserSync.init({
    server: ['.tmp', 'app']
  });
  gulp.watch(dev.styles, ['styles']);
  gulp.watch(dev.sripts, ['scripts']);
  gulp.watch([dev.index, dev.templates]).on('change', bsReload);
});


gulp.task('templates', function() {
  gulp.src(dev.templates)
  .pipe(htmlmin(options.htmlmin))
  .pipe(gulp.dest(prod.templates))
});

gulp.task('styles', function () {
  gulp.src(dev.styles)
  .pipe(sass(options.sass))
  .pipe(gulp.dest(dev.css));
});

gulp.task('clean', function() {
  return del([prod.dir]);
});

gulp.task('build', ['clean', 'templates', 'styles'], function() {
  gulp.src(dev.index)
  .pipe(usemin({
    css: [minifyCss()],
    js: [uglify(options.uglify)]
  }))
  .pipe(gulp.dest(prod.dir));
});

gulp.task('default', ['styles', 'serve']);
