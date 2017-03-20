/*
* slush-origami
* https://github.com/financial-times/slush-origami
*
* Copyright (c) 2017 Ændrew Rininsland, Financial Times
* Licensed under the MIT license.
*/

const gulp = require('gulp');
const filter = require('gulp-filter');
const install = require('gulp-install');
const conflict = require('gulp-conflict');
const template = require('gulp-template');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const inquirer = require('inquirer');
const path = require('path');
const axios = require('axios');
const _ = require('lodash/string');
const plumber = require('gulp-plumber');
const chalk = require('chalk');

const error = chalk.bold.white.bgRed;
const bold = chalk.bold.white;

const isTesting = process.env.NODE_ENV === 'test';

const defaults = (function () {
	const workingDirName = path.basename(process.cwd());
	let homeDir;
	let osUserName;
	let user = {};

	if (process.platform === 'win32') {
		homeDir = process.env.USERPROFILE;
		osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
	} else {
		homeDir = process.env.HOME || process.env.HOMEPATH;
		osUserName = homeDir && homeDir.split('/').pop() || 'root';
	}

	const configFile = path.join(homeDir, '.gitconfig');

	if (require('fs').existsSync(configFile)) {
		user = require('iniparser').parseSync(configFile).user || {};
	}

	return {
		componentName: workingDirName,
		userName: osUserName || ((string) => {
			const username = string.toLowerCase();
			return username.replace(/\s/g, '');
		})(user.name || ''),
		authorName: user.name || '',
		authorEmail: user.email || '',
		repoUrl: `https://github.com/financial-times/${workingDirName}`,
		issuesUrl: `https://github.com/financial-times/${workingDirName}/issues`,
		ciUrl: `https://circleci.com/api/v1/project/Financial-Times/${workingDirName}`,
	};
}());

gulp.task('default', function (done) {
	const prompts = [{
		name: 'componentName',
		message: 'What is the name of your component?',
		default: defaults.componentName,
		validate: answer => answer.match(/^[a-z]-[a-z-]+?[a-z]$/) ? true :
			error('Invalid component name!\n') +
			error('Should match regex: /^[a-z]-[a-z-]+?[a-z]$/') +
			'\nThat is, something like...\n' +
			bold('* o-grid\n') +
			bold('* n-ui\n') +
			bold('* g-audio\n') +
			`You supplied: ${answer}`,
	}, {
		name: 'repoUrl',
		message: 'What is the Git repo of the component?',
		default: defaults.repoUrl,
	},{
		name: 'componentDescription',
		default: 'An origami component',
		message: `What does this component do? Complete the following sentence:\n`
		+ `"This is an Origami component..."`,
		filter: v => v.replace(/\.$/, ''), // Remove trailing periods
	}, {
		name: 'componentType',
		message: 'What type of component is it?',
		default: 'component',
		type: 'list',
		choices: [
			'component',
			'primitive',
			'utility',
			'layout',
		],
	}, {
		name: 'componentKeywords',
		message: 'Provide a comma-separated list of keywords describing the component',
		default: '',
	}, {
		name: 'componentVersion',
		message: 'What is the version of your component?',
		default: '0.1.0',
	}, {
		name: 'issuesUrl',
		message: 'What is the support/issues URL?',
		default: defaults.issuesUrl,
	}, {
		name: 'supportStatus',
		message: 'What is the current support status?',
		type: 'list',
		choices: [
			'active',
			'maintained',
			'experimental',
		],
		default: 'active',
	}, {
		name: 'ciUrl',
		message: 'What is the CircleCI URL?',
		default: defaults.ciUrl,
	}, {
		name: 'browserFeaturesRequired',
		message: 'Please choose which browser features are *REQUIRED* from Polyfill.io\n``',
		default: [],
		type: 'checkbox',
		choices: () => axios.get('https://cdn.polyfill.io/v2/assets/compat.json')
			.then(results => [
				'default-3.6',
				new inquirer.Separator(),
				...Object.keys(results.data),
			]),
	}, {
		name: 'browserFeaturesOptional',
		message: 'Please choose which browser features are *OPTIONAL* from Polyfill.io\n``',
		default: [],
		type: 'checkbox',
	 	choices: () => axios.get('https://cdn.polyfill.io/v2/assets/compat.json')
	 		.then(results => [
				'default-3.6',
				new inquirer.Separator(),
				...Object.keys(results.data),
			]),
	}, {
		name: 'hasSass',
		message: 'Does your component need Sass?',
		default: true,
		type: 'confirm',
	}, {
		name: 'hasJs',
		message: 'Does your component need JavaScript?',
		default: true,
		type: 'confirm',
	}, {
		name: 'style',
		message: 'Which style of component do you want to scaffold?',
		type: 'list',
		default: 'function',
		choices: [
			{
				name: 'Pure/stateless function',
				value: 'function',
			},
			{
				name: 'Higher-Order Component (HOC)', // @TODO Investigate: is this useful? Desirable? Testable?
				value: 'hoc',
			},
			{
				name: 'ES6 Class',
				value: 'class',
			},
		],
		when: ({ hasJs }) => hasJs,
	}, {
		name: 'transpiler',
		message: 'Which transpiler do you want to use?',
		type: 'list',
		choices: [
			'Babel',
			// 'TypeScript', // @TODO add TypeScript support
		],
		default: 'Babel',
		when: ({ hasJs }) => hasJs,
	}, {
		name: 'assertions',
		message: 'Which assertion library do you want to use?',
		type: 'list',
		default: 'Proclaim',
		choices: [
			'Chai',
			'Proclaim',
		],
		when: ({ hasJs }) => hasJs,
	}, {
		name: 'hasMarkup',
		message: 'Does your component need markup?',
		default: true,
		type: 'confirm',
	}, {
		name: 'authorName',
		message: 'What is the your name?',
		default: defaults.authorName,
	}, {
		name: 'authorEmail',
		message: 'What is the your email?',
		default: defaults.authorEmail,
	}, {
		name: 'userName',
		message: 'What is the github username?',
		default: defaults.userName,
	}, {
		type: 'confirm',
		name: 'moveon',
		message: 'Continue?',
		default: true,
	}];

	const handleAnswers = answers => {
		if (!answers.moveon) {
			return done();
		}

		gulp.src(__dirname + '/templates/**')
		.pipe(plumber())
		.pipe(filter(file => {
			// Filter out JS and all testing stuff if no JS
			if (!answers.hasJs &&
				(file.path.indexOf('/test/') > -1 || path.extname(file.path) === '.js')) {
				return false;

			// Filter out Sass if no Sass
			} else if (!answers.hasSass &&
				(file.path.indexOf('/scss/') > -1 || path.extname(file.path) === '.scss')) {
				return false;

			// Filter out wrong JS files
			} else if (answers.hasJs && file.path.indexOf('/src/js/') > -1 ) {
				return path.basename(file.path).indexOf(answers.style.toLowerCase()) > -1;

			// Filter out wrong spec file
			} else if (answers.assertions && file.path.indexOf('.spec.') > -1) {
				return path.basename(file.path).indexOf(answers.assertions.toLowerCase()) > -1;

			// Otherwise keep file
			} else {
				return true;
			}
		}))
		.pipe(rename(function (file) {
			// Hidden files
			if (file.basename[0] === '_') {
				file.basename = '.' + file.basename.slice(1);

			// Sass partials
			} else if (file.basename === 'mixins' && file.extname === '.scss') {
				file.basename = `_mixins`;
			} else if (file.basename === 'variables' && file.extname === '.scss') {
				file.basename = '_variables';

			// Main JS spec file
			} else if (file.basename.match('component.spec') && file.extname === '.js') {
				file.basename = `${answers.componentName}.spec`;

			// Main JS file
			} else if (file.basename.match('component') && file.extname === '.js') {
				file.basename = `${answers.componentName}`;

			// package.json et al.
			} else if (file.basename.match(/_json$/)) {
				file.basename = file.basename.replace(/_json$/, '');
				file.extname = '.json';
			}
		}))
		.pipe(template(answers, {
			imports: {
				_,
				PascalCase: s => _.upperFirst(_.camelCase(s)),
			},
		}))
		.pipe(conflict(isTesting ? '/tmp' : './'))
		.pipe(gulp.dest('./'))
		.pipe(gulpif(!isTesting, install()))
		.on('data', () => {}) // No idea why this is needed for tests to pass
		.on('end', done);
	};

	//Ask
	inquirer.prompt(prompts)
		.then(handleAnswers);
});
