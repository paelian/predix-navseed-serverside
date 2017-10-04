'use strict';

// -------------------------------------
//   Task: Watch: Public
// -------------------------------------

module.exports = function(gulp) {
  return function() {
    gulp.watch(['public/styles/**/*.scss', 'public/*.scss'], ['compile:sass']);
    gulp.watch(['./public/index.html'],
    ['compile:index']);
  };
};
