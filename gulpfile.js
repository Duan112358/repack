'use strict';

var path = require('path'),
    gulp = require('gulp'),
    replace = require('gulp-replace'),
    webpack = require('gulp-webpack-build');

var src = './',
    dest = '../bin/static/js',
    webpackOptions = {
        watchDelay: 200,
        isConfigFile: function(file) {
            return file && file.path.indexOf(webpack.config.CONFIG_FILENAME) >= 0;
        },
        isConfigObject: function(config) {
            return config && !config.ignore;
        },
        useMemoryFs: false
    };

gulp.task('webpack', function() {
    return gulp.src(src + webpack.config.CONFIG_FILENAME)
        .pipe(webpack.compile(webpackOptions))
        .pipe(webpack.format({
            version: false,
            timings: true
        }))
        .pipe(webpack.failAfter({
            errors: true,
            warnings: true
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('html', function(){
    // copy static assert 
   return gulp.src('index.html')
        .pipe(replace(/@@hash/g, Date.now()))
        .pipe(gulp.dest('build'));
});

gulp.task('asserts', function(){
    return gulp.src('static/images/**/*')
        .pipe(gulp.dest('builld'));
});

gulp.task('default', ['webpack'], function(){
    // nothing done
    // TODO: hotloader should configured
});

gulp.task('watch', function() {
    gulp.watch(path.join('./', '**/*.*')).on('change', function(event) {
        if (event.type === 'changed') {
            gulp.src(event.path)
                .pipe(webpack.closest())
                .pipe(webpack.watch(webpackOptions, function(stream, err, stats) {
                    stream
                        .pipe(webpack.proxy(err, stats))
                        .pipe(webpack.format({
                            verbose: true,
                            version: false
                        }))
                        .pipe(gulp.dest(dest));
                }));
        }
    });
});
