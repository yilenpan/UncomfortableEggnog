var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server/app');

describe('Routes', function () {
  it('Should route to the root', function (done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
  // it('Should route to packages', function (done) {
  //   request(app)
  //     .get('/packages')
  //     .expect(200, done);
  // });
});
