var gulp = require('gulp')
var uglify = require('gulp-uglify')
var gutil = require('gulp-util')
var rename = require('gulp-rename')
var clean = require('gulp-clean')
var notify = require('gulp-notify')
var tinylr = require('tiny-lr')
var server = tinylr()
var port = 35729

var __SRC__ = {
  js: './src/js/*.js'
}

var __DST__ = './dist/labc-feedback/'

gulp.task('js', function() {
  gulp.src(__SRC__.js)
    .pipe(uglify())
    .on('error', function(err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString())
    })
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(__DST__))
    .pipe(notify('js task is finish'))
})

gulp.task('clean', function() {
  gulp.src([__DST__], {
      read: false
    })
    .pipe(clean())
    .pipe(notify('clean task is finish'))
})

gulp.task('default', ['clean'], function() {
  gulp.start('js')
})

gulp.task('watch', function() {
  server.listen(port, function(err) {
    if (err) return console.log(err)
    gulp.watch(__SRC__.js, function() {
      gulp.run('js')
    })
  })
})
