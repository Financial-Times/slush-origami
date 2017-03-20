/**
 * Spec for Slush Origami
 */

const mockPrompt = require('./inquirer-prompt-fixture');
const gulp = require('gulp');
const mockGulpDest = require('mock-gulp-dest')(gulp);
const uuid = require('uuid/v4');

require('../slushfile');

const commonFiles = Object.freeze([ // These are files that are common across all tests
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

describe('Origami Slush generator', () => {
	describe('JS + Sass + Markup', () => {
		describe('ES6 class style', () => {
			describe('Proclaim-style assertions', () => {
				let componentName;
				beforeEach(() => {
					componentName = `o-${uuid()}`;
					mockPrompt({
						componentName: componentName,
						hasSass: true,
						hasJs: true,
						style: 'class',
						assertions: 'Proclaim',
					});
				});

				it('scaffolds out common files', done => {
					gulp.start('default')
					.once('task_stop', () => {
						console.log('herrrr');
						mockGulpDest.assertDestContains(commonFiles);
						done();
					});
				});

				it('scaffolds testing-related files', done => {
					gulp.start('default')
					.once('task_stop', () => {
						mockGulpDest.assertDestContains([
							'test/helpers/fixtures.js',
							`test/${componentName}.spec.js`,
							'test/.eslintrc.json',
						]);
						done();
					});
				});

				it('scaffolds out sass-related files', done => {
					gulp.start('default')
					.once('task_stop', () => {
						mockGulpDest.assertDestContains([
							'demos/src/demo.scss',
							'src/scss/mixins.scss',
							'src/scss/variables.scss',
							'main.scss',
						]);
						done();
					});
				});

				it('scaffold component JS', done => {
					gulp.start('default')
					.once('task_stop', () => {
						mockGulpDest.assertDestContains([
							'demos/src/demo.js',
							`src/js/${componentName}.js`,
							'main.js',
						]);
						done();
					});
				});
			});
		});
	});
});
