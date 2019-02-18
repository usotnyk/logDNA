"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cssnano = require("cssnano");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// CSS task
function css() {
  return gulp
    .src("./assets/css/main.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist"))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./dist"))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./assets/css/**/*", css);
  gulp.watch(
    [
      "./**/*"
    ],
    gulp.series(browserSyncReload)
  );
}

// define complex tasks
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.css = css;
exports.watch = watch;
exports.default = watch;