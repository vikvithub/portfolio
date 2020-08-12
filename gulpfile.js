const {series, parallel, watch, src, dest} = require('gulp');
const
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpIf = require('gulp-if'),
    del = require('del'),
    newer = require('gulp-newer'), // checks dist directory, returns only new obj to pipeline
    plumber = require('gulp-plumber'), // for merging streams, has own "pipe" method
    autoprefixer = require('gulp-autoprefixer'),
    data = require('gulp-data')

    /*-----------DEVELOPMENT----------------*/
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create(),

    /*--------------PRODUCTION---------------*/
    cleanCSS = require('gulp-clean-css'), //minifies css
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    rev = require('gulp-rev'), //set hashes to filename (to avoid caching old style for users)
    uglify = require('gulp-uglify');

const sassFiles = ['src/styles/**/*.scss'];
const pagesFiles = ['src/pages/**/*.pug']
const templatesFiles = ["./src/templates/**/*.pug"];
const imageFiles = ["src/images/**/*"];
const javascriptFiles = ["src/js/**/*.js"];

const isLive = process.env.NODE_ENV === 'live';

function buildPug() {
    return src(pagesFiles)
        .pipe(plumber({
            errorHandler: notify.onError() // error handler has each next stream
        }))
        .pipe(gulpIf(!isLive, sourcemaps.init()))
        .pipe(data(file =>  { require }))
        .pipe(pug())
        .pipe(htmlmin())
        .pipe(gulpIf(!isLive, sourcemaps.write()))
        .pipe(dest('./dist'))
}


function buildSass() {
    return src(sassFiles)
        .pipe(plumber({
            errorHandler: notify.onError() // error handler has each next stream
        }))
        .pipe(gulpIf(!isLive, sourcemaps.init()))
        .pipe(sass({includePaths: ['node_modules']}))
        .pipe(autoprefixer())
        .pipe(gulpIf(isLive, cleanCSS()))
        .pipe(gulpIf(isLive, rev()))
        .pipe(gulpIf(!isLive, sourcemaps.write()))
        .pipe(dest('dist/assets/css/'))
        .pipe(gulpIf(isLive, rev.manifest('css.json')))
        .pipe(gulpIf(isLive,dest('manifest')))
}

function image() {
    return src(imageFiles)
        .pipe(newer('./dist/assets/images'))
        .pipe(imagemin())
        .pipe(dest('./dist/assets/images/'))
}

function javascript() {
    return src(javascriptFiles)
        .pipe(plumber({
            errorHandler: notify.onError() // error handler has each next stream
        }))
        .pipe(gulpIf(!isLive, sourcemaps.init()))
        .pipe(gulpIf(isLive, uglify()))
        .pipe(gulpIf(!isLive, sourcemaps.init()))
        .pipe(dest('./dist/assets/js/'))
}

function clean() {
    return del('./dist')
}

function serve() {
    browserSync.init({
        server: {baseDir: "./dist"},
        port: "3000"
    });
    browserSync.watch('./dist/**/*.*').on('change', browserSync.reload);

    watch(templatesFiles, buildPug);
    watch(pagesFiles, buildPug);
    watch(sassFiles, buildSass);
    watch(imageFiles, image);
    watch(javascriptFiles, javascript);
}


const build = series(
    clean,
    parallel(
        series(buildPug),
        buildSass,
        image,
        javascript,
    )
);

exports.clean = clean;
exports.sass = sass;
exports.build = build;
exports.default = series(build, serve);
