const path = require('path');

module.exports = {
  entry: './project.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
