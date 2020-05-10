'use strict';
const { src, dest, watch, parallel, series } = require('gulp');
const sass = require('gulp-sass');
const gulpRemoveHtml = require('gulp-remove-html');
const uglify = require('gulp-uglify');

function sassComponent(cb){
  src('./src/app/components/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(function(file){
      return file.base;
    }));
  cb();
}

function scWatch(cb){
  watch('./src/app/components/**/*.scss', sassComponent);
  cb();
}

function sassCompile(cb){
  src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./src/css'));
  cb();
}

function sassWatch(cb){
  watch('./src/scss/*.scss', sassCompile);
  cb();
}

function bootstrap(cb){
  src('./src/scss/themes/*/bootstrap.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./src/css'));
  cb();
}

function buildSass(cb){
  src('./src/scss/*.scss')
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(dest('./build/css'));
  cb();
}

function copyHTML(cb){
  src("./src/index.html")
    .pipe(dest("build"));
  cb();
}

function buildBootstrap(cb){
  src('./src/scss/themes/*/bootstrap.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./build/css'));
  cb();
}

function prodIndex(cb){
  src('build/index.html')
    .pipe(gulpRemoveHtml())
    .pipe(dest('build'));
  cb();
}

exports.default = parallel(sassWatch, scWatch, bootstrap);
exports.build = series(buildSass, copyHTML, buildBootstrap, prodIndex);
exports.startup = series(sassCompile, sassComponent);


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

// gulp.task('sass-component', function(){
//   return gulp.
// });
//
// gulp.task("sc:watch", function(){
//   gulp.watch('./src/app/components/**/*.scss', ['sass-component']);
// });
//
// //Builds sass files in the SCSS folder and outputs in css folder
// gulp.task('sass', function () {
//   return gulp.src('./src/scss/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./src/css'));
// });
//
// //Watches the SCSS we modify for the application, calls the build task
// gulp.task('sass:watch', function () {
//   gulp.watch('./src/scss/*.scss', ['sass']);
// });
//
// //bootstrap css builder
// gulp.task("bootstrap", function(){
//   return gulp.src('./src/scss/themes/*/bootstrap.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./src/css'));
// })
//
// //Build Tasks go here
// //Builds scss files and puts them in a build folder
// gulp.task('b_sass', function () {
//   return gulp.src('./src/scss/*.scss')
//     .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
//     .pipe(gulp.dest('./build/css'));
// });
//
// gulp.task("copy-html", function(){
//   return gulp.src("./src/index.html")
//     .pipe(gulp.dest("build"));
// });
//
// gulp.task("b_bootstrap", function(){
//   return gulp.src('./src/scss/themes/*/bootstrap.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./build/css'));
// });
//
// // gulp.task("b_tsc", function(){
// //   return browserify({
// //     basedir:".",
// //     debug:true,
// //     entries:["src/main.ts"],
// //     cache:{},
// //     packageCache:{}
// //   })
// //   .plugin(tsify)
// //   .bundle()
// //   .pipe(source('main.js'))
// //   .pipe(buffer())
// //   .pipe(uglify())
// //   .pipe(gulp.dest("build/js"));
// // });
//
// gulp.task("prod-index", function(){
//   return gulp.src('build/index.html')
//     .pipe(gulpRemoveHtml())
//     .pipe(gulp.dest('build'));
// });
//
// //This is now in the ng build
// gulp.task("build", ["b_sass", "copy-html", "b_bootstrap", "prod-index"]);
//
// gulp.task("startup", ["sass", "sass-component"]);
// gulp.task("default", ["startup", "sass:watch", "sc:watch"]);
