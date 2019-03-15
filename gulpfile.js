'use strict';

//Dependencies required
const gulp = require('gulp')
const argv = require('yargs').argv
var gulpif = require('gulp-if')
//IMAGES
const imagemin = require('gulp-imagemin')
const imageminPngquant = require('imagemin-pngquant')
const imageminZopfli = require('imagemin-zopfli')
const imageminMozjpeg = require('imagemin-mozjpeg') //need to run 'brew install libpng'
const imageminGiflossy = require('imagemin-giflossy')
//CSS & JS
const concat = require('gulp-concat')
const sourceMap = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const babel = require("gulp-babel")
const autoprefixer = require("gulp-autoprefixer")
const del = require('del')
// Sass
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')

//javascript optimization, source maps included
const jsSource = [
  'assets/javascripts/jquery.min.js',
  'assets/javascripts/modernizr-2.7.1.min.js',
  'assets/javascripts/bootstrap.min.js',
  'assets/javascripts/plugins/**/*.js',
]

gulp.task('scripts', function () {
  gulp.src(jsSource)
  .pipe(gulpif(!argv.prod, sourceMap.init()))
  .pipe(babel())
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(gulpif(!argv.prod, sourceMap.write()))
  .pipe(gulp.dest('source/assets/javascripts/'))
})

// image minification -- only changes if necessary
gulp.task('imagemin', function () {
  gulp.src('assets/images/**/*')
    .pipe(imagemin([
      imageminPngquant({
        speed: 1,
        quality: 98 //lossy settings
      }),
      imageminZopfli({
        more: true
      }),
      //gif
      imagemin.gifsicle({
        interlaced: true,
        optimizationLevel: 3
      }),
      //gif very light lossy, use only one of gifsicle or Giflossy
      imageminGiflossy({
        optimizationLevel: 3,
        optimize: 3, //keep-empty: Preserve empty transparent frames
        lossy: 2
      }),
      //svg
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      }),
      //jpg lossless
      imagemin.jpegtran({
        progressive: true
      }),
      //jpg very light lossy, use vs jpegtran
      imageminMozjpeg({
        quality: 90
      })
    ]))
    .pipe(gulp.dest('source/assets/images/'))
});

// compile Sass files
gulp.task('sass', function () {
  gulp.src('assets/sass/**/*')
  .pipe(gulpif(!argv.prod, sourceMap.init()))
  .pipe(plumber())
  .pipe(sass({outputStyle: 'compressed'}))
  // .pipe(sass())
  .pipe(gulpif(!argv.prod, sourceMap.write()))
  .pipe(autoprefixer())
  .pipe(gulp.dest('source/assets/stylesheets/'))
})

gulp.task('fonts', function () {
  gulp.src('assets/fonts/**/*')
    .pipe(gulp.dest('source/assets/fonts/'))
})

gulp.task('clean', function () {
  del([
    'source/assets/images/*',
    'source/assets/javascripts/*',
    'source/assets/stylesheets/*',
    'source/assets/fonts/*'
  ])
})

// build task for production server
gulp.task('build', ['clean', 'imagemin', 'fonts', 'scripts', 'sass'], function () {
  console.log('Build task running -*-*-*-*-*-*-*-*-*-*-*-*-*-*')
})

// Gulp defaut tasks
gulp.task('default', ['imagemin', 'fonts', 'scripts', 'sass'], function () {
  console.log("Default gulp task *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*")
  gulp.watch('assets/fonts/**/*', ['fonts'])
  gulp.watch('assets/images/**/*', ['imagemin'])
  gulp.watch('assets/sass/**/*', ['sass'])
  gulp.watch('assets/javascripts/**/*.js', ['scripts'])
});
