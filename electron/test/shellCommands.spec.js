var assert = require('assert');
var expect = require('chai').expect;
var exec = require('child_process').exec;
var electron = require('electron');
var ipcMain = electron.ipcMain;

describe('Shell Commands', function () {

  it('should execute the command in the terminal', function () {
    exec("echo hello world", function (error, stdout, stderr) {
      expect(stdout).to.equal('hello world\n');
    });
  });

  it('ipcMain is an object', function () {
    expect(ipcMain).to.be.an('object');
  });

});

describe('Spawn renderer process', function () {
  it('should be able to create a browser window', function (done) {
    var BrowserWindow = electron.BrowserWindow;
    var mainWindow = new BrowserWindow({
      width: 800,
      height: 600
    });
    expect(mainWindow.id).to.not.equal(undefined);
    done();
  });
});