var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server/app');
var db = require('../../server/db/db');

describe('auth', function (done) {
  var token;
  before(function (done) {
    db.User.remove({}, function (err) {
      request(app)
        .post('/signup')
        .send({
          username: 'Mitchell',
          password: '1234'
        })
        .expect(200)
        .end(function (err, data) {
          done();
        });
    });
  });
  beforeEach(function (done) {
    request(app)
      .post('/login')
      .send({
        username: 'Mitchell',
        password: "1234"
      })
      .expect(200)
      .end(function (err, data) {
        token = data.body.token;
        done();
      });
  });
  after(function (done) {
    db.User.remove({}, function (err) {
      done();
    });
  });
  it('should allow user to add packages', function (done) {
    request(app)
      .post('/packages')
      .set('token', token)
      .send({
        title: "Kyle Cho Package",
        description: "Kyle Cho Package",
        packageContents: {
          "dasd" : "dsa"
        }
      })
      .expect(301)
      .end(function (err, data) {
        expect(data.body.title).to.equal('Kyle Cho Package');
        done();
      });
  });
  it('should error when non user to add packages', function (done) {
    var badToken = 'adfdsf';
    request(app)
      .post('/packages')
      .set('token', badToken)
      .send({
        title: "Kyle Cho Package",
        description: "Kyle Cho Package",
        packageContents: {
          "dasd" : "dsa"
        }
      })
      .expect(400)
      .end(function (err, data) {
        console.log(data.body);
        done();
      });
  });
});
