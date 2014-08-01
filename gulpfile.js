var gulp = require('gulp');

var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var livereload = require('gulp-livereload');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');

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
  clean: { read: false },
  htmlmin: { collapseWhitespace: true },
  imagemin: { interlaced: true, optimizationLevel: 3, progressive: true },
  sass: { compass: true, errLogToConsole: true, style: 'compressed' },
  uglify: { mangle: false }
};

gulp.task('server', function() {
  var koa = require('koa');
  var serve = require('koa-static');
  var app = koa();
  app.use(serve(dev.dir));
  app.use(serve(dev.tmp));
  app.listen(process.env.PORT || 3637);
});

gulp.task('watch', function() {
  var server = livereload();
  server.changed();
  gulp.watch(dev.styles, ['styles']);
  gulp.watch(dev.dir + '/**').on('change', function(file) {
    server.changed(file.path);
  });
});

gulp.task('images', function() {
  gulp.src(dev.images)
  .pipe(imagemin(options.imagemin))
  .pipe(gulp.dest(prod.images));
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
  return gulp.src(prod.dir, options.clean)
  .pipe(clean());
});

gulp.task('build', ['clean', 'images', 'templates', 'styles'], function() {
  gulp.src(dev.index)
  .pipe(usemin({
    css: [minifyCss()],
    js: [uglify(options.uglify)]
  }))
  .pipe(gulp.dest(prod.dir));
});

gulp.task('serve', ['styles', 'server', 'watch']);
