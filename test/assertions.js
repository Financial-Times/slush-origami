/**
 * These are pre-written assertions intended to simplify the main spec file.
 */

const gulp = require('gulp');
const mockGulpDest = require('mock-gulp-dest')(gulp);

require('../slushfile');

process.env.NODE_ENV='test';

// These are files that are common across all tests
const commonFiles = Object.freeze([
	'demos/src/demo.mustache',
	'demos/src/pa11y.mustache',
	'.editorconfig',
	'.eslintrc.json',
	'.gitignore',
	'.travis.yml',
	'bower.json',
	'circle.yml',
	'CONTRIBUTING.md',
	'origami.json',
	'README.md',
]);

// These are mocked JS filenames
const jsFiles = Object.freeze([
	'demos/src/demo.js',
	`src/js/x-test.js`,
	'main.js',
]);

// These are mocked testing-related filenames
const testingFiles = Object.freeze([
	'test/helpers/fixtures.js',
	`test/x-test.spec.js`,
	'test/.eslintrc.json',
	'karma.conf.js',
]);

// These are mocked Sass-related filenames
const sassFiles = Object.freeze([
	'demos/src/demo.scss',
	'src/scss/_mixins.scss',
	'src/scss/_variables.scss',
	'main.scss',
]);

module.exports.itHasCommonFiles = done => {
	gulp.start('default')
	.once('task_stop', () => {
		mockGulpDest.assertDestContains(commonFiles);
		done();
	});
};

module.exports.itLacksCommonFiles = done => {
	gulp.start('default')
	.once('task_stop', () => {
		mockGulpDest.assertDestNotContains(commonFiles);
		done();
	});
};

module.exports.itHasTests = done => {
	gulp.start('default')
	.once('task_stop', () => {
		mockGulpDest.assertDestContains(testingFiles);
		done();
	});
};

module.exports.itLacksTests = done => {
	gulp.start('default')
	.once('task_stop', () => {
		mockGulpDest.assertDestNotContains(testingFiles);
		done();
	});
};

module.exports.itHasSass = done => {
	gulp.start('default')
	.once('task_stop', () => {
		mockGulpDest.assertDestContains(sassFiles);
		done();
	});
};

module.exports.itLacksSass = done => {
	gulp.start('default')
	.once('task_stop', () => {
		mockGulpDest.assertDestNotContains(sassFiles);
		done();
	});
};

module.exports.itHasJs = done => {
	gulp.start('default')
	.once('task_stop', () => {
		mockGulpDest.assertDestContains(jsFiles);
		done();
	});
};

module.exports.itLacksJs = done => {
	gulp.start('default')
	.once('task_stop', () => {
		mockGulpDest.assertDestNotContains(jsFiles);
		done();
	});
};
