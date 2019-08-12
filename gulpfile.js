const gulp = require ('gulp');
const sass = require ('gulp-sass');
const browsersync = require ('browser-sync').create();
const autoprefixer = require ('gulp-autoprefixer');
const uglify = require ('gulp-uglify');
const concat = require ('gulp-concat');

gulp.task("style", function(){
  return gulp.src(["./src/scss/**/*.scss"])
  .pipe(sass())
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(autoprefixer())
  .pipe(gulp.dest("./src/css"))

});

gulp.task("script", function(){
  return gulp.src(["./devjs/js/**/*.js"])
  .pipe(uglify())
  .pipe(concat('app.js'))
  .pipe(gulp.dest('js'));
})

gulp.task("serve", function(){
  browsersync.init({
    server : {
      baseDir: './src'
    }
  })

  gulp.watch("./src/scss/**/*.scss", gulp.series("style"));
  gulp.watch('devjs/**/*.js',gulp.series("script"));
  gulp.watch("./src/css/**/*.css").on("change", browsersync.reload);
  gulp.watch("./src/index.html").on("change", browsersync.reload);


});
