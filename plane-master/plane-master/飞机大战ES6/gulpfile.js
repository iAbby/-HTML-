


//gulp

//var gulp = require("gulp");
//gulp.src("src/js/*.js")  //指定要处理的文件
//.pipe(使用插件)
//.pipe(gulp.dest("dest/js"));  //指定处理完之后的文件存放目录



//2,在gulpfile.js中添加以下代码
////先es6转es5，再压缩js
var gulp = require('gulp');
var babel = require('gulp-babel'); //es6转es5
var uglify = require('gulp-uglify'); //js压缩插件

//es6js代码压缩
gulp.task('jsTask2', function(){
	gulp.src('src/js/*.js')
	.pipe(babel({"presets": ["es2015"]})) //es6转es5
	.pipe(uglify()) //js压缩
	.pipe(gulp.dest('dest/js'));
});


//默认任务
gulp.task("default", ["jsTask2"]);







