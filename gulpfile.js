/**
 * Created by Administrator on 2018/10/17.
 */
var gulp=require('gulp')//告知Node去node_modules中查找gulp包
var sass=require('gulp-sass')//在gulpfile中引入插件，用变量保存
var browserSync =require('browser-sync')
gulp.task('sass',function(){
 return gulp.src('gulp/scss/*.scss')
   .pipe(sass())
   .pipe(gulp.dest('gulp/css'))
  .pipe(browserSync.reload({
     stream:true
   }))
})
gulp.task('broswerSync',function(){
browserSync({
  server:{
    baseDir:'gulp'
  }
})
})
gulp.task('watch',['broswerSync','sass'],function(){
  gulp.watch('gulp/scss/style.scss',['sass'])
  gulp.watch('gulp/*.html',browserSync.reload)
})
