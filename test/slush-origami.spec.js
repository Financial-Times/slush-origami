/**
 * Spec for Slush Origami
 */

const mockPrompt = require('./inquirer-prompt-fixture');
const chai = require('chai');
chai.should();

const {
	itHasCommonFiles,
	itLacksCommonFiles,
	itHasTests,
	itLacksTests,
	itHasSass,
	itLacksSass,
	itHasJs,
	itLacksJs,
} = require('./assertions');

const prompts = require('../questions');

describe('~ Origami Slush generator ~', function () {
	this.timeout(2000);

	describe('# Question validators and filters', () => {
		describe('## Component name validator', () => {
			it('validates one-letter, a hyphen, then kebab-case', () => {
				prompts[0].validate('o-testing').should.equal(true);
				prompts[0].validate('x-herpa-derpa').should.equal(true);
			});

			it('fails edge cases', () => {
				prompts[0].validate('herpa-derpa').should.equal('\u001b[1m\u001b[37m\u001b[41mInvalid component name!\n\u001b[49m\u001b[39m\u001b[22m\u001b[1m\u001b[37m\u001b[41mShould match regex: /^[a-z]-[a-z-]+?[a-z]$/\u001b[49m\u001b[39m\u001b[22m\nThat is, something like...\n\u001b[1m\u001b[37m* o-grid\n\u001b[39m\u001b[22m\u001b[1m\u001b[37m* n-ui\n\u001b[39m\u001b[22m\u001b[1m\u001b[37m* g-audio\n\u001b[39m\u001b[22mYou supplied: herpa-derpa');
				prompts[0].validate('o-testing-').should.equal('\u001b[1m\u001b[37m\u001b[41mInvalid component name!\n\u001b[49m\u001b[39m\u001b[22m\u001b[1m\u001b[37m\u001b[41mShould match regex: /^[a-z]-[a-z-]+?[a-z]$/\u001b[49m\u001b[39m\u001b[22m\nThat is, something like...\n\u001b[1m\u001b[37m* o-grid\n\u001b[39m\u001b[22m\u001b[1m\u001b[37m* n-ui\n\u001b[39m\u001b[22m\u001b[1m\u001b[37m* g-audio\n\u001b[39m\u001b[22mYou supplied: o-testing-');
			});
		});

		describe('## Component description validator', () => {
			it('trims trailing full-stops', () => {
				prompts[2].filter('hey thurrr.').should.equal('hey thurrr');
				prompts[2].filter('hai thurrr...').should.equal('hai thurrr');
			});
		});
	});

	// NOTHING
	describe('# Abort chosen', () => {
		beforeEach(() => {
			mockPrompt({
				moveon: false,
			});
		});

		it('does not scaffold common files', itLacksCommonFiles);
		it('does not scaffold testing-related files', itLacksTests);
		it('does not scaffold sass-related files', itLacksSass);
		it('does not scaffold component JS', itLacksJs);
	});

	// EVERYTHING
	describe('# JS + Sass + Markup', () => {
		describe('## ES6 class style', () => {
			describe('### Proclaim-style assertions', () => {
				beforeEach(() => {
					mockPrompt({
						componentName: 'x-test',
						hasSass: true,
						hasJs: true,
						style: 'class',
						assertions: 'Proclaim',
					});
				});

				it('scaffolds out common files', itHasCommonFiles);
				it('scaffolds testing-related files', itHasTests);
				it('scaffolds sass-related files', itHasSass);
				it('scaffolds component JS', itHasJs);
			});

			describe('### Chai-style assertions', () => {
				beforeEach(() => {
					mockPrompt({
						componentName: 'x-test',
						hasSass: true,
						hasJs: true,
						style: 'class',
						assertions: 'Chai',
					});
				});

				it('scaffolds out common files', itHasCommonFiles);
				it('scaffolds testing-related files', itHasTests);
				it('scaffolds sass-related files', itHasSass);
				it('scaffolds component JS', itHasJs);
			});
		});

		describe('## Stateless/functional style', () => {
			describe('### Proclaim-style assertions', () => {
				beforeEach(() => {
					mockPrompt({
						componentName: 'x-test',
						hasSass: true,
						hasJs: true,
						style: 'function',
						assertions: 'Proclaim',
					});
				});

				it('scaffolds out common files', itHasCommonFiles);
				it('scaffolds testing-related files', itHasTests);
				it('scaffolds sass-related files', itHasSass);
				it('scaffolds component JS', itHasJs);
			});

			describe('### Chai-style assertions', () => {
				beforeEach(() => {
					mockPrompt({
						componentName: 'x-test',
						hasSass: true,
						hasJs: true,
						style: 'function',
						assertions: 'Chai',
					});
				});

				it('scaffolds out common files', itHasCommonFiles);
				it('scaffolds testing-related files', itHasTests);
				it('scaffolds sass-related files', itHasSass);
				it('scaffolds component JS', itHasJs);
			});
		});

		describe('## Higher-Order Component style', () => {
			describe('### Proclaim-style assertions', () => {
				beforeEach(() => {
					mockPrompt({
						componentName: 'x-test',
						hasSass: true,
						hasJs: true,
						style: 'hoc',
						assertions: 'Proclaim',
					});
				});

				it('scaffolds out common files', itHasCommonFiles);
				it('scaffolds testing-related files', itHasTests);
				it('scaffolds sass-related files', itHasSass);
				it('scaffolds component JS', itHasJs);
			});

			describe('### Chai-style assertions', () => {
				beforeEach(() => {
					mockPrompt({
						componentName: 'x-test',
						hasSass: true,
						hasJs: true,
						style: 'hoc',
						assertions: 'Chai',
					});
				});

				it('scaffolds out common files', itHasCommonFiles);
				it('scaffolds testing-related files', itHasTests);
				it('scaffolds sass-related files', itHasSass);
				it('scaffolds component JS', itHasJs);
			});
		});
	});

	// NO JS
	describe('# Sass + Markup - JS', () => {
		beforeEach(() => {
			mockPrompt({
				componentName: 'x-test',
				hasSass: true,
				hasJs: false,
			});
		});

		it('scaffolds out common files', itHasCommonFiles);
		it('does not scaffold testing-related files', itLacksTests);
		it('scaffolds sass-related files', itHasSass);
		it('does not scaffold component JS', itLacksJs);
	});

	// NO SASS
	describe('# JS + Markup - Sass', () => {

		describe('## ES6 class style', () => {
			describe('### Proclaim-style assertions', () => {
				beforeEach(() => {
					mockPrompt({
						componentName: 'x-test',
						hasSass: false,
						hasJs: true,
						style: 'class',
						assertions: 'Proclaim',
					});
				});

				it('scaffolds out common files', itHasCommonFiles);
				it('scaffolds testing-related files', itHasTests);
				it('does not scaffold sass-related files', itLacksSass);
				it('scaffolds component JS', itHasJs);
			});

			describe('### Chai-style assertions', () => {
				beforeEach(() => {
					mockPrompt({
						componentName: 'x-test',
						hasSass: false,
						hasJs: true,
						style: 'class',
						assertions: 'Chai',
					});
				});

				it('scaffolds out common files', itHasCommonFiles);
				it('scaffolds testing-related files', itHasTests);
				it('does not scaffold sass-related files', itLacksSass);
				it('scaffolds component JS', itHasJs);
			});
		});

		describe('Stateless/functional style', () => {
			describe('Proclaim-style assertions', () => {
				beforeEach(() => {
					mockPrompt({
						componentName: 'x-test',
						hasSass: false,
						hasJs: true,
						style: 'function',
						assertions: 'Proclaim',
					});
				});

				it('scaffolds out common files', itHasCommonFiles);
				it('scaffolds testing-related files', itHasTests);
				it('does not scaffold sass-related files', itLacksSass);
				it('scaffolds component JS', itHasJs);
			});

			describe('Chai-style assertions', () => {
				beforeEach(() => {
					mockPrompt({
						componentName: 'x-test',
						hasSass: false,
						hasJs: true,
						style: 'class',
						assertions: 'Chai',
					});
				});

				it('scaffolds out common files', itHasCommonFiles);
				it('scaffolds testing-related files', itHasTests);
				it('does not scaffold sass-related files', itLacksSass);
				it('scaffolds component JS', itHasJs);
			});
		});

		describe('Higher-Order Component style', () => {
			describe('Proclaim-style assertions', () => {
				beforeEach(() => {
					mockPrompt({
						componentName: 'x-test',
						hasSass: false,
						hasJs: true,
						style: 'hoc',
						assertions: 'Proclaim',
					});
				});

				it('scaffolds out common files', itHasCommonFiles);
				it('scaffolds testing-related files', itHasTests);
				it('does not scaffold sass-related files', itLacksSass);
				it('scaffolds component JS', itHasJs);
			});

			describe('Chai-style assertions', () => {
				beforeEach(() => {
					mockPrompt({
						componentName: 'x-test',
						hasSass: false,
						hasJs: true,
						style: 'class',
						assertions: 'Chai',
					});
				});

				it('scaffolds out common files', itHasCommonFiles);
				it('scaffolds testing-related files', itHasTests);
				it('does not scaffold sass-related files', itLacksSass);
				it('scaffolds component JS', itHasJs);
			});
		});
	});
});
