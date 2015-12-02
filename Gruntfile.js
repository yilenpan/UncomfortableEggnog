module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.JSON'),
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },
    docco: {
      debug: {
        src: ['client/*.js', 'server/**/*.js'],
        options: {
          output: 'docs/'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-docco');

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('run', [
    'nodemon'
  ]);

  grunt.registerTask('deploy', [
    'test',
    'run'
  ]);

};
