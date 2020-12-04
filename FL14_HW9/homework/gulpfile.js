const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const eslint = require('gulp-eslint')
const browserSync = require('browser-sync').create()




gulp.task('styles:build', function () {
    return gulp.src('./src/scss/*.scss') // берем все файлы scss
        .pipe(sourcemaps.init()) // инициализируем создание Source Maps
        .pipe(sass({ outputStyle: 'compressed' })) // компилируем сжатый файл .css
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write()) // пути для записи SourceMaps - в данном случае карта SourceMaps будет добавлена прям в данный файл main.min.css в самом конце
        .pipe(gulp.dest('./src/css')) // перемещение скомпилированного файла main.min.css в папку app/css
        .pipe(browserSync.reload({ stream: true }))
});



gulp.task('js:build', function () {
    return gulp.src('./src/js/*.js') // берем все файлы js
        .pipe(sourcemaps.init()) // инициализируем создание Source Maps
        .pipe(concat('index.js'))
        .pipe(babel()) // компилируем сжатый файл .css
        .pipe(uglify())//минифизируем файл
        .pipe(sourcemaps.write()) // пути для записи SourceMaps - в данном случае карта SourceMaps будет добавлена прям в данный файл main.min.css в самом конце
        .pipe(gulp.dest('./src/')) // перемещение скомпилированного файла main.min.css в папку app/css
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('img:minify', function () {
    return gulp.src('./src/img/*') // берем все файлы img
        .pipe(imagemin()) // инициализируем создание Source Maps
        .pipe(gulp.dest('./src/img-compressed')) // перемещение скомпилированного файла main.min.css в папку app/css
});


gulp.task('eslint', function () {
    return gulp.src('./src/js/indexMin.js') // берем все файлы img
        .pipe(eslint()) // eslint() attaches the lint output to the "eslint" property of the file object so it can be used by other modules.  
        .pipe(eslint.format())// eslint.format() outputs the lint results to the console. Alternatively use eslint.formatEach() (see Docs).   
        .pipe(eslint.failAfterError()) // To have the process exit with an error code (1) on lint error, return the stream and pipe to failAfterError last.
});


gulp.task('build', gulp.series('img:minify', 'js:build', 'styles:build'))


gulp.task('browser-init', function (done) {
    browserSync.init({
        server: {
            baseDir: "./src/",
            index: "index.html"
        }
    })
    done()
})

gulp.task('browser-sync', gulp.series('build', 'browser-init'))

gulp.task('watch', function (done) {
    gulp.watch('src/scss/*.scss', gulp.series('styles:build'));
    gulp.watch('./src/img/*', gulp.series('img:minify'));
    gulp.watch('./src/js/*', gulp.series('js:build'));
    gulp.watch("./src/index.html").on('change', browserSync.reload);
    done()
})
gulp.task('serve', gulp.series('browser-sync', 'watch'));



