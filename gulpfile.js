'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');
var rename = require("gulp-rename");

var replace = require('gulp-replace');

var  download = [
            {
              ios:'https://itunes.apple.com/cn/app/id897887990?mt=8' ,
              andr:'http://download.cdn.jituancaiyun.com/release/jtcy_latest.apk'
            },
            {
              andr:'http://download.cdn.imasheng.com/release/masheng_latest.apk' ,
              ios:'https://itunes.apple.com/cn/app/id1100666350?mt=8'
            },
            {
              andr:'http://download.cdn.uban360.com/release/uban_latest.apk' ,
              ios:'https://itunes.apple.com/cn/app/id1014923769?mt=8'
            }
            ]

gulp.task('sass', function () {
  gulp.src('./sass/jtcy.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('css.css'))
    .pipe(gulp.dest('./jtcy/css'));
 gulp.src('./sass/masheng.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('css.css'))
    .pipe(gulp.dest('./masheng/css'));
 gulp.src('./sass/uban.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('css.css'))
    .pipe(gulp.dest('./uban/css'));

    gulp .src('./sass/*.png')
    .pipe(gulp.dest('./masheng/css'))
    .pipe(gulp.dest('./uban/css'))
    .pipe(gulp.dest('./jtcy/css'))

});

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch(['./temp/**/*.html','./temp/**/*.htm'], ['fileinclude']);
});

gulp.task('fileinclude', function() {
  function getHTML(){
    return gulp.src(['./temp/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }));
  }
    getHTML().pipe(replace("{APP}","集团彩云"))
    .pipe(replace('{SAPP}',"彩云"))
    .pipe(replace('{downIos}',download[0].ios))
    .pipe(replace('{downAndr}',download[0].andr))
    .pipe(gulp.dest('./jtcy'));

    getHTML().pipe(replace("{APP}","麻绳办公"))
    .pipe(replace('{SAPP}',"麻绳"))
    .pipe(replace('{downIos}',download[1].ios))
    .pipe(replace('{downAndr}',download[1].andr))
    .pipe(gulp.dest('./masheng'));

    getHTML().pipe(replace("{APP}","优办"))
    .pipe(replace('{SAPP}',"优办"))
    .pipe(replace('{downIos}',download[2].ios))
    .pipe(replace('{downAndr}',download[2].andr))
    .pipe(gulp.dest('./uban'));

});
gulp.task('default',['sass','fileinclude'])