// Initializes the `csv-files` service on path `/csv-files`
const { CsvFiles } = require('./csv-files.class');
const hooks = require('./csv-files.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/csv-files', new CsvFiles(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('csv-files');

  service.hooks(hooks);
};
