'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  gulpRemoveHtml = require('gulp-remove-html');
  // path = require('path'),
  // browserify = require("browserify"),
  // source = require("vinyl-source-stream"),
  // typescript = require("gulp-typescript"),
  // tsify = require("tsify"),
  // uglify = require("gulp-uglify"),
  // sourcemaps = require('gulp-sourcemaps'),
  // buffer = require('vinyl-buffer');

//var tsProject = typescript.createProject("src/tsconfig.json");

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

//bootstrap css builder
gulp.task("bootstrap", function(){
  return gulp.src('./src/scss/themes/*/bootstrap.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
})

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

gulp.task("b_bootstrap", function(){
  return gulp.src('./src/scss/themes/*/bootstrap.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});

// gulp.task("b_tsc", function(){
//   return browserify({
//     basedir:".",
//     debug:true,
//     entries:["src/main.ts"],
//     cache:{},
//     packageCache:{}
//   })
//   .plugin(tsify)
//   .bundle()
//   .pipe(source('main.js'))
//   .pipe(buffer())
//   .pipe(uglify())
//   .pipe(gulp.dest("build/js"));
// });

gulp.task("prod-index", function(){
  return gulp.src('build/index.html')
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest('build'));
});

//This is now in the ng build
gulp.task("build", ["b_sass", "copy-html", "b_bootstrap", "prod-index"]);

gulp.task("startup", ["sass", "sass-component"]);
gulp.task("default", ["startup", "sass:watch", "sc:watch"]);
