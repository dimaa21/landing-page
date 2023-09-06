const gulp = require('gulp'),
    minifyCSS= require('gulp-clean-css'), // для мініфікації CSS файлів
    rename= require('gulp-rename'),
    sass = require('gulp-sass')(require('sass')),
    minifyJS = require('gulp-minify'),
    browserSync = require('browser-sync').create();

/* Мініфікація CSS файлів */
gulp.task('minCSS', async function(){
  gulp.src('app/css/*.scss') // виберіть файли, які потрібно перемістити
      .pipe(sass())
      .pipe(minifyCSS())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('public/css')) // вказати цільову директорію переміщення
      .pipe(browserSync.stream()); // ф-ц передає дані в браузер сінк і оновлює сторінку
});

/* Мініфікація JS файлів */
gulp.task('minJS', async function(){
  gulp.src('app/js/main.js') // виберіть файли, які потрібно перемістити
      .pipe(minifyJS())
      .pipe(gulp.dest('public/js')) // вказати цільову директорію переміщення
      .pipe(browserSync.stream());
});

/*  Відслідкування змін в файлах */
gulp.task('watchAll', function () {
    gulp.watch("app/css/*.scss", gulp.series('minCSS'));
    // series - допомагає виконувати задачі почерзі
    gulp.watch("app/js/*.js", gulp.series('minJS'));
});

/* Для автоматичної синхронізації оновлення сторінки */
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./*.html").on('change',
    browserSync.reload);
});

/* Таск завдяки якому можна запускати 2таски одночасно */
gulp.task('default', gulp.parallel('browserSync', 'watchAll'));