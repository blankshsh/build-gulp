var gulp = require('gulp')
var livereload = require('gulp-livereload')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var mqpacker = require('css-mqpacker')
var csswring = require('csswring')
var less = require('gulp-less')
var path = require('path')
var watch = require('gulp-watch')
var minifycss = require('gulp-minify-css')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var del = require('del')

gulp.task('default', function() {
  gulp.start('less');
  // gulp.start('less', "js");
});
gulp.task("less", function() {
  var processors = [
    autoprefixer({
      browsers: ['last 4 version']
    }),
    mqpacker,
    csswring
  ];
  return gulp.src('./build/less/*.less') //less的路径
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(gulp.dest('./build/css')) //输出css的路径
    .pipe(livereload())
});
gulp.task('js', function() {
  return gulp.src('./build/js/*.js')
    // .pipe(concat('main.js')) // 合并所有js到main.js
    // .pipe(gulp.dest('./build/js/main')) // 输出main.js的路径
    .pipe(rename({
      suffix: '.min' // 为JS加上min
    })) 
    .pipe(uglify()) // 压缩JS
    .pipe(gulp.dest('./build/js/min')) // 输出压缩后的JS
    .pipe(livereload()) // 刷新网页
});

gulp.task('watch', function() {
  livereload.listen();
  watch('build/js/*.js', function() {
    gulp.start('lesscss');
  })
  watch('build/less/*.less', function() {
    gulp.start('lesscss');
  })
})
