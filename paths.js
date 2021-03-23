const path = require('path');

exports.default = {
  outputDir: path.resolve(__dirname, 'lib'),
  modalTemplate: path.resolve(__dirname, 'src', '_modal-template.html'),
  entriesRootDir: path.resolve(__dirname, 'src', 'entries'),
};
