var compressor = require('node-minify');
compressor.minify({
  compressor: 'uglifyjs',
  input: './src/AdminOnSteroids.js',
  output: 'AdminOnSteroids.min.js',
  callback: function (err) {
      if (err) console.log(err);
      else{
          console.log('JS minified');
      }
  }
});

compressor.minify({
    compressor: 'clean-css',
    input: 'AdminOnSteroids.css',
    output: 'AdminOnSteroids.css',
    callback: function (err) {
        if (err) console.log(err);
        else {
            console.log('CSS minified');
        }
    }
});