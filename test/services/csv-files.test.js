const app = require('../../src/app');

describe('\'csv-files\' service', () => {
  it('registered the service', () => {
    const service = app.service('csv-files');
    expect(service).toBeTruthy();
  });
});
