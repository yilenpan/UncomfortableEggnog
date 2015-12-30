module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
    sass: {
      dist: {
        files: {
          'client/assets/styles/packages/package.styles.css': 'client/assets/styles/packages/package.styles.scss',
          'client/assets/styles/color-palette.css': 'client/assets/styles/color-palette.scss'
        }
      }
    },

    docco: {
      debug: {
        src: ['client/*.js', 'server/**/*.js'],
        options: {
          output: 'docs/'
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('run', ['sass',
    'nodemon'
  ]);

  grunt.registerTask('watch-sass', ['sass',
    'watch'
  ]);

  grunt.registerTask('deploy', [
    'test',
    'run'
  ]);

  // grunt.registerTask('default',['watch']);

};
