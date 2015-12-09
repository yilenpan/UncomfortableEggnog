var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server/app');

describe('Routes', function () {
  it('Should route to the root', function (done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
  it('Should route to packages', function (done) {
    request(app)
      .get('/packages')
      .expect(200, done);
  });
  it('Should return 404 to an incorrect package', function (done) {
    request(app)
      .get('/packages/999999999999')
      .expect(404, done);
  });
  it('Should return 404 to an incorrect package format', function (done) {
    request(app)
      .get('/packages/badpackage')
      .expect(404, done);
  });
  it('should return a 404 on a bad route', function (done) {
    request(app)
      .get('/dafsdfsadf')
      .expect(404, done);
  });
  it('should return a user when user route', function (done) {
    request(app)
      .get('/users/123')
      .expect(200, done);
  });
});
