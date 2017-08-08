/** build by blankshsh 08/08/2017 **/

//引用依赖
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var less = require('gulp-less');
var path = require('path');
var watch = require('gulp-watch');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

//文件路径
var lessSrc = './build/less/*.less';
var cssSrc = './build/css';
var jsSrc = './build/js/*.js';
var jsMain = './build/js/main';
var jsMin = './build/js/min';

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
  return gulp.src(lessSrc) //less路径
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(gulp.dest(cssSrc)) //输出css路径
    .pipe(livereload())
});

gulp.task('js', function() {
  return gulp.src(jsSrc)
    // .pipe(concat('main.js')) // 合并js至main
    // .pipe(gulp.dest(jsMain)) // 输出main路径
    .pipe(rename({
      suffix: '.min' // 压缩名称min
    })) 
    .pipe(uglify()) // 压缩JS
    .pipe(gulp.dest(jsMin)) // 输出压缩后的JS
    .pipe(livereload()) // 刷新网页
});

gulp.task('watch', function() {
  livereload.listen();
  // watch(jsSrc, function() {
  //   gulp.start('js');
  // })
  watch(lessSrc, function() {
    gulp.start('less');
  })
})
