var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server/app');
var db = require('../../server/db/db');
var helpers = require('../../server/helpers/helpers');
var _ = require('underscore');
var async = require('async');

var packages = _.range(30).map(function (x) {
  return {
    title: x + 'Dev Package',
    likes: x,
    dislikes: x,
    downloads: x,
    dateCreated: new Date(),
    description: 'all the commands you ever need',
    packageContents: JSON.stringify({
      'git push': 'git push origin master',
      'make folder apple': 'mkdir apple'
    })
  };
});

describe('Should talk to the db', function (done) {

  beforeEach(function (done) {
    db.User.create({
      username: 'Fred',
      password: '1234'
    }, function (err, save) {
      done();
    });
  });

  afterEach(function (done) {
    db.User.remove({}, function (err) {
      db.PackageEntry.remove({}, function (err) {
        done();
      });
    });
  });

  it('should retrieve the top10 packages in the db', function (done) {
    request(app)
      .get('/api/top10')
      .expect(200)
      .end(function (err, json) {
        json = json.body
        console.log(json.length);
        expect(json).to.be.an('array');
        expect(json.length).to.equal(10);
        expect(json[0]).to.have.property('downloads');
        expect(json[0].likes).to.equal(20)
        done();
      });
  });
  it('should return search results for search', function (done) {
    request(app)
      .post('/api/search')
      .send({
        searchTerm: 'devPackage'
      })
      .expect(200, done);
  });
});
