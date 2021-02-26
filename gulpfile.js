const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');

function html() {
   return src('src/**.html')
      .pipe(htmlmin({
          collapseWhitespace: true
      }))
      .pipe(dest('dist'))
}

function scss() {
    return src('src/scss/index.scss')
      .pipe(sass({
        includePaths: 'node_modules/normalize-scss/sass',
      }))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions']
      }))
      .pipe(csso())
      .pipe(concat('style.css'))
      .pipe(dest('dist')) 
}

function images() {
  return src('src/img/**/*')
    .pipe(imagemin(
      [
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]
    ))
    .pipe(dest('dist/images'));
}

function clear() {
    return del('dist')
}

function serve() {
    sync.init({
        server: './dist'
    })

   watch('src/**.html', series(html)).on('change', sync.reload)
   watch('src/scss/**.scss', series(scss)).on('change', sync.reload) 
}

exports.build = series(clear, scss, html, images);
exports.serve = series(clear, scss, html, images, serve);
exports.images = images;
exports.clear = clear;