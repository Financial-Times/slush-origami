/**
 * Spec for Slush Origami
 */

const mockPrompt = require('./inquirer-prompt-fixture');
const {
	itHasCommonFiles,
	itHasTests,
	itLacksTests,
	itHasSass,
	itLacksSass,
	itHasJs,
	itLacksJs,
} = require('./assertions');

describe('~ Origami Slush generator ~', function () {
	this.timeout(20000);

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
