
/* ************************************************************************** */

/**
 * Gulpfile for Joose Table Component
 */

'use strict';

/* ************************************************************************** */

/* GULP CONFIG */

/* Dependencies */

// gulp itself
var gulp = require('gulp');

// css
var sass = require('gulp-sass');

// js
// var babel = require('gulp-babel');
// var eslint = require('gulp-eslint');

// compilation utilities
var csscomb = require('gulp-csscomb');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
// var concat = require('gulp-concat');
// var browserify = require('browserify');

// helpers
var watch = require('gulp-watch');

// utilities
var shell = require('gulp-shell');

/* ************************************************************************** */

/* Variables */
var allFilesInAllFolders = '/**/*';
var directories = {
    cssSrc: './src/css',
    cssDist: './dist/css',
    jsSrc: './src/css',
    jsDist: './dist/js'
}
var files = {
    cssDist: 'style.css',
    jsDist: 'joose-table.min.js'
}
var fileExtensions = {
    sass: '.scss',
    js: '.js'
}
var supportedBrowsersList = [
    'last 2 versions', // the last 2 versions for each major browser
    'IE >= 9'
];

/* ************************************************************************** */

/* CSS */

gulp.task('csscomb', function () {
    gulp.src(
        directories.cssSrc + allFilesInAllFolders + fileExtensions.sass,
        {base: './'}
    )
    .pipe( csscomb() )
    .pipe( gulp.dest('./') );
});

/**
 * Task to compile Sass
 */
gulp.task('sass', ['csscomb'], function() {
    return gulp.src( directories.cssSrc + allFilesInAllFolders + fileExtensions.sass )
        .pipe( sourcemaps.init() )
        .pipe(
            sass({
                includePaths: [
                    './node_modules/reset-css'
                ],
                outputStyle: 'compressed'
            })
            .on('error', sass.logError)
        )
        .pipe(postcss(
            [
                autoprefixer({
                    browsers: supportedBrowsersList
                })
            ]
        ))
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( directories.cssDist ) );
});

/* ************************************************************************** */

/* JS */

// to add source maps

/*
gulp.task("js", ['eslint'], function () {
  browserify("app/src/js/app.js")
    .transform('babelify', {presets: ["es2015", "react"]})
    .bundle()
    .pipe(fs.createWriteStream("app/dist/js/app.js"));
});

// es2015 linting
gulp.task('eslint', function() {
    return gulp.src(['app/src/js/** /*.babel.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});
*/

/* ************************************************************************** */

/* PROCESSING */

/**
 * Task to watch for changes in files and trigger events
 */
gulp.task('start-watch', function() {

    // watch for css changes
    var cssWatcher = watch(
        [
            directories.cssSrc + allFilesInAllFolders + fileExtensions.sass
        ],
        function() {
            cssWatcher.unwatch(directories.cssSrc + allFilesInAllFolders + fileExtensions.sass)
            gulp.start('watch');
        }
    );

    // watch for js changes
    /* watch(['app/src/js/** /*.js'], function() {
        gulp.start('js');
    });*/

});

gulp.task('watch', ['sass'], shell.task([
    'gulp start-watch'
]))

/* ************************************************************************** */