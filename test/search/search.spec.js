var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server/app');
var db = require('../../server/db/db');
var User = require('../../server/db/db').User;
var PackageEntry = require('../../server/db/db').PackageEntry;
var searchPackages = require('../../server/helpers/helpers').searchPackages;

describe('search', function (done) {
  before(function (done) {
    var packages = [
      {
        title: "Nest Package",
        reviews: [
          "One of the best packages ever",
          "I love this package!"
        ],
        description: "The essential nest package",
        packageContents: {
          "hello": "world"
        }
      },
      {
        title: "Kyle Cho Package",
        reviews: [
          "One of the best packages ever",
          "I love this package!"
        ],
        description: "The essential nest package",
        packageContents: {
          "hello": "world"
        }
      },
      {
        title: "Coffee Package",
        reviews: [
          "One of the best packages ever",
          "I love this package!"
        ],
        description: "The essential nest package",
        packageContents: {
          "hello": "world"
        }
      },
      {
        title: "Ninja security package",
        reviews: [
          "One of the best packages ever",
          "I love this package!"
        ],
        description: "The essential nest package",
        packageContents: {
          "hello": "world"
        }
      }
    ];
    var fred = new User({
      username: "freddy",
      password: '1234',
      email: "freddy@fred.com",
      "first name": "fred",
      "last name": "ballers",
      website: "www.fred.io",
      facebook: {
        id: "123",
        token: "1234",
        name: "fred ballers"
      }
    });
    fred.save(function (err, user) {
      if (err) {
        console.log(err);
      } else {
        var batchPackages = packages.map(function (pkg) {
          pkg.userId = user.id;
          return pkg;
        });
        PackageEntry.collection.insert(batchPackages, function (err, save) {
          console.log('Packages added');
          done();
        });
      }
    });
  });

  after(function (done) {
    User.remove({}, function () {
      PackageEntry.remove({}, function () {
        done();
      });
    });
  });

  it('before should add our packages', function (done) {
    PackageEntry.find({}, function (err, data) {
      console.log(data);
      done();
    });
  });
  it('should return the nest package when we search for it', function (done) {
    searchPackages('Nest', function (err, data) {
      expect(data.length).to.equal(1);
      done();
    });
  });
});
