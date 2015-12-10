module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['electron/test/**/*.js']
      }
    },
    docco: {
      debug: {
        src: ['electron/**/*.js'],
        options: {
          output: 'docs/'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-docco');

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('docs', [
    'docco'
  ]);
};
