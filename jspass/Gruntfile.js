/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-7-29
 * Time: 上午11:31
 *
 */
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        uglify: {
            build: {
                src: 'src/test.js',
                dest: 'build/test.min.js'
            }
        }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Default task(s).
    grunt.registerTask('default', ['uglify']);
};