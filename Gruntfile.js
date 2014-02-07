module.exports = function(grunt) {

	grunt.initConfig({

		// Parse this plugins `package.json` file for referencing below.
		pkg: grunt.file.readJSON('package.json'),

		// ### Script concatenation
		//
		//	Combines multiple Javascript files in to one.
		//
		//	If you're looking for a more modern / modular dependency management solution, have a gander at:
		//
		//	- Browserify
		//		- http://browserify.org/
		//		- https://npmjs.org/package/grunt-browserify
		//	- Webpack
		//		- https://github.com/webpack/webpack
		//		- https://npmjs.org/package/grunt-webpack
		concat: {

			// This is an arbitrarily-named target.
			// We can define as many as we want depending on our specific needs (e.g. styles, admin, etc.).
			scripts: {

				// This pattern will pull all files from the `js/src` directory...
				src: 'js/src/*.js',

				// ...and place it in to one mega-script named after the package (from packages.json)
				// In this case, `js/bu-navigation.dev.js`
				dest: 'js/<%= pkg.name %>.dev.js'
			}
		},

		// ### Script minification
		//
		// Courtesy of uglify-js (http://lisperator.net/uglifyjs/)
		uglify: {

			// Global configuration options for the uglify task.
			options: {

				// Don't replace variable names if it scares you.
				// mangle: false
			},
			scripts: {

				// Enables extra options used below (cwd).
				expand: true,

				// Set the current working directory
				// The src property below will be calculated relative to this
				cwd: 'js',

				// Extension to use for output files
				ext: '.js',

				// Using a glob here (*) to get all Javascript files in the `js` directory.
				src: '*.dev.js',

				// Place the minified files as the same directory as the source
				dest: 'js'
			}
		},

		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['js/*.dev.js', 'js/src/*.js'],
				tasks: ['concat', 'uglify']
			}
		}
	});

	// Load tasks provided by the Grunt plugins installed via NPM
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task.  Concatenate scripts and minify them.
	grunt.registerTask( 'default', ['concat', 'uglify'] );

};
