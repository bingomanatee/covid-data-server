// Initializes the `s3` service on path `/s3`
const { S3 } = require('./s3.class');
const hooks = require('./s3.hooks');
const { getBase64DataURI } = require('dauria');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('s3', new S3(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('s3');
  
  const blob = {
    buffer: Buffer.from('hello foo'),
    id: 'foo/bar'
  };

  service.create(blob).then((result) => {
    console.log('crated blob with id ', result.id);
  }).catch (err => {
    console.log('blob error: ' ,err);
  })
  service.hooks(hooks);
};
