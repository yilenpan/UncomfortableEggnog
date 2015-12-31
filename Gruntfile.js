module.exports = function (grunt) {


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      test: {
        options: {
          reporter: 'nyan'
        },
        src: ['test/**/*.js']
      }
    },
<<<<<<< HEAD
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },
    sass: {
      dist: {
        files: {
          'client/assets/styles/packages/package.styles.css': 'client/assets/styles/packages/package.styles.scss',
          'client/assets/styles/landing/landing.styles.css': 'client/assets/styles/landing/landing.styles.scss',
          'client/assets/styles/rating/rating.styles.css': 'client/assets/styles/rating/rating.styles.scss',
          'client/assets/styles/nav/navbar.styles.css': 'client/assets/styles/nav/navbar.styles.scss',
          'client/assets/styles/signup/signup.styles.css': 'client/assets/styles/signup/signup.styles.scss',
          'client/assets/styles/index.styles.css': 'client/assets/styles/index.styles.scss',
          'client/assets/styles/color-palette.css': 'client/assets/styles/color-palette.scss',
          'client/assets/styles/effects-mixins.css': 'client/assets/styles/effects-mixins.scss'

        }
      }
    },

=======
>>>>>>> 08350805f48f466c582041a5fd2ad0c4ccd29fbc
    docco: {
      debug: {
        src: ['electron/**/*.js'],
        options: {
          output: 'docs/'
        }
      }
    },
<<<<<<< HEAD
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
=======
    shell: {
      options: {
        stderr: false
      },
      build: {
        command: 'electron-packager . Jarvis --platform=darwin --arch=x64 --version=0.35.4 --icon=./app/assets/icons/jarvis.icns --overwrite; cp ./app/assets/icons/jarvis.icns ./Jarvis-darwin-x64/Jarvis.app/Contents/Resources/atom.icns'
      },
      dev: {
        command: 'NODE_ENV=DEV electron .'
>>>>>>> 08350805f48f466c582041a5fd2ad0c4ccd29fbc
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-docco');
<<<<<<< HEAD
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

=======
  grunt.loadNpmTasks('grunt-shell');
>>>>>>> 08350805f48f466c582041a5fd2ad0c4ccd29fbc

  grunt.registerTask('test', [
    'mochaTest'
  ]);

<<<<<<< HEAD
  grunt.registerTask('run', ['sass',
    'nodemon'
  ]);

  grunt.registerTask('watch-sass', ['sass',
    'watch'
  ]);

  grunt.registerTask('deploy', [
    'test',
    'run'
=======
  grunt.registerTask('docs', [
    'docco'
  ]);

  grunt.registerTask('build', [
    'shell:build'
>>>>>>> 08350805f48f466c582041a5fd2ad0c4ccd29fbc
  ]);
  grunt.registerTask('dev', [
    'shell:dev'
  ]);


  // grunt.registerTask('default',['watch']);

};
