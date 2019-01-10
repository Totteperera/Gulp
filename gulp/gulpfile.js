/// <binding BeforeBuild='sass-prod' />
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('./UI/src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass({ includePaths: ['./UI/build/css'] }).on('error', sass.logError))
        .pipe(concat('site.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./UI/build/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./UI/src/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('sass-prod', function () {
    return gulp.src('./UI/src/scss/**/*.scss')
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe.concat('site.css')
        .pipe(gulp.dest('./UI/build/css'));
});