module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    browserify: {
      dist: {
        files: {
          'dist/newtab.js': ['src/**/*.js', 'src/**/*.jsx']
        },
        options: {
          transform: ['reactify']
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/**/*.js', 'src/**/*.jsx'],
        tasks: ['browserify'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['watch']);
};
