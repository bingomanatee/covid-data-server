const app = require('../../src/app');

describe('\'s3\' service', () => {
  it('registered the service', () => {
    const service = app.service('s3');
    expect(service).toBeTruthy();
  });
});
