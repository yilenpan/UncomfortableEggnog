var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server/app');
var db = require('../../server/db/db');
var helpers = require('../../server/helpers/helpers');
var _ = require('underscore');
var async = require('async');

var packages = _.range(30).map(function (x) {
  return {
    title: x + ' Dev Package',
    description: 'all the commands you ever need',
    packageContents: JSON.stringify({
      'git push': 'git push origin master',
      'make folder apple': 'mkdir apple'
    })
  };
});

describe('Should talk to the db', function (done) {
  var token;
  before(function (done) {
    db.User.remove({}, function (err) {
      request(app)
        .post('/signup')
        .send({
          username: 'Fred',
          password: '1234'
        })
        .expect(200)
        .end(function (err, data) {
          token = data.body.token;
          done();
        });
    });
  });

  beforeEach(function (done) {
    async.map(packages, function (packageE, cb) {
      helpers.savePackage('Fred', packageE, cb);
    }, function (err, data) {
      done();
    });
  });

  afterEach(function (done) {
    db.PackageEntry.remove({}, function (err) {
      done();
    });
  });

  after(function (done) {
    db.User.remove({}, function (err) {
      done();
    });
  });

  it('should add create a package and we should be able to find it', function (done) {
    helpers.savePackage('Fred', {
      title: 'Kyle Cho Package',
      description: 'kyle cho\'s personal commands',
      packageContents: JSON.stringify({
        'git push': 'git push origin master',
        'make folder apple': 'mkdir apple'
      })
    }, function (err, data) {
      request(app)
        .post('/api/search')
        .set('token', token)
        .send({searchTerm: 'Cho'})
        .expect(200, function (err, data) {
          var json = data.body;
          expect(json.length).to.equal(1);
          expect(json[0].title).to.equal('Kyle Cho Package');
          done();
        });
    });
  });
  it('should retrieve the top10 packages in the db', function (done) {
    request(app)
      .get('/api/top10')
      .set('token', token)
      .expect(200)
      .end(function (err, json) {
        json = json.body;
        expect(json).to.be.an('array');
        expect(json.length).to.equal(10);
        expect(json[0]).to.have.property('downloads');
        expect(json[0]).to.have.property('likes');
        expect(json[0]).to.have.property('dislikes');
        expect(json[0]).to.have.property('dateCreated');
        done();
      });
  });
  it('should return search results for search', function (done) {
    request(app)
      .post('/api/search')
      .set('token', token)
      .send({
        searchTerm: '10'
      })
      .expect(200)
      .end(function (err, json) {
        json = json.body;
        expect(json).to.be.an('array');
        expect(json[0].title).to.equal('10 Dev Package');
        done();
      });
  });
  it('should return all packages from user', function (done) {
    request(app)
      .get('/api/users/Fred/packages')
      .set('token', token)
      .expect(200)
      .end(function (err, data) {
        var json = data.body;
        expect(json).to.be.an('array');
        expect(json.length).to.equal(30);
        done();
      });
  });
  it('should let you edit packages', function (done) {
    var packageEdit = packages[10];
    db.PackageEntry.findOne({title: '10 Dev Package'}, function (err, res) {
      packageEdit.title = "KyleChoAwesome";
      packageEdit.id = res._id;
      request(app)
        .post('/api/package/10 Dev Package/edit')
        .set('token', token)
        .send(packageEdit)
        .expect(201)
        .end(function (err, data) {
          expect(data.body.title).to.equal("KyleChoAwesome");
          request(app)
            .get('/api/package/' + "KyleChoAwesome")
            .set('token', token)
            .expect(200)
            .end(function (err, data) {
              var json = data.body;
              expect(json.package.title).to.equal("KyleChoAwesome");
              done();
            });
        });
    });
  });

});
