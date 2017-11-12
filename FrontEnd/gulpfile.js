'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  path = require('path'),
  browserify = require("browserify"),
  source = require("vinyl-source-stream");

/**
Setup Watchers
**/

gulp.task('sass-component', function(){
  return gulp.src('./src/app/components/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(function(file){
      return file.base;
    }));
});

gulp.task("sc:watch", function(){
  gulp.watch('./src/app/components/**/*.scss', ['sass-component']);
});

//Builds sass files in the SCSS folder and outputs in css folder
gulp.task('sass', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});

//Watches the SCSS we modify for the application, calls the build task
gulp.task('sass:watch', function () {
  gulp.watch('./src/scss/*.scss', ['sass']);
});

//Build Tasks go here
//Builds scss files and puts them in a build folder
gulp.task('b_sass', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});

gulp.task("copy-html", function(){
  return gulp.src("./src/index.html")
    .pipe(gulp.dest("build"));
});

gulp.task("build", ["b_sass", "copy-html"]);

gulp.task("startup", ["sass", "sass-component"]);
gulp.task("default", ["startup", "sass:watch", "sc:watch"]);
