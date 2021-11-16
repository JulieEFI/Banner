const { src, dest, watch, parallel, series } = require('gulp');

const scss         = require('gulp-sass'); // передала переменной настройки галп
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const del          = require('del')

function browsersync() {
    browserSync.init({
        server : {
            baseDir: 'app/'
        }
    });

}

function cleanDist() {
    return del('dist')
}

function images() {
    return src('app/images/**/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/images'))
}

function scripts () {
    return src([
       'node_modules/jquery/dist/jquery.js',
       'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function styles() {
    return src('app/scss/style.scss')
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
    }))
    .pipe(scss({outputStyle: 'compressed'}))//expanded чтоб было на одной строке в css
    .pipe(concat('style.min.css'))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())

} // функция, которая конвертирует стили

function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], {base:'app'}) 
    .pipe(dest('dist'))
}
function watching() {
    watch(['app/scss/**/*.scss'], styles);// слежка за всеми внутренними файлами с расширением .scss в папке scss и запускал styles
    watch(['app/js/main.js', '!app/js/main.min.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles; // благодаря стайлс могу выполнить функцию
exports.watching = watching;
exports.browsersync = browsersync;
exports.default = scripts;
exports.images = images; 
exports.cleanDist = cleanDist;


exports.build = series(cleanDist, images, build);
exports.default = parallel(scripts, browsersync, watching);