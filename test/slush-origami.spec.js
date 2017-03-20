/**
 * Spec for Slush Origami
 */

const mockPrompt = require('./inquirer-prompt-fixture');
const gulp = require('gulp');
const mockGulpDest = require('mock-gulp-dest')(gulp);
const uuid = require('uuid/v4');

process.env.NODE_ENV='test';

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

// WARNING -- this is a really big monolithic spec.
// It's recommended to use code folding to make sense of it.
// I tried to get every main permutation of the logic exercised.
// @TODO break this into multiple files or simplify logic.

describe('Origami Slush generator', function () {
	this.timeout(20000);

	// EVERYTHING
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

				it('scaffolds sass-related files', done => {
					gulp.start('default')
					.once('task_stop', () => {
						mockGulpDest.assertDestContains([
							'demos/src/demo.scss',
							'src/scss/_mixins.scss',
							'src/scss/_variables.scss',
							'main.scss',
						]);
						done();
					});
				});

				it('scaffolds component JS', done => {
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
			describe('Chai-style assertions', () => {
				let componentName;
				beforeEach(() => {
					componentName = `o-${uuid()}`;
					mockPrompt({
						componentName: componentName,
						hasSass: true,
						hasJs: true,
						style: 'class',
						assertions: 'Chai',
					});
				});

				it('scaffolds out common files', done => {
					gulp.start('default')
					.once('task_stop', () => {
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

				it('scaffolds sass-related files', done => {
					gulp.start('default')
					.once('task_stop', () => {
						mockGulpDest.assertDestContains([
							'demos/src/demo.scss',
							'src/scss/_mixins.scss',
							'src/scss/_variables.scss',
							'main.scss',
						]);
						done();
					});
				});

				it('scaffolds component JS', done => {
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

		describe('Stateless/functional style', () => {
			describe('Proclaim-style assertions', () => {
				let componentName;
				beforeEach(() => {
					componentName = `o-${uuid()}`;
					mockPrompt({
						componentName: componentName,
						hasSass: true,
						hasJs: true,
						style: 'function',
						assertions: 'Proclaim',
					});
				});

				it('scaffolds out common files', done => {
					gulp.start('default')
					.once('task_stop', () => {
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

				it('scaffolds sass-related files', done => {
					gulp.start('default')
					.once('task_stop', () => {
						mockGulpDest.assertDestContains([
							'demos/src/demo.scss',
							'src/scss/_mixins.scss',
							'src/scss/_variables.scss',
							'main.scss',
						]);
						done();
					});
				});

				it('scaffolds component JS', done => {
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

			describe('Chai-style assertions', () => {
				let componentName;
				beforeEach(() => {
					componentName = `o-${uuid()}`;
					mockPrompt({
						componentName: componentName,
						hasSass: true,
						hasJs: true,
						style: 'class',
						assertions: 'Chai',
					});
				});

				it('scaffolds out common files', done => {
					gulp.start('default')
					.once('task_stop', () => {
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

				it('scaffolds sass-related files', done => {
					gulp.start('default')
					.once('task_stop', () => {
						mockGulpDest.assertDestContains([
							'demos/src/demo.scss',
							'src/scss/_mixins.scss',
							'src/scss/_variables.scss',
							'main.scss',
						]);
						done();
					});
				});

				it('scaffolds component JS', done => {
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

		describe('Higher-Order Component style', () => {
			describe('Proclaim-style assertions', () => {
				let componentName;
				beforeEach(() => {
					componentName = `o-${uuid()}`;
					mockPrompt({
						componentName: componentName,
						hasSass: true,
						hasJs: true,
						style: 'hoc',
						assertions: 'Proclaim',
					});
				});

				it('scaffolds out common files', done => {
					gulp.start('default')
					.once('task_stop', () => {
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

				it('scaffolds sass-related files', done => {
					gulp.start('default')
					.once('task_stop', () => {
						mockGulpDest.assertDestContains([
							'demos/src/demo.scss',
							'src/scss/_mixins.scss',
							'src/scss/_variables.scss',
							'main.scss',
						]);
						done();
					});
				});

				it('scaffolds component JS', done => {
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
			describe('Chai-style assertions', () => {
				let componentName;
				beforeEach(() => {
					componentName = `o-${uuid()}`;
					mockPrompt({
						componentName: componentName,
						hasSass: true,
						hasJs: true,
						style: 'class',
						assertions: 'Chai',
					});
				});

				it('scaffolds out common files', done => {
					gulp.start('default')
					.once('task_stop', () => {
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

				it('scaffolds sass-related files', done => {
					gulp.start('default')
					.once('task_stop', () => {
						mockGulpDest.assertDestContains([
							'demos/src/demo.scss',
							'src/scss/_mixins.scss',
							'src/scss/_variables.scss',
							'main.scss',
						]);
						done();
					});
				});

				it('scaffolds component JS', done => {
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

	// NO JS
	describe('Sass + Markup - JS', () => {
		let componentName;
		beforeEach(() => {
			componentName = `o-${uuid()}`;
			mockPrompt({
				componentName: componentName,
				hasSass: true,
				hasJs: false,
			});
		});

		it('scaffolds out common files', done => {
			gulp.start('default')
			.once('task_stop', () => {
				mockGulpDest.assertDestContains(commonFiles);
				done();
			});
		});

		it('does not scaffold testing-related files', done => {
			gulp.start('default')
			.once('task_stop', () => {
				mockGulpDest.assertDestNotContains([
					'test/helpers/fixtures.js',
					`test/${componentName}.spec.js`,
					'test/.eslintrc.json',
				]);
				done();
			});
		});

		it('does scaffolds sass-related files', done => {
			gulp.start('default')
			.once('task_stop', () => {
				mockGulpDest.assertDestContains([
					'demos/src/demo.scss',
					'src/scss/_mixins.scss',
					'src/scss/_variables.scss',
					'main.scss',
				]);
				done();
			});
		});

		it('does not scaffold component JS', done => {
			gulp.start('default')
			.once('task_stop', () => {
				mockGulpDest.assertDestNotContains([
					'demos/src/demo.js',
					`src/js/${componentName}.js`,
					'main.js',
				]);
				done();
			});
		});
	});

	// NO SASS
	describe('JS + Markup - Sass', () => {

		describe('ES6 class style', () => {
			describe('Proclaim-style assertions', () => {
				let componentName;
				beforeEach(() => {
					componentName = `o-${uuid()}`;
					mockPrompt({
						componentName: componentName,
						hasSass: false,
						hasJs: true,
						style: 'class',
						assertions: 'Proclaim',
					});
				});

				it('scaffolds out common files', done => {
					gulp.start('default')
					.once('task_stop', () => {
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

				it('does not scaffold sass-related files', done => {
					gulp.start('default')
					.once('task_stop', () => {
						mockGulpDest.assertDestNotContains([
							'demos/src/demo.scss',
							'src/scss/_mixins.scss',
							'src/scss/_variables.scss',
							'main.scss',
						]);
						done();
					});
				});

				it('scaffolds component JS', done => {
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

			describe('Chai-style assertions', () => {
				let componentName;
				beforeEach(() => {
					componentName = `o-${uuid()}`;
					mockPrompt({
						componentName: componentName,
						hasSass: false,
						hasJs: true,
						style: 'class',
						assertions: 'Chai',
					});
				});

				it('scaffolds out common files', done => {
					gulp.start('default')
					.once('task_stop', () => {
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

				it('does not scaffold sass-related files', done => {
					gulp.start('default')
					.once('task_stop', () => {
						mockGulpDest.assertDestNotContains([
							'demos/src/demo.scss',
							'src/scss/_mixins.scss',
							'src/scss/_variables.scss',
							'main.scss',
						]);
						done();
					});
				});

				it('scaffolds component JS', done => {
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

		describe('Stateless/functional style', () => {
			describe('Proclaim-style assertions', () => {
				let componentName;
				beforeEach(() => {
					componentName = `o-${uuid()}`;
					mockPrompt({
						componentName: componentName,
						hasSass: false,
						hasJs: true,
						style: 'function',
						assertions: 'Proclaim',
					});
				});

				it('scaffolds out common files', done => {
					gulp.start('default')
					.once('task_stop', () => {
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

				it('does not scaffold sass-related files', done => {
					gulp.start('default')
					.once('task_stop', () => {
						mockGulpDest.assertDestNotContains([
							'demos/src/demo.scss',
							'src/scss/_mixins.scss',
							'src/scss/_variables.scss',
							'main.scss',
						]);
						done();
					});
				});

				it('scaffolds component JS', done => {
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

			describe('Chai-style assertions', () => {
				let componentName;
				beforeEach(() => {
					componentName = `o-${uuid()}`;
					mockPrompt({
						componentName: componentName,
						hasSass: false,
						hasJs: true,
						style: 'class',
						assertions: 'Chai',
					});
				});

				it('scaffolds out common files', done => {
					gulp.start('default')
					.once('task_stop', () => {
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

				it('does not scaffold sass-related files', done => {
					gulp.start('default')
					.once('task_stop', () => {
						mockGulpDest.assertDestNotContains([
							'demos/src/demo.scss',
							'src/scss/_mixins.scss',
							'src/scss/_variables.scss',
							'main.scss',
						]);
						done();
					});
				});

				it('scaffolds component JS', done => {
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

		describe('Higher-Order Component style', () => {
			describe('Proclaim-style assertions', () => {
				let componentName;
				beforeEach(() => {
					componentName = `o-${uuid()}`;
					mockPrompt({
						componentName: componentName,
						hasSass: false,
						hasJs: true,
						style: 'hoc',
						assertions: 'Proclaim',
					});
				});

				it('scaffolds out common files', done => {
					gulp.start('default')
					.once('task_stop', () => {
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

				it('does not scaffold sass-related files', done => {
					gulp.start('default')
					.once('task_stop', () => {
						mockGulpDest.assertDestNotContains([
							'demos/src/demo.scss',
							'src/scss/_mixins.scss',
							'src/scss/_variables.scss',
							'main.scss',
						]);
						done();
					});
				});

				it('scaffolds component JS', done => {
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

			describe('Chai-style assertions', () => {
				let componentName;
				beforeEach(() => {
					componentName = `o-${uuid()}`;
					mockPrompt({
						componentName: componentName,
						hasSass: false,
						hasJs: true,
						style: 'class',
						assertions: 'Chai',
					});
				});

				it('scaffolds out common files', done => {
					gulp.start('default')
					.once('task_stop', () => {
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

				it('does not scaffold sass-related files', done => {
					gulp.start('default')
					.once('task_stop', () => {
						mockGulpDest.assertDestNotContains([
							'demos/src/demo.scss',
							'src/scss/_mixins.scss',
							'src/scss/_variables.scss',
							'main.scss',
						]);
						done();
					});
				});

				it('scaffolds component JS', done => {
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
