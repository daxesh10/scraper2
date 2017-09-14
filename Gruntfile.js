


module.exports = function(grunt) {
    grunt.initConfig({
        nightwatch: {
            options: {

                standalone:true

            },
            dev:{

                src_folders: 'tests',
                output_folder: 'report',
              // "launch_url":"https://duckduckgo.com"
            }
        }
    });

    grunt.loadNpmTasks('grunt-nightwatch');
    grunt.registerTasks('default',['nightwatch:dev']);
};