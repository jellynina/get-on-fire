'use strict';

var gulp       = require('gulp'),
    webserver  = require('gulp-webserver');

var opt = {
  'src': './',
  'view': './views',
  'sass': './scss',
  'font': './scss/fonts',
  'img' : './images',
  'dist': './public'
};


gulp.task('webserver', function() {
  gulp.src(opt.dist)
    .pipe(webserver({
      livereload: true,
      open: false,
      port: 3000
    }));
});


gulp.task('default', function (){
  gulp.start('webserver');
});
