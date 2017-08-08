/** build by blankshsh 08/08/2017 **/

//引用依赖
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var postcss = require('gulp-postcss'); //css后处理器
var autoprefixer = require('autoprefixer'); // css浏览器兼容
var mqpacker = require('css-mqpacker'); // 合并css
var csswring = require('csswring'); // 去空格
var less = require('gulp-less');
var watch = require('gulp-watch');
var concat = require('gulp-concat'); // js合并
var uglify = require('gulp-uglify'); // js压缩
var rename = require('gulp-rename'); // 重命名

//文件路径
var lessSrc = './build/less/*.less';
var cssSrc = './build/css';
var jsSrc = './build/js/*.js';
var jsMain = './build/js/main';
var jsMin = './build/js/min';

gulp.task('default', function() {
  // gulp.start('less');
  gulp.start('less', "js");
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
    .pipe(gulp.dest(cssSrc)) //输出css
    .pipe(livereload())
});

gulp.task('js', function() {
  return gulp.src(jsSrc) // js路径
    // .pipe(concat('main.js')) // 合并js
    // .pipe(gulp.dest(jsMain)) // 输出main
    .pipe(rename({
      suffix: '.min'
    })) 
    .pipe(uglify())
    .pipe(gulp.dest(jsMin)) // 输出JS
    .pipe(livereload()) // 刷新网页
});

gulp.task('watch', function() {
  livereload.listen();
  watch(jsSrc, function() {
    gulp.start('js');
  })
  watch(lessSrc, function() {
    gulp.start('less');
  })
})
