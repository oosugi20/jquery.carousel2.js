module.exports = (grunt) ->

  grunt.task.loadNpmTasks 'grunt-contrib-concat'
  grunt.task.loadNpmTasks 'grunt-contrib-uglify'
  grunt.task.loadNpmTasks 'grunt-contrib-watch'
  grunt.task.loadNpmTasks 'grunt-growl'
  grunt.task.loadNpmTasks 'grunt-shell'

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    banner: """
/*! <%= pkg.name %> (<%= pkg.repository.url %>)
* <%= pkg.description %>
 * lastupdate: <%= grunt.template.today("yyyy-mm-dd") %>
 * version: <%= pkg.version %>
 * author: <%= pkg.author %>
 * License: MIT
 */

"""

    growl:
      ok:
        title: 'Grunt OK'
      css:
        title: 'CSS compiled'
      js:
        title: 'JS compiled'
      build:
        title: 'Build completed'
      deploy:
        title: 'Deploy completed'

    concat:
      main:
        options:
          banner: '<%= banner %>'
        files: [
          'dist/jquery.carousel.js': 'src/jquery.carousel.js'
        ]

    uglify:
      main:
        options:
          banner: '<%= banner %>'
        files: [
          'dist/jquery.carousel.min.js': 'src/jquery.carousel.js'
        ]

    shell:
      reload:
        command: 'osascript -e \'tell application "Google Chrome" to reload active tab of window 1\''

    watch:
      html:
        files: [ 'demos/**/*.html' ]
        tasks: [
          'shell:reload'
        ]
      js:
        files: [ 'src/**/*.js' ]
        tasks: [
          'concat:main'
          'uglify:main'
          'shell:reload'
          'growl:js'
        ]


  grunt.registerTask 'build', [
    'concat'
    'uglify'
    'growl:build'
  ]

  grunt.registerTask 'default', [
    'build'
  ]
