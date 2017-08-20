module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            'public/javascripts/bundle.js': ['public/javascripts/monitor.js']
        }
    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify']);
};