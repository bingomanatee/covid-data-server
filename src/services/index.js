const s3 = require('./s3/s3.service.js');
const csvFiles = require('./csv-files/csv-files.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(s3);
  app.configure(csvFiles);
};
